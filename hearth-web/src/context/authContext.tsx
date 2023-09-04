import { useAuth0 } from "@auth0/auth0-react";
import React, { ReactNode, useEffect } from "react";
import { createCtx } from "./createCtx";
export interface AuthContextProps {
  isAuthenticated: boolean;
}

type props = {
  children: ReactNode;
};

const [useAuth, AuthContextProvider] = createCtx<AuthContextProps>();

const AuthProvider: React.FC<props> = ({ children }) => {
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
