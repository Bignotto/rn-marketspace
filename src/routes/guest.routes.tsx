import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "@screens/guest/Login";
import { SignUp } from "@screens/guest/SignUp";

const { Navigator, Screen } = createNativeStackNavigator();

export function GuestRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  );
}
