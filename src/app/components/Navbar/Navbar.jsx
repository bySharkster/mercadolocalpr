"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { NavLinks } from "./NavLinks";
import { Database } from "../../../../database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseClient =
  createClient <
  Database >
  (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "");

  
  export const Navbar = () => {
    const [session, setSession] = useState(null);
    
    useEffect(() => {
      const fetchSession = async () => {

      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      if (error) return
      if (data) {
        setSession(user);
      }
      console.log(user);
      }
      fetchSession()
    }, [])

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
        <div className="flex gap-2 justify-evenly"></div>
        {session ? (
          <div className="hidden gap-2 md:flex">
            <CiFacebook size={"4vh"} color="white" />
            <CiInstagram size={"4vh"} color="white" />
            <CiHeart size={"4vh"} color="white" />
            <Link
              href={"/profile"}
              className="dropdown dropdown-left dropdown-hover"
            >
              <label tabIndex={0}>
                <CiUser size={"4vh"} color="white" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow custom-style rounded-box w-52"
              >
                <li>
                  <span>Crear publicacion</span>
                </li>
                <li>
                  <Link href={"/user/settings"}>Settings</Link>
                </li>
                <li>
                  <button className="btn" onClick={() => setIsLoggedIn(false)}>
                    Log out
                  </button>
                </li>
              </ul>
            </Link>
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
          <a href="#" className="text-white">
            Conviertace en vendedor
          </a>
        </div>
      </div>
    </nav>
  );
}