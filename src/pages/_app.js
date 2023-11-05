import { Layout } from "../components/Layout/Layout";
import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
// import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // <SessionProvider session={session}>
    <Layout>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
    // {/* </SessionProvider> */}
  );
}

export default MyApp;
