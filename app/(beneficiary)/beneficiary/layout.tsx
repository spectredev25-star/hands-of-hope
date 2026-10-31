import type { ReactNode } from "react";

import { requireRole } from "@/libs/auth/authorize";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function BeneficiaryLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireRole(["beneficiary"]);

  return <DashboardShell>{children}</DashboardShell>;
}