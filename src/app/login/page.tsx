
import { createClient } from "@/../utils/server";
// import { useRouter } from "next/router";
import { Database } from '../../../database.types'
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { useSupabase } from "../../../supabase-provider";
import { getURL } from "../../../utils/helpers";
import { InfoTest } from "../components/InfoTest/InfoTest";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
export default function Login() {

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }
    console.log("signed in");
    return redirect("/account");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
  <div className="grid gap-10 xl:gap-0 xl:flex justify-center xl:justify-between p-10 m-10 bg-[#E4F0D0] rounded-md">
    {/* <div className="border-2 p-10 rounded-md bg-white w-[40vw]">
      <Auth
        supabaseClient={supabaseClient}
        providers={["github", "google", "facebook"]}
        redirectTo={`${getURL()}/auth/callback`}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#52525b",
              },
            },
          },
        }}
        theme="dark"
      />
    </div>
    <div className="bg-white justify-center flex items-center border-2 rounded-md w-[40vw] xl:w-[50vw]">
      <span className="text-6xl text-black uppercase border-2 rounded-full p-10 hover:bg-black hover:text-white transition-all">
        put epic shit here
      </span>
    </div> */}
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground bg-white p-4 border-2 rounded-md"
        action={signIn}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          Sign In
        </button>
        <button
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
  );
}
