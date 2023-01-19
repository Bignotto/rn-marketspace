import { GenericButton } from "@components/GenericButton";
import { Center, ScrollView, Text, VStack } from "native-base";

export function Login() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Center flex={1}>
          <Text fontFamily={"heading"} fontSize="3xl" color={"red.500"}>
            Login Screen
          </Text>
          <GenericButton title="Solid" variant={"solid"} />
          <GenericButton title="Dark" variant={"dark"} />
          <GenericButton title="Light" variant={"light"} />
        </Center>
      </VStack>
    </ScrollView>
  );
}
