"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import type { Database } from "../../../../database.types";
import Image from "next/image";

type PostTable = Database["public"]["Tables"]["posts"]["Row"];

export const NuevasPublicaciones = () => {
  const supabase = createClientComponentClient<Database>();
  const [posts, setPosts] = useState<PostTable[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("posts").select('*').range(0,3);
      setPosts(data);
    };
    getData();
  }, []);
  return (
    <section className="bg-[#FFFCF7] p-10">
      <div className="grid items-center justify-center md:justify-between md:flex">
        <h1 className="text-4xl font-semibold text-black">
          Nuevas publicaciones
        </h1>
        <div className="flex justify-between gap-5 pt-10 md:pt-0">
          <button className="btn-custom">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <button className="btn-custom">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid justify-between grid-cols-2 gap-12 my-24 justify-items-center md:gap-10 md:flex md:flex-wrap">
        {posts?.map((post) => (
        <div key={post.id} className="grid">
          <div className="bg-[#AEB7B3] grid w-32 h-32 md:w-72 md:h-[12rem] rounded-2xl border-slate-200">
            <Image 
              src={post.photo_url || '/img/placeholder.jpg'} 
              alt={post.title || 'No Title'}
              width={600}
              height={300}
            />
          </div>
          <div className="grid p-2 font-medium text-black">
            <span className="text-3xl uppercase">{post.title || 'No Title'}</span>
            <span>{post.price}</span>
            <span>{post.location}</span>
            <span className="badge bg-[#160C28]"> {post.category}</span>
          </div>
        </div>
        ))}
      </div>
    </section>
  );
};
