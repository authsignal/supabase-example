import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { setAuthCookie } from "../../lib/cookies";

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
    res.send({ error });
  } else {
    setAuthCookie(data, res);
    res.send({ data });
  }
}

const isSession = (data: any): data is Session => !!data?.access_token;
