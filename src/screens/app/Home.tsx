import { AdCard } from "@components/AdCard";
import { GenericButton } from "@components/GenericButton";
import { SearchFilterPanel } from "@components/SearchFilterPanel";
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
  Heading,
  HStack,
  Input,
  Text,
  useTheme,
  VStack,
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
  const [isLoading, setIsLoading] = useState(true);

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
              avatar_uri={`http://192.168.15.20:3333/images/${user.avatar}`}
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
              title="+ Criar An??ncio"
              variant="dark"
              onPress={() => navigation.navigate("createAd")}
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
                <Text fontSize="sm">an??ncios ativos</Text>
              </Box>
            </HStack>
            <HStack alignItems="center">
              <Text
                color={theme.colors.blue[800]}
                fontSize="sm"
                fontWeight="bold"
                mr="1"
              >
                Meus an??ncios
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
          />
          <Box flexDir="row" alignItems="center" mr="3" ml="3">
            <MagnifyingGlass size={20} color={theme.colors.gray[700]} />
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
              avatarUri={`http://192.168.15.20:3333/images/${item.user?.avatar}`}
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
        <SearchFilterPanel />
      </BottomSheet>
    </>
  );
}
