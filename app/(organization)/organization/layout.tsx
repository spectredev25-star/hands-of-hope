
import { Suspense, type ReactNode } from "react";

import { requireRole } from "@/libs/auth/authorize";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

function DashboardLoading() {
  return (
    <div className="min-h-screen animate-pulse bg-[#FAFAF7] dark:bg-[#071B1A]">
      <div className="mx-auto max-w-[1600px] p-6 lg:p-10">
        <div className="h-8 w-56 rounded-lg bg-[#DCE7E2] dark:bg-[#244540]" />
        <div className="mt-8 h-48 rounded-2xl bg-[#DCE7E2] dark:bg-[#0D2927]" />
      </div>
    </div>
  );
}

async function AuthorizedOrganizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireRole(["organization"]);

  return <DashboardShell>{children}</DashboardShell>;
}

export default function OrganizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <AuthorizedOrganizationLayout>
        {children}
      </AuthorizedOrganizationLayout>
    </Suspense>
  );
}
