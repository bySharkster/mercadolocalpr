// Import the necessary modules from their respective packages
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Define the GET request handler
export async function GET(request) {
  // Create a new URL object from the request URL
  const requestUrl = new URL(request.url);
  // Extract the 'code' query parameter from the URL
  const code = requestUrl.searchParams.get("code");

  // If a 'code' query parameter is present
  if (code) {
    // Create a new cookie store
    const cookieStore = cookies();
    // Create a new Supabase client for route handlers, passing the cookie store
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    // Exchange the 'code' for a session (i.e., sign the user in)
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect the user to the origin of the request URL after the sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
