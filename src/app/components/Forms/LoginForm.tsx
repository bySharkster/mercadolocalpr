'use client'

import { Router } from 'next/router'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
 
interface Props {
    signIn: (formData: FormData) => void
    signUp: (formData: FormData) => void
    user: any
}


export const LoginForm = ({signIn, signUp, user}: Props) => {
  const router = useRouter()
    useEffect(() => {
        if (user) {
            router.push('/account')
        }
    }
    , [user])

  return (
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
  )
}
