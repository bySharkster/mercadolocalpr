"use client"
import { createClient } from "@supabase/supabase-js";
// import { useRouter } from "next/router";
import { Database } from '../../../database.types'
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { useSupabase } from "../../../supabase-provider";
import { getURL } from "../../../utils/helpers";
import { InfoTest } from "../components/InfoTest/InfoTest";


const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);


export default function Login() {
  return (
  <div className="grid gap-10 xl:gap-0 xl:flex justify-center xl:justify-between p-10 m-10 bg-[#E4F0D0] rounded-md">
    <div className="border-2 p-10 rounded-md bg-white w-[40vw]">
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
    </div>
  </div>
  );
}
