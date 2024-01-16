import { Layout } from "../components/Layout/Layout";
import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import SupabaseProvider from "../../supabase-provider";

function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
      <SupabaseProvider>
        <Layout>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </Layout>
      </SupabaseProvider>
  );
}

export default MyApp;
