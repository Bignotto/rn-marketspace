import { AdCard } from "@components/AdCard";
import { GenericButton } from "@components/GenericButton";
import { FilterProps, SearchFilterPanel } from "@components/SearchFilterPanel";
import { UserAvatar } from "@components/UserAvatar";
import { IProductDTO } from "@dtos/IProductDTO";
import BottomSheet from "@gorhom/bottom-sheet";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import {
  Box,
  FlatList,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
  useTheme,
} from "native-base";
import {
  ArrowRight,
  MagnifyingGlass,
  Sliders,
  Tag,
} from "phosphor-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation<AppNavigationRoutesProps>();
  const sheetRef = useRef<BottomSheet>(null);

  const { user } = useAuth();

  const [ads, setAds] = useState<IProductDTO[]>([]);
  const [query, setQuery] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterProps>({} as FilterProps);

  const [filterModalShown, setFilterModalShown] = useState(true);

  const snapPoints = useMemo(() => ["1%", "58%"], []);

  function handleShowModal() {
    if (!filterModalShown) {
      sheetRef.current?.expand();
      setFilterModalShown(true);
    }
    if (filterModalShown) {
      sheetRef.current?.close();
      setFilterModalShown(false);
    }
  }

  async function handleSearch() {
    if (!filters.acceptTrade) {
      await applyFilters(undefined, undefined, undefined);
      return;
    }

    //TODO: fix isNew code
    let isNew = undefined;

    if (filters.conditions.includes("NEW")) isNew = true;
    if (filters.conditions.includes("USED")) isNew = false;

    if (filters.conditions.length === 2 || filters.conditions.length === 0)
      isNew = undefined;

    await applyFilters(isNew, filters.acceptTrade, filters.payMethods);
  }

  async function handleApplyFilters({
    conditions,
    acceptTrade,
    payMethods,
  }: FilterProps) {
    setFilters({ acceptTrade, conditions, payMethods });

    let isNew = undefined;

    if (conditions.includes("NEW")) isNew = true;
    if (conditions.includes("USED")) isNew = false;

    if (conditions.length === 2 || conditions.length === 0) isNew = undefined;

    await applyFilters(isNew, acceptTrade, payMethods);
  }

  async function applyFilters(
    isNew: boolean | undefined = undefined,
    acceptTrade: boolean | undefined = undefined,
    payMethods: string[] | undefined = undefined
  ) {
    setIsLoading(true);

    try {
      const response = await api.get("/products", {
        params: {
          accept_trade: acceptTrade,
          payment_methods: payMethods,
          is_new: isNew,
          query,
        },
      });
      setAds(response.data);
      setFilterModalShown(false);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  async function loadAds() {
    setIsLoading(true);
    try {
      const response = await api.get("/products");
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

  return (
    <>
      {/* Header component */}
      <VStack px={10}>
        <HStack mt={getStatusBarHeight() + 20} justifyContent="space-between">
          <HStack w="60%">
            <UserAvatar
              avatar_uri={`${process.env.APP_API_URL}/images/${user.avatar}`}
              size={45}
            />
            <Box ml="2">
              <Text fontFamily="body" fontSize="md">
                Boas vindas,
              </Text>
              <Text fontFamily="heading" fontSize="md">
                {user.name}
              </Text>
            </Box>
          </HStack>
          <Box w="40%">
            <GenericButton
              title="+ Criar Anúncio"
              variant="dark"
              onPress={() =>
                navigation.navigate("createAd", {
                  mode: "new",
                })
              }
            />
          </Box>
        </HStack>

        {/* User ads panel component */}
        <Box mt="8">
          <Text fontSize="md">Seus produtos anunciados para venda</Text>
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
                <Heading fontSize="md">4</Heading>
                <Text fontSize="sm">anúncios ativos</Text>
              </Box>
            </HStack>
            <HStack alignItems="center">
              <Text
                color={theme.colors.blue[800]}
                fontSize="sm"
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
        {/* Filter input panel */}
        <Text mt={30} fontSize="sm">
          Compre produtos variados
        </Text>
        <HStack
          h={45}
          backgroundColor="gray.100"
          borderRadius={6}
          mt="2"
          flexDir="row"
          justifyContent="space-between"
        >
          <Input
            flex={1}
            px="2"
            bg="gray.100"
            borderWidth={0}
            _focus={{
              bgColor: "gray.100",
            }}
            value={query}
            onChangeText={setQuery}
          />
          <Box flexDir="row" alignItems="center" mr="3" ml="3">
            <TouchableOpacity onPress={handleSearch}>
              <MagnifyingGlass size={20} color={theme.colors.gray[700]} />
            </TouchableOpacity>
            <Box borderWidth={1} borderColor="gray.500" h="50%" ml="3" mr="3" />
            <TouchableOpacity onPress={handleShowModal}>
              <Sliders size={20} color={theme.colors.gray[700]} />
            </TouchableOpacity>
          </Box>
        </HStack>
      </VStack>
      <FlatList
        mt="3"
        px={10}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={2}
        flex={1}
        data={ads}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log({ item_id: item.id });
              navigation.navigate("adDetails", {
                mode: "detail",
                adId: item.id,
              });
            }}
          >
            <AdCard
              image_uri={item.product_images![0].path}
              name={item.name}
              price={`R$ ${item.price}`}
              showAvatar
              avatarUri={`${process.env.APP_API_URL}/images/${item.user?.avatar}`}
              isNew={item.is_new}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id!}
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleShowModal}
      >
        <SearchFilterPanel onApplyFilter={handleApplyFilters} />
      </BottomSheet>
    </>
  );
}
