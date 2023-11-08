import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { useState } from "react";

export const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="btn-custom-bottom">
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
        <div className="fixed menu-nav top-0 text-center left-0 z-10 grid md:justify-between h-auto p-10 bg-[#E1EFE6] font-bold w-72 custom-style">
          <div className="flex justify-between py-5">
            <Link
              href={"/"}
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 text-lg text-black btn-custom-left"
            >
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
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>
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
          <NavLinks setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
      ) : null}
    </>
  );
};
