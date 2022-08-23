import { AuthsignalProvider } from "@authsignal/nextjs-helpers";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthsignalProvider>
      <Component {...pageProps} />
    </AuthsignalProvider>
  );
}

export default MyApp;
