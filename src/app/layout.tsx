import type { Metadata } from 'next'
import './globals.css'
import SupabaseProvider from "../../supabase-provider";
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'     

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <SupabaseProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer/>
        </body>
      </html>
    // </SupabaseProvider>
  )
}
