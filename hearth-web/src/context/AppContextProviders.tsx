import { Auth0Provider } from "@auth0/auth0-react";
import viteEnv from "../config/vite-env";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import { request } from "../core/api";
import { UserProvider } from "./UserContext";
import theme from "../theme/chakra-theme";

interface ProviderProps {
  children: React.ReactNode;
}

const AppContextProviders = ({ children }: ProviderProps) => {
  return (
    <Auth0Provider
      domain={viteEnv.auth0.domain}
      clientId={viteEnv.auth0.hearthWeb.id}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: viteEnv.auth0.api.audience,
        scope: viteEnv.auth0.scope,
      }}
      cacheLocation="localstorage"
    >
      <div className="unscrollable-content">
        <div className="scrollable-content">
          <ChakraBaseProvider theme={theme}>
            <SWRConfig
              value={{
                fetcher: async (url: string) => {
                  return request<any>(url, "GET").then((res) => {
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
                  });
                },
              }}
            >
              <UserProvider>{children}</UserProvider>
            </SWRConfig>
          </ChakraBaseProvider>
        </div>
      </div>
    </Auth0Provider>
  );
};
export default AppContextProviders;
