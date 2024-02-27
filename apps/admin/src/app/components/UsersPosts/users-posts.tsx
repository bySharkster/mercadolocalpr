"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { motion } from "framer-motion";
import type { Database } from "../../../../database.types";
import { Spinner } from "../Spinner/spinner";
type PostTable = Database["public"]["Tables"]["posts"]["Row"];

export function UserPosts ({ catID }: { catID: number }) {
  const supabase = createClientComponentClient<Database>();
  const [posts, setPosts] = useState<PostTable[] | null>(null);
  const [category, setCategory] = useState<PostTable[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("posts").select("*");
      setPosts(data);
      return data;
    };
    void getData();
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      // Perform a query to get posts based on the category name
      const { data } = await supabase
        .from("posts")
        .select(
          "id, title, price, location, created_at, description, category, photo_url, user_id, categories (id, category_name)",
        );

      setCategory(data);
      return data;
    };
    void getCategory();
  }, []);

  if (!posts) return <Spinner />;

  return (
    <>
      {category?
        // ?.filter((post) => post.category === catID)
        .map((post: PostTable) => (
          <Link href={`/post/${post.id}`} key={post.id}>
            <div
              className="w-[38w] md:w-[25vw] lg:w-[15vw] h-[50vh] p-2 bg-white card mb-4"
              // initial={{ opacity: 0, scale: 0.5 }} // initial state
              // animate={{ opacity: 1, scale: 1 }} // animate to this state
              // transition={{ duration: 0.5 }} // transition duration
            >
              <Image
                className="object-cover w-full border-2 rounded-md border-[#A1B5D8] hover:border-[#3A4F41] transition-all"
                src={post.photo_url || "/img/placeholder.jpg"}
                alt={post.title || "No Title"}
                width={500}
                height={300}
              />
              <div className="grid p-2 card-details">
                <h2>Titulo: {post.title || "No Title"}</h2>
                <span>Precio: {post.price}</span>
                <span>Localizacion: {post.location}</span>
                <h4>fecha: {post.created_at}</h4>
                <p>Descripcion: {post.description}</p>
                <span>Categoria: {post.category}</span>
              </div>
              <button className="card-button">More info</button>
            </div>
          </Link>
        ))}
    </>
  );
};
