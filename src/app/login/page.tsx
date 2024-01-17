"use client"

import { useState } from "react";
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
  // const { supabase } = useSupabase();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newUser, setNewUser] = useState(false);
  // const router = useRouter();

  // const handleSignUp = async () => {
  //   const { error } = await supabaseClient.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       redirectTo: `${window.location.origin}/auth/callback`,
  //     },
  //   });
  //   if (error) console.error("Error signing up:", error.message);
  //   // else router.reload();
  // };

  // const handleSignIn = async () => {
  //   const { error } = await supabaseClient.auth.signIn({
  //     email,
  //     password,
  //   });
  //   if (error) console.error("Error signing in:", error.message);
  //   // else router.reload();
  // };

  // const handleSignOut = async () => {
  //   const { error } = await supabaseClient.auth.signOut();
  //   if (error) console.error("Error signing out:", error.message);
  //   // else router.reload();
  // };

  const LogOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) console.error("Error signing out:", error.message);
    else console.log("Signed Out");
  }

  const LogIn = async () => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: 'gregor.gr20@gmail.com',
      password: 'greg_123',
    })
    if (error) console.log(error)
    else console.log(data)
  }
  

  return (
    <div className="flex flex-col p-10 m-10 bg-white rounded-md">
      <button className="btn" onClick={LogIn}>Log In</button>
      <button className="btn" onClick={LogOut}>Log Out</button>
      {/* <InfoTest/> */}
      <Auth
        supabaseClient={supabaseClient}
        providers={["github"]}
        redirectTo={`${getURL()}/auth/callback/route`}
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
  );
}
