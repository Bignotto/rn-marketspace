import { GenericButton } from "@components/GenericButton";
import { TextInput } from "@components/TextInput";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
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
  VStack,
} from "native-base";
import { ArrowLeft, Plus, XCircle } from "phosphor-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

type FormDataProps = {
  name: string;
  description: string;
  price: string;
};

export function CreateAd() {
  const [adImages, setAdImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [acceptTrade, setAcceptTrade] = useState(true);
  const [payMethods, setPayMethods] = useState([]);
  const [condition, setCondition] = useState("NEW");

  const navigation = useNavigation<AppNavigationRoutesProps>();
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  async function handleImageSelect() {
    const selectedImages = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    });

    if (selectedImages.canceled) return;

    setAdImages((act) => [...act, selectedImages.assets[0]]);
  }

  function handleRemoveImage(uri: string) {
    const filtered = adImages.filter((img) => img.uri !== uri);
    setAdImages(filtered);
  }

  function handleCheckBox(val: []) {
    setPayMethods(val);
  }

  function toggleSwitchState() {
    setAcceptTrade((a) => !a);
  }

  function handlePreviewAd({ name, description, price }: FormDataProps) {
    console.log({ name, description, price });
  }

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
            <Box key={img.uri}>
              <Image
                alt="user product image"
                w={100}
                h={100}
                resizeMode="cover"
                source={{
                  uri: img.uri,
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
                <TouchableOpacity onPress={() => handleRemoveImage(img.uri)}>
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
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
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
              />
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
            <Checkbox value="dinheiro" size="md" mt="3" colorScheme="blue">
              Dinheiro
            </Checkbox>
            <Checkbox value="pix" size="md" mt="2" colorScheme="blue">
              Pix
            </Checkbox>
            <Checkbox value="cc" size="md" mt="2" colorScheme="blue">
              Cartão de Crédito
            </Checkbox>
            <Checkbox value="deposito" size="md" mt="2" colorScheme="blue">
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
          onPress={handleSubmit(handlePreviewAd)}
        />
      </HStack>
    </>
  );
}
