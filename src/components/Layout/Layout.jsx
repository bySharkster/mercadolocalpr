import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import Head from "next/head";

export const Layout = ({ children }) => {
    return (
        <div>
        <Head>
            <title>MercadoLocalPR</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        {children}
        <Footer/>
        </div>
    );
    }
