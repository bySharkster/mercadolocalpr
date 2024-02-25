"use client";
import { useRouter } from "next/navigation";

export default function Pueblos({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return (
    <div className="min-h-screen text-black bg-white">
      <h1 className="p-10 text-4xl font-bold">{slug}</h1>
      <div className="divider"></div>
      <div className="grid">
        <h2 className="p-10">Recien publicados en {slug}</h2>
        <div className="flex justify-between m-10">
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
