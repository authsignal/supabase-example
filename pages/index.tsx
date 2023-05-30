import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [router, isAuthenticated]);

  return (
    <main>
      <section>
        <button onClick={() => loginWithRedirect()}>Sign in</button>
      </section>
    </main>
  );
}
