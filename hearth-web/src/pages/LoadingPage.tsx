import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Container,
  Flex,
  Image,
  Spinner,
  keyframes,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { LayoutNoRedirect } from "../components/LayoutNoRedirect";
import ShapeOne from "../images/shape-one.png";
import { motion } from "framer-motion";

function LoadingPage() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  // login guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect().catch((e) => console.error("Error occurred", e));
    }
  }, [loginWithRedirect, isLoading, isAuthenticated]);

  const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(3) rotate(0); border-radius: 20%; }
  50% { transform: scale(3) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`;

  const animation = `${animationKeyframes} 2s ease-in-out infinite`;

  return (
    <LayoutNoRedirect>
      {/* <Flex>
        <Image src={ShapeOne} />
      </Flex> */}
      <Flex flex="1" alignItems="center" justifyContent="center">
        <Flex
          as={motion.div}
          animation={animation}
          // not work: transition={{ ... }}
          padding="2"
          bgGradient="linear(to-l, hsla(296, 94%, 67%, 1), hsla(242, 76%, 56%, 1))"
          width="4rem"
          height="4rem"
          display="flex"
        />
      </Flex>
    </LayoutNoRedirect>
  );
}

export default LoadingPage;
