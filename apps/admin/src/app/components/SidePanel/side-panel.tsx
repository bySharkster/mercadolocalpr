import React from 'react'
import Link from 'next/link';

export function SidePanel(): JSX.Element {
  return (
    <div className="bg-white p-8 text-black">
        <Link href={'/'} className="text-lg md:text-4xl font-bold text-center">Admin - MercadoLocalPR</Link>
        <div className="grid gap-8 pt-12 font-bold text-lg">
          <Link href={"/UserPost"} className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Listados de usuarios</Link>
          <Link href={"/userprofile"} className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Perfiles de usuarios</Link>
          <Link href={"/"} className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Productos</Link>
          <Link href={"/"} className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Ordenes</Link>
          <Link href={"/"} className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Reportes</Link>
          <Link href={"/"} className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Ajustes</Link>
        </div>
    </div>
  );
}
