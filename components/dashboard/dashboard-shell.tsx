"use client";

import { useState, type ReactNode } from "react";

import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { DashboardMobileNav } from "./dashboard-mobile-nav";

type Props = {
  children: ReactNode;
  avatarUrl?: string | null;
  profileName?: string | null;
};

export function DashboardShell({ children, avatarUrl, profileName }: Props) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#172524] transition-colors duration-300 dark:bg-[#071B1A] dark:text-[#F1F5F4]">
      <div className="flex min-h-screen">
        <div className="fixed inset-y-0 left-0 z-30 hidden lg:block">
          <DashboardSidebar />
        </div>
        <div className="min-w-0 flex-1 lg:pl-[256px]">
          <DashboardHeader
            onMenuClick={() => setMobileNavOpen(true)}
            avatarUrl={avatarUrl}
            profileName={profileName}
          />
          <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
            {children}
          </main>
        </div>
      </div>
      <DashboardMobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </div>
  );
}
