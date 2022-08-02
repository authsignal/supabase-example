import { Session } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { setAuthCookie, supabase } from "../../lib";

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.api.signUpWithEmail(
    email,
    password
  );

  if (error || !isSession(data)) {
    return res.send({ error });
  }

  setAuthCookie(data, res);

  res.redirect("/");
}

const isSession = (data: any): data is Session => !!data?.access_token;
