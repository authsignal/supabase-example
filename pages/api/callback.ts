import { NextApiRequest, NextApiResponse } from "next";
import { authsignal, getSessionFromTempCookie, setAuthCookie } from "../../lib";

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
