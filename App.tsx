import React from "react";
import { NativeBaseProvider, Box, Center } from "native-base";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import { THEME } from "./src/theme";
import { Login } from "./src/screens/Login";

export default function App() {
  let [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <NativeBaseProvider theme={THEME}>
      <Login />
    </NativeBaseProvider>
  );
}
