import { useAuth0 } from "@auth0/auth0-react";
import React, { ReactNode, createContext, useEffect } from "react";
import { createCtx } from "./createCtx";

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<boolean>(false);

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
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
