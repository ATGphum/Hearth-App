import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import viteEnv from "./config/vite-env.ts";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="scrollable-content">
      <Auth0Provider
        domain={viteEnv.auth0.domain}
        clientId={viteEnv.auth0.hearthWeb.id}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: viteEnv.auth0.api.audience,
          scope: viteEnv.auth0.scope,
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <div className="scrollable-content">
          <App />
        </div>
      </Auth0Provider>
    </div>
  </StrictMode>
);
