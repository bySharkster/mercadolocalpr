import Image from "next/image";
import { Card } from "@repo/ui/card";


export default function Page(): JSX.Element {
  return (
    <main className="flex min-h-screen">
      <div className="bg-white p-8 text-black">
        <h1 className="text-4xl font-bold text-center">Admin - MercadoLocalPR</h1>
        <div className="grid gap-8 pt-12 font-bold text-lg">
          <span className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Listados de usuarios</span>
          <span className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Perfiles de usuarios</span>
          <span className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Productos</span>
          <span className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Ordenes</span>
          <span className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Reportes</span>
          <span className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Ajustes</span>
        </div>
      </div>
      <div className="bg-[#3C3C3C] min-h-screen w-10/12">
        
      </div>
    </main>
  );
}
