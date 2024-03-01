// ClientComponent.tsx
"use client"
import React from 'react';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../../../../database.types";

export function LogoutButton(): JSX.Element {
  const Logout = async (): Promise<void> => {
    // const supabase = createServerComponentClient<Database>({ cookies });
    // const { error } = await supabase.auth.signOut();
    // if (error) {
    //   console.log(error)
    // }
  }

  return (
    <button type="button" className="btn" onClick={Logout}>
      Logout
    </button>
  );
}