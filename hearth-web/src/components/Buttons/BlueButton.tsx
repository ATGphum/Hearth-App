import { Text } from "@chakra-ui/react";

interface Props {
  text: string;
  callback: () => void;
}

const ClearButton = ({ text, callback }: Props) => {
  return (
    <Text
      textStyle="action"
      borderRadius="40px"
      padding="0.625rem 2.25rem"
      onClick={callback}
      backgroundColor={"accent.darkBlue"}
      color="neutral.white"
    >
      {text}
    </Text>
  );
};

export default ClearButton;
