import React from 'react'
import { cookies } from "next/headers";
import {ProductForm} from '../components/Forms/ProductForm';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function newPost() {

  const supabase = createServerComponentClient({cookies});
  const { data: {session} } = await supabase.auth.getSession();

  return (
    <div className="space-y-8 p-10 bg-[#A1B5D8]">
        <div className="space-y-2 text-center">
            <h2 className="text-4xl font-bold text-white">Create a New Post</h2>
            <p className="text-white">Fill out the form below to list your item for sale.</p>
        </div>
        <ProductForm user={session?.user.id} />
    </div>
  )
}
