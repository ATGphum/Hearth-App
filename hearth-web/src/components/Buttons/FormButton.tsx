import { Text } from "@chakra-ui/react";

interface Props {
  text: string;
  color?: string;
  backgroundColor?: string;
  callback: () => void;
}

const FormButton = ({ text, color, backgroundColor, callback }: Props) => {
  return (
    <Text
      textStyle="action"
      borderRadius="40px"
      padding="0.625rem 2.25rem"
      onClick={callback}
      backgroundColor={backgroundColor ?? "neutral.black"}
      color={color ?? "neutral.white"}
    >
      {text}
    </Text>
  );
};

export default FormButton;
