import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImageResp } from "../ImageResp/ImageResp";
import { CategorySection } from "../CategorySection/CategorySection";
export const Hero = () => {
    const date = new Date();
    const currentHour = date.getHours();
    const [greetings, setGreetings] = useState("Good afternoon!");
    
    useEffect(() => {
      const getGreetings = () => {
        if (currentHour < 12) {
          setGreetings("Buenos Dias!");
        } else if (currentHour < 18) {
          setGreetings("Buenas tardes!");
        } else {
          setGreetings("Buenas Noches!");
        }
      };
      getGreetings();
    }, [currentHour]);

      const categories = [
        {
          id: 1,
          category: "Bienes-Raices",
          icon: "/svgs/house.svg",
        },
        {
          id: 2,
          category: "Alquiler-o-vacaciones",
          icon: "/svgs/rental.svg",
        },
        {
          id: 3,
          category: "Automoviles",
          icon: "/svgs/car.svg",
        },
        {
          id: 4,
          category: "Mascotas",
          icon: "/svgs/pet.svg",
        },
        {
          id: 5,
          category: "Articulos",
          icon: "/svgs/couch.svg",
        },
        {
          id: 6,
          category: "Empleos",
          icon: "/svgs/users.svg",
        },
        {
          id: 7,
          category: "Servicios",
          icon: "/svgs/services.svg",
        },
      ];

    // useEffect(() => { 
    //   fetch("/api/table")
    //     .then((res) => res.json())
    //     .then((data) => console.log(data));
    // }, []);

    return (
      <div className="min-h-screen bg-[#E1EFE6] flex items-center justify-center">
        <div className="grid text-start lg:flex justify-center items-center bg-[#EFCB68] rounded-2xl w-[100vw] lg:w-[100rem] h-[32rem] md:h-[50rem] xl:h-[35rem] px-10 mx-10">
          <div
            className="p-5 text-black rounded-2xl"
            style={{ width: "inherit" }}
          >
            {/* <h1 className="text-2xl font-medium greeting">Wepa {greetings}</h1> */}
            <h1 className="text-5xl font-bold lg:text-6xl greeting">
              Encuentra lo que necesites aqui.
            </h1>
            <div className="flex items-center justify-center w-full p-4 my-5 bg-white rounded-full">
              <input
                className="w-full text-sm text-black bg-white lg:text-xl active:outline-none focus:outline-none"
                placeholder="empieza a buscar"
              />
              <div className="divider divider-horizontal" />
              <div className="flex items-center justify-center gap-10">
                <div className="flex items-center justify-between text-sm lg:text-xl">
                  <div>
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
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <span>00667</span>
                </div>
                <div className="p-2 bg-red-500 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 lg:w-6 lg:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex gap-10 overflow-auto">
              {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.category}`}>
                  <div className="grid items-center justify-center">
                    <div className="flex items-center justify-center">
                      <img
                        src={category.icon}
                        alt="category icon"
                        className="w-20 h-20 cat-img"
                      />
                    </div>
                    <span className="font-bold text-center text-black text-md md:text-lg">
                      {category.category}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* <div className={"image-container"}>
            <ImageResp src={"/img/coffee-time.svg"} alt={"hero"} />
          </div> */}
        </div>
      </div>
    );
}