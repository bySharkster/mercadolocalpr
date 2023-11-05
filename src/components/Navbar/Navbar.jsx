import Link from "next/link";
import { FaMoon } from "react-icons/fa";
import { NavMenu } from "./NavMenu";

export const Navbar = () => {
  return (
    <div className="bg-[#E1EFE6] navbar">
      <div className="navbar-start">
        <Link href={"/"} className="p-3 text-lg text-white bg-black btn-custom">
          MercadoLocalPR
        </Link>
      </div>
      <div className="navbar-end md:navbar-center">
        <NavMenu />
      </div>
      <div className="hidden gap-2 navbar-end md:flex">
        <button className="btn-custom">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <Link href={"/login"} className="btn-custom">
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
        </Link>
      </div>
    </div>
  );
}