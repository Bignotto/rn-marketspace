import { Center, ScrollView, Text, VStack } from "native-base";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export function UserAds() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Center marginTop={getStatusBarHeight() + 36}>
          <Text fontFamily={"heading"} fontSize={20} color={"darkText"}>
            Meus anúncios
          </Text>
        </Center>
      </VStack>
    </ScrollView>
  );
}
