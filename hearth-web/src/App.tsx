import { Suspense, lazy, useEffect } from "react";
import "./App.css";
import Tree from "./components/Tree";
import { initialiseAnalytics } from "./core/analytics";
import LoadingPage from "./pages/LoadingPage";
import { Flex } from "@chakra-ui/react";

// const DesktopPage = lazy(() => import("./pages/DesktopPage"));
// const InstallationPage = lazy(() => import("./pages/InstallationMobilePage"));
// const WrongBrowserInstructionPage = lazy(
//   () => import("./pages/WrongBrowserInstructionPage")
// );
const AppContextProviders = lazy(() => import("./context/AppContextProviders"));

function App() {
  // const installable = getInstallableStatus();
  // const isStandalone = IsStandalone();

  useEffect(() => {
    initialiseAnalytics();
  }, []);
  return (
    <Flex className="appFrame">
      <Suspense fallback={<LoadingPage />}>
        <AppContextProviders>
          <Tree />
        </AppContextProviders>
      </Suspense>
    </Flex>
  );
  // if (installable === "installable" || viteEnv.environment === "development") {
  //   if (isStandalone || viteEnv.environment === "development") {
  //     return (
  //       <Suspense fallback={<LoadingPage />}>
  //         <AppContextProviders>
  //           <Tree />
  //         </AppContextProviders>
  //       </Suspense>
  //     );
  //   } else {
  //     return (
  //       <Suspense fallback={<LoadingPage />}>
  //         <InstallationPage />
  //       </Suspense>
  //     );
  //   }
  // }
  // if (installable === "non-installable") {
  //   return (
  //     <Suspense fallback={<LoadingPage />}>
  //       <AppContextProviders>
  //         <WrongBrowserInstructionPage />
  //       </AppContextProviders>
  //     </Suspense>
  //   );
  // }

  // return (
  //   <Suspense fallback={<LoadingPage />}>
  //     <DesktopPage />
  //   </Suspense>
  // );
}

export default App;
