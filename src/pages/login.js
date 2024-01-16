import { useState } from "react";
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabase } from "../../supabase-provider";
import { getURL } from "../../utils/helpers";
const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Login() {
  const { supabase } = useSupabase();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newUser, setNewUser] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.error('Error signing up:', error.message)
    else router.reload()
  }

  const handleSignIn = async () => {
    const { error } = await supabaseClient.auth.signIn({
      email,
      password,
    });
    if (error) console.error('Error signing in:', error.message)
    else router.reload()
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error signing out:', error.message)
    else router.reload()
  }

  return (
    <div className="flex flex-col p-10 m-10 bg-white rounded-md">
      <Auth
        supabaseClient={supabase}
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