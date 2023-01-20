import { FormControl, IInputProps, Input } from "native-base";

type Props = IInputProps & {
  error: string;
};

export function TextInput({ error, isInvalid, ...rest }: Props) {
  return (
    <FormControl isInvalid={isInvalid}>
      <Input
        bg="gray.100"
        h="11"
        px={4}
        borderWidth={0}
        fontSize="md"
        color="gray.700"
        fontFamily="body"
        placeholderTextColor="gray.300"
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        _focus={{
          bgColor: "gray.100",
          borderWidth: 1,
          borderColor: "gray.500",
          borderRadius: "md",
        }}
        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: "red.500" }}>
        {error}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
