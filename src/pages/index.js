import { Hero } from "../components/Hero/Hero";
import { CategorySection } from "../components/CategorySection/CategorySection";
import { NuevasPublicaciones } from "../components/Publicaciones/NuevasPublicaciones";
import { TownSelectSection } from "@/components/TownSelectSection/TownSelectSection";
// import { Map } from "@/components/Map/Map";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <NuevasPublicaciones />
      <TownSelectSection/>
      {/* <Map/> */}
    </>
  );
}
