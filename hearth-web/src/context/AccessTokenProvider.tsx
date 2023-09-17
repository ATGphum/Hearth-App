import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const AccessTokenProvider = ({ children }: Props) => {
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();

  // store auth0 access token in memory
  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
        .then((token) => {
          window.localStorage.setItem("acAccessToken", token);
        })
        .catch((e) => {
          console.error("Error fetching access token", e);
        });
    } else if (!isLoading) {
      window.localStorage.removeItem("acAccessToken");
    }
  }, [isAuthenticated, getAccessTokenSilently, isLoading]);

  return <>{children}</>;
};

export default AccessTokenProvider;
