import { Center, ScrollView, Text, VStack } from "native-base";

export function YourScreenName() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Center flex={1}>
          <Text fontFamily={"heading"} fontSize="3xl" color={"darkText"}>
            Your Screen Name
          </Text>
        </Center>
      </VStack>
    </ScrollView>
  );
}
