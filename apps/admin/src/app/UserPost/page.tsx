import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../database.types";

export default async function userPost(){
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user){
    return <h1>Not logged in</h1>
  }

  console.log(user);
  return (
    <div>
      <h1>Welcome to OrdenesPage!</h1>
    </div>
  );
}