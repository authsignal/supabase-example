import { Auth0Provider } from "@auth0/auth0-react";
import type { AppProps } from "next/app";
import Router from "next/router";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain="dev-xvna46b6.us.auth0.com"
      clientId="8w9zcSW9nW8oH06JvasY7Yhd9TdQ46jO"
      onRedirectCallback={(appState) => {
        console.log("appState", appState);

        Router.replace(appState?.returnTo || "/");
      }}
      authorizationParams={{
        redirect_uri: "http://localhost:3000",
      }}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;
