import { AdImagesList } from "@components/AdImagesList";
import { GenericButton } from "@components/GenericButton";
import { PaymentMethodsList } from "@components/PaymentMethodsList";
import { UserAvatar } from "@components/UserAvatar";
import { IProductDTO } from "@dtos/IProductDTO";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AdsRoutes } from "@routes/ads.routes";
import { Box, Center, HStack, ScrollView, Spinner, Text } from "native-base";
import { ArrowLeft, PencilSimpleLine } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { DATA } from "../../_sample_data";

type ScreenProps = NativeStackScreenProps<AdsRoutes, "adDetails">;

export function AdDetails({ navigation, route }: ScreenProps) {
  const { mode, adId } = route.params;
  const [adData, setAdData] = useState<IProductDTO | undefined>(undefined);

  useEffect(() => {
    const ad = DATA.filter((a) => a.id === adId);
    setAdData(ad[0]);
  }, []);

  if (!adData)
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );

  return (
    <>
      <HStack mb="3" px={10} justifyContent="space-between">
        <Box mt={getStatusBarHeight() + 36}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft />
          </TouchableOpacity>
        </Box>
        <Box mt={getStatusBarHeight() + 36}>
          {mode === "owner" && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <PencilSimpleLine />
            </TouchableOpacity>
          )}
        </Box>
      </HStack>

      <AdImagesList images={adData?.product_images!} />

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
            {adData?.user!.name}
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
            {adData?.is_new ? `NOVO` : `USADO`}
          </Text>
        </Box>
        <HStack mt="2" justifyContent="space-between">
          <Text fontFamily="heading" fontSize="xl">
            {adData?.name}
          </Text>
          <Text fontFamily="heading" fontSize="xl" color="blue.400">
            {`R$ ${adData?.price}`}
          </Text>
        </HStack>
        <Text fontFamily="body" fontSize="sm" color="gray.600">
          {adData?.description}
        </Text>
        <HStack mt="6" alignItems="center">
          <Text fontFamily="heading" color="gray.600" fontSize="md">
            Aceita troca?
          </Text>
          <Text fontFamily="body" color="gray.600" fontSize="md" ml="2">
            {adData?.accept_trade ? `Sim` : `Não`}
          </Text>
        </HStack>
        <Text fontFamily="heading" color="gray.600" fontSize="md" mt="6">
          Meios de pagamento:
        </Text>
        <PaymentMethodsList methods={adData.payment_methods} />
      </ScrollView>
      <HStack
        h="90"
        backgroundColor="white"
        alignItems="center"
        justifyContent="space-between"
        px={10}
      >
        <Text fontFamily="heading" fontSize="xl" color="blue.400">
          {`R$ ${adData?.price}`}
        </Text>
        <GenericButton title="Entrar em Contato" width={169} />
      </HStack>
    </>
  );
}
