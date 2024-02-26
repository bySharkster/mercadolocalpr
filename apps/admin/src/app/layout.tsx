import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { SidePanel } from "./components/SidePanel/SidePanel";

export const metadata: Metadata = {
  title: "MercadoLocalPR - Admin",
  description: "Zona de administración de MercadoLocalPR.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <SidePanel/>
        {children}
        
      </body>
    </html>
  );
}
