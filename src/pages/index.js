import { Hero } from "../components/Hero/Hero";
import { CategorySection } from "../components/CategorySection/CategorySection";
import { NuevasPublicaciones } from "../components/Publicaciones/NuevasPublicaciones";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <NuevasPublicaciones />
    </>
  );
}
