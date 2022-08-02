import { useState } from "react";
import { Layout } from "../components";

export default function SignInPage() {
  const [isNewUser, setIsNewUser] = useState(false);

  return (
    <Layout>
      <main className="flex flex-col justify-center items-center grow">
        <h1 className="mb-6 text-lg font-bold">My Example App</h1>
        {isNewUser ? (
          <SignUpForm setIsNewUser={setIsNewUser} />
        ) : (
          <SignInForm setIsNewUser={setIsNewUser} />
        )}
      </main>
    </Layout>
  );
}

interface FormProps {
  setIsNewUser: (isNewUser: boolean) => void;
}

const SignInForm = ({ setIsNewUser }: FormProps) => (
  <>
    <form
      method="POST"
      action="/api/sign-in"
      className="flex flex-col min-w-[300px]"
    >
      <label htmlFor="email" className="text-sm mb-1 text-gray-400">
        Email
      </label>
      <input
        id="email"
        type="email"
        name="email"
        required
        className={inputCl}
      />
      <label htmlFor="password" className="text-sm mb-1 text-gray-400">
        Password
      </label>
      <input
        id="password"
        type="password"
        name="password"
        required
        className={inputCl}
      />
      <button type="submit" className={buttonCl}>
        Sign in
      </button>
    </form>
    <div className="text-sm mt-2">
      {"Don't have an account? "}
      <a
        className="cursor-pointer text-blue-500"
        onClick={() => {
          setIsNewUser(true);
        }}
      >
        Sign up
      </a>
    </div>
  </>
);

const SignUpForm = ({ setIsNewUser }: FormProps) => (
  <>
    <form
      method="POST"
      action="/api/sign-up"
      className="flex flex-col min-w-[300px]"
    >
      <label htmlFor="email" className="text-sm mb-1 text-gray-400">
        Email
      </label>
      <input
        id="email"
        type="email"
        name="email"
        required
        className={inputCl}
      />
      <label htmlFor="password" className="text-sm mb-1 text-gray-400">
        Password
      </label>
      <input
        id="password"
        type="password"
        name="password"
        required
        className={inputCl}
      />
      <button type="submit" className={buttonCl}>
        Sign up
      </button>
    </form>
    <div className="text-sm mt-2">
      {"Already have an account? "}
      <a
        className="cursor-pointer text-blue-500"
        onClick={() => {
          setIsNewUser(false);
        }}
      >
        Sign in
      </a>
    </div>
  </>
);

const inputCl =
  "outline-none text-sm bg-white rounded-md text-gray-800 border-solid border border-slate-300 px-2 h-10 mb-2";
const buttonCl =
  "cursor-pointer text-sm font-medium bg-slate-800 text-white border-none rounded-md mt-1 px-3 h-10";
