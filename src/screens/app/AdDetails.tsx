import { AdImagesList } from "@components/AdImagesList";
import { GenericButton } from "@components/GenericButton";
import { PaymentMethodsList } from "@components/PaymentMethodsList";
import { UserAvatar } from "@components/UserAvatar";
import { IProductDTO } from "@dtos/IProductDTO";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AdsRoutes } from "@routes/ads.routes";
import { api } from "@services/api";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Spinner,
  Text,
  useToast,
  VStack,
} from "native-base";
import { ArrowLeft, PencilSimpleLine } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

type ScreenProps = NativeStackScreenProps<AdsRoutes, "adDetails">;

export function AdDetails({ navigation, route }: ScreenProps) {
  const { mode, adId } = route.params;
  const [adData, setAdData] = useState<IProductDTO | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  async function handlePublishAd() {
    setIsLoading(true);
    try {
      const request = api.patch(`/products/${adData!.id}`, { is_active: true });

      console.log({ request });

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "home" }],
        })
      );
    } catch (error) {
      console.log({ error });
      return toast.show({
        title: "Algo errado ao publicar o anúncio.",
        placement: "top",
        bgColor: "red.500",
        duration: 6500,
      });
    }
  }

  async function loadAd() {
    console.log({ message: "loading ad", ad: adId });
    setIsLoading(true);
    try {
      const response = await api.get(`/products/${adId}`);

      setAdData(response.data);
    } catch (error) {
      console.log({ error });
      return toast.show({
        title: "Algo errado ao recuperar o anúncio.",
        placement: "top",
        bgColor: "red.500",
        duration: 6500,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadAd();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAd();
    }, [route])
  );

  if (isLoading)
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );

  return (
    <>
      {mode === "preview" && (
        <VStack px={10} backgroundColor="blue.400">
          <Box
            mt={getStatusBarHeight() + 36}
            mb={36}
            justifyContent="center"
            alignItems="center"
          >
            <Text fontFamily="heading" color="white" fontSize="md">
              Pré visualização do anúncio
            </Text>
            <Text fontFamily="body" color="white" fontSize="md">
              É assim que seu anúncio irá aparecer
            </Text>
          </Box>
        </VStack>
      )}
      {mode === "owner" && (
        <HStack mb="3" px={10} justifyContent="space-between">
          <Box mt={getStatusBarHeight() + 36}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft />
            </TouchableOpacity>
          </Box>
          <Box mt={getStatusBarHeight() + 36}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <PencilSimpleLine />
            </TouchableOpacity>
          </Box>
        </HStack>
      )}
      {mode === "detail" && (
        <HStack mb="3" px={10} justifyContent="space-between">
          <Box mt={getStatusBarHeight() + 36}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft />
            </TouchableOpacity>
          </Box>
          <Box mt={getStatusBarHeight() + 36}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <PencilSimpleLine />
            </TouchableOpacity>
          </Box>
        </HStack>
      )}

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
        <PaymentMethodsList methods={adData!.payment_methods} />
      </ScrollView>
      {mode === "preview" && (
        <HStack
          h="90"
          backgroundColor="white"
          alignItems="center"
          justifyContent="space-between"
          px={10}
        >
          <GenericButton
            title="Voltar e editar"
            width={157}
            variant="light"
            onPress={() => navigation.goBack()}
          />
          <GenericButton
            title="Publicar"
            width={157}
            onPress={handlePublishAd}
            isLoading={isLoading}
          />
        </HStack>
      )}
      {mode !== "preview" && (
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
      )}
    </>
  );
}
