import { Suspense, lazy } from "react";
import "./App.css";
import Tree from "./components/Tree";
import viteEnv from "./config/vite-env";
import { useEffect } from "react";
import { initialiseAnalytics } from "./core/analytics";
import { IsStandalone, getInstallableStatus } from "./core/helpers";
import LoadingPage from "./pages/LoadingPage";

const DesktopPage = lazy(() => import("./pages/DesktopPage"));
const WrongBrowserPage = lazy(() => import("./pages/InstallationMobilePage"));
const AppContextProviders = lazy(() => import("./context/AppContextProviders"));

function App() {
  const installable = getInstallableStatus();
  const isStandalone = IsStandalone();

  console.log("installable", installable);
  console.log("isStandalone", isStandalone);

  useEffect(() => {
    initialiseAnalytics();
  }, []);

  if (installable === "installable" || viteEnv.environment === "development") {
    if (isStandalone || viteEnv.environment === "production") {
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
          <WrongBrowserPage />
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
