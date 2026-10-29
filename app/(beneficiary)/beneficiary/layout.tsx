import type { ReactNode } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";

type Props = {
  children: ReactNode;
};

export default function BeneficiaryLayout({ children }: Props) {
  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}