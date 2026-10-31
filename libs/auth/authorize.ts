import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

export type AppRole = "beneficiary" | "organization" | "admin";

export async function getAuthorizedUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return null;
  }

  const allowedRoles: string[] = [
    "beneficiary",
    "organization",
    "admin",
  ];

  if (!allowedRoles.includes(profile.role)) {
    return null;
  }

  return {
    user,
    profile,
    role: profile.role as AppRole,
  };
}

export async function requireRole(allowedRoles: AppRole[]) {
  const result = await getAuthorizedUser();

  if (!result) {
    redirect("/login");
  }

  if (!allowedRoles.includes(result.role)) {
    redirect("/unauthorized");
  }

  return result;
}