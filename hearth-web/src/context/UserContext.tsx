import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, createContext, useEffect } from "react";
import { createCtx } from "./createCtx";
import { User } from "../core/types";
import React from "react";
import { useCurrentUserProfile } from "../core/apiHooks";
import LoadingPage from "../pages/LoadingPage";
import LoginPage from "../pages/LoginPage";
import UserCreateForm from "../pages/UserCreateForm";

type Props = {
  children: ReactNode;
};

type ContextProps = {
  user?: User | undefined;
  userMutate: () => Promise<User | undefined>;
};

const UserContext = createContext<ContextProps>({
  userMutate: async () => undefined,
});

const UserProvider = ({ children }: Props) => {
  const { data: user, error, mutate: userMutate } = useCurrentUserProfile();
  const {
    isAuthenticated,
    getAccessTokenSilently,
    isLoading,
    loginWithRedirect,
  } = useAuth0();

  // store auth0 access token in memory
  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
        .then((token) => {
          window.localStorage.setItem("acAccessToken", token);
          userMutate();
        })
        .catch((e) => {
          console.error("Error fetching access token", e);
        });
    } else {
      window.localStorage.removeItem("acAccessToken");
    }
  }, [isAuthenticated, getAccessTokenSilently, userMutate]);

  // show loading page while user data is retrieving
  if (!user) return <LoadingPage />;

  // redirect to initial form if names are missing
  if (
    user &&
    (!user.first_name ||
      !user.last_name ||
      !user.partner_first_name ||
      !user.partner_last_name)
  ) {
    return <UserCreateForm />;
  }

  return (
    <UserContext.Provider value={{ user, userMutate }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
