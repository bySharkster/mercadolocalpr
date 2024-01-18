import './globals.css'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'     
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <SupabaseProvider>
      <html lang="en">
        <body className='bg-white'>
          <Navbar />
          {children}
          <Footer/>
        </body>
        <ToastContainer />
      </html>
    // </SupabaseProvider>
  )
}
