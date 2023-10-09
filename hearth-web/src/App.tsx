import { Suspense, lazy } from "react";
import "./App.css";
import Tree from "./components/Tree";
import viteEnv from "./config/vite-env";
import { useEffect } from "react";
import { initialiseAnalytics } from "./core/analytics";
import { IsStandalone, getInstallableStatus } from "./core/helpers";
import LoadingPage from "./pages/LoadingPage";

const DesktopPage = lazy(() => import("./pages/DesktopPage"));
const InstallationPage = lazy(() => import("./pages/InstallationMobilePage"));
const WrongBrowserInstructionPage = lazy(
  () => import("./pages/WrongBrowserInstructionPage")
);
const AppContextProviders = lazy(() => import("./context/AppContextProviders"));

function App() {
  const installable = getInstallableStatus();
  const isStandalone = IsStandalone();

  useEffect(() => {
    initialiseAnalytics();
  }, []);
  if (installable === "installable" || viteEnv.environment === "development") {
    if (isStandalone || viteEnv.environment === "development") {
      return (
        <Suspense fallback={<LoadingPage />}>
          <AppContextProviders>
            <Tree />
          </AppContextProviders>
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={<LoadingPage />}>
          <InstallationPage />
        </Suspense>
      );
    }
  }
  if (installable === "non-installable") {
    return (
      <Suspense fallback={<LoadingPage />}>
        <AppContextProviders>
          <WrongBrowserInstructionPage />
        </AppContextProviders>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <DesktopPage />
    </Suspense>
  );
}

export default App;
