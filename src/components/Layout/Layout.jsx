import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import Head from "next/head";
import { useSession } from "next-auth/react";

export const Layout = ({ children }) => {
    const { data: session } = useSession();
    return (
        <div>
        <Head>
            <title>MercadoLocalPR</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar session={session}/>
        {children}
        <Footer/>
        </div>
    );
    }
