import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

export type AppRole = "beneficiary" | "organization" | "admin";

export async function getAuthorizedUser() {
  const supabase = await createClient();

  // Verify the user's actual Supabase session.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  // Read the role from the protected profiles table.
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role, approval_status")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return null;
  }

  const allowedRoles: AppRole[] = [
    "beneficiary",
    "organization",
    "admin",
  ];

  if (!allowedRoles.includes(profile.role as AppRole)) {
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

  // Optional organization approval check.
  if (
    result.role === "organization" &&
    result.profile.approval_status !== "approved"
  ) {
    redirect("/pending-approval");
  }

  return result;
}