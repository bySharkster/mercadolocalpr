'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {useEffect, useState} from 'react'
import Image from 'next/image';
import Link from "next/link";
import type { Database } from '../../../../database.types'

type PostTable = Database['public']['Tables']['posts']['Row']

export const CatPosts = () => {
  const supabase = createClientComponentClient<Database>();
  const [posts, setPosts] = useState<PostTable[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("posts").select('*');
      setPosts(data);
    };
    getData();
  }, []);
  return (
    <>
      {posts?.map((post) => (
        <Link 
          href={`/post/${post.id}`} 
          key={post.id}
          className="w-[38w] md:w-[25vw] lg:w-[15vw] h-[50vh] p-2 bg-white border rounded-md"
        >
          <Image
            className="w-full object-cover border rounded-md"
            src={post.photo_url || '/img/placeholder.jpg'}
            alt={post.title || 'No Title'}
            width={500}
            height={300}
          />
          {/* <div className="relative left-0 text-right bottom-40">
            <button className="p-2 border-2 rounded-full" onClick={() => setClicked(!clicked)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={clicked ? 'red' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div> */}
          <div className="p-2 grid">
            <h2>Titulo: {post.title || 'No Title'}</h2>
            <span>Precio: {post.price}</span>
            <span>Localizacion: {post.location}</span>
            <h4>fecha: {post.created_at}</h4>
            <p>Descripcion: {post.description}</p>
            <span>Categoria: {post.category}</span>
          </div>
         </Link>
      ))}
    </>
  );
};
