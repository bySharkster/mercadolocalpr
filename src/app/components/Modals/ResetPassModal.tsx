import React from 'react'

interface Props {
  setPassword: (password: string) => void
}

export const ResetPassModal = ({setPassword}: Props) => {
  return (
    <div className='absolute top-[50%] h-[50vw] w-[50vw] bg-white rounded-lg p-2'>
        <label>
            What will be the new password?
        </label>
        <input
        onChange={ev => setPassword(ev.target.value)}
        >
        </input>
    </div>
  )
}
