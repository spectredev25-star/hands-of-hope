
import { Suspense, type ReactNode } from "react";

import { requireRole } from "@/libs/auth/authorize";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] dark:bg-[#071B1A]">
      <div className="flex min-h-screen">
        <div className="hidden w-[256px] animate-pulse border-r border-[#DCE7E2] bg-white dark:border-[#244540] dark:bg-[#0D2927] lg:block" />

        <main className="flex-1 p-6 lg:p-10">
          <div className="h-8 w-56 animate-pulse rounded-lg bg-[#DCE7E2] dark:bg-[#244540]" />
          <div className="mt-4 h-4 w-80 max-w-full animate-pulse rounded bg-[#DCE7E2] dark:bg-[#244540]" />
          <div className="mt-10 h-48 animate-pulse rounded-2xl bg-[#DCE7E2] dark:bg-[#0D2927]" />
        </main>
      </div>
    </div>
  );
}

async function AuthorizedBeneficiaryLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireRole(["beneficiary"]);

  return <DashboardShell>{children}</DashboardShell>;
}

export default function BeneficiaryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <AuthorizedBeneficiaryLayout>
        {children}
      </AuthorizedBeneficiaryLayout>
    </Suspense>
  );
}
