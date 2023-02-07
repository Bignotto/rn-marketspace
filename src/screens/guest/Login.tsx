import { TextInput } from "@components/TextInput";
import { Center, Heading, Image, ScrollView, VStack } from "native-base";

import LogoPng from "@assets/logo.png";
import { GenericButton } from "@components/GenericButton";
import { useNavigation } from "@react-navigation/native";
import { GuestRoutesNavigationProps } from "@routes/guest.routes";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export function Login() {
  const navigation = useNavigation<GuestRoutesNavigationProps>();

  function handleNavigateSignUp() {
    navigation.navigate("signUp");
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
          <TextInput
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            mb="4"
          />
          <TextInput placeholder="Senha" secureTextEntry mb="4" />
          <GenericButton title="Entrar" />
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
