import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { AdDetails } from "@screens/app/AdDetails";
import { CreateAd } from "@screens/app/CreateAd";
import { AppRoutes } from "./app.routes";

type AdsRoutes = {
  appRoutes: undefined;
  adDetails: undefined;
  createAd: undefined;
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
      <Screen name="createAd" component={CreateAd} />
    </Navigator>
  );
}
