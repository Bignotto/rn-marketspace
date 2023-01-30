import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Home } from "@screens/app/Home";
import { SignOut as SignOutScreen } from "@screens/app/SignOut";
import { UserAds } from "@screens/app/UserAds";
import { useTheme } from "native-base";
import { House, SignOut, Tag } from "phosphor-react-native";

type AppRoutes = {
  home: undefined;
  userAds: undefined;
  signOut: undefined;
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
          tabBarIcon: ({ color }) => <House size={24} color={color} />,
        }}
      />
      <Screen
        name="userAds"
        component={UserAds}
        options={{
          tabBarIcon: ({ color }) => <Tag size={24} color={color} />,
        }}
      />
      <Screen
        name="signOut"
        component={SignOutScreen}
        options={{
          tabBarIcon: ({ color }) => <SignOut size={24} color={color} />,
        }}
      />
      {/* 
      TODO: implement ad create screen
      <Screen
        name="signOut"
        component={SignOutScreen}
        options={{
          tabBarButton: () => null,
        }}
      /> */}
    </Navigator>
  );
}
