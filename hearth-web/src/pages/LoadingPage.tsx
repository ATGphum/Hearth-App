import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Image } from "@chakra-ui/react";
import { useEffect } from "react";

function LoadingPage() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  // login guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect().catch((e) => console.error("Error occurred", e));
    }
  }, [loginWithRedirect, isLoading, isAuthenticated]);
  return (
    <Flex
      direction="column"
      alignItems="center"
      background="linear-gradient(180deg, #FFBB79 2.78%, #FFDEC0 31.35%, #FFDEC0 98.99%, #FFDEC0 98.99%)"
      height="100vh"
      position="relative"
      overflow={"hidden"}
      justifyContent={"center"}
      pb="4rem"
    >
      <Image
        src={
          "https://res.cloudinary.com/ddh1fblle/image/upload/v1694933705/Web_ilczox.svg"
        }
      />
    </Flex>
  );
}

export default LoadingPage;
