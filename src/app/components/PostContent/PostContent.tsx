'use client'
import {useEffect, useState} from 'react'
import type { Database } from '../../../../database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
type PostTable = Database['public']['Tables']['posts']['Row']

export const PostContent = ({id}: {id: number}) => {
  const supabase = createClientComponentClient<Database>();
  const [postState, setPostState] = useState<PostTable[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      const { data: posts } = await supabase.from('posts').select('*').eq('id', id)
        setPostState(posts);
    }

    getData()
  }, [])

console.log(postState)

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
            </div>
            <div className='p-10 grid'>
                <h2 className='text-3xl'>Titulo: {postState && postState[0]?.title || 'No Title'}</h2>
                <span className='text-2xl'>Precio: {postState && postState[0]?.price}</span>
                <span>Localizacion: {postState && postState[0]?.location}</span>
                <h4>fecha: {postState && postState[0]?.created_at}</h4>
                <p>Descripcion: {postState && postState[0]?.description}</p>
                <span>Categoria: {postState && postState[0]?.category}</span>
            </div>
    </div>
)
}
