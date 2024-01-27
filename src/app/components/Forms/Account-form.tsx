'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '../../../../database.types'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'react-toastify';

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()
        console.log(data)
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
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

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
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

  return (
    <div className="form-widget border-2 p-4 w-[30vw] m-4 rounded-md">
      <div className='flex gap-4 items-center'>
        <label htmlFor="email">Email</label>
        <input className='border-2 rounded-md p-2' id="email" type="text" value={user?.email} disabled />
      </div>
      <div className='flex gap-4 items-center'>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          className='border-2 rounded-md p-2'
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div className='flex gap-4 items-center'>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          className='border-2 rounded-md p-2'
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='flex gap-4 items-center'>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          className='border-2 rounded-md p-2'
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ fullname, username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}