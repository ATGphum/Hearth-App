import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";

function LoadingPage() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  // login guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect().catch((e) => console.error("Error occurred", e));
    }
  }, [loginWithRedirect, isLoading, isAuthenticated]);

  return (
    <Flex>
      <Spinner />
    </Flex>
  );
}

export default LoadingPage;
