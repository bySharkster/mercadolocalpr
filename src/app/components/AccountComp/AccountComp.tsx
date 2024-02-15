'use client'
import { useCallback, useEffect, useState } from 'react'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ToastContainer, toast } from 'react-toastify';
import type { Database } from '../../../../database.types'
import Link from 'next/link';
import { motion } from 'framer-motion';
import {ImageResp} from '../ImageResp/ImageResp';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

type PostTable = Database['public']['Tables']['posts']['Row']
const CDNURL = "https://ysctqzmvjoqsftxjrvto.supabase.co/storage/v1/object/public/images/"
type FileObject = {
  created_at: string
  id: string
  last_accessed_at: string
  // metadata: {
  //   cacheControl
  //   : 
  //   "max-age=3600"
  //   contentLength
  //   : 
  //   2469809
  //   eTag
  //   : 
  //   "\"cd857f219347d8c2270cdd6d79c1a579\""
  //   httpStatusCode
  //   : 
  //   200
  //   lastModified
  //   : 
  //   "2024-02-09T18:19:09.000Z"
  //   mimetype
  //   : 
  //   "image/jpeg"
  //   size
  //   : 
  //   2469809
  // }
  name: string
  updated_at: string

};


export const AccountComp = ({ user }: { user: User | null }) => {
  const supabase = createClientComponentClient<Database>()
  const [posts, setPosts] = useState<PostTable[] | null>(null);
  const [activeTab, setActiveTab] = useState(false)
  const [activeTab2, setActiveTab2] = useState(false)
  const [activeTab3, setActiveTab3] = useState(true)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string | null>(null)
  const [profileImageUrl, setprofileImageUrl] = useState<string | null>(null)
  const [bannerImageUrl, setbannerImageUrl] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<FileObject[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();
  let imageUrl: string;
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files ? event.target.files[0] : null;
  //   setFile(file);

  //   // Create a URL representing the file
  //   if (file) {
  //     setPreviewUrl(URL.createObjectURL(file));
  //   } else {
  //     setPreviewUrl(null);
  //   }
  // };

  const handletab = () => {
    setActiveTab(true)
    setActiveTab2(false)
    setActiveTab3(false)
  }

  const handletab2 = () => {
    setActiveTab(false)
    setActiveTab2(true)
    setActiveTab3(false)
  }

  const handletab3 = () => {
    setActiveTab(false)
    setActiveTab2(false)
    setActiveTab3(true)
  }

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, description, profile_image_url, banner_image_url`)
        .eq('id', user?.id ?? '')
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setDescription(data.description)
        setprofileImageUrl(data.profile_image_url)
        setbannerImageUrl(data.banner_image_url)
      }
    } catch (error) {
      toast.error('Error loading user data!');
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("posts").select('*').eq('user_id', user?.id ?? '');
      setPosts(data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  })

  // change 2 functions below

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    if (newUsername.length > 12) {
      toast.error('Username cannot be longer than 12 characters!');
    } else {
      setUsername(newUsername);
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = event.target.value;
    if (newDescription.length > 100) {
      toast.error('Description cannot be longer than 100 characters!');
    } else {
      setDescription(newDescription);
    }
  }

  async function updateProfile({
    username,
    description,
    profile_image_url,
    banner_image_url,
  }: {
    username: string | null
    description: string | null
    profile_image_url: string | null
    banner_image_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        username,
        description,
        profile_image_url,
        banner_image_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  async function getImages() {
    const { data, error } = await supabase.storage.from('images').list(`${user}/`, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }, 
    })
    console.log(data)
    if (data !== null) {
      setImages(data);
      imageUrl = CDNURL + user + "/" + images[1]?.name;
    } else {
      console.log(error)
    }
  }

  const uploadFiles = async (ev: any) => {
    let file = ev.target.files[0]
    
    const { data, error } = await supabase.storage.from('images').upload(`${user}/` + uuidv4(), file)
    
    if (data) {
      getImages();
    } else {
      console.log(error)
    }
  }

  return (
    <div className="bg-[#E1EFE6] h-auto">
      <div className="p-10">
        {/* Profile Picture & banner*/}

        <div className="bg-black rounded-lg h-[12rem]">
          <div className="relative flex justify-center items-center w-24 h-24 bg-black border-2 border-black rounded-full top-[9rem] left-32">
            <img src={profileImageUrl || ''} alt="profile picture" className="w-24 h-24 rounded-full" />
          </div>
        </div>

        {/* User Info */}

        <div className="grid m-10 font-semibold text-black">
          <div className='text-4xl font-bold'>{username}</div>
          <div className='pt-2 text-lg'>{description}</div>
        </div>

        {/* Tab titles */}

        <div className="flex justify-around">
          <button
            onClick={handletab}
            className={
              `` +
              (activeTab === true
                ? "text-black transition-all pb-4 font-bold  border-b-2 border-black"
                : "")
            }
          >
            job postings
          </button>
          <button
            onClick={handletab2}
            className={
              `` +
              (activeTab2 === true
                ? "text-black transition-all pb-4 font-bold  border-b-2 border-black"
                : "")
            }
          >
            Listed Items
          </button>
          <button
            onClick={handletab3}
            className={
              `` +
              (activeTab3 === true
                ? "text-black transition-all pb-4 font-bold  border-b-2 border-black"
                : "")
            }
          >
            Settings
          </button>
        </div>

        {/*↓ Tab display block ↓*/}

        {/* Listed Jobs tab */}

        <div
          className={
            activeTab === true
              ? `flex justify-evenly p-10 bg-white mt-4 rounded-lg mx-auto w-[100%] md:w-[50%]`
              : "hidden"
          }
        >
          <div className={"grid grid-cols-1 md:grid-cols-4 gap-10"}>
            <div className="w-32 h-32 p-4 border-2 border-black rounded-md">
              hi
            </div>
            <div className="w-32 h-32 p-4 border-2 border-black rounded-md">
              hi
            </div>
            <div className="w-32 h-32 p-4 border-2 border-black rounded-md">
              hi
            </div>
            <div className="w-32 h-32 p-4 border-2 border-black rounded-md">
              hi
            </div>
            <div className="w-32 h-32 p-4 border-2 border-black rounded-md">
              hi
            </div>
            <div className="w-32 h-32 p-4 border-2 border-black rounded-md">
              hi
            </div>
          </div>
        </div>

        {/* Listed Items tab */}

        <div
          className={
            activeTab2 === true
              ? `grid justify-evenly p-10 bg-white mt-4 rounded-lg m-auto`
              : "hidden"
          }
        >
          <div className=''>
            <h1 className="text-4xl font-bold text-black">Articulos publicados:</h1>
            <span>Maneja sus publicaciones</span>
          </div>
          <div className='flex justify-between items-center'>
            Filtrar por categoria:
            <select
              className="p-3 bg-white border-2 rounded-md"
              onChange={(ev) => console.log(ev.target.value)}
            >
              <option value="all">All</option>
              <option value="clothing">Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="vehicles">Vehicles</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className='flex justify-evenly p-10 bg-white mt-4 rounded-lg m-auto gap-12'>
            {posts?.length === 0 && <div>No posts yet</div>}
            {posts?.map((post) => (
              <Link 
                href={`/editPost/${post.id}`} 
                key={post.id}
              >
                <motion.div 
                className="w-[38w] md:w-[25vw] lg:w-[15vw] h-[35vh] p-2 bg-white border rounded-md"
                initial={{ opacity: 0, scale: 0.5 }} // initial state
                animate={{ opacity: 1, scale: 1 }} // animate to this state
                transition={{ duration: 0.5 }} // transition duration

                >
                  <ImageResp
                    src={post.photo_url || '/img/placeholder.jpg'} 
                    alt={post.title || 'No Title'}
                    width={400}
                    height={500}
                  />
                  <div className="grid p-2 font-bold text-black">
                    <span className="text-2xl uppercase">{post.title || 'No Title'}</span>
                    <span className="badge bg-[#160C28]">{post.category}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Settings tab */}

        <div
          className={
            activeTab3 === true
              ? `p-10 bg-white mt-4 rounded-lg w-[100%] md:w-[90vw] flex justify-between`
              : "hidden"
          }
        >
          <form className="grid gap-4">
            <h1 className='text-4xl font-bold text-black'>Perfil</h1>
            <span className='text-slate-500'>Actualiza tu informacion. Los cambios se veran reflejados en la plataforma.</span>
            <label htmlFor="email">Correo Electronico</label>
            <input 
              id="email" 
              type="text" 
              className='border-2 rounded-md p-2 text-white' 
              value={user?.email} 
              disabled 
            />
            <label htmlFor="Name">Nombre</label>
            <input
              type="text"
              className="bg-white border-2 border-black input input-bordered"
              value={username ?? ''}
              onChange={handleUsernameChange}
            />
            <label htmlFor="Description">Descripcion</label>
            <textarea
              className="bg-white border-2 border-black input input-bordered min-h-[100px]"
              value={description ?? ''}
              onChange={ev => setDescription(ev.target.value)}
            />
            <div className="pt-5">
              <div className="grid gap-4 p-4 border-2 border-gray-300 rounded-md">
                <div className="flex gap-4">
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <span>User Profile</span>
                </div>
                <input
                  type="file"
                  className="w-full max-w-xs bg-white border-2 border-black file-input file-input-bordered"
                  onChange={(ev) => uploadFiles(ev)}
                />
                {previewUrl && <img className='h-[30vh] w-[20vw]' src={previewUrl} alt="Preview" />}
              </div>
              <div className="grid gap-4 p-4 border-2 border-gray-300 rounded-md mt-5">
                <div className="flex gap-4">
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
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span>Banner Profile</span>
                </div>

                <input
                  type="file"
                  className="w-full max-w-xs bg-white border-2 border-black file-input file-input-bordered"
                  onChange={(ev) => uploadFiles(ev)}
                />
              </div>
            </div>
            <div className='flex justify-between pt-10'>
              <button
                className="btn w-[100%]"
                onClick={() => updateProfile({ username, profile_image_url: profileImageUrl, banner_image_url: bannerImageUrl, description})}
                disabled={loading}
              >
                {loading ? 'Loading ...' : 'Update'}
              </button>
            </div>
          </form>
          <div>
            <h1>Upgrade account?</h1>
            <span>Experimental</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}