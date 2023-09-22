import { Suspense, lazy } from "react";
import "./App.css";
import Tree from "./components/Tree";
import viteEnv from "./config/vite-env";
import { IsStandalone, getInstallableStatus } from "./core/helpers";
import LoadingPage from "./pages/LoadingPage";

const DesktopPage = lazy(() => import("./pages/DesktopPage"));
const WrongBrowserPage = lazy(() => import("./pages/WrongBrowserPage"));
const AppContextProviders = lazy(() => import("./context/AppContextProviders"));

function App() {
  const installable = getInstallableStatus();
  const isStandalone = IsStandalone();
  if (installable === "installable") {
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
