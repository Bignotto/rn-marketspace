import { TextInput } from "@components/TextInput";
import {
  Box,
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";

import LogoPng from "@assets/LogoSm.png";
import { GenericButton as Button } from "@components/GenericButton";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { PencilSimpleLine, User } from "phosphor-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

type FormDataProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmation: string;
};

export function SignUp() {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm<FormDataProps>();

  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");

  async function handleEditAvatar() {
    setLoadingAvatar(true);
    try {
      const selectedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (selectedImage.canceled) {
        return;
      }

      if (selectedImage.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          selectedImage.assets[0].uri
        );

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 2) {
          console.log("image too big");
          return;

          // return toast.show({
          //   title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
          //   placement: 'top',
          //   bgColor: 'red.500'
          // })
        }

        setUserAvatar(selectedImage.assets[0].uri);
      }
    } catch (error) {
    } finally {
      setLoadingAvatar(false);
    }
  }

  async function handleCreateUser({
    name,
    email,
    phone,
    password,
    confirmation,
  }: FormDataProps) {}

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bgColor="gray.100"
    >
      <VStack flex={1} px={10} bgColor="gray.200">
        <Center mt={getStatusBarHeight() + 40}>
          <Image source={LogoPng} alt="folder inside globe" />
        </Center>
        <Center mt="4">
          <Heading>Boas Vindas!</Heading>
          <Text fontSize="xl" textAlign="center">
            Crie sua conta e useo espaço para comprar itens variados e vender
            seus produtos
          </Text>
        </Center>
        <Center mt="8">
          <Box
            borderWidth={3}
            borderColor="#647AC7"
            w={88}
            h={88}
            borderRadius="full"
          >
            <Center flex={1}>
              {userAvatar && !loadingAvatar ? (
                <Image
                  source={{ uri: userAvatar }}
                  alt="user avatar image"
                  h={86}
                  w={90}
                  rounded="full"
                />
              ) : (
                <User size={54} color="#9F9BA1" />
              )}
            </Center>
            <Box
              position="absolute"
              left={16}
              top={12}
              bgColor="#647AC7"
              w="10"
              h="10"
              borderRadius="full"
            >
              <Center flex={1}>
                <TouchableOpacity onPress={handleEditAvatar}>
                  <PencilSimpleLine color="#FFFFFF" />
                </TouchableOpacity>
              </Center>
            </Box>
          </Box>
        </Center>
        <Center mt="4">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Nome"
                mb="4"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                mb="4"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Telefone"
                mb="4"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Senha"
                mb="4"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmation"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Confirmar senha"
                mb="4"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Button
            title="Criar"
            variant="dark"
            onPress={handleSubmit(handleCreateUser)}
          />
        </Center>
        <Center pt="16" mb="20">
          <Heading fontSize="xl" mb="4">
            Já tem uma conta?
          </Heading>
          <Button
            title="Voltar para o login"
            variant="light"
            onPress={() => navigation.goBack()}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
