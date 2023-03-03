import { AdCard } from "@components/AdCard";
import { GenericButton } from "@components/GenericButton";
import { SearchFilterPanel } from "@components/SearchFilterPanel";
import { UserAvatar } from "@components/UserAvatar";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { AdsRoutesNavigationProps } from "@routes/ads.routes";
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
import { useMemo, useRef, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { DATA } from "../../_sample_data";

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation<AdsRoutesNavigationProps>();
  const sheetRef = useRef<BottomSheet>(null);

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

  return (
    <>
      {/* Header component */}
      <VStack px={10}>
        <HStack mt={getStatusBarHeight() + 20} justifyContent="space-between">
          <HStack w="60%">
            <UserAvatar
              avatar_uri="https://avatars.githubusercontent.com/u/2911353?v=4"
              size={45}
            />
            <Box ml="2">
              <Text fontFamily="body" fontSize="md">
                Boas vindas,
              </Text>
              <Text fontFamily="heading" fontSize="md">
                Thiago
              </Text>
            </Box>
          </HStack>
          <Box w="40%">
            <GenericButton
              title="+ Criar Anúncio"
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
        data={DATA}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("adDetails", {
                mode: "detail",
                adId: item.id,
              })
            }
          >
            <AdCard
              image_uri={item.product_images![0].path}
              name={item.name}
              price={`R$ ${item.price}`}
              showAvatar
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
