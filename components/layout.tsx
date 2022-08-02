import Head from "next/head";

type Props = {
  children: React.ReactNode;
};

export const Layout = (props: Props) => (
  <>
    <Head>
      <title>Authsignal Supabase Example</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex flex-col justify-center items-center grow">
      <h1 className="mb-6 text-lg font-bold">My Example App</h1>
      {props.children}
    </main>
  </>
);
