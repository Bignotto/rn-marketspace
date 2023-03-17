import { Box, FlatList, HStack, Image } from "native-base";
import { useCallback, useState } from "react";
import { Dimensions, ListRenderItem, ViewToken } from "react-native";

type Item = {
  id: string;
  path: string;
};

type AdImagesListProps = {
  images: Item[];
  isActive: boolean;
};

type HandleScrollProps = {
  viewableItems: Array<ViewToken>;
};

export function AdImagesList({ images, isActive }: AdImagesListProps) {
  const imageCount = images.length;
  const imageIndexWidth = (Dimensions.get("window").width - 4) / imageCount;

  const [viewIndex, setViewIndex] = useState(0);

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <Image
      alt="user product image"
      w={Dimensions.get("window").width}
      h={280}
      resizeMode="cover"
      source={{
        //TODO: FIX API PATH
        uri: `http://192.168.15.20:3333/images/${item.path}`,
      }}
    />
  );

  const onViewChangeCallback = useCallback(
    ({ viewableItems }: HandleScrollProps) => {
      setViewIndex(viewableItems[0].index ?? 0);
    },
    []
  );

  return (
    <Box>
      <FlatList
        showsHorizontalScrollIndicator={false}
        backgroundColor="red.300"
        horizontal
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        decelerationRate="fast"
        snapToInterval={Dimensions.get("window").width}
        onViewableItemsChanged={onViewChangeCallback}
      />
      <HStack alignItems="center" justifyContent="center" ml={2}>
        {images.map((img, i) => (
          <Box
            key={img.id}
            position="absolute"
            left={imageIndexWidth * i}
            bottom={1}
            h={1}
            w={imageIndexWidth - 10}
            borderRadius="full"
            backgroundColor="gray.200"
            opacity={i === viewIndex ? 0.8 : 0.5}
          />
        ))}
      </HStack>
    </Box>
  );
}
