import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AdDetails } from "@screens/app/AdDetails";
import { CreateAd } from "@screens/app/CreateAd";
import { AppRoutes } from "./app.routes";

type AdsRoutes = {
  appRoutes: undefined;
  createAd: undefined;
  adDetails: {
    mode:
      | "detail" //when user tap to see the ad
      | "preview" //when user just created the ad
      | "owner"; //when user is seeing his own ad
  };
};

export type AdsRoutesNavigationProps = NativeStackNavigationProp<
  AdsRoutes,
  "adDetails"
>;

export type AdsRoutesScreenProps = NativeStackScreenProps<
  AdsRoutes,
  "adDetails"
>;

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
