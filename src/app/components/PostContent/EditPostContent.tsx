'use client'
import {useCallback, useEffect, useState} from 'react'
import type { Database } from '../../../../database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { toast } from 'react-toastify'
type PostTable = Database['public']['Tables']['posts']['Row']

export const EditPostContent = ({id}: {id: number}) => {
    console.log(id)
  const supabase = createClientComponentClient<Database>();
  const [postState, setPostState] = useState<PostTable[] | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [photo_url, setPhoto_url] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

    const getPosts = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('posts')
        .select(`title, description, price, location, photo_url, category`)
        .eq('user_id', id ?? '')
        .single()
        console.log(data)
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setTitle(data.title)
        setDescription(data.description)
        setPrice(data.price)
        setLocation(data.location)
        setPhoto_url(data.photo_url)
        setCategory(data.category.toString())
      }
    } catch (error) {
      toast.error('Error loading post data!');
    } finally {
      setLoading(false)
    }
  }, [id, supabase])

  useEffect(() => {
    getPosts()
  }, [id, getPosts])


  useEffect(() => {
    const getData = async () => {
      const { data: posts } = await supabase.from('posts').select('*').eq('id', id)
        setPostState(posts);
        setCategory(posts && String(posts[0]?.category) || null);
    }

    getData()
  }, [])

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

    const { error } = await supabase.from('posts').upsert({
        title,
        description,
        price,
        location,
        photo_url,
        category: category ? Number(category) : null,
        updated_at: new Date().toISOString()
    })
      if (error) throw error
      alert('Post updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

return (
    <div className='min-h-screen md:flex grid justify-around'>
            <div className='p-10'>
                <Image 
                    src={postState && postState[0]?.photo_url || "/img/placeholder.jpg"} 
                    alt={postState && postState[0]?.title || 'No Title'}             
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
                <input type="number" id="price" value={(postState && postState[0]?.price) ?? 0} className='input mt-2' onChange={(e) => setPrice(Number(e.target.value))}/>
                <label className="text-black">Localizacion:</label>
                <input type="text" id="location" value={(postState && postState[0]?.location) ?? ''} className='input mt-2' onChange={(e) => setLocation(e.target.value)}/>
                <label className="text-black">Descripcion:</label>
                <textarea id="description" value={(postState && postState[0]?.description) ?? ''} className='rounded-md bg-black' onChange={(e) => setDescription(e.target.value)}/>
                <label className="text-black">Categoria:</label>
                <select id="category" className='input'>
                    
                </select>
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
                    className='btn mt-6'
                >
                  save
                </button>
            </form>
    </div>
)
}
