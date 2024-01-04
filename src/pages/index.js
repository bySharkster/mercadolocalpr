import { Hero } from "../components/Hero/Hero";
import { NuevasPublicaciones } from "../components/Publicaciones/NuevasPublicaciones";
import { TownSelectSection } from "@/components/TownSelectSection/TownSelectSection";

export default function Home() {
  return (
    <>
      <Hero />
      <NuevasPublicaciones />
      <TownSelectSection />
      {/* <Map/> */}
    </>
  );
}
