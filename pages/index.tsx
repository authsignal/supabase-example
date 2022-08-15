import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { authsignal } from "../lib/authsignal";

interface Props {
  user: User;
  isEnrolled: boolean;
}

export const getServerSideProps: GetServerSideProps<Props> = withPageAuth({
  redirectTo: "/sign-in",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);

    const { isEnrolled } = await authsignal.getUser({ userId: user.id });

    return {
      props: { user, isEnrolled },
    };
  },
});

export default function HomePage({ user, isEnrolled }: Props) {
  const router = useRouter();

  return (
    <main>
      <section>
        <h1>My Example App</h1>
        <div>Signed in as: {user?.email}</div>
        <button
          onClick={async (e) => {
            e.preventDefault();

            const { mfaUrl } = await fetch("/api/mfa", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isEnrolled }),
            }).then((res) => res.json());

            window.location.href = mfaUrl;
          }}
        >
          {isEnrolled ? "Manage MFA settings" : "Set up MFA"}
        </button>
        <button onClick={() => router.push("/api/sign-out")}>Sign out</button>
      </section>
    </main>
  );
}
