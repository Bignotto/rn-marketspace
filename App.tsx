import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import { NativeBaseProvider } from "native-base";

import { Routes } from "@routes/index";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { THEME } from "./src/theme";

export default function App() {
  let [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={THEME}>
        <Routes />
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
