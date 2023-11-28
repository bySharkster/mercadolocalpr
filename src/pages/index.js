import { Hero } from "../components/Hero/Hero";
import { CategorySection } from "../components/CategorySection/CategorySection";
import { NuevasPublicaciones } from "../components/Publicaciones/NuevasPublicaciones";
import { TownSelectSection } from "@/components/TownSelectSection/TownSelectSection";
import { neon } from "@neondatabase/serverless";

// export async function getServerSideProps() {
//   const sql = neon(process.env.DATABASE_URL);

//   const response = await sql`SELECT version()`;
//   console.log(response);
//   return { props: { data: response } };
// }

// export default function Home({ data }) {
export default function Home() {
  return (
    <>
      <Hero />
      {/* <CategorySection /> */}
      <NuevasPublicaciones />
      <TownSelectSection />
      {/* <Map/> */}
    </>
  );
}
