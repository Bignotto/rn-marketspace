import { AdCard } from "@components/AdCard";
import { IProductDTO } from "@dtos/IProductDTO";
import {
  Box,
  Center,
  FlatList,
  HStack,
  Select,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
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
    is_active: false,
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

export function UserAds() {
  const [filter, setFilter] = useState("all");

  const dataToShow =
    filter === "all"
      ? DATA.map((i) => i)
      : filter === "active"
      ? DATA.filter((i) => i.is_active)
      : DATA.filter((i) => !i.is_active);

  return (
    <VStack flex={1} px={10}>
      <Center marginTop={getStatusBarHeight() + 36}>
        <Text fontFamily={"heading"} fontSize={20} color={"darkText"}>
          Meus anúncios
        </Text>
      </Center>
      <HStack h={34} alignItems="center" mt="8" justifyContent="space-between">
        <Text fontSize="sm" fontFamily="body">
          2 anúncios
        </Text>
        <Box w={111}>
          <Select
            selectedValue={filter}
            h={34}
            onValueChange={(value) => setFilter(value)}
            backgroundColor="gray.100"
          >
            <Select.Item label="Todos" value="all" />
            <Select.Item label="Ativos" value="active" />
            <Select.Item label="Inativos" value="inactive" />
          </Select>
        </Box>
      </HStack>
      <FlatList
        mt="5"
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={2}
        flex={1}
        data={dataToShow}
        renderItem={({ item }) => (
          <AdCard
            image_uri={item.product_images[0].path}
            name={item.name}
            price={`R$ ${item.price.toFixed(2)}`}
            isActive={item.is_active}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </VStack>
  );
}
