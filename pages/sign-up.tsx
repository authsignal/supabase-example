import { useRouter } from "next/router";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <main>
      <form method="POST" action="/api/sign-up">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" required />
        <button type="submit">Sign up</button>
      </form>
      <div>
        {"Already have an account? "}
        <a onClick={() => router.push("/sign-in")}>Sign in</a>
      </div>
    </main>
  );
}
