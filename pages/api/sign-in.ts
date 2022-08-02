import { UserActionState } from "@authsignal/node";
import { NextApiRequest, NextApiResponse } from "next";
import { authsignal, setAuthCookie, setTempCookie, supabase } from "../../lib";

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.api.signInWithEmail(
    email,
    password
  );

  if (error || !data?.user) {
    return { error };
  }

  const { state, challengeUrl } = await authsignal.track({
    action: "login",
    userId: data.user.id,
    redirectUrl,
  });

  // If mfa challenge is required, set temporary encrypted cookie with session data
  // And then redirect to the Authsignal Prebuilt MFA page
  // Otherwise if no challenge is required, set auth cookie immediately and redirect to home
  if (state === UserActionState.CHALLENGE_REQUIRED && challengeUrl) {
    await setTempCookie(data, res);
    res.redirect(303, challengeUrl);
  } else {
    setAuthCookie(data, res);
    res.redirect("/");
  }
}

const redirectUrl =
  process.env.REDIRECT_URL ?? "http://localhost:3000/api/callback";
