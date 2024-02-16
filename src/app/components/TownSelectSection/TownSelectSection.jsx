"use client";

import Link from "next/link";
import { useState } from "react";
export const TownSelectSection = () => {
  const [numToShow, setNumToShow] = useState(10); // start by showing 10 towns

  const loadMore = () => {
    setNumToShow(numToShow + 10); // show 10 more towns when "Load More" is clicked
  };
  const townNames = [
    "Adjuntas",
    "Aguada",
    "Aguadilla",
    "Aguas Buenas",
    "Aibonito",
    "Anasco",
    "Arecibo",
    "Arroyo",
    "Barceloneta",
    "Barranquitas",
    "Bayamon",
    "Cabo Rojo",
    "Caguas",
    "Camuy",
    "Canovanas",
    "Carolina",
    "Catano",
    "Cayey",
    "Ceiba",
    "Ciales",
    "Cidra",
    "Coamo",
    "Comerio",
    "Corozal",
    "Culebra",
    "Dorado",
    "Fajardo",
    "Florida",
    "Guanica",
    "Guayama",
    "Guayanilla",
    "Guaynabo",
    "Gurabo",
    "Hatillo",
    "Hormigueros",
    "Humacao",
    "Isabela",
    "Jayuya",
    "Juana Diaz",
    "Juncos",
    "Lajas",
    "Lares",
    "Las Marias",
    "Las Piedras",
    "Loiza",
    "Luquillo",
    "Manati",
    "Maricao",
    "Maunabo",
    "Mayaguez",
    "Moca",
    "Morovis",
    "Naguabo",
    "Naranjito",
    "Orocovis",
    "Patillas",
    "Penuelas",
    "Ponce",
    "Quebradillas",
    "Rincon",
    "Rio Grande",
    "Sabana Grande",
    "Salinas",
    "San German",
    "San Juan",
    "San Lorenzo",
    "San Sebastian",
    "Santa Isabel",
    "Toa Alta",
    "Toa Baja",
    "Trujillo Alto",
    "Utuado",
    "Vega Alta",
    "Vega Baja",
    "Vieques",
    "Villalba",
    "Yabucoa",
    "Yauco",
  ];

  // Create an array of objects with IDs and paths
  const townsWithInfo = townNames.map((town, index) => ({
    id: index + 1, // IDs start from 1
    name: town,
    path: `/pueblos/${encodeURIComponent(town)}`, // Create a URL-friendly path
  }));

  return (
    <section id="categories" className="bg-[#E1EFE6] p-10">
      <h1 className="text-4xl font-semibold text-black">Navega por pueblo</h1>
      <div className="grid justify-between grid-cols-2 gap-12 my-24 md:grid-cols-3 justify-items-center md:gap-10 md:flex md:flex-wrap">
        {townsWithInfo.slice(0, numToShow).map((town) => (
          <Link key={town.id} href={town.path}>
            <div className="btn-custom-bottom">
              <span className="font-bold text-center text-black text-md md:text-xl">
                {town.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        {numToShow < townsWithInfo.length && (
          <button onClick={loadMore} className="btn-custom-bottom">
            Load More
          </button>
        )}
      </div>
    </section>
  );
};
