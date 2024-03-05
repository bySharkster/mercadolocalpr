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
    <div className="overflow-x-auto p-10">
      <table className="table table-xs border-2 rounded-xl">
        <thead>
          <tr>
            <th></th> 
            <th>Image</th> 
            <th>Title</th> 
            <th>Price</th> 
            <th>Location</th> 
            <th>created_at</th> 
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead> 
        <tbody> 
          {/* ?.filter((post) => post.category === catID) */}
          {category?.map((post: PostTable) => (
            <tr key={post.id}>
              <th></th>
              {/* <Link href={`/UserPost/${post.id}`} className="flex"> */}
              <td>
                <Image
                  className="object-cover w-full border-2 rounded-md border-[#A1B5D8] hover:border-[#3A4F41] transition-all"
                  src={post.photo_url || "/img/placeholder.jpg"}
                  alt={post.title || "No Title"}
                  width={500}
                  height={300}
                />
              </td>
              <td>{post.title || "No Title"}</td>
              <td>{post.price}</td>
              <td>{post.location}</td>
              <td>{post.created_at}</td>
              <td>{post.description}</td>
              <td>{post.category}</td>
              {/* </Link> */}
            </tr>
          ))}
        </tbody> 
        <tfoot>
          <tr>
            <th></th> 
            <th>Image</th> 
            <th>Title</th> 
            <th>Price</th> 
            <th>Location</th> 
            <th>created_at</th> 
            <th>Description</th>
            <th>Category</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
