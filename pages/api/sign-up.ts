import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { setAuthCookie } from "../../lib";

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const { data, error } = await supabaseClient.auth.api.signUpWithEmail(
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
