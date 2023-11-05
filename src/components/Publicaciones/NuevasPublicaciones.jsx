import React from 'react'

export const NuevasPublicaciones = () => {
  return (
        <section className="bg-[#E1EFE6] p-10">
            <div className='grid items-center justify-center md:justify-between md:flex'>
                <h1 className="text-4xl font-semibold text-black">Nuevas publicaciones</h1>
                <div className='flex gap-5'>
                    <button className='btn-custom'>
                        left
                    </button>
                    <button className='btn-custom'>
                        right
                    </button>
                </div>
            </div>
            <div className="grid justify-between grid-cols-2 gap-12 my-24 justify-items-center md:gap-10 md:flex md:flex-wrap">
                <div className='grid'>
                    <div className='bg-[#AEB7B3] grid border-2 w-32 h-32 md:w-72 md:h-72 rounded-2xl border-slate-200'>
                        <img src="/svgs/users.svg" alt="" />
                    </div>
                    <span className='p-2 font-medium text-black'>article name</span>
                    <div className='badge bg-[#160C28]'>
                        category name
                    </div>
                </div>
                <div className='grid'>
                    <div className='bg-[#AEB7B3] grid border-2 w-32 h-32 md:w-72 md:h-72 rounded-2xl border-slate-200'>
                        <img src="/svgs/users.svg" alt="" />
                    </div>
                    <span className='p-2 font-medium text-black'>article name</span>
                    <div className='badge bg-[#160C28]'>
                        category name
                    </div>
                </div>
                <div className='grid'>
                    <div className='bg-[#AEB7B3] grid border-2 w-32 h-32 md:w-72 md:h-72 rounded-2xl border-slate-200'>
                        <img src="/svgs/users.svg" alt="" />
                    </div>
                    <span className='p-2 font-medium text-black'>article name</span>
                    <div className='badge bg-[#160C28]'>
                        category name
                    </div>
                </div>
                <div className='grid'>
                    <div className='bg-[#AEB7B3] grid border-2 w-32 h-32 md:w-72 md:h-72 rounded-2xl border-slate-200'>
                        <img src="/svgs/users.svg" alt="" />
                    </div>
                    <span className='p-2 font-medium text-black'>article name</span>
                    <div className='badge bg-[#160C28]'>
                        category name
                    </div>
                </div>
            </div>        
        </section>
  )
}
