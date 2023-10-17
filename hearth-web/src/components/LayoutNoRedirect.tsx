import { Flex, Image } from "@chakra-ui/react";
import TextLogo from "./TextLogo";

interface Props {
  children: React.ReactNode;
  hidePadding?: boolean;
  bg?: string;
}

export const LayoutNoRedirect = ({ children, hidePadding, bg }: Props) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      background={
        bg
          ? bg
          : "linear-gradient(180deg, #FFBB79 2.78%, #FFDEC0 31.35%, #FFDEC0 98.99%, #FFDEC0 98.99%)"
      }
      // minHeight="100vh"
      minHeight="100%"
      padding={hidePadding ? "0rem" : "1rem"}
      id="mounter"
      position="relative"
      overflow={"hidden"}
    >
      <Flex
        direction="column"
        justifyContent={"center"}
        pb="1rem"
        pt={hidePadding ? "1rem" : "0rem"}
      >
        <TextLogo />
      </Flex>
      <Flex
        direction="column"
        flex="1"
        width="100%"
        id="appContainer"
        position="relative"
      >
        {children}
      </Flex>
    </Flex>
  );
};
