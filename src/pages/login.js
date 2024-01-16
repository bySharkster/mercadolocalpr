import { useState } from "react";
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Login() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newUser, setNewUser] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) console.error('Error signing up:', error.message)
    else router.reload()
  }

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    })
    if (error) console.error('Error signing in:', error.message)
    else router.reload()
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error signing out:', error.message)
    else router.reload()
  }

  return (
    <div className="min-h-screen bg-black">
      <form className="grid p-5 m-10 bg-white rounded-md" onSubmit={handleSignIn}>
        <label className="text-3xl font-bold text-black" htmlFor="email">
          Email
        </label>
        <input
          className="text-black bg-white border-2 rounded-md"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-3xl font-bold text-black" htmlFor="password">
          Password
        </label>
        <input
          className="text-black bg-white border-2 rounded-md"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="grid gap-4 py-4">
          <button type="submit" className="btn">
            Sign In
          </button>
          <button type="button" className="btn" onClick={handleSignUp}>
            Sign Up
          </button>
          <button type="button" className="btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </form>
    </div>
  );
}