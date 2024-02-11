"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

  export const Navbar = ({user}) => { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);   
    useEffect(() => {
      if (user) {
        setIsLoggedIn(true);
      }
    }, [user])

    return (
      <nav className="bg-[#3A4F41]">
        <div className="justify-between p-6 navbar">
          <div className="flex gap-4">
            <Link
              href={"/"}
              className="px-0 lg:px-3 text-sm lg:text-xl font-bold hover:text-[#E1DEE3] transition-all text-white"
            >
              MercadoLocalPR
            </Link>
          </div>
          <div className="hidden lg:flex justify-between bg-white border-2 rounded-md w-[57vw] lg:w-[75vw] mx-10">
            <input
              type="text"
              placeholder="Search"
              className="bg-white input active:border-none focus:border-none focus:ring-0 focus:outline-none"
            />
            <button className="px-[1rem]">
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          {isLoggedIn ? (
            <div className="hidden gap-2 md:flex">
              <CiHeart size={"4vh"} color="white" />
              <div className="dropdown dropdown-left dropdown-hover">
                <label tabIndex={0}>
                  <CiUser size={"4vh"} color="white" />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow rounded-box bg-white w-[10vw]"
                >
                  <li className="py-2 mr-auto w-[9vw]">
                    <Link href={"/account"}>Account</Link>
                  </li>
                  <li className="py-2 mr-auto w-[9vw]">
                    <Link href={"/newPost"}>Crear publicacion</Link>
                  </li>
                  <li className="py-2 mr-auto w-[9vw]">
                    <Link href={"/account#settings"}>Settings</Link>
                  </li>
                  <li className="py-2 mr-auto w-[9vw]">
                    <form action="/auth/signout" method="post">
                      <button
                        className="p-2 flex justify-center items-center w-[8vw] rounded-md bg-[#3A4F41] text-white hover:bg-[black] transition-all"
                        type="submit"
                      >
                        Log out
                      </button>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <Link href={"/login"}>
                <button className="btn-23">
                  <span className="text">Login</span>
                  <span aria-hidden="" className="marquee">
                    Login Signup
                  </span>
                </button>
              </Link>
            </div>
          )}
          <MobileMenu isLoggedIn={isLoggedIn} />
        </div>
        <div className="p-3 bg-white ">
          <NavLinks />
        </div>
        <div className="bg-[#3A4F41] p-3 flex justify-around">
          <div className="flex gap-2">
            <span className="text-white">MercadoLocalPR</span>
            <span className="text-white">© 2021</span>
          </div>
          <div>
            <div href="#" className="text-white">
              Conviertace en vendedor
            </div>
          </div>
        </div>
      </nav>
    );
}