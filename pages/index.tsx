import { User } from "@supabase/supabase-js";
import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Layout } from "../components";
import { GetServerSideProps } from "next";
import { authsignal } from "../lib";
import { Button, Typography } from "@supabase/ui";
import { useRouter } from "next/router";

interface Props {
  user: User;
  isEnrolled: boolean;
  mfaUrl: string;
}

export const getServerSideProps: GetServerSideProps<Props> = withPageAuth({
  redirectTo: "/sign-in",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);

    const { isEnrolled, url: mfaUrl } = await authsignal.mfa({
      userId: user.id,
      redirectUrl,
    });

    return {
      props: { user, isEnrolled, mfaUrl },
    };
  },
});

export default function HomePage({ user, isEnrolled, mfaUrl }: Props) {
  const router = useRouter();

  return (
    <Layout>
      <div className="flex flex-col min-w-[300px]">
        <Typography.Text className="mt-2">
          Signed in as: {user?.email}
        </Typography.Text>
        <Button
          block
          className="mt-3"
          onClick={() => (window.location.href = mfaUrl)}
        >
          {isEnrolled ? "Manage MFA settings" : "Set up MFA"}
        </Button>
        <Button
          block
          className="mt-3"
          onClick={() => router.push("/api/sign-out")}
        >
          Sign out
        </Button>
      </div>
    </Layout>
  );
}

const redirectUrl = process.env.SITE_URL
  ? `${process.env.SITE_URL}/api/callback`
  : "http://localhost:3000/api/callback";
