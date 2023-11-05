import { NavLinks } from "./NavLinks";
import { useState } from "react";

export const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="btn-custom">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
        {/* <NavLinks /> */}
      </button>
      {isOpen ? (
        <div className="menu-nav absolute top-0 text-center left-0 z-10 grid md:justify-between h-auto p-10 bg-[#E1EFE6] border-r-2 border-b-2 border-black text-black font-bold w-72 rounded-br-2xl">
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(!isOpen)} className="btn-custom ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <NavLinks />
        </div>
      ) : null}
    </>
  );
};
