import { useAuth } from "@hooks/useAuth";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { AppRoutes } from "./app.routes";
import { GuestRoutes } from "./guest.routes";

//BIG: implement refresh token

export function Routes() {
  const { user } = useAuth();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[200];

  return (
    <Box flex={1} bg="gray.200">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <GuestRoutes />}
      </NavigationContainer>
    </Box>
  );
}
