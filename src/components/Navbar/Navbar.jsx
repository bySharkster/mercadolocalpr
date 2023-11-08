import Link from "next/link";
import { useState } from "react";
import { NavMenu } from "./NavMenu";

export const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-[#E1EFE6] navbar justify-between">
      <div>
        <Link
          href={"/"}
          className="p-3 text-lg text-white bg-black btn-custom-left"
        >
          MercadoLocalPR
        </Link>
      </div>
      <div>
        <NavMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      </div>
      <div className="hidden gap-2 md:flex">
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
        {isLoggedIn ? (
          <button className="btn-custom dropdown dropdown-left dropdown-hover">
            <label tabIndex={0}>
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
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow custom-style rounded-box w-52"
            >
              <li>
                <span>Crear publicacion</span>
              </li>
              <li>
                <Link href={'/user/settings'}>Settings</Link>
              </li>
              <li>
                <button
                  className="btn-custom-right"
                  onClick={() => setIsLoggedIn(false)}
                >
                  Log out
                </button>
              </li>
            </ul>
          </button>
        ) : (
          <Link
            href={"/login"}
            onClick={() => setIsLoggedIn(true)}
            className="btn-custom"
          >
            Sign in/ Sign up
          </Link>
        )}
      </div>
    </div>
  );
}