import { Button, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  variant?: "dark" | "solid" | "light";
};

export function GenericButton({ title, variant = "solid", ...rest }: Props) {
  return (
    <Button
      w="full"
      h="10"
      bg={
        variant === "solid"
          ? "blue.400"
          : variant === "dark"
          ? "gray.700"
          : "gray.300"
      }
      _pressed={{
        bg:
          variant === "solid"
            ? "blue.800"
            : variant === "dark"
            ? "gray.500"
            : "gray.400",
      }}
      {...rest}
    >
      <Text
        fontFamily="heading"
        fontSize="lg"
        color={variant !== "light" ? "gray.100" : "gray.700"}
      >
        {title}
      </Text>
    </Button>
  );
}
