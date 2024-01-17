import { useRouter } from "next/router";

export default function Pueblos() {

  const router = useRouter();

  console.log(router.query.pueblos);

  const pueblo = router.query.pueblos;

  return (
    <div className="min-h-screen text-black bg-white">
      <h1 className="p-10 text-4xl font-bold">{pueblo}</h1>
      <div className="divider"></div>
      <div className="grid">
        <h2 className="p-10">
          Recien publicados en {pueblo}
        </h2>
        <div className="flex justify-between m-10 overflow-x-scroll">
          <div className="grid items-center justify-center p-2 bg-white border-2 rounded-2xl">
            <img src="https://picsum.photos/200/300" className="w-24 h-24 rounded-2xl" alt="" />
            <h3>user: catherine</h3>
            <h4>date: 27/3/2023</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
