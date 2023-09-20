import { Text } from "@chakra-ui/react";

interface Props {
  text: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  callback: () => void;
}

const FormButton = ({
  text,
  color,
  backgroundColor,
  borderColor,
  callback,
}: Props) => {
  return (
    <Text
      textStyle="action"
      borderRadius="40px"
      border="1px solid"
      borderColor={borderColor ?? "neutral.black"}
      padding="0.625rem 1rem"
      onClick={callback}
      backgroundColor={backgroundColor ?? "neutral.black"}
      color={color ?? "neutral.white"}
    >
      {text}
    </Text>
  );
};

export default FormButton;
