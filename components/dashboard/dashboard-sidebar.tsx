"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { HeartHandshake, ArrowUpRight, LogOut } from "lucide-react";

import {
  beneficiaryNavigation,
  organizationNavigation,
  adminNavigation,
  type DashboardNavItem,
} from "@/libs/dashboard/navigation";
import { createClient } from "@/libs/supabase/client";
import { DashboardNavItemLink } from "./dashboard-nav-item";

type DashboardSidebarProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export function DashboardSidebar({
  mobile = false,
  onNavigate,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const isAdmin = pathname.startsWith("/admin");
  const isOrganization = pathname.startsWith("/organization");

  const navigation: DashboardNavItem[] = isAdmin
    ? adminNavigation
    : isOrganization
      ? organizationNavigation
      : beneficiaryNavigation;

  const sectionTitle = isAdmin
    ? "Administration"
    : isOrganization
      ? "Organization"
      : "Your space";

  const workspaceDescription = isAdmin
    ? "Management workspace"
    : isOrganization
      ? "Partner workspace"
      : "Your support space";

  const footerTitle = isAdmin
    ? "Every action creates impact."
    : isOrganization
      ? "Together, we can help."
      : "Small steps matter.";

  const footerDescription = isAdmin
    ? "Your work helps ensure resources reach the people who need them."
    : isOrganization
      ? "Your contributions help bring essential resources to people."
      : "We're here to help you find the support you need.";

  const footerLink = isAdmin
    ? "/admin/requests"
    : isOrganization
      ? "/organization/contributions"
      : "/beneficiary/resources";

  const footerLinkText = isAdmin
    ? "Review requests"
    : isOrganization
      ? "View contributions"
      : "Explore resources";

  async function handleSignOut() {
    setSignOutError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Sign out failed:", error);
        setSignOutError("We couldn't sign you out. Please try again.");
        return;
      }

      onNavigate?.();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      setSignOutError("We couldn't sign you out. Please try again.");
    }
  }

  return (
    <aside
      className={[
        "flex h-dvh min-h-0 flex-col overflow-y-auto overscroll-contain bg-[#071B1A] text-[#F1F5F4]",
        mobile ? "w-full" : "w-[256px] shrink-0",
      ].join(" ")}
    >
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-3 border-b border-[#244540] px-6 py-6"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F766E]">
          <HeartHandshake size={22} strokeWidth={1.8} />
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold tracking-wide">Hands of Hope</span>
          <span className="mt-0.5 text-xs text-[#F1F5F4]/50">{workspaceDescription}</span>
        </span>
      </Link>

      <div className="px-4 pt-7">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F1F5F4]/40">
          {sectionTitle}
        </p>
        <nav aria-label={`${sectionTitle} navigation`} className="space-y-1.5">
          {navigation.map((item) => (
            <div key={item.href} onClick={onNavigate}>
              <DashboardNavItemLink item={item} />
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto space-y-3 p-4">
        <div className="rounded-2xl border border-[#244540] bg-[#0D2927] p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F766E]/20 text-[#99F6E4]">
            <HeartHandshake size={19} />
          </div>
          <p className="text-sm font-medium">{footerTitle}</p>
          <p className="mt-1.5 text-xs leading-5 text-[#F1F5F4]/60">{footerDescription}</p>
          <Link
            href={footerLink}
            onClick={onNavigate}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#99F6E4] transition-opacity hover:opacity-80"
          >
            {footerLinkText}
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {signOutError && (
          <p role="alert" className="px-2 text-xs text-red-300">
            {signOutError}
          </p>
        )}

        <button
          type="button"
          onClick={handleSignOut}
          className="flex min-h-11 w-full items-center gap-3 rounded-xl border border-[#315B54] px-4 text-sm font-medium text-[#F1F5F4]/80 transition-colors hover:border-red-400/50 hover:bg-red-400/10 hover:text-white"
        >
          <LogOut size={17} />
          Sign out
        </button>

        <p className="px-2 pb-1 pt-1 text-center text-[10px] text-[#F1F5F4]/30">
          Every act of kindness counts.
        </p>
      </div>
    </aside>
  );
}
