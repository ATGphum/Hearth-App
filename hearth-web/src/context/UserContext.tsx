import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, createContext, useEffect } from "react";
import { useCurrentUserProfile } from "../core/apiHooks";
import { User } from "../core/types";
import LoadingPage from "../pages/LoadingPage";
import UserCreateForm from "../pages/UserCreateForm";

type Props = {
  children: ReactNode;
};

type ContextProps = {
  user?: User | undefined;
  userMutate:
    | (() => Promise<User | undefined>)
    | ((user: User) => Promise<User | undefined>);
};

const UserContext = createContext<ContextProps>({
  userMutate: async () => undefined,
});

const UserProvider = ({ children }: Props) => {
  const { data: user, mutate: userMutate } = useCurrentUserProfile();
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();

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
    } else if (!isLoading) {
      window.localStorage.removeItem("acAccessToken");
    }
  }, [isAuthenticated, getAccessTokenSilently, userMutate, isLoading]);

  return (
    <UserContext.Provider value={{ user, userMutate }}>
      {
        // show loading page while user data is retrieving
        !user ? (
          <LoadingPage />
        ) : // show user form if essential fields are not present
        user &&
          (!user.first_name ||
            !user.last_name ||
            !user.partner_first_name ||
            !user.partner_last_name) ? (
          <UserCreateForm />
        ) : (
          children
        )
      }
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
