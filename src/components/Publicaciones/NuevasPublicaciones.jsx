import React from 'react'

export const NuevasPublicaciones = () => {
  return (
    <section className="bg-[#E1EFE6] p-10">
      <div className="grid items-center justify-center md:justify-between md:flex">
        <h1 className="text-4xl font-semibold text-black">
          Nuevas publicaciones
        </h1>
        <div className="flex justify-between gap-5 pt-10 md:pt-0">
          <button className="btn-custom">
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <button className="btn-custom">
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
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid justify-between grid-cols-2 gap-12 my-24 justify-items-center md:gap-10 md:flex md:flex-wrap">
        <div className="grid">
          <div className="bg-[#AEB7B3] grid border-2 w-32 h-32 md:w-72 md:h-72 rounded-2xl border-slate-200">
            <img src="/svgs/users.svg" alt="" />
          </div>
          <span className="p-2 font-medium text-black">article name</span>
          <div className="badge bg-[#160C28]">category name</div>
        </div>
        <div className="grid">
          <div className="bg-[#AEB7B3] grid border-2 w-32 h-32 md:w-72 md:h-72 rounded-2xl border-slate-200">
            <img src="/svgs/users.svg" alt="" />
          </div>
          <span className="p-2 font-medium text-black">article name</span>
          <div className="badge bg-[#160C28]">category name</div>
        </div>
        <div className="grid">
          <div className="bg-[#AEB7B3] grid border-2 w-32 h-32 md:w-72 md:h-72 rounded-2xl border-slate-200">
            <img src="/svgs/users.svg" alt="" />
          </div>
          <span className="p-2 font-medium text-black">article name</span>
          <div className="badge bg-[#160C28]">category name</div>
        </div>
        <div className="grid">
          <div className="bg-[#AEB7B3] grid border-2 w-32 h-32 md:w-72 md:h-72 rounded-2xl border-slate-200">
            <img src="/svgs/users.svg" alt="" />
          </div>
          <span className="p-2 font-medium text-black">article name</span>
          <div className="badge bg-[#160C28]">category name</div>
        </div>
      </div>
    </section>
  );
}
