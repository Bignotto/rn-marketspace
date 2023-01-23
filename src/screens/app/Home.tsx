import { AdCard } from "@components/AdCard";
import { GenericButton } from "@components/GenericButton";
import { IProductDTO } from "@dtos/IProductDTO";
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Image,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

const DATA: IProductDTO[] = [
  {
    id: "7a58dfe1-0ac9-4cee-accb-29dba5a51880",
    name: "Game Boy",
    description: "Game boy original, funcionando!",
    is_new: false,
    price: 300,
    accept_trade: false,
    user_id: "458e155b-7994-4e39-bd2b-b6353311f32c",
    user: {
      id: "458e155b-7994-4e39-bd2b-b6353311f32c",
      avatar: "4b04f3a8d21936b6d592-sample_avatar.png",
      name: "Rocketseat",
      email: "desafio@rocketseat.com.br",
      tel: "+5511915839648",
    },
    is_active: true,
    created_at: "2023-01-21T22:03:52.752Z",
    updated_at: "2023-01-21T22:03:52.752Z",
    product_images: [
      {
        path: "https://tm.ibxk.com.br/2016/02/23/23175905693270.jpg",
        id: "5aadef9f-465a-49c8-9a71-dca2aa339271",
      },
    ],
    payment_methods: [
      {
        key: "pix",
        name: "Pix",
      },
    ],
  },
  {
    id: "7a58dfe1-0ac9-4cee-accb-29dba5a51881",
    name: "Game Boy",
    description: "Game boy original, funcionando!",
    is_new: false,
    price: 300,
    accept_trade: false,
    user_id: "458e155b-7994-4e39-bd2b-b6353311f32c",
    user: {
      id: "458e155b-7994-4e39-bd2b-b6353311f32c",
      avatar: "4b04f3a8d21936b6d592-sample_avatar.png",
      name: "Rocketseat",
      email: "desafio@rocketseat.com.br",
      tel: "+5511915839648",
    },
    is_active: true,
    created_at: "2023-01-21T22:03:52.752Z",
    updated_at: "2023-01-21T22:03:52.752Z",
    product_images: [
      {
        path: "https://s2.glbimg.com/PLK5WTBnpcwO_6Tn1WDOcMliUL8=/0x0:695x391/984x0/smart/filters:strip_icc()/s.glbimg.com/po/tt2/f/original/2016/07/15/top10n64.jpg",
        id: "5aadef9f-465a-49c8-9a71-dca2aa339271",
      },
    ],
    payment_methods: [
      {
        key: "pix",
        name: "Pix",
      },
    ],
  },
];

export function Home() {
  const theme = useTheme();

  return (
    <>
      {/* Header component */}
      <VStack px={10}>
        <HStack mt={getStatusBarHeight() + 20} justifyContent="space-between">
          <HStack w="60%">
            <Image
              alt="user avatar image"
              source={{
                uri: "https://avatars.githubusercontent.com/u/2911353?v=4",
              }}
              h={45}
              w={45}
              borderRadius={23}
              borderWidth={3}
              borderColor={theme.colors.blue[400]}
            />
            <Box ml="2">
              <Text fontFamily="body" fontSize="lg">
                Boas vindas,
              </Text>
              <Text fontFamily="heading" fontSize="lg">
                Thiago
              </Text>
            </Box>
          </HStack>
          <Box w="40%">
            <GenericButton title="+ Criar Anúncio" variant="dark" />
          </Box>
        </HStack>

        {/* User ads panel component */}
        <Box mt="8">
          <Text fontSize="lg">Seus produtos anunciados para venda</Text>
          <HStack
            mt="3"
            h={66}
            bgColor="rgba(100, 122, 199, 0.1)"
            borderRadius={6}
            px="4"
            py="3"
            justifyContent="space-between"
            alignItems="center"
          >
            <HStack alignItems="center">
              <Tag size={22} color={theme.colors.blue[800]} />
              <Box ml="3">
                <Heading>4</Heading>
                <Text>anúncios ativos</Text>
              </Box>
            </HStack>
            <HStack alignItems="center">
              <Text
                color={theme.colors.blue[800]}
                fontSize="lg"
                fontWeight="bold"
                mr="1"
              >
                Meus anúncios
              </Text>
              <ArrowRight
                size={16}
                color={theme.colors.blue[800]}
                weight="bold"
              />
            </HStack>
          </HStack>
        </Box>
      </VStack>
      <FlatList
        mt="3"
        px={10}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={2}
        flex={1}
        data={DATA}
        renderItem={({ item }) => (
          <AdCard image_uri={item.product_images[0].path} />
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
