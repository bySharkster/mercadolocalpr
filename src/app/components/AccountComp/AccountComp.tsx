'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '../../../../database.types'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'react-toastify';

export const AccountComp = ({ user }: { user: User | null }) => {
  const supabase = createClientComponentClient<Database>()
  const [activeTab, setActiveTab] = useState(false)
  const [activeTab2, setActiveTab2] = useState(false)
  const [activeTab3, setActiveTab3] = useState(true)
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

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
        .select(`full_name, username, avatar_url`)
        .eq('id', user?.id)
        .single()
        console.log(data)
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
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
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
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
    <div className="bg-[#E1EFE6] h-auto">
      <div className="p-10">
        {/* Profile Picture & banner*/}

        <div className="bg-black rounded-lg h-[12rem]">
          <div className="relative flex justify-center items-center w-24 h-24 bg-black border-2 border-black rounded-full top-[9rem] left-32">
            <img src={avatar_url || ''} alt="profile picture" className="w-24 h-24 rounded-full" />
          </div>
        </div>

        {/* User Info */}

        <div className="grid m-10 font-semibold text-black pl-52">
          <div>@Username</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
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
              ? `flex justify-evenly p-10 bg-white mt-4 rounded-lg mx-[15rem]`
              : "hidden"
          }
        >
          <div className="grid col-span-1 gap-4 pr-4 border-r-2">
            <div className="flex justify-around gap-4">
              <span>Tech</span>
              <input type="checkbox" className="checkbox" />
            </div>
            <div className="flex justify-around gap-4">
              <span>Sports</span>
              <input type="checkbox" className="checkbox" />
            </div>
            <div className="flex justify-around gap-4">
              <span>Mechanic</span>
              <input type="checkbox" className="checkbox" />
            </div>
          </div>

          <div className={"grid grid-cols-6 gap-4 cols-span-2"}>
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
              ? `flex justify-evenly p-10 bg-white mt-4 rounded-lg mx-[15rem]`
              : "hidden"
          }
        >
          <div className="grid col-span-1 gap-4 pr-4 border-r-2">
            <div className="flex justify-around gap-4">
              <span>Tech</span>
              <input type="checkbox" className="checkbox" />
            </div>
            <div className="flex justify-around gap-4">
              <span>Sports</span>
              <input type="checkbox" className="checkbox" />
            </div>
            <div className="flex justify-around gap-4">
              <span>Mechanic</span>
              <input type="checkbox" className="checkbox" />
            </div>
          </div>

          <div className={"grid grid-cols-6 gap-4 cols-span-2"}>
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

        {/* Settings tab */}

        <div
          className={
            activeTab3 === true
              ? `flex p-10 bg-white mt-4 rounded-lg`
              : "hidden"
          }
        >
          <div className="grid gap-4">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              type="text" 
              className='border-2 rounded-md p-2 text-white' 
              value={user?.email} 
              disabled 
            />
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              placeholder="Change name:"
              className="w-full max-w-xs bg-white border-2 border-black input input-bordered"
              value={username || 'Change your number'}
            />
            <label htmlFor="Description">Description</label>
            <textarea
              placeholder="Change description:"
              rows={5}
              cols={50}
              className="w-full max-w-xs bg-white border-2 border-black input input-bordered"
            />
            <div className="flex justify-between gap-10">
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
                />
              </div>
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
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span>Banner Profile</span>
                </div>

                <input
                  type="file"
                  className="w-full max-w-xs bg-white border-2 border-black file-input file-input-bordered"
                />
              </div>
            </div>
            <div className='flex justify-between'>
              <button
                className="btn btn-primary block"
                onClick={() => updateProfile({ fullname, username, avatar_url })}
                disabled={loading}
              >
                {loading ? 'Loading ...' : 'Update'}
              </button>
              <form action="/auth/signout" method="post">
                <button className="btn btn-outline block" type="submit">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}