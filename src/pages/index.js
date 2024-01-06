import { Hero } from "../components/Hero/Hero";
import { NuevasPublicaciones } from "../components/Publicaciones/NuevasPublicaciones";
import { TownSelectSection } from "@/components/TownSelectSection/TownSelectSection";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="grid bg-[#7C616C] p-10">
        {/* <div className="container py-10 mx-auto">
          <h2 className="text-3xl text-center text-white">
            ¿Qué es el Mercado de Trueque?
          </h2>
          <p className="text-center text-white">
            El Mercado de Trueque es un espacio de intercambio de productos y
            servicios, donde se fomenta la economía solidaria y el consumo
            responsable.
          </p>
        </div> */}
        <div className="text-center">
          <h1 className="p-5 text-4xl text-white">Promocionados</h1>
        </div>
        <div className="flex justify-around overflow-x-auto">
          <div className="p-10 bg-white h-[10vh] w-[10vw] rounded-lg shadow-xl shadow-white border-2 border-slate-200"></div>
          <div className="p-10 bg-white h-[10vh] w-[10vw] rounded-lg shadow-xl shadow-white border-2 border-slate-200"></div>
          <div className="p-10 bg-white h-[10vh] w-[10vw] rounded-lg shadow-xl shadow-white border-2 border-slate-200"></div>
          <div className="p-10 bg-white h-[10vh] w-[10vw] rounded-lg shadow-xl shadow-white border-2 border-slate-200"></div>
          <div className="p-10 bg-white h-[10vh] w-[10vw] rounded-lg shadow-xl shadow-white border-2 border-slate-200"></div>
          <div className="p-10 bg-white h-[10vh] w-[10vw] rounded-lg shadow-xl shadow-white border-2 border-slate-200"></div>
        </div>
      </div>
      <NuevasPublicaciones />
      <TownSelectSection />
      {/* <Map/> */}
    </>
  );
}
