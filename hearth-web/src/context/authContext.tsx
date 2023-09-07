import { useAuth0 } from "@auth0/auth0-react";
import React, { ReactNode, useEffect } from "react";
import { createCtx } from "./createCtx";

type Props = {
  children: ReactNode;
};

const [useAuth, AuthContextProvider] = createCtx();

const AuthProvider = ({ children }: Props) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
        .then((token) => {
          window.localStorage.setItem("acAccessToken", token);
        })
        .catch((e) => {
          console.error("Error fetching access token", e);
        });
    } else {
      window.localStorage.removeItem("acAccessToken");
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <AuthContextProvider value={{ isAuthenticated }}>
      {children}
    </AuthContextProvider>
  );
};

export { useAuth, AuthProvider };
