import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib";

export default async function signOut(
  req: NextApiRequest,
  res: NextApiResponse
) {
  supabase.auth.api.deleteAuthCookie(req, res, { redirectTo: "/sign-in" });
}
