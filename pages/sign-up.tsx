import Link from "next/link";
import { useRouter } from "next/router";

export default function SignUpPage() {
  const router = useRouter();

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

          await fetch("/api/sign-up", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }).then((res) => res.json());

          router.push("/");
        }}
      >
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" required />
        <button type="submit">Sign up</button>
      </form>
      <div>
        {"Already have an account? "}
        <Link href="sign-in">
          <a>Sign in</a>
        </Link>
      </div>
    </main>
  );
}
