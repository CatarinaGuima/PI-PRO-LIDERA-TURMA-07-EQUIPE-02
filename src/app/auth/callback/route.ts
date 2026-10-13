
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=confirmation", requestUrl.origin)
    );
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Erro ao confirmar sessão:", error.message);

    return NextResponse.redirect(
      new URL("/login?error=confirmation", requestUrl.origin)
    );
  }

  return NextResponse.redirect(new URL("/instrucoes", requestUrl.origin));
}
