import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { AdDetails } from "@screens/app/AdDetails";
import { Home } from "@screens/app/Home";
import { SignOut as SignOutScreen } from "@screens/app/SignOut";
import { UserAds } from "@screens/app/UserAds";
import { useTheme } from "native-base";
import { House, SignOut, Tag } from "phosphor-react-native";

type AppRoutes = {
  home: undefined;
  userAds: undefined;
  signOut: undefined;
  adDetails: undefined;
};

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.blue[800],
        tabBarInactiveTintColor: theme.colors.gray[600],
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House
              size={24}
              color={color}
              weight={color === theme.colors.blue[800] ? "bold" : "regular"}
            />
          ),
        }}
      />
      <Screen
        name="userAds"
        component={UserAds}
        options={{
          tabBarIcon: ({ color }) => (
            <Tag
              size={24}
              color={color}
              weight={color === theme.colors.blue[800] ? "bold" : "regular"}
            />
          ),
        }}
      />
      <Screen
        name="signOut"
        component={SignOutScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <SignOut
              size={24}
              color={theme.colors.red[500]}
              weight={color === theme.colors.blue[800] ? "bold" : "regular"}
            />
          ),
        }}
      />

      <Screen
        name="adDetails"
        component={AdDetails}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
