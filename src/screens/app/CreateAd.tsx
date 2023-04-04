import { GenericButton } from "@components/GenericButton";
import { TextInput } from "@components/TextInput";
import { IProductDTO } from "@dtos/IProductDTO";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRoutes } from "@routes/app.routes";
import { api } from "@services/api";
import * as ImagePicker from "expo-image-picker";
import {
  Box,
  Checkbox,
  HStack,
  Image,
  Radio,
  ScrollView,
  Switch,
  Text,
  TextArea,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import { ArrowLeft, Plus, XCircle } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import * as yup from "yup";

type FormDataProps = {
  name: string;
  description: string;
  price: string;
};

type ScreenProps = NativeStackScreenProps<AppRoutes, "createAd">;

type AppImagesList = {
  id: string | undefined;
  path: string;
  local: boolean;
};

const formValidation = yup.object({
  name: yup.string().required("O anúncio precisa de um título."),
  description: yup
    .string()
    .required("Descreva o seu anúncio.")
    .min(20, "Descreva melhor o seu anúncio."),
  price: yup.number().typeError("Preço inválido.").positive("Preço inválido."),
});

export function CreateAd({ navigation, route }: ScreenProps) {
  const { mode, adId } = route.params;
  const [adImages, setAdImages] = useState<AppImagesList[]>([]);
  const [acceptTrade, setAcceptTrade] = useState(true);
  const [payMethods, setPayMethods] = useState<string[]>([]);
  const [condition, setCondition] = useState("NEW");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(formValidation),
  });

  async function handleImageSelect() {
    const selectedImages = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    });

    if (selectedImages.canceled) return;

    const newImage: AppImagesList = {
      id: selectedImages.assets[0].uri,
      path: selectedImages.assets[0].uri,
      local: true,
    };

    setAdImages([...adImages, newImage]);
  }

  function handleRemoveImage(uri: string) {
    const filtered = adImages.filter((img) => img.path !== uri);
    setAdImages(filtered);
  }

  function handleCheckBox(val: []) {
    setPayMethods(val);
  }

  function toggleSwitchState() {
    setAcceptTrade((a) => !a);
  }

  async function handleSaveAd({ name, description, price }: FormDataProps) {
    if (payMethods.length === 0)
      return toast.show({
        title: "Selecione pelo menos uma condição de pagamento.",
        placement: "top",
        bgColor: "red.500",
        duration: 6500,
      });

    if (adImages.length === 0)
      return toast.show({
        title: "Selecione pelo menos uma imagem para seu anúncio.",
        placement: "top",
        bgColor: "red.500",
        duration: 6500,
      });

    setIsLoading(true);
    try {
      let response;

      if (mode === "new") {
        response = await api.post("/products", {
          name,
          description,
          price: +price,
          accept_trade: acceptTrade,
          is_new: condition === "NEW" ? true : false,
          payment_methods: payMethods,
        });
      } else {
        response = await api.put(`/products/${adId}`, {
          name,
          description,
          price: +price,
          accept_trade: acceptTrade,
          is_new: condition === "NEW" ? true : false,
          payment_methods: payMethods,
        });
      }

      if (adImages.filter((img) => img.local === true).length > 0) {
        const uploadData = new FormData();
        adImages
          .filter((img) => img.local === true)
          .forEach((img) => {
            const imageFileExtension = img.path.split(".").pop();
            const imageFile = {
              name: `${name}.${imageFileExtension}`.toLowerCase(),
              uri: img.path,
              type: `image/${imageFileExtension}`,
            } as any;
            uploadData.append("images", imageFile);
          });

        uploadData.append(
          "product_id",
          mode === "new" ? response.data.id : adId
        );

        const uploadResponse = await api.post("products/images", uploadData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      navigation.navigate("adDetails", {
        mode: "preview",
        adId: mode === "new" ? response.data.id : adId,
      });
    } catch (error) {
      console.log({ error });
      return toast.show({
        title: "Algo errado salvando anúncio.",
        placement: "top",
        bgColor: "red.500",
        duration: 6500,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function loadAd() {
    if (mode !== "edit") {
      setAdImages([]);
      setPayMethods([]);
      setCondition("NEW");
      setAcceptTrade(false);
      return;
    }
    setIsLoading(true);

    try {
      const response = await api.get(`/products/${adId}`);
      const adData: IProductDTO = response.data;

      setAdImages(response.data.product_images);

      setValue("name", adData.name);
      setValue("description", adData.description);
      setValue("price", `${adData.price}`);

      setPayMethods(adData.payment_methods.map((p) => p.key));
      setAcceptTrade(adData.accept_trade);
      setCondition(adData.is_new ? "NEW" : "USED");
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
      <ScrollView showsVerticalScrollIndicator={false} px={10} mt="3">
        <VStack flex={1}>
          <Text fontFamily={"heading"} fontSize="md" color={"gray.700"}>
            Imagens
          </Text>
          <Text fontFamily={"body"} fontSize="sm" color={"gray.700"}>
            Escolha até 3 imagens para mostrar o quanto seu produto é incrível!
          </Text>
        </VStack>

        <HStack mt="3">
          {adImages.map((img) => (
            <Box key={img.path}>
              <Image
                alt="user product image"
                w={100}
                h={100}
                resizeMode="cover"
                source={{
                  uri: img.local
                    ? img.path
                    : `${process.env.APP_API_URL}/images/${img.path}`,
                }}
                borderRadius={6}
                mr={4}
              />
              <Box
                alignItems="center"
                justifyItems="center"
                position="absolute"
                top={2}
                right={6}
                backgroundColor="white"
                borderRadius="full"
              >
                <TouchableOpacity onPress={() => handleRemoveImage(img.path)}>
                  <XCircle
                    weight="fill"
                    size={20}
                    color={theme.colors.gray[600]}
                  />
                </TouchableOpacity>
              </Box>
            </Box>
          ))}
          <TouchableOpacity onPress={handleImageSelect}>
            <Box
              w={100}
              h={100}
              borderRadius={6}
              backgroundColor="gray.300"
              justifyContent="center"
              alignItems="center"
            >
              <Plus size={22} weight="bold" color={theme.colors.gray[400]} />
            </Box>
          </TouchableOpacity>
        </HStack>

        <VStack flex={1} mt="3">
          <Text fontFamily={"heading"} fontSize="md" color={"gray.700"}>
            Sobre o produto
          </Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Título do anúncio"
                mb="2"
                mt="4"
                value={value}
                onChangeText={onChange}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <>
                <TextArea
                  placeholder="Descrição do produto"
                  h={160}
                  mt="4"
                  bg="gray.100"
                  px={4}
                  borderWidth={0}
                  fontSize="lg"
                  color="gray.700"
                  fontFamily="body"
                  placeholderTextColor="gray.400"
                  _invalid={{
                    borderWidth: 1,
                    borderColor: "red.500",
                  }}
                  _focus={{
                    bgColor: "gray.100",
                    borderWidth: 1,
                    borderColor: "gray.400",
                    borderRadius: "md",
                  }}
                  autoCompleteType={undefined}
                  value={value}
                  onChangeText={onChange}
                  isInvalid={errors.description?.message ? true : false}
                />
                {errors.description?.message && (
                  <Text fontFamily="body" color="red.500" mb={4} fontSize="xs">
                    {errors.description?.message}
                  </Text>
                )}
              </>
            )}
          />
        </VStack>
        <Radio.Group
          name="condition"
          accessibilityLabel="used or new"
          defaultValue="NEW"
          value={condition}
          onChange={(value) => {
            setCondition(value);
          }}
        >
          <HStack mt="4">
            <Radio
              value="NEW"
              size="sm"
              _icon={{ color: "blue.400" }}
              _checked={{
                borderColor: "blue.400",
              }}
            >
              Produto novo
            </Radio>
            <Radio
              ml="5"
              value="USED"
              size="sm"
              _icon={{ color: "blue.400" }}
              _checked={{
                borderColor: "blue.400",
              }}
            >
              Produto usado
            </Radio>
          </HStack>
        </Radio.Group>
        <Text fontFamily={"heading"} fontSize="md" color={"gray.700"} mt="4">
          Venda
        </Text>
        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="R$ Valor do produto"
              mb="2"
              mt="4"
              value={value}
              onChangeText={onChange}
              keyboardType="number-pad"
              error={errors.price?.message}
            />
          )}
        />
        <Text fontFamily={"heading"} fontSize="md" color={"gray.700"} mt="4">
          Aceita troca?
        </Text>
        <Box alignItems="flex-start" flex={1}>
          <Switch
            size="md"
            onTrackColor="blue.400"
            onToggle={toggleSwitchState}
            value={acceptTrade}
          />
        </Box>

        <VStack pb="10">
          <Text fontFamily={"heading"} fontSize="md" color={"gray.700"} mt="4">
            Meios de pagamento aceitos
          </Text>
          <Checkbox.Group onChange={handleCheckBox} value={payMethods}>
            <Checkbox value="boleto" size="md" mt="3" colorScheme="blue">
              Boleto
            </Checkbox>
            <Checkbox value="cash" size="md" mt="3" colorScheme="blue">
              Dinheiro
            </Checkbox>
            <Checkbox value="pix" size="md" mt="2" colorScheme="blue">
              Pix
            </Checkbox>
            <Checkbox value="card" size="md" mt="2" colorScheme="blue">
              Cartão de Crédito
            </Checkbox>
            <Checkbox value="deposit" size="md" mt="2" colorScheme="blue">
              Depósito Bancário
            </Checkbox>
          </Checkbox.Group>
        </VStack>
      </ScrollView>
      <HStack
        h="90"
        backgroundColor="white"
        alignItems="center"
        justifyContent="space-between"
        px={10}
      >
        <GenericButton
          title="Cancelar"
          width={160}
          variant="light"
          onPress={() => navigation.goBack()}
        />
        <GenericButton
          title="Avançar"
          width={160}
          variant="dark"
          onPress={handleSubmit(handleSaveAd)}
          isLoading={isLoading}
        />
      </HStack>
    </>
  );
}
