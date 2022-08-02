import { Authsignal } from "@authsignal/node";

const secret = process.env.AUTHSIGNAL_SECRET;

if (!secret) {
  throw new Error("AUTHSIGNAL_SECRET is undefined");
}

export const authsignal = new Authsignal({ secret });
