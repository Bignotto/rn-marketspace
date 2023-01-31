import {
  Box,
  Checkbox,
  FormControl,
  HStack,
  Switch,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { useState } from "react";
import { GenericButton } from "./GenericButton";

export function SearchFilterPanel() {
  const theme = useTheme();

  const [acceptTrade, setAcceptTrade] = useState(true);

  function toggleSwitchState(val: boolean) {
    console.log({ val });
    setAcceptTrade((a) => !a);
  }

  return (
    <FormControl flex={1} px={10}>
      <VStack alignItems="flex-start" flex={1}>
        <Text fontSize="xl" fontFamily="heading">
          Filtrar anúncios
        </Text>
        <Text fontWeight="bold" fontSize="md" mt="6">
          Condição
        </Text>
        <HStack>
          <Text>USADO</Text>
          <Text>NOVO</Text>
        </HStack>
        <Text fontWeight="bold" fontSize="md" mt="6">
          Aceita troca?
        </Text>
        <Switch
          size="md"
          onTrackColor={theme.colors.blue[400]}
          onToggle={toggleSwitchState}
          value={acceptTrade}
        />
        <VStack>
          <Text fontWeight="bold" fontSize="md" mt="6">
            Meios de pagamento aceitos
          </Text>
          <Checkbox value="dinheiro" size="md" mt="3">
            Dinheiro
          </Checkbox>
          <Checkbox value="pix" size="md" mt="2">
            Pix
          </Checkbox>
          <Checkbox value="cc" size="md" mt="2">
            Cartão de Crédito
          </Checkbox>
          <Checkbox value="deposito" size="md" mt="2">
            Depósito Bancário
          </Checkbox>
        </VStack>
      </VStack>
      <HStack justifyContent="space-between" mb="3">
        <Box w="48%" mr="2">
          <GenericButton title="Resetar filtros" variant="light" />
        </Box>
        <Box w="48%" ml="2">
          <GenericButton title="Aplicar filtros" variant="dark" />
        </Box>
      </HStack>
    </FormControl>
  );
}
