import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import viteEnv from "./config/vite-env";
import { AuthProvider } from "./context/authContext";
import { getUser } from "./core/api";
import HomePage from "./pages/HomePage";
import theme from "./theme/chakra-theme";
import { Layout } from "./components/Layout";

function App() {
  return (
    <AppContextProviders>
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
      <Auth0Provider
        domain={viteEnv.auth0.domain}
        clientId={viteEnv.auth0.hearthWeb.id}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: viteEnv.auth0.api.audience,
          scope: viteEnv.auth0.scope,
        }}
      >
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </Auth0Provider>
    </ChakraProvider>
  );
};
