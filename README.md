# Authsignal Supabase MFA Example

This example shows how to integrate [Authsignal](https://www.authsignal.com/) with [Next.js](https://nextjs.org/) and [Supabase](https://supabase.com/) in order to add an MFA step after sign-in.

The user flow in the example is as follows:

1. The user enters their email and password to sign in
2. If the user has set up MFA, they're prompted to complete an MFA challenge (e.g. via Authenticator App) in order to complete sign-in
3. If the user has not set up MFA, they're signed in immediately and will see a button to set up MFA

The approach uses a temporary encrypted cookie to ensure that the Supabase auth cookies (`access_token` and `refresh_token`) are only set if the MFA challenge was successful. Session data is encrypted using [@hapi/iron](https://hapi.dev/family/iron).

A live version of this example can be found [here](https://authsignal-supabase-example.vercel.app).

## How it works

1. A sign-in form posts email and password to the Next.js API route `/api/sign-in`
2. The sign-in API route calls the Supabase client's `signInWithEmail` method and gets back a session object
3. The sign-in API route then calls the Authsignal client's `track` method to determine if an MFA challenge is required
4. If a challenge is required, the API route saves the session object in a temporary encrypted cookie and redirects to Authsignal
5. Once the challenge is completed, Authsignal redirects back to `/api/callback` which retrieves the session and sets the Supabase auth cookies

## Step 1: Configuring an Authsignal tenant

Log in to the [Authsignal Portal](https://portal.authsignal.com) and create a new project and tenant.

You will also need to [enable at least one authenticator for your tenant](https://portal.authsignal.com/organisations/tenants/authenticators) - for example Authenticator Apps.

Finally, to configure the sign-in action to always challenge, go [here](https://portal.authsignal.com/actions/signIn/rules) and set the default action outcome to `CHALLENGE` and click save.

## Step 2: Creating a Supabase project

From your [Supabase dashboard](https://app.supabase.com/), click `New project`.

Enter a `Name` for your Supabase project and enter or generate a secure `Database Password`, then click `Create new project`.

Once your project is created go to `Authentication -> Settings -> Auth Providers` and ensure `Enable Email provider` is checked and that `Confirm Email` is unchecked.

## Step 3: Configure project env vars

Copy the .env.local.example file to .env.local:

```
cp .env.local.example .env.local
```

Set `AUTHSIGNAL_SECRET` to your [Authsignal secret key](https://portal.authsignal.com/organisations/tenants/api).

The `TEMP_TOKEN_SECRET` is used to encrypt the temporary cookie. Set it to a random string of 32 characters.

The Supabase values can be found under `Settings > API` for your project.

## Step 4: Running the project

Install project dependencies:

```
npm install
# or
yarn install
```

Running the app:

```
npm run dev
# or
yarn dev
```

## Notes

To learn more about Authsignal take a look at the [API Documentation](https://docs.authsignal.com/).
