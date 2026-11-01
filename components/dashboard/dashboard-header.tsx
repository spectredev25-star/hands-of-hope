
"use client";

import { Bell, Menu, Search } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/layout/theme-toggle";

type Props = {
  onMenuClick: () => void;
};

export function DashboardHeader({ onMenuClick }: Props) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const pathname = usePathname();

  const isOrganization = pathname.startsWith("/organization");

  const heading = isOrganization
    ? "Organization workspace"
    : "Your support space";

  const description = isOrganization
    ? "Manage contributions. Make an impact."
    : "Find support. Take your next step.";

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-4 border-b border-[#244540]/60 bg-[#071B1A]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-xl p-2 text-[#F1F5F4]/75 transition-colors hover:bg-white/[0.07] lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[#244540] text-[#99F6E4] sm:flex">
          <Search size={18} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-[#F1F5F4]">
            {heading}
          </p>

          <p className="hidden truncate text-xs text-[#F1F5F4]/45 sm:block">
            {description}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <ThemeToggle />

        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            onClick={() =>
              setNotificationsOpen((current) => !current)
            }
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#244540] text-[#F1F5F4]/75 transition-colors hover:bg-white/[0.06] hover:text-[#99F6E4]"
          >
            <Bell size={19} />
            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[#14B8A6]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-[#244540] bg-[#0D2927] p-4 shadow-2xl">
              <p className="text-sm font-medium text-[#F1F5F4]">
                Notifications
              </p>

              <p className="mt-2 text-xs leading-5 text-[#F1F5F4]/60">
                Your latest updates will appear here.
              </p>
            </div>
          )}
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#244540] bg-[#0F766E]/20 text-sm font-semibold text-[#99F6E4]">
          H
        </div>
      </div>
    </header>
  );
}