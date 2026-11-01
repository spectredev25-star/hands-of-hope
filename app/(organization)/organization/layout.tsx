import { Suspense, type ReactNode } from "react";
import { connection } from "next/server";

import { requireRole } from "@/libs/auth/authorize";
import { createClient } from "@/libs/supabase/server";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

async function AuthorizedOrganizationLayout({ children }: { children: ReactNode }) {
  await connection();
  const { user } = await requireRole(["organization"]);
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <DashboardShell
      avatarUrl={profile?.avatar_url}
      profileName={profile?.full_name}
    >
      {children}
    </DashboardShell>
  );
}

export default function OrganizationLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAF7] dark:bg-[#071B1A]" />}>
      <AuthorizedOrganizationLayout>{children}</AuthorizedOrganizationLayout>
    </Suspense>
  );
}
