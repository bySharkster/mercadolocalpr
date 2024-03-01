import React from 'react';
import { UserProfile } from '../components/UserProfile/user-profiles';

export default function UserProfiles(): JSX.Element {
  return (
    <div>
      <h1 className='p-10 font-bold text-3xl'>Welcome to UserProfiles!</h1>
      <div className='py-5 pl-10'>
        <div className='flex items-center justify-start gap-2'>
          <span className='text-2xl font-semibold'>Filter</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
        </div>
        <div className='flex gap-5 pt-2'>
          <button className='badge badge-neutral badge-lg'>
            Town
          </button>
          <button className='badge badge-neutral badge-lg'>
            Date
          </button>
        </div>
      </div>
      <UserProfile />
    </div>
  );
}