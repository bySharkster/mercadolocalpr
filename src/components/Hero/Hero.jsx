import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    }, []);

    return (
      <div className="min-h-screen bg-[#E1EFE6] flex items-center justify-center">
        <div className="grid text-start lg:flex justify-center items-center bg-[#EFCB68] rounded-2xl w-[100rem] h-[50rem] md:h-[35rem] px-10">
          <div className="p-5 text-black rounded-2xl">
            <h1 className="text-2xl font-medium greeting">Wepa {greetings}</h1>
            <p className="py-5 text-4xl font-semibold">
              Los productos de nosotros son ofrecidos por el pueblo. Agarra lo
              que necesitas o ponte en comunicacion con el vendedor para mas
              informacion.
            </p>
            <Link
              href={"#categories"}
              className="btn-custom"
              style={{ boxShadow: "  " }}
            >
              Empieza ya
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/img/coffee-time.svg"
              alt="hero"
              className="w-32 h-32 bg-white rounded-full md:h-[30rem] md:w-[70rem] hero-image"
            />
          </div>
        </div>
      </div>
    );
}