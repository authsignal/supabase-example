import { User } from "@supabase/supabase-js";
import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Layout } from "../components";
import { GetServerSideProps } from "next";
import { authsignal } from "../lib";

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
  return (
    <Layout>
      <header className="flex justify-between items-center bg-black w-full">
        <div className="text-lg m-3 text-white">My Example App</div>
        <Link href={"/api/sign-out"}>
          <button className="cursor-pointer text-sm font-medium bg-none border-none text-white p-3">
            Log out
          </button>
        </Link>
      </header>
      <div className="flex justify-center items-center flex-col grow">
        <div>
          <div className="text-sm mb-1">Logged in as:</div>
          <div>{user?.email}</div>
          <div className="text-sm my-1">
            Is user enrolled: {isEnrolled.toString()}
          </div>
          {!isEnrolled && (
            <button
              type="submit"
              className="cursor-pointer text-sm font-medium bg-slate-800 text-white border-none rounded-md mt-1 px-3 h-10"
              onClick={() => (window.location.href = mfaUrl)}
            >
              Set up MFA
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}

const redirectUrl = process.env.SITE_URL ?? "http://localhost:3000";
