
import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const siteUrl = "https://hands-of-hope.vercel.app";

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=auth_callback_failed", siteUrl)
    );
  }

  const supabase = await createClient();

  const { data, error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(
      new URL("/login?error=auth_callback_failed", siteUrl)
    );
  }

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

  if (profileError || !profile) {
    return NextResponse.redirect(
      new URL("/login?error=profile_not_found", siteUrl)
    );
  }

  if (profile.role === "organization") {
    return NextResponse.redirect(
      new URL("/organization/dashboard", siteUrl)
    );
  }

  if (profile.role === "beneficiary") {
    return NextResponse.redirect(
      new URL("/beneficiary/dashboard", siteUrl)
    );
  }

  if (profile.role === "admin") {
    return NextResponse.redirect(
      new URL("/admin/dashboard", siteUrl)
    );
  }

  return NextResponse.redirect(
    new URL("/login?error=invalid_role", siteUrl)
  );
}
