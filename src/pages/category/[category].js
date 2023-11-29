import { useRouter } from "next/router";

export default function Category() {
  const router = useRouter();

  console.log(router.query.category);

  const Categoria = router.query.category;

  return (
    <div className="min-h-screen text-black bg-white">
      <h1 className="p-10 text-4xl font-bold text-center">{Categoria}</h1>
      <div className="divider"></div>
      <div className="grid md:flex">
        <div className="grid gap-4 p-10 border-2 rounded-r-md">
          <input
            type="text"
            placeholder="Keywords"
            className="w-full max-w-xs bg-white border-2 border-black input input-bordered"
          />
          <span>Sales or Rent:</span>
          <div className="flex gap-4">
            <span className="font-bold">Sales:</span>
            <input type="checkbox" checked="checked" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">Rent:</span>
            <input type="checkbox" checked="checked" className="checkbox" />
          </div>
          <span>With images or not:</span>
          <div className="flex gap-4">
            <span className="font-bold">Images:</span>
            <input type="checkbox" checked="checked" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">No images:</span>
            <input type="checkbox" checked="checked" className="checkbox" />
          </div>
          <span className="">Categories:</span>
          <div className="flex justify-between gap-4">
            <input type="checkbox" checked="checked" className="checkbox" />
            <input type="checkbox" checked="checked" className="checkbox" />
            <input type="checkbox" checked="checked" className="checkbox" />
            <input type="checkbox" checked="checked" className="checkbox" />
            <input type="checkbox" checked="checked" className="checkbox" />
          </div>
          <span className="">Area:</span>
          <div className="flex gap-4">
            <span className="font-bold">East:</span>
            <input type="checkbox" checked="checked" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">West:</span>
            <input type="checkbox" checked="checked" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">North:</span>
            <input type="checkbox" checked="checked" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">South:</span>
            <input type="checkbox" checked="checked" className="checkbox" />
          </div>
        </div>
        <div className="flex justify-between gap-4 m-10">
          <div className="grid items-center justify-center p-2 bg-white border-2 rounded-2xl">
            <img
              src="https://picsum.photos/200/300"
              className="w-24 h-24 rounded-2xl"
              alt=""
            />
            <h3>user: catherine</h3>
            <h4>date: 27/3/2023</h4>
          </div>
          <div className="grid items-center justify-center p-2 bg-white border-2 rounded-2xl">
            <img
              src="https://picsum.photos/200/300"
              className="w-24 h-24 rounded-2xl"
              alt=""
            />
            <h3>user: catherine</h3>
            <h4>date: 27/3/2023</h4>
          </div>
          <div className="grid items-center justify-center p-2 bg-white border-2 rounded-2xl">
            <img
              src="https://picsum.photos/200/300"
              className="w-24 h-24 rounded-2xl"
              alt=""
            />
            <h3>user: catherine</h3>
            <h4>date: 27/3/2023</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
