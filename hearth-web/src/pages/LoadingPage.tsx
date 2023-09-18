import { Flex, Image } from "@chakra-ui/react";

function LoadingPage() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      background="linear-gradient(180deg, #FFBB79 2.78%, #FFDEC0 31.35%, #FFDEC0 98.99%, #FFDEC0 98.99%)"
      height="100vh"
      position="relative"
      overflow={"hidden"}
      justifyContent={"center"}
    >
      <Image
        src={
          "https://res.cloudinary.com/ddh1fblle/image/upload/v1694933705/Web_ilczox.svg"
        }
        alt="Hearth"
      />
    </Flex>
  );
}

export default LoadingPage;
