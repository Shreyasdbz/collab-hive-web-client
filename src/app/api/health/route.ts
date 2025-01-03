import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/supabase-server-client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.redirect(`${origin}/`);
  } else {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }
}
