import { ChakraBaseProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import "./App.css";
import RenderRoutes from "./Routes";
import { UserProvider } from "./context/UserContext";
import { request } from "./core/api";
import theme from "./theme/chakra-theme";
import AccessTokenProvider from "./context/AccessTokenProvider";

function App() {
  return (
    <AppContextProviders>
      <RenderRoutes />
    </AppContextProviders>
  );
}

export default App;

interface ProviderProps {
  children: React.ReactNode;
}

const AppContextProviders = ({ children }: ProviderProps) => {
  return (
    <ChakraBaseProvider theme={theme}>
      <AccessTokenProvider>
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
      </AccessTokenProvider>
    </ChakraBaseProvider>
  );
};
