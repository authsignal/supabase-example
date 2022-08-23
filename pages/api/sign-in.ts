import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import { authsignal } from "../../lib/authsignal";
import { setAuthCookie, setTempCookie } from "../../lib/cookies";

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const { email, password } = req.body;

  const { data, error } = await supabaseClient.auth.api.signInWithEmail(
    email,
    password
  );

  if (error || !data?.user) {
    return res.send({ error });
  }

  const { state, url: mfaUrl } = await authsignal.track({
    action: "signIn",
    userId: data.user.id,
    deviceId: req.body.deviceId,
    userAgent: req.headers["user-agent"],
    ipAddress: requestIp.getClientIp(req) ?? undefined,
  });

  if (state === "CHALLENGE_REQUIRED") {
    await setTempCookie(data, res);
  } else {
    setAuthCookie(data, res);
  }

  res.send({ state, mfaUrl });
}
