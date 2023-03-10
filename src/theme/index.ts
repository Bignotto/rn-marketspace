import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    green: {
      700: "#00875F",
      500: "#00B37E",
    },
    gray: {
      700: "#1A181B",
      600: "#3E3A40",
      500: "#5F5B62",
      400: "#9F9BA1",
      300: "#D9D8DA",
      200: "#EDECEE",
      100: "#F7F7F8",
    },
    white: "#FFFFFF",
    red: {
      500: "#F75A68",
      200: "#EE7979",
    },
    blue: {
      800: "#364D9D",
      400: "#647AC7",
    },
  },
  fonts: {
    heading: "Karla_700Bold",
    body: "Karla_400Regular",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    11: 45,
    14: 56,
    33: 148,
  },
});
