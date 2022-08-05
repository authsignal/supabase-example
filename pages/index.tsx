import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { authsignal } from "../lib/authsignal";

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
    <main>
      <section>
        <div> Signed in as: {user?.email}</div>
        <button onClick={() => (window.location.href = mfaUrl)}>
          {isEnrolled ? "Manage MFA settings" : "Set up MFA"}
        </button>
        <button onClick={() => router.push("/api/sign-out")}>Sign out</button>
      </section>
    </main>
  );
}

const redirectUrl = process.env.SITE_URL
  ? `${process.env.SITE_URL}/api/callback`
  : "http://localhost:3000/api/callback";
