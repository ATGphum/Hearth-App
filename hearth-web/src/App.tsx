import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteEnv from "./config/vite-env";
import { AuthProvider } from "./context/authContext";
import { getUser } from "./core/api";
import PinkWorld from "./assets/pink-world.svg";
import {
  ChakraProvider,
  Flex,
  ListItem,
  Text,
  UnorderedList,
  Image,
} from "@chakra-ui/react";
import theme from "./theme/chakra-theme";
import { Layout } from "./components/layout";

function App() {
  return (
    <AppContextProviders>
      <Flex direction="column" justifyContent={"space-between"} flex="1">
        <Flex direction="column" gridRowGap="2" mt="2rem">
          <Image src={PinkWorld} />
          <Text textStyle={"heading.h2"} textAlign={"left"}>
            Sustain a meaningful connection with your partner.
          </Text>
          <Text
            textStyle={"heading.h3"}
            textAlign={"left"}
            mx="0.5rem"
            mt="0.5rem"
          >
            <UnorderedList>
              <ListItem>Explore your relationship</ListItem>
              <ListItem>Schedule reminders</ListItem>
              <ListItem>Get guidance from experts</ListItem>
            </UnorderedList>
          </Text>
        </Flex>
        <Text
          textStyle="action"
          border="1px solid"
          borderRadius="40px"
          padding="0.5rem"
        >
          Sign up for the free 3-day connection challenge
        </Text>
      </Flex>
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

const AppContextProviders: React.FC<ProviderProps> = ({ children }) => {
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
