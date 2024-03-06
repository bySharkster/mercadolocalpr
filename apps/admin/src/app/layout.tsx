import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../../database.types";
import { SidePanel } from "./components/SidePanel/side-panel";
import { Navbar } from "./components/Navbar/navbar";
import { createClient } from "../../utils/server";
import { LoginForm } from "./components/Form/login-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "MercadoLocalPR - Admin",
  description: "Zona de administración de MercadoLocalPR.",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast(error.message);
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <LoginForm signIn={signIn} user={user}  />
      </main>
    );
  }

  return (
    <html lang="en">
      <body className="grid min-h-screen">
        <Navbar/>
        <div className="flex">
          <SidePanel/>
          <div className="bg-[#3C3C3C] border-[#344E41] rounded-tl-2xl border-2 w-10/12">
            {children}
          </div>
        </div>
        <ToastContainer/>
      </body>
    </html>
  );
}
