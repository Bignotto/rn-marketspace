import { AdImagesList } from "@components/AdImagesList";
import { GenericButton } from "@components/GenericButton";
import { UserAvatar } from "@components/UserAvatar";
import { useNavigation } from "@react-navigation/native";
import { AdsRoutesNavigationProps } from "@routes/ads.routes";
import { Box, HStack, ScrollView, Text, VStack } from "native-base";
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
} from "phosphor-react-native";
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
  const navigation = useNavigation<AdsRoutesNavigationProps>();
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
        px={10}
      >
        <HStack alignItems="center" mt="6">
          <UserAvatar
            avatar_uri="https://avatars.githubusercontent.com/u/2911353?v=4"
            size={12}
          />
          <Text ml="2" fontSize="md" fontFamily="body">
            Thiago Bignotto
          </Text>
        </HStack>
        <Box
          mt="6"
          backgroundColor="gray.300"
          w={45}
          borderRadius="full"
          alignItems="center"
        >
          <Text fontFamily="body" color="gray.600" fontSize="xs">
            NOVO
          </Text>
        </Box>
        <HStack mt="2" justifyContent="space-between">
          <Text fontFamily="heading" fontSize="xl">
            Bicicleta
          </Text>
          <Text fontFamily="heading" fontSize="xl" color="blue.400">
            R$ 120,00
          </Text>
        </HStack>
        <Text fontFamily="body" fontSize="sm" color="gray.600">
          Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
          Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
          nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
          in aliquam.
        </Text>
        <HStack mt="6" alignItems="center">
          <Text fontFamily="heading" color="gray.600" fontSize="md">
            Aceita troca?
          </Text>
          <Text fontFamily="body" color="gray.600" fontSize="md" ml="2">
            Sim
          </Text>
        </HStack>
        <Text fontFamily="heading" color="gray.600" fontSize="md" mt="6">
          Meios de pagamento:
        </Text>
        <VStack mt="2">
          <HStack alignItems="center" mb="2">
            <Barcode />
            <Text ml="1">Boleto</Text>
          </HStack>
          <HStack alignItems="center" mb="2">
            <QrCode />
            <Text ml="1">Pix</Text>
          </HStack>
          <HStack alignItems="center" mb="2">
            <Money />
            <Text ml="1">Dinheiro</Text>
          </HStack>
          <HStack alignItems="center" mb="2">
            <CreditCard />
            <Text ml="1">Cartão de Crédito</Text>
          </HStack>
          <HStack alignItems="center" mb="2">
            <Bank />
            <Text ml="1">Depósito Bancário</Text>
          </HStack>
        </VStack>
      </ScrollView>
      <HStack
        h="90"
        backgroundColor="white"
        alignItems="center"
        justifyContent="space-between"
        px={10}
      >
        <Text fontFamily="heading" fontSize="xl" color="blue.400">
          R$ 120,00
        </Text>
        <GenericButton title="Entrar em Contato" width={169} />
      </HStack>
    </>
  );
}
