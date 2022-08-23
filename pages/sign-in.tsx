import { useAuthsignal } from "@authsignal/nextjs-helpers";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SignInPage() {
  const router = useRouter();

  const { anonymousId } = useAuthsignal();

  return (
    <main>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
          };

          const email = target.email.value;
          const password = target.password.value;

          const { state, mfaUrl } = await fetch("/api/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, deviceId: anonymousId }),
          }).then((res) => res.json());

          if (state === "CHALLENGE_REQUIRED") {
            window.location.href = mfaUrl;
          } else {
            router.push("/");
          }
        }}
      >
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" required />
        <button type="submit">Sign in</button>
      </form>
      <div>
        {"Don't have an account? "}
        <Link href="sign-up">
          <a>Sign up</a>
        </Link>
      </div>
    </main>
  );
}
