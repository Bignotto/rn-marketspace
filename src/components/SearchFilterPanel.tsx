import {
  Box,
  Center,
  Checkbox,
  FormControl,
  HStack,
  Switch,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { XCircle } from "phosphor-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { GenericButton } from "./GenericButton";

export function SearchFilterPanel() {
  const theme = useTheme();

  const [conditions, setConditions] = useState(["USADO", "NOVO"]);

  const [acceptTrade, setAcceptTrade] = useState(true);
  const [payMethods, setPayMethods] = useState([]);

  function toggleCondition(val: "USADO" | "NOVO") {
    if (conditions.includes(val)) {
      setConditions((c) => c.filter((v) => v !== val));
      return;
    }

    setConditions((c) => [val, ...c]);
  }

  function toggleSwitchState() {
    setAcceptTrade((a) => !a);
  }

  function handleCheckBox(val: []) {
    setPayMethods(val);
  }

  function handleResetFilters() {
    console.log({ payMethods });
    setAcceptTrade(false);
    setPayMethods([]);
    setConditions([]);
  }

  return (
    <FormControl flex={1} px={10}>
      <VStack alignItems="flex-start" flex={1}>
        <Text fontSize="xl" fontFamily="heading">
          Filtrar anúncios
        </Text>
        <Text fontWeight="bold" fontSize="md" mt="6" mb="3">
          Condição
        </Text>
        <HStack>
          <TouchableOpacity onPress={() => toggleCondition("USADO")}>
            <Center
              h="7"
              backgroundColor={
                conditions.includes("USADO") ? "blue.400" : "gray.200"
              }
              px="4"
              borderRadius="full"
              flexDir="row"
            >
              <Text
                fontSize="md"
                fontWeight="bold"
                color={conditions.includes("USADO") ? "white" : "gray.500"}
              >
                USADO
              </Text>
              {conditions.includes("USADO") && (
                <XCircle
                  weight="fill"
                  color={theme.colors.gray[200]}
                  size={18}
                  style={{
                    marginLeft: 8,
                    marginRight: -8,
                  }}
                />
              )}
            </Center>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleCondition("NOVO")}
            style={{ marginLeft: 8 }}
          >
            <Center
              h="7"
              backgroundColor={
                conditions.includes("NOVO") ? "blue.400" : "gray.200"
              }
              px="4"
              borderRadius="full"
              flexDir="row"
            >
              <Text
                fontSize="md"
                fontWeight="bold"
                color={conditions.includes("NOVO") ? "white" : "gray.500"}
              >
                NOVO
              </Text>
              {conditions.includes("NOVO") && (
                <XCircle
                  weight="fill"
                  color={theme.colors.gray[200]}
                  size={18}
                  style={{
                    marginLeft: 8,
                    marginRight: -8,
                  }}
                />
              )}
            </Center>
          </TouchableOpacity>
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
          <Text fontWeight="bold" fontSize="md" mt="4">
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
      </VStack>
      <HStack justifyContent="space-between" mb="3">
        <Box w="48%" mr="2">
          <GenericButton
            title="Resetar filtros"
            variant="light"
            onPress={handleResetFilters}
          />
        </Box>
        <Box w="48%" ml="2">
          <GenericButton title="Aplicar filtros" variant="dark" />
        </Box>
      </HStack>
    </FormControl>
  );
}
