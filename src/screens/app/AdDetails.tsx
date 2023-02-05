import { AdImagesList } from "@components/AdImagesList";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { Box, ScrollView, VStack } from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

const SAMPLE_IMAGES = [
  {
    id: "1",
    path: "https://avatars.githubusercontent.com/u/2911353?v=4",
  },
  {
    id: "2",
    path: "https://avatars.githubusercontent.com/u/4248081?v=4",
  },
  {
    id: "3",
    path: "https://avatars.githubusercontent.com/u/90806505?v=4",
  },
  {
    id: "4",
    path: "https://avatars.githubusercontent.com/u/10366880?v=4",
  },
];

export function AdDetails() {
  const navigation = useNavigation<AppNavigationRoutesProps>();
  return (
    <>
      <VStack mb="3">
        <Box mt={getStatusBarHeight() + 36} px={10}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft />
          </TouchableOpacity>
        </Box>
      </VStack>

      <AdImagesList images={SAMPLE_IMAGES} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        backgroundColor="blue.300"
      ></ScrollView>
    </>
  );
}
