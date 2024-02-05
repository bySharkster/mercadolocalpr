"use client"
import { useState, useEffect, SetStateAction } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Spinner } from "../Spinner/Spinner"
import { ReactSortable } from "react-sortablejs"
import { Database } from '../../../../database.types'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProductForm = ({user}: {user: any}) => {
  const supabase = createClientComponentClient<Database>()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  const submitPost = async ({
    title,
    description,
    price,
    location,
    // category,
    // images,
  }: {
    title: string | null
    description: string | null
    price: string | null
    location: string | null
    // category: string | null
    // images: string | null
  }) => {
    try {
    //   setLoading(true)

      const { error } = await supabase.from('posts').insert([{
        title,
        description,
        price,
        location,
        user_id: user?.id as string,
        // category,
        // images,
        updated_at: new Date().toISOString(),
      }])
      if (error) throw error
      alert('Post created!')
    } catch (error) {
      alert('Error creating the post!')
    } finally {
    //   setLoading(false)
    console.log("created Post")
    }
  };

  // function fetchCategories() {
  //   axios.get("/api/categories").then((result) => {
  //     setCategoires(result.data);
  //   });
  // }

  if (goToProducts) {
    router.push("/");
  }
     
  // async function uploadImages(ev) {
  //   const files = ev.target?.files;
  //   if (files?.length > 0) {
  //     setIsUploading(true);
  //     const data = new FormData();
  //     for (const file of files) {
  //       data.append('file', file);
  //     }
  //     const res = await axios.post('/api/upload', data);
  //     setImages(oldImages => {
  //       return [...oldImages, ...res.data.links];
  //     });
  //     setIsUploading(false);
  //   }
  // }

  function updateImagesOrder(images: SetStateAction<never[]>) {
    setImages(images);
  }

  // function setProductProp(propName, value) {
  //   setProductProperties(oldProps => {
  //     const newProductProps = { ...oldProps };
  //     newProductProps[propName] = value;
  //     return newProductProps;
  //   });
  // }

  return (
    <>
      <form className="grid">
        <input
          type="text"
          placeholder="Nombre del articulo"
          className="p-3 bg-white border-2 rounded-md"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <select 
          disabled 
          className="p-3 my-3 bg-white border-2 rounded-md"
          value={category} 
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value="0">Uncategorized</option>
          {/* {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))} */}
        </select>
        <input
          type="number"
          placeholder="Precio del articulo"
          className="p-3 bg-white border-2 rounded-md"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <textarea
          placeholder="Descripcion"
          className="p-3 bg-white border-2 rounded-md my-3"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Localizacion"
          className="p-3 bg-white border-2 rounded-md"
          value={location}
          onChange={(ev) => setLocation(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Condicion"
          className="p-3 my-3 bg-white border-2 rounded-md"
          value={condition}
          onChange={(ev) => setCondition(ev.target.value)}
        />
        <label>Photos</label>
        {!!images?.length && (
          <div className="h-8 text-lg">
            <div className="text-gray-500">Drag to reorder</div>
          </div>
        )}
        <div className="flex flex-wrap gap-1 mb-2">
          <ReactSortable
            list={images}
            className="flex flex-wrap gap-1"
            setList={updateImagesOrder}
          >
            {!!images?.length &&
              images.map((link) => (
                <div
                  key={link}
                  className="h-24 p-4 bg-white border border-gray-200 rounded-md shadow-sm"
                >
                  <img src={link} alt="" className="rounded-lg" />
                </div>
              ))}
          </ReactSortable>

          {isUploading && (
            <div className="flex items-center h-24">
              <Spinner />
            </div>
          )}
          <label className="flex items-center justify-center w-24 h-24 gap-1 text-sm text-center bg-white border rounded-lg shadow-md text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
              />
            </svg>
            <div>Upload</div>
            {/* <input type="file" onChange={uploadImages} className="hidden" /> */}
          </label>
          <div className="space-y-2">
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="photos"
            >
                Photos
            </label>
            <input
                className="bg-transparent flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="photos"
                multiple
                type="file"
            />
          </div>
        </div>
        <button
        className="btn"
        type="submit"
        onClick={() => submitPost({ title, description, price, location: location.toString() })}
        >
        Submit Post
        </button>
      </form>
      <ToastContainer />
    </>
  );
};
