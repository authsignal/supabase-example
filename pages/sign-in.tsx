import { useRouter } from "next/router";

export default function SignInPage() {
  const router = useRouter();

  return (
    <main>
      <form method="POST" action="/api/sign-in">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" required />
        <button type="submit">Sign in</button>
      </form>
      <div>
        {"Don't have an account? "}
        <a onClick={() => router.push("/sign-up")}>Sign up</a>
      </div>
    </main>
  );
}
