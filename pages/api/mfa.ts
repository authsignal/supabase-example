import { getUser, withApiAuth } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { authsignal } from "../../lib/authsignal";

export default withApiAuth(async function mfa(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const { user } = await getUser({ req, res });

  const { isEnrolled, deviceId } = req.body;

  const { url: mfaUrl } = await authsignal.track({
    action: isEnrolled ? "manageSettings" : "enroll",
    userId: user.id,
    redirectToSettings: isEnrolled,
    deviceId,
  });

  res.send({ mfaUrl });
});
