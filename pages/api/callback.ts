import { NextApiRequest, NextApiResponse } from "next";
import { authsignal, getSessionFromTempCookie, setAuthCookie } from "../../lib";

// Handles the redirect back from the Authsignal Prebuilt MFA page
// Clears the temp encrypted cookie used during MFA flow and sets the Supabase auth cookie
export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.query.token as string;

  const { success } = await authsignal.validateChallenge({ token });

  if (success) {
    const session = await getSessionFromTempCookie(req);

    if (session) {
      setAuthCookie(session, res);

      return res.redirect("/");
    }
  }

  res.redirect("/sign-in");
}
