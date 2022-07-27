import { useUser } from "@supabase/auth-helpers-react";
import { Auth, Dashboard, Layout } from "../components";

export default function HomePage() {
  const { user, error } = useUser();

  return (
    <Layout>
      {user ? <Dashboard user={user} /> : <Auth error={error?.message} />}
    </Layout>
  );
}
