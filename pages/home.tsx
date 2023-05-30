import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function Home() {
  const { user, logout } = useAuth0();

  return (
    <main>
      <section>
        <h1>My Example App</h1>
        <div>Signed in as: {user?.email}</div>
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: "http://localhost:3000" } })
          }
        >
          Sign out
        </button>
      </section>
    </main>
  );
}

export default withAuthenticationRequired(Home);
