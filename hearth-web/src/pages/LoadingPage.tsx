import { Flex, keyframes } from "@chakra-ui/react";
import { m } from "framer-motion";
import { LayoutNoRedirect } from "../components/LayoutNoRedirect";

function LoadingPage() {
  const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(3) rotate(0); border-radius: 20%; }
  50% { transform: scale(3) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`;

  const animation = `${animationKeyframes} 2s ease-in-out infinite 0.8s`;

  return (
    <LayoutNoRedirect>
      <Flex flex="1" alignItems="center" justifyContent="center">
        <Flex pb="2rem">
          <Flex
            as={m.div}
            animation={animation}
            padding="2"
            bgGradient="linear(to-l, hsla(296, 94%, 67%, 1), hsla(242, 76%, 56%, 1))"
            width="4rem"
            height="4rem"
            display="flex"
            drag={true}
            borderRadius={"20%"}
          />
        </Flex>
      </Flex>
    </LayoutNoRedirect>
  );
}

export default LoadingPage;
