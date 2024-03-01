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
          <button className="font-bold hover:bg-[#588157] hover:p-3 hover:text-white hover:rounded-md hover:font-bold transition-all" type="button" value={1}>Vehiculos</button>
          <button className="font-bold hover:bg-[#588157] hover:p-3 hover:text-white hover:rounded-md hover:font-bold transition-all" type="button" value={2}>Mascotas</button>
          <button className="font-bold hover:bg-[#588157] hover:p-3 hover:text-white hover:rounded-md hover:font-bold transition-all" type="button" value={3}>Articulos</button>
          <button className="font-bold hover:bg-[#588157] hover:p-3 hover:text-white hover:rounded-md hover:font-bold transition-all" type="button" value={4}>Empleos</button>
          <button className="font-bold hover:bg-[#588157] hover:p-3 hover:text-white hover:rounded-md hover:font-bold transition-all" type="button" value={5}>Servicios</button>
          <button className="font-bold hover:bg-[#588157] hover:p-3 hover:text-white hover:rounded-md hover:font-bold transition-all" type="button" value={6}>Otros</button>
          <button className="font-bold hover:bg-[#588157] hover:p-3 hover:text-white hover:rounded-md hover:font-bold transition-all" type="button" value={7}>Bienes-Raices</button>
        </div>
        <ul className="menu bg-slate-500 lg:menu-horizontal justify-center mx-auto mt-3 rounded-box">
          <li>
            <button type="button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Inbox
              <span className="badge badge-sm">99+</span>
            </button>
          </li>
          <li>
            <button type="button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Updates
              <span className="badge badge-sm badge-warning">NEW</span>
            </button>
          </li>
          <li>
            <button type="button">
              Stats
              <span className="badge badge-xs badge-info"></span>
            </button>
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-4">
        <UserPosts catID={1}/>
      </div>
    </div>
  );
}