import { Flex, Image } from "@chakra-ui/react";
import logo from "../svg/logo.svg";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      background="linear-gradient(180deg, #FFBB79 2.78%, #FFDEC0 31.35%, #FFDEC0 98.99%, #FFDEC0 98.99%)"
      minHeight="100vh"
      padding="1rem"
    >
      <Flex direction="column" justifyContent={"center"}>
        <Image src={logo} alt="Hearth" />
      </Flex>
      {children}
    </Flex>
  );
};
