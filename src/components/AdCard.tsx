import { useAuth } from "@hooks/useAuth";
import { Box, Heading, Image, Text, VStack } from "native-base";

type AdCardProps = {
  image_uri: string;
  name: string;
  price: string;
  showAvatar?: boolean;
  isActive?: boolean;
  avatarUri?: string;
  isNew?: boolean;
};

export function AdCard({
  image_uri,
  name,
  price,
  showAvatar = false,
  isActive = true,
  avatarUri,
  isNew = false,
}: AdCardProps) {
  const { user } = useAuth();

  return (
    <VStack h={143}>
      {showAvatar && (
        <Image
          alt="user avatar image"
          zIndex={2}
          position="absolute"
          top="1"
          left="1"
          w={28}
          h={28}
          borderRadius="full"
          source={{
            uri: avatarUri,
          }}
        />
      )}

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
          {isNew ? `NOVO` : `USADO`}
        </Text>
      </Box>
      {!isActive && (
        <>
          <Box
            position="absolute"
            h={100}
            w={153}
            opacity={0.5}
            zIndex={3}
            backgroundColor="black"
            borderRadius={6}
          />
          <Text
            position="absolute"
            zIndex={3}
            fontFamily="heading"
            fontSize="xs"
            color="white"
            bottom="12"
            left="2"
          >
            ANÚNCIO DESATIVADO
          </Text>
        </>
      )}
      <Image
        h={100}
        w={153}
        borderRadius={6}
        alt="ad product image"
        //TODO: FIX IMAGE URI!!!
        source={{
          uri: `http://192.168.15.20:3333/images/${image_uri}`,
        }}
      />
      <Text fontSize="sm" color="gray.600" numberOfLines={1}>
        {name}
      </Text>
      <Heading fontSize="md" color="gray.700">
        {price}
      </Heading>
    </VStack>
  );
}
