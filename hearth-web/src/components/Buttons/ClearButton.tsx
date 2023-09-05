import { Text } from "@chakra-ui/react";

interface Props {
  text: string;
  callback: () => void;
}

const ClearButton = ({ text, callback }: Props) => {
  return (
    <Text
      textStyle="action"
      border="1px solid"
      borderRadius="40px"
      padding="0.625rem 2.25rem"
      onClick={callback}
    >
      {text}
    </Text>
  );
};

export default ClearButton;
