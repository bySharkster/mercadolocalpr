import React from 'react'
import { headers, cookies } from "next/headers";
import { createClient } from "@/../utils/server";
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../database.types'
import {ProductForm} from '../components/Forms/ProductForm';

export default async function newPost() {

  const supabase = createClientComponentClient<Database>()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
//   async function updateProfile({
//     username,
//     fullname,
//     description,
//     profile_image_url,
//     banner_image_url,
//   }: {
//     username: string | null
//     fullname: string | null
//     description: string | null
//     profile_image_url: string | null
//     banner_image_url: string | null
//   }) {
//     try {
//     //   setLoading(true)

//       const { error } = await supabase.from('profiles').upsert({
//         id: user?.id as string,
//         full_name: fullname,
//         username,
//         description,
//         profile_image_url,
//         banner_image_url,
//         updated_at: new Date().toISOString(),
//       })
//       if (error) throw error
//       alert('Profile updated!')
//     } catch (error) {
//       alert('Error updating the data!')
//     } finally {
//     //   setLoading(false)
//     console.log("updated Profile")
//     }
//   }


  return (
    <div className="space-y-8 p-10">
        <div className="space-y-2">
            <h2 className="text-3xl font-bold">Create a New Post</h2>
            <p className="text-gray-500 dark:text-gray-400">Fill out the form below to list your item for sale.</p>
        </div>
        <ProductForm user={user} />
    </div>
  )
}
