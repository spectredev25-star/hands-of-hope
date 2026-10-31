import { requireRole } from "@/libs/auth/authorize";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { beneficiaryNavigation } from "@/libs/dashboard/navigation";

export default async function BeneficiaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireRole(["beneficiary"]);

  return (
    <DashboardShell
      navigation={beneficiaryNavigation}
      user={user}
    >
      {children}
    </DashboardShell>
  );
}