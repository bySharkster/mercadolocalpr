"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
// import { motion } from "framer-motion";
import type { Database } from "../../../../database.types";
type ProfilesTable = Database["public"]["Tables"]["profiles"]["Row"];

export function UserProfile (): JSX.Element{

  const supabase = createClientComponentClient<Database>();
  const [profile, setProfile] = useState<ProfilesTable[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("profiles").select("*");
      setProfile(data);
      return data;
    };
    void getData();
  }, []);

  return (
    <div className="overflow-x-auto p-10">
      <table className="table table-xs border-2 rounded-xl">
        <thead>
          <tr>
            <th></th> 
            <th>Username</th> 
            <th>Description</th> 
            <th>updated_at</th> 
            <th>town of origin</th> 
            <th>Last Login</th> 
            <th>Amount of Posts</th>
            <th>Delete</th>
          </tr>
        </thead> 
        <tbody>
          {profile?.map((user: ProfilesTable) => (
            <tr key={user.id}>
            <th></th> 
            <td>{user.username}</td> 
            <td>{user.description}</td> 
            <td>{user.updated_at}</td> 
            <td>Lajas</td> 
            <td>2024-02-14T02:40:59.907+00:00</td> 
            <td>2</td>
            <td className="flex items-center justify-start">
              <div className="p-3 my-2 border-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
            </td>
          </tr>
          ))}
        </tbody> 
        <tfoot>
          <tr>
            <th></th> 
            <th>Username</th> 
            <th>Description</th> 
            <th>updated_at</th> 
            <th>town of origin</th> 
            <th>Last Login</th> 
            <th>Amount of Posts</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
