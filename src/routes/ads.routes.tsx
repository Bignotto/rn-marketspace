import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { AdDetails } from "@screens/app/AdDetails";
import { AppRoutes } from "./app.routes";

type AdsRoutes = {
  appRoutes: undefined;
  adDetails: undefined;
};

export type AdsRoutesNavigationProps = NativeStackNavigationProp<AdsRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AdsRoutes>();

export function AdsRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="appRoutes"
    >
      <Screen name="appRoutes" component={AppRoutes} />
      <Screen name="adDetails" component={AdDetails} />
    </Navigator>
  );
}
