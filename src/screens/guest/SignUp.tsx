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
import { GenericButton } from "@components/GenericButton";
import { useNavigation } from "@react-navigation/native";
import { PencilSimpleLine, User } from "phosphor-react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export function SignUp() {
  const navigation = useNavigation();

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
                <PencilSimpleLine color="#FFFFFF" />
              </Center>
            </Box>
            <Center flex={1}>
              <User size={54} color="#9F9BA1" />
            </Center>
          </Box>
        </Center>
        <Center mt="4">
          <TextInput placeholder="Nome" mb="4" />
          <TextInput
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            mb="4"
          />
          <TextInput placeholder="Telefone" mb="4" />
          <TextInput placeholder="Senha" secureTextEntry mb="4" />
          <TextInput placeholder="Confirmar senha" secureTextEntry mb="4" />
          <GenericButton title="Criar" variant="dark" />
        </Center>
        <Center pt="16" mb="20">
          <Heading fontSize="xl" mb="4">
            Já tem uma conta?
          </Heading>
          <GenericButton
            title="Voltar para o login"
            variant="light"
            onPress={() => navigation.goBack()}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
