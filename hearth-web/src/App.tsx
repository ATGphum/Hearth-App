import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import reactEnv from "./config/vite-env";
import { getUser } from "./core/api";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import viteEnv from "./config/vite-env";

function App() {
  return (
    <Auth0Provider
      domain={viteEnv.auth0.domain}
      clientId={viteEnv.auth0.hearthWeb.id}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: viteEnv.auth0.api.audience,
        scope: viteEnv.auth0.scope,
      }}
    >
      <>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <LoginButton />
          <GetButton />
          <LogoutButton />
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    </Auth0Provider>
  );
}

const GetButton = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const myFunc = async () => {
    console.log(isAuthenticated);
    console.log(user);
    getAccessTokenSilently()
      .then((token) => {
        window.localStorage.setItem("acAccessToken", token);
        console.log(token);
      })
      .catch((e) => {
        console.error("Error fetching access token", e);
      });
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
