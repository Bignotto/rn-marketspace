import { GenericButton } from "@components/GenericButton";
import { useAuth } from "@hooks/useAuth";
import { Box, Center, ScrollView, Text, VStack } from "native-base";

export function SignOut() {
  const { signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Center flex={1}>
          <Text fontFamily={"heading"} fontSize="3xl" color={"darkText"}>
            Deseja mesmo sair?
          </Text>
          <Box w="50%" mt="4">
            <GenericButton
              title="Sair"
              variant="dark"
              onPress={handleSignOut}
            />
          </Box>
        </Center>
      </VStack>
    </ScrollView>
  );
}
