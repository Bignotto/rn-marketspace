import { TextInput } from "@components/TextInput";
import { useNavigation } from "@react-navigation/native";
import { AdsRoutesNavigationProps } from "@routes/ads.routes";
import { Box, HStack, ScrollView, Text, VStack } from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export function CreateAd() {
  const navigation = useNavigation<AdsRoutesNavigationProps>();

  return (
    <>
      <HStack
        mt={getStatusBarHeight() + 36}
        px={10}
        justifyContent="space-between"
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
        <Text fontFamily={"heading"} fontSize="xl" color={"gray.700"}>
          Criar anúncio
        </Text>
        <Box w={5} />
      </HStack>
      <ScrollView
        // contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        px={10}
        mt="3"
      >
        <VStack flex={1}>
          <Text fontFamily={"heading"} fontSize="md" color={"gray.700"}>
            Imagens
          </Text>
          <Text fontFamily={"body"} fontSize="sm" color={"gray.700"}>
            Escolha até 3 imagens para mostrar o quanto seu produto é incrível!
          </Text>
        </VStack>

        {/* image picker */}

        <VStack flex={1}>
          <Text fontFamily={"heading"} fontSize="md" color={"gray.700"}>
            Sobre o produto
          </Text>
          <TextInput />
        </VStack>
      </ScrollView>
    </>
  );
}
