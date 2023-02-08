import { GenericButton } from "@components/GenericButton";
import { TextInput } from "@components/TextInput";
import { useNavigation } from "@react-navigation/native";
import { AdsRoutesNavigationProps } from "@routes/ads.routes";
import {
  Box,
  Checkbox,
  HStack,
  Radio,
  ScrollView,
  Switch,
  Text,
  TextArea,
  VStack,
} from "native-base";
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
          <TextInput placeholder="Título do anúncio" mb="2" mt="4" />
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
          />
        </VStack>
        <Radio.Group
          name="condition"
          accessibilityLabel="used or new"
          defaultValue="NEW"
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
        <TextInput placeholder="R$ Valor do produto" mb="2" mt="4" />
        <Text fontFamily={"heading"} fontSize="md" color={"gray.700"} mt="4">
          Aceita troca?
        </Text>
        <Box alignItems="flex-start" flex={1}>
          <Switch
            size="md"
            onTrackColor="blue.400"
            // onToggle={toggleSwitchState}
            // value={acceptTrade}
          />
        </Box>

        <VStack pb="10">
          <Text fontFamily={"heading"} fontSize="md" color={"gray.700"} mt="4">
            Meios de pagamento aceitos
          </Text>
          <Checkbox.Group
          // onChange={handleCheckBox} value={payMethods}
          >
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
        <GenericButton title="Cancelar" width={160} variant="light" />
        <GenericButton title="Avançar" width={160} variant="dark" />
      </HStack>
    </>
  );
}
