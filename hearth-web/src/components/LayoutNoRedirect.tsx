import { Flex, Image } from "@chakra-ui/react";
import logo from "../svg/logo.svg";

interface Props {
  children: React.ReactNode;
  hidePadding?: boolean;
}

export const LayoutNoRedirect = ({ children, hidePadding }: Props) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      background="linear-gradient(180deg, #FFBB79 2.78%, #FFDEC0 31.35%, #FFDEC0 98.99%, #FFDEC0 98.99%)"
      minHeight="100vh"
      padding={hidePadding ? "0rem" : "1rem"}
      id="mounter"
    >
      <Flex
        direction="column"
        justifyContent={"center"}
        pb="1rem"
        pt={hidePadding ? "1rem" : "0rem"}
      >
        <Image src={logo} alt="Hearth" />
      </Flex>
      {children}
    </Flex>
  );
};
