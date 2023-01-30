import {
  Box,
  Checkbox,
  FormControl,
  HStack,
  ScrollView,
  Switch,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { GenericButton } from "./GenericButton";

export function SearchFilterPanel() {
  const theme = useTheme();

  return (
    <VStack px={10} flex={1}>
      <FormControl>
        <ScrollView>
          <VStack flex={1} alignItems="flex-start">
            <Text>Condição</Text>
            <HStack>
              <Text>USADO</Text>
              <Text>NOVO</Text>
            </HStack>
            <Text>Aceita troca?</Text>
            <Switch size="md" onTrackColor={theme.colors.blue[400]} />
            <VStack>
              <Text>Meios de pagamento aceitos</Text>
              <Checkbox value="dinheiro">Dinheiro</Checkbox>
              <Checkbox value="pix">Pix</Checkbox>
              <Checkbox value="cc">Cartão de Crédito</Checkbox>
              <Checkbox value="deposito">Depósito Bancário</Checkbox>
            </VStack>
          </VStack>
        </ScrollView>
      </FormControl>
      <HStack justifyContent="space-between" mb="3" bgColor="pink.400">
        <Box w="48%" mr="2">
          <GenericButton title="Resetar filtros" variant="light" />
        </Box>
        <Box w="48%" ml="2">
          <GenericButton title="Aplicar filtros" variant="dark" />
        </Box>
      </HStack>
    </VStack>
  );
}
