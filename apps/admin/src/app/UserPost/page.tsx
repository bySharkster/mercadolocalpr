import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../../../database.types";
import { UserPosts } from "../components/UsersPosts/users-posts";

export default async function UserPost(): Promise<JSX.Element> {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-10 grid gap-4">
      <div className="grid">
        <span className="font-bold">Filter by category</span>
        <div className="flex justify-around gap-4 p-4  mt-5 bg-[#A3B18A] rounded-2xl text-white h-[10vh]">
          <button className="font-bold hover:bg-[#588157] hover:p-2 hover:text-white hover:rounded-md hover:font-bold transition-all" type="button" value={1}>Vehiculos</button>
          <button className="font-bold hover:bg-[#588157] hover:p-2 hover:text-white hover:rounded-md hover:font-bold transition-all" type="button" value={2}>Mascotas</button>
          <button className="font-bold hover:bg-[#588157] hover:p-2 hover:text-white hover:rounded-md hover:font-bold transition-all" type="button" value={3}>Articulos</button>
          <button className="font-bold hover:bg-[#588157] hover:p-2 hover:text-white hover:rounded-md hover:font-bold transition-all" type="button" value={4}>Empleos</button>
          <button className="font-bold hover:bg-[#588157] hover:p-2 hover:text-white hover:rounded-md hover:font-bold transition-all" type="button" value={5}>Servicios</button>
          <button className="font-bold hover:bg-[#588157] hover:p-2 hover:text-white hover:rounded-md hover:font-bold transition-all" type="button" value={6}>Otros</button>
          <button className="font-bold hover:bg-[#588157] hover:p-2 hover:text-white hover:rounded-md hover:font-bold transition-all" type="button" value={7}>Bienes-Raices</button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <UserPosts catID={1}/>
      </div>
    </div>
  );
}