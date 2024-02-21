"use client";

import { Database } from "../../../../database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/auth-helpers-nextjs";
import { ResetPassModal } from "../Modals/ResetPassModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";

interface Props {
  signIn: (formData: FormData) => void;
  signUp: (formData: FormData) => void;
  user: User | null;
}

export const LoginForm = ({ signIn, signUp, user }: Props) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [password, setPassword] = useState("")
  const [isModalActive, setIsModalActive] = useState(false)

  /**
   * Step 1: Send the user an email to get a password reset token.
   * This email contains a link which sends the user back to your application.
  */

  const forgotPassword = async (formData: FormData) => {

    console.log("forgot password");
    const email = formData.get("email") as string;
    const { error } = await supabase.auth
    .resetPasswordForEmail(email);

    
    
    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }
    
    return toast.success("Check email to continue password reset process");
  }

  /**
   * Step 2: Once the user is redirected back to your application,
   * ask the user to reset their password.
   */

  useEffect(() => {
   supabase.auth.onAuthStateChange(async (event, session) => {
     if (event == "PASSWORD_RECOVERY") {
        setIsModalActive(true)
        if (password) {
        const { data, error } = await supabase.auth
         .updateUser({ password: password })

       if (data) alert("Password updated successfully!")
       if (error) alert("There was an error updating your password.")
        }
    }
   })
  }, [])
 
  useEffect(() => {
    if (user) {
      router.push("/account");
    }
  }, [user]);

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-4 text-foreground bg-white p-4 border-2 rounded-md shadow-sm"
      action={signIn}
      aria-label="login-form"
    >
      <h1 className="text-center text-2xl font-extrabold text-">WELCOME</h1>

      {/* Input fields: email & password  */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border-r border-gray-300 bg-gray-50 text-gray-500 text-sm">
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <input
            name="email"
            placeholder="you@example.com"
            required
            type="email"
            id="email"
            autoComplete="email"
            className=" block w-full px-3 py-2  b rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border-r border-gray-300 bg-gray-50 text-gray-500 text-sm">
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <input
            className="px-4 py-2 bg-inherit "
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      {/* Remember ME and Forgot Password */}
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-xs text-gray-900 "
          >
            Remember me
          </label>
        </div>
        <div className="text-xs">
          <button
            formAction={forgotPassword}
            className="font-medium text-green-600 hover:text-green-500"
          >
            Forgot your password?
          </button>
        </div>
      </div>

      {/* Sign in & sign up button */}
      <div className="flex flex-col gap-2">
        <button className="bg-green-700 hover:bg-green-900 text-white rounded-md px-4 py-2  text-foreground">
          Login
        </button>
        <button
          formAction={signUp}
          className="border border-foreground/20 bg-white hover:bg-slate-100  rounded-md px-4 py-2 text-foreground "
        >
          Register
        </button>
      </div>
      {isModalActive &&
        <ResetPassModal setPassword={setPassword}/>
      }
      <ToastContainer />
    </form>
  );
};
