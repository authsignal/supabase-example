import { Authsignal } from "@authsignal/node";

const secret = process.env.AUTHSIGNAL_SECRET;

if (!secret) {
  throw new Error("AUTHSIGNAL_SECRET is undefined");
}

const redirectUrl = process.env.SITE_URL
  ? `${process.env.SITE_URL}/api/callback`
  : "http://localhost:3000/api/callback";

const apiBaseUrl = "https://dev-signal.authsignal.com/v1";

export const authsignal = new Authsignal({ apiBaseUrl, secret, redirectUrl });
