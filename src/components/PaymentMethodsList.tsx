import { HStack, Text, VStack } from "native-base";
import {
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
} from "phosphor-react-native";

type PaymentMethodsListProps = {
  methods: {
    key: string;
    name: string;
  }[];
};

export function PaymentMethodsList({ methods }: PaymentMethodsListProps) {
  return (
    <VStack mt="2">
      {methods.map((p) => {
        switch (p.key) {
          case "pix":
            return (
              <HStack alignItems="center" mb="2" key={p.key}>
                <QrCode />
                <Text ml="1">Pix</Text>
              </HStack>
            );
          case "boleto":
            return (
              <HStack alignItems="center" mb="2" key={p.key}>
                <Barcode />
                <Text ml="1">Boleto</Text>
              </HStack>
            );
          case "cash":
            return (
              <HStack alignItems="center" mb="2" key={p.key}>
                <Money />
                <Text ml="1">Dinheiro</Text>
              </HStack>
            );
          case "card":
            return (
              <HStack alignItems="center" mb="2" key={p.key}>
                <CreditCard />
                <Text ml="1">Cartão de Crédito</Text>
              </HStack>
            );
          case "deposit:":
            return (
              <HStack alignItems="center" mb="2" key={p.key}>
                <Bank />
                <Text ml="1">Depósito Bancário</Text>
              </HStack>
            );
          default:
            break;
        }
      })}
    </VStack>
  );
}
