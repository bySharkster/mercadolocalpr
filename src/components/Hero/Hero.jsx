import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImageResp } from "../ImageResp/ImageResp";
import { getExampleTable } from "../../../db/simple-connect";

export const Hero = () => {
    const date = new Date();
    const currentHour = date.getHours();
    const [greetings, setGreetings] = useState("Good afternoon!");

    useEffect(() => {
      getExampleTable();
    }
    , []);
    
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

    return (
      <div className="min-h-screen bg-[#E1EFE6] flex items-center justify-center">
        <div className="grid text-start lg:flex justify-center items-center bg-[#EFCB68] rounded-2xl w-[100rem] h-[32rem] md:h-[50rem] xl:h-[35rem] px-10 mx-10">
          <div className="p-5 text-black rounded-2xl">
            <h1 className="text-2xl font-medium greeting">Wepa {greetings}</h1>
            <p className="py-5 font-semibold text-md md:text-4xl">
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
          <div className={"image-container"}>
            <ImageResp src={"/img/coffee-time.svg"} alt={"hero"} />
          </div>
        </div>
      </div>
    );
}