import type { ReactNode } from "react";

import { requireRole } from "@/libs/auth/authorize";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function OrganizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireRole(["organization"]);

  return <DashboardShell>{children}</DashboardShell>;
}