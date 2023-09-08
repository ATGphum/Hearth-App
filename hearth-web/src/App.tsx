import { ChakraProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import "./App.css";
import { Layout } from "./components/Layout";
import { UserProvider } from "./context/UserContext";
import { request } from "./core/api";
import HomePage from "./pages/HomePage";
import theme from "./theme/chakra-theme";

function App() {
  return (
    <AppContextProviders>
      <HomePage />
    </AppContextProviders>
  );
}

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
        <UserProvider>{children}</UserProvider>
      </SWRConfig>
    </ChakraProvider>
  );
};
