import { Hero } from "./components/Hero/Hero";
import { NuevasPublicaciones } from "./components/Publicaciones/NuevasPublicaciones";
import { motion } from "framer-motion";
import { Promociones } from "./components/Promociones/Promociones";
import { CookieConcent } from "./components/CookieConcent/CookieConcent";
export default function Home() {
  return (
    <>
      <Hero />
      <Promociones/>
      <NuevasPublicaciones />
      <CookieConcent />
    </>
  )
}
