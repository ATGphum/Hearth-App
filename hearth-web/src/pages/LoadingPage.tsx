import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Spinner, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import logo from "../svg/logo.svg";
import { LayoutNoRedirect } from "../components/LayoutNoRedirect";

function LoadingPage() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  // login guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect().catch((e) => console.error("Error occurred", e));
    }
  }, [loginWithRedirect, isLoading, isAuthenticated]);

  return (
    <LayoutNoRedirect>
      <Flex>
        <Spinner />
      </Flex>
    </LayoutNoRedirect>
  );
}

export default LoadingPage;
