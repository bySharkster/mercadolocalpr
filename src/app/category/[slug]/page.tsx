import {CatPosts} from "../../components/CatPosts/CatPosts";
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  return (
    <div className="min-h-screen text-black bg-white">
      <h1 className="p-10 text-4xl font-bold text-center">{slug}</h1>
      <div className="divider"></div>
      <div className="grid justify-center gap-10 p-10 md:justify-between md:flex bg-slate-100">
        <div className="grid gap-4 p-10 border-2 rounded-md">
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
          <CatPosts/>
        </div>
      </div>
    </div>
  );
}
