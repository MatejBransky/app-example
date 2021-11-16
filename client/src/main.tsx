import React from "react";
import ReactDOM from "react-dom";
import Keycloak from "keycloak-js";
import "./index.css";
import App from "./App";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { getConfig } from "./config";

if (import.meta.env.MODE !== "production") {
  const { initMock } = await import("./test/msw/browser");
  const { devConfig } = await import("../devConfig");
  const msw = initMock(devConfig);
  await msw.worker.start({
    onUnhandledRequest: "bypass",
  });
  globalThis.__MSW__ = msw;
}

const config = await getConfig()

const keycloak = Keycloak(config.auth);

const eventLogger = (event: unknown, error: unknown) => {
  console.log("onKeycloakEvent", event, error);
};

const tokenLogger = (tokens: unknown) => {
  console.log("onKeycloakTokens", tokens);
};


ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        checkLoginIframe: false,
      }}
      onEvent={eventLogger}
      onTokens={tokenLogger}
    >
      <App />
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
