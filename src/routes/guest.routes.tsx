import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Login } from "@screens/guest/Login";
import { SignUp } from "@screens/guest/SignUp";

type GuestRoutes = {
  login: undefined;
  signUp: undefined;
};

export type GuestRoutesNavigationProps = NativeStackNavigationProp<GuestRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<GuestRoutes>();

export function GuestRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  );
}
