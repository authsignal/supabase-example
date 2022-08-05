import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { authsignal, setAuthCookie, setTempCookie } from "../../lib";

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const { data, error } = await supabaseClient.auth.api.signInWithEmail(
    email,
    password
  );

  if (error || !data?.user) {
    return res.send({ error });
  }

  const { state, challengeUrl } = await authsignal.track({
    action: "signIn",
    userId: data.user.id,
    redirectUrl,
  });

  if (state === "CHALLENGE_REQUIRED" && challengeUrl) {
    await setTempCookie(data, res);
    res.redirect(303, challengeUrl);
  } else {
    setAuthCookie(data, res);
    res.redirect("/");
  }
}

const redirectUrl = process.env.SITE_URL
  ? `${process.env.SITE_URL}/api/callback`
  : "http://localhost:3000/api/callback";
