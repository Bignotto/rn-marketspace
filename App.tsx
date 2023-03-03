import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import { NativeBaseProvider } from "native-base";

import { AuthContextProvider } from "@contexts/AuthContext";
import { Routes } from "@routes/index";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { THEME } from "./src/theme";

/*
github.com/GeekyAnts/NativeBase/issues/5098#issuecomment-1193441535
*/
LogBox.ignoreLogs([
  "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
  'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
]);

export default function App() {
  console.log("--");
  console.log(process.env.APP_NAME);

  let [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={THEME}>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
