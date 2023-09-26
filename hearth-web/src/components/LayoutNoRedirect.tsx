import { Flex, Image } from "@chakra-ui/react";

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
      minHeight="100vh"
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
        <Image
          src={
            "https://res.cloudinary.com/ddh1fblle/image/upload/v1694933705/Web_ilczox.svg"
          }
          alt="Hearth"
        />
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
