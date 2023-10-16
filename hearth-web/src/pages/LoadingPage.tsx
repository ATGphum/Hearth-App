import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  bg?: string;
}

const LoadingPage = ({ bg }: Props) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [imageLoaded, setImageLoaded] = useState(false);
  // login guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated && imageLoaded) {
      loginWithRedirect().catch((e) => console.error("Error occurred", e));
    }
  }, [loginWithRedirect, isLoading, isAuthenticated, imageLoaded]);
  const handleImageLoad = () => {
    setImageLoaded(true); // Set imageLoaded to true when the image has loaded
  };
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
      position="relative"
      overflow={"hidden"}
      justifyContent={"center"}
      pb="4rem"
    >
      <Image
        src={
          "https://res.cloudinary.com/ddh1fblle/image/upload/v1694933705/Web_ilczox.svg"
        }
        onLoad={handleImageLoad}
      />
    </Flex>
  );
};

export default LoadingPage;
