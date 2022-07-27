import { Auth as AuthUI } from "@supabase/ui";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

interface Props {
  error?: string;
}

export const Auth = ({ error }: Props) => (
  <>
    <AuthUI supabaseClient={supabaseClient} />
    {error && <p>{error}</p>}
  </>
);
