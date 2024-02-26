import { Card } from "@repo/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../database.types";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();


  return (
    <main>
      <div className="bg-[#3C3C3C] min-h-screen w-10/12">
        
      </div>
    </main>
  );
}
