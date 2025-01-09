"use server";

import { createServerClient as createClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createServerClient = async () => {
  const cookieStore = await cookies();

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase environment variables");
    }

    return createClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            console.error("Error setting cookies: ", error);
          }
        },
      },
    });
  } catch (error) {
    console.error("Error creating Supabase client: ", error);
    throw error;
  }
};
