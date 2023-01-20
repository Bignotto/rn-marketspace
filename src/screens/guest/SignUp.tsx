import { TextInput } from "@components/TextInput";
import {
  Avatar,
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";

import LogoPng from "@assets/LogoSm.png";
import { GenericButton } from "@components/GenericButton";
import { User } from "phosphor-react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export function SignUp() {
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
        <Center mt={getStatusBarHeight() + 40}>
          <Image source={LogoPng} alt="folder inside globe" />
        </Center>
        <Center mt="10">
          <Heading>Boas Vindas!</Heading>
          <Text fontSize="xl" textAlign="center">
            Crie sua conta e useo espaço para comprar itens variados e vender
            seus produtos
          </Text>
        </Center>
        <Center>
          <Avatar
            bg="blue.50"
            alignSelf="center"
            size="2xl"
            source={{
              uri: "http://localhost:3333",
            }}
          >
            <User size={24} />
          </Avatar>
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
        <Heading fontSize="xl" mb="4">
          Ainda não tem acesso?
        </Heading>
        <GenericButton title="Criar uma nova conta" variant="light" />
      </Center>
    </ScrollView>
  );
}
