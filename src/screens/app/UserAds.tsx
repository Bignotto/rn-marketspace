import { AdCard } from "@components/AdCard";
import { IProductDTO } from "@dtos/IProductDTO";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRoutes } from "@routes/app.routes";
import { api } from "@services/api";
import {
  Box,
  Center,
  FlatList,
  HStack,
  Select,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

type ScreenProps = NativeStackScreenProps<AppRoutes, "userAds">;

export function UserAds({ navigation, route }: ScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [ads, setAds] = useState<IProductDTO[]>([]);
  const [filter, setFilter] = useState("all");

  async function loadAds() {
    setIsLoading(true);
    try {
      const response = await api.get("/users/products");
      setAds(response.data);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadAds();
  }, []);

  const dataToShow =
    filter === "all"
      ? ads.map((i) => i)
      : filter === "active"
      ? ads.filter((i) => i.is_active)
      : ads.filter((i) => !i.is_active);

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
        keyExtractor={(item) => item.id!}
        //TODO: better renderItem
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log({ item_id: item.id });
              navigation.navigate("adDetails", {
                mode: "owner",
                adId: item.id,
              });
            }}
          >
            <AdCard
              image_uri={item.product_images![0].path}
              name={item.name}
              price={`R$ ${item.price.toFixed(2)}`}
              isActive={item.is_active}
            />
          </TouchableOpacity>
        )}
      />
    </VStack>
  );
}
