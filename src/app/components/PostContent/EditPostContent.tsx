'use client'
import {useCallback, useEffect, useState} from 'react'
import type { Database } from '../../../../database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { toast } from 'react-toastify'

export const EditPostContent = ({id}: {id: number}) => {
  const supabase = createClientComponentClient<Database>();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [photo_url, setPhoto_url] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user_id, setUser_id] = useState('');
  const [postId, setPostId] = useState<number | null>(null);
  const getUserID = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser_id(user?.id || '')
  }

  const getPosts = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('posts')
        .select(`title, description, price, location, photo_url, category`)
        .eq('user_id', user_id ?? '')
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setTitle(data.title)
        setDescription(data.description)
        setPrice(data.price)
        setLocation(data.location)
        setPhoto_url(data.photo_url)
        // setCategory(data.category)
        // setPostId(data.id)
      }
    } catch (error) {
      toast.error('Error loading post data!');
    } finally {
      setLoading(false)
    }
  }, [user_id, supabase])

  useEffect(() => {
    getUserID()
  }, [])

  useEffect(() => {
    getPosts()
  }, [user_id, getPosts])

  async function updatePost({
    title,
    description,
    price,
    location,
    photo_url,
    category
  }: {
    title: string | null
    description: string | null
    price: number | null
    location: string | null
    photo_url: string | null
    category: string | null
  }) {
    try {
      setLoading(true)

    const { error } = await supabase.from('posts').update({
        title,
        description,
        price,
        location,
        photo_url,
        // category: category ? Number(category) : null,
        // updated_at: new Date().toISOString()
    }).select()
      if (error) throw error
      alert('Post updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  async function deletePost(id: number | null) {
    try {
      setLoading(true)

      const { error } = await supabase.from('posts').delete().eq('id', id?.toString() || '')
      if (error) throw error
      alert('Post deleted!')
    } catch (error) {
      alert('Error deleting the post!')
    } finally {
      setLoading(false)
    }
  }

return (
    <div className='min-h-screen md:flex grid justify-around'>
            <div className='p-10'>
                <Image 
                    src={photo_url || "/img/placeholder.jpg"} 
                    alt={title || 'No Title'}             
                    width={500}
                    height={300}
                    className='rounded-md'
                />
                <input type="file" id="file" className='mt-10 border p-2 rounded-md'/>
            </div>
            <form className='p-10 m-10 grid border rounded-md w-[94vw] md:w-[40vw]'>
                <label className="text-black">Titulo:</label>
                <input type="text" id="title" value={title ?? ''} className='input mt-2' onChange={(e) => setTitle(e.target.value)}/>
                <label className="text-black">Precio:</label>
                <input type="number" id="price" value={price ?? ''} className='input mt-2' onChange={(e) => setPrice(Number(e.target.value))}/>
                <label className="text-black">Localizacion:</label>
                <input type="text" id="location" value={location ?? ''} className='input mt-2' onChange={(e) => setLocation(e.target.value)}/>
                <label className="text-black">Descripcion:</label>
                <textarea id="description" value={description ?? ''} className='rounded-md bg-black' onChange={(e) => setDescription(e.target.value)}/>
                <label className="text-black">Categoria:</label>
                <select id="category" className='input'>

                </select>
                <div className='flex justify-between'>
                  <button 
                      type='submit' 
                      onClick={() => updatePost({        
                          title,
                          description,
                          price,
                          location,
                          photo_url,
                          category
                      })}
                      className='btn mt-6 w-[25vw] md:w-[15vw]'
                  >
                    save
                  </button>
                  <button
                  className='btn mt-6 w-[25vw] md:w-[15vw]'
                  onClick={() => deletePost(postId)}
                  >
                    delete
                  </button>
                </div>
            </form>
    </div>
)
}
