import { Flex } from "@chakra-ui/react";
import TextLogo from "./TextLogo";
import { IsStandalone } from "../core/helpers";

interface Props {
  children: React.ReactNode;
  hidePadding?: boolean;
  bg?: string;
}

export const LayoutNoRedirect = ({ children, hidePadding, bg }: Props) => {
  const isStandalone = IsStandalone();
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
      {isStandalone ? (
        <Flex
          direction="column"
          justifyContent={"center"}
          pt={hidePadding ? "1rem" : "0rem"}
          pb="1rem"
        >
          <TextLogo />
        </Flex>
      ) : (
        <Flex pb="1rem" />
      )}
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
