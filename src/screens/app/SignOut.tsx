import { Center, ScrollView, Text, VStack } from "native-base";

export function SignOut() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Center flex={1}>
          <Text fontFamily={"heading"} fontSize="3xl" color={"darkText"}>
            SignOut
          </Text>
        </Center>
      </VStack>
    </ScrollView>
  );
}
