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
const AppContextProviders = lazy(() => import("./context/AppContextProviders"));

function App() {
  const installable = getInstallableStatus();
  const isStandalone = IsStandalone();

  useEffect(() => {
    initialiseAnalytics();
  }, []);

  if (installable === "installable" || viteEnv.environment === "prod") {
    if (isStandalone || viteEnv.environment === "prod") {
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

  return (
    <Suspense fallback={<LoadingPage />}>
      <DesktopPage />
    </Suspense>
  );
}

export default App;
