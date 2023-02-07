import { Image, useTheme } from "native-base";

type UserAvatarProps = {
  avatar_uri: string;
  size: number;
};

export function UserAvatar({ avatar_uri, size }: UserAvatarProps) {
  const theme = useTheme();

  return (
    <Image
      alt="user avatar image"
      source={{
        uri: avatar_uri,
      }}
      h={size}
      w={size}
      borderRadius="full"
      borderWidth={3}
      borderColor={theme.colors.blue[400]}
    />
  );
}
