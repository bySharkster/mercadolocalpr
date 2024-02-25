import "./globals.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../database.types";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import { Metadata } from "next";
import GoogleAdsense from "../../src/app/components/Ads/GoogleAdsComp";

export const metadata: Metadata = {
  title: "MercadoLocal PR",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className="bg-white">
        <Navbar user={user} />
        {/* <DefaultSeo {...SEO} /> */}
        {children}
        <Footer />
      </body>
      <GoogleAdsense pId="3379371602" />
    </html>
  );
}
