import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import viteEnv from "./config/vite-env";
import { AuthProvider } from "./context/authContext";
import { getUser, request } from "./core/api";
import HomePage from "./pages/HomePage";
import theme from "./theme/chakra-theme";
import { Layout } from "./components/Layout";
import { SWRConfig } from "swr";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <AppContextProviders>
      <LogoutButton />
      <HomePage />
    </AppContextProviders>
  );
}

const GetButton = () => {
  const myFunc = async () => {
    const res = await getUser();
    console.log(res);
  };
  return <button onClick={() => myFunc()}>count isphum</button>;
};

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};

export default App;

interface ProviderProps {
  children: React.ReactNode;
}

const AppContextProviders = ({ children }: ProviderProps) => {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            request<any>(url, "GET").then((res) => {
              if (res.status >= 300) {
                const error = new Error(
                  "An error occurred while fetching the data."
                );
                // Attach extra info to the error object.
                // eslint-disable-next-line
                // @ts-ignore
                error.status = res.status;
                throw error;
              }
              return res.data;
            }),
        }}
      >
        <AuthProvider>
          <Layout>
            <UserProvider>{children}</UserProvider>
          </Layout>
        </AuthProvider>
      </SWRConfig>
    </ChakraProvider>
  );
};
