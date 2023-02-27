import { TextInput } from "@components/TextInput";
import {
  Center,
  Heading,
  Image,
  ScrollView,
  useToast,
  VStack,
} from "native-base";

import LogoPng from "@assets/logo.png";
import { GenericButton } from "@components/GenericButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { GuestRoutesNavigationProps } from "@routes/guest.routes";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import * as yup from "yup";

type FormDataProps = {
  email: string;
  password: string;
};

const formValidation = yup.object({
  email: yup
    .string()
    .required("É obrigatório um e-mail.")
    .email("E-mail inválido."),
  password: yup.string().required("É preciso uma senha."),
});

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigation = useNavigation<GuestRoutesNavigationProps>();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(formValidation),
  });

  function handleNavigateSignUp() {
    navigation.navigate("signUp");
  }

  async function handleLogin({ email, password }: FormDataProps) {
    setIsLoading(true);
    try {
      const response = await signIn(email, password);
      return Alert.alert(response);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta.";

      return toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
        duration: 6500,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bgColor="gray.100"
    >
      <VStack
        flex={1}
        px={10}
        pb={16}
        borderBottomRadius={28}
        bgColor="gray.200"
      >
        <Center mt={getStatusBarHeight() + 81}>
          <Image source={LogoPng} alt="folder inside globe" />
        </Center>
        <Center mt="20">
          <Heading fontSize="lg">Acesse sua conta</Heading>
        </Center>
        <Center mt="4">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <TextInput
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                mb="4"
                onChangeText={onChange}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <TextInput
                placeholder="Senha"
                secureTextEntry
                mb="4"
                onChangeText={onChange}
                error={errors.password?.message}
              />
            )}
          />
          <GenericButton
            title="Entrar"
            onPress={handleSubmit(handleLogin)}
            isLoading={isLoading}
          />
        </Center>
      </VStack>
      <Center bgColor="gray.100" px={10} pt="16" mb="20">
        <Heading fontSize="lg" mb="4">
          Ainda não tem acesso?
        </Heading>
        <GenericButton
          title="Criar uma nova conta"
          variant="light"
          onPress={handleNavigateSignUp}
        />
      </Center>
    </ScrollView>
  );
}
