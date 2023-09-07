import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, useEffect } from "react";
import { createCtx } from "./createCtx";
import { User } from "../core/types";
import React from "react";
import { useCurrentUserProfile } from "../core/apiHooks";
import LoadingPage from "../pages/LoadingPage";

type Props = {
  children: ReactNode;
};

const UserContext = React.createContext<User | undefined | null>(null);

const UserProvider = ({ children }: Props) => {
  const { data: user } = useCurrentUserProfile();

  if (!user) return <LoadingPage />;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
