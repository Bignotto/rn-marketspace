import { Box, Heading, Image, Text, VStack } from "native-base";

type AdCardProps = {
  image_uri: string;
};

export function AdCard({ image_uri }: AdCardProps) {
  return (
    <VStack h={143}>
      <Image
        alt="user avatar image"
        zIndex={2}
        position="absolute"
        top="1"
        left="1"
        w={28}
        h={28}
        borderRadius="full"
        source={{ uri: "https://avatars.githubusercontent.com/u/2911353?v=4" }}
      />
      <Box
        position="absolute"
        zIndex={2}
        h={18}
        bgColor="blue.400"
        px="3"
        borderRadius="full"
        right="1"
        top="1"
      >
        <Text color="gray.100" fontSize="xs">
          USADO
        </Text>
      </Box>
      <Image
        h={100}
        w={153}
        borderRadius={6}
        alt="ad product image"
        source={{
          uri: image_uri,
        }}
      />
      <Text fontSize="sm" color="gray.600">
        Gameboy original
      </Text>
      <Heading fontSize="md" color="gray.700">
        R$ 300,00
      </Heading>
    </VStack>
  );
}
