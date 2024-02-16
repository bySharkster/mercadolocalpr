import {CatPosts} from "../../components/CatPosts/CatPosts";
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  let catID = 0;
  if (slug === 'Bienes-Raices') {
    catID = 7;
  } else if (slug === 'Vehiculos') {
    catID = 1;
  } else if (slug === 'Mascotas') {
    catID = 2;
  } else if (slug === 'Articulos') {
    catID = 3;
  } else if (slug === 'Servicios') {
    catID = 5;
  } else if (slug === 'Empleos') {
    catID = 4;
  } else if (slug === 'Otros') {
    catID = 6;
  }
  
  return (
    <div className="min-h-screen text-black bg-[#A1B5D8]">
      <h1 className="p-10 text-6xl font-bold text-start">{slug}</h1>
      <div className="grid justify-center gap-10 p-10 md:justify-between md:flex">
        <div className="grid gap-4 p-10 border-2 rounded-md filter-sidepanel">
          <input
            type="text"
            placeholder="Keywords"
            className="w-full max-w-xs bg-white border-2 border-black input input-bordered"
          />
          <span>Sales or Rent:</span>
          <div className="flex gap-4">
            <span className="font-bold">Sales:</span>
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">Rent:</span>
            <input type="checkbox" className="checkbox" />
          </div>
          <span>With images or not:</span>
          <div className="flex gap-4">
            <span className="font-bold">Images:</span>
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">No images:</span>
            <input type="checkbox" className="checkbox" />
          </div>
          <span className="">Categories:</span>
          <div className="flex justify-between gap-4">
            <input type="checkbox" className="checkbox" />
            <input type="checkbox" className="checkbox" />
            <input type="checkbox" className="checkbox" />
            <input type="checkbox" className="checkbox" />
            <input type="checkbox" className="checkbox" />
          </div>
          <span className="">Area:</span>
          <div className="flex gap-4">
            <span className="font-bold">East:</span>
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">West:</span>
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">North:</span>
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">South:</span>
            <input type="checkbox" className="checkbox" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          <CatPosts catID={catID}/>
        </div>
      </div>
    </div>
  );
}
