import { Suspense, type ReactNode } from "react";
import { connection } from "next/server";

import { requireRole } from "@/libs/auth/authorize";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

async function AuthorizedOrganizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  await connection();
  await requireRole(["organization"]);

  return <DashboardShell>{children}</DashboardShell>;
}

export default function OrganizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-[#FAFAF7] dark:bg-[#071B1A]" />}
    >
      <AuthorizedOrganizationLayout>
        {children}
      </AuthorizedOrganizationLayout>
    </Suspense>
  );
}
