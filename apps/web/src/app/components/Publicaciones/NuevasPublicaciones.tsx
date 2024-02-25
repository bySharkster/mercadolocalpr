"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import type { Database } from "../../../../database.types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type PostTable = Database["public"]["Tables"]["posts"]["Row"];

export const NuevasPublicaciones = () => {
  const supabase = createClientComponentClient<Database>();
  const [posts, setPosts] = useState<PostTable[] | null>(null);
  const [loadMore, setLoadMore] = useState(4); // Add loadMore state

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("posts").select("*").range(0, 3);
      setPosts(data);
    };
    getData();
  }, []);

  const handleLoadMore = async () => {
    //  needs improvement vv

    setLoadMore(loadMore + 4);
    if (loadMore > 12) {
      setLoadMore(12);
    }

    // needs improvement ^^

    const { data } = await supabase
      .from("posts")
      .select("*")
      .range(0, loadMore);
    setPosts(data);
  };

  return (
    <section className="bg-[#FFFCF7] p-10">
      <div className="grid items-center justify-center">
        <h1 className="text-4xl font-semibold text-black">
          Chekea nuestras nuevas publicaciones
        </h1>
      </div>
      <div className="grid justify-between grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 my-24 justify-items-center md:gap-10">
        {posts?.map((post) => (
          <Link href={`/post/${post.id}`} key={post.id}>
            <motion.div
              className="w-[38w] md:w-[25vw] lg:w-[15vw] h-[35vh] card bg-[#C2D8B9]"
              initial={{ opacity: 0, scale: 0.5 }} // initial state
              animate={{ opacity: 1, scale: 1 }} // animate to this state
              transition={{ duration: 0.5 }} // transition duration
            >
              <Image
                src={post.photo_url || "/img/placeholder.jpg"}
                alt={post.title || "No Title"}
                width={600}
                height={300}
                className="border-2 rounded-md border-[#A1B5D8] hover:border-[#3A4F41] transition-all"
              />
              <div className="card-details">
                <span className="text-2xl uppercase">
                  {post.title || "No Title"}
                </span>
                <span className="badge bg-[#160C28]">{post.category}</span>
              </div>
              <button className="card-button">More info</button>
            </motion.div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button className="btn" onClick={handleLoadMore}>
          Load More
        </button>
      </div>
    </section>
  );
};
