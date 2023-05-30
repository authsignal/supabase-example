import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function signOut(
  req: NextApiRequest,
  res: NextApiResponse
) {
  supabaseClient.auth.api.deleteAuthCookie(req, res, {
    redirectTo: "/sign-in",
  });
}
