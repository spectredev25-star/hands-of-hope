"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HeartHandshake,
  ArrowUpRight,
  LayoutDashboard,
  Package,
  ClipboardList,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { beneficiaryNavigation } from "@/libs/dashboard/navigation";
import { DashboardNavItemLink } from "./dashboard-nav-item";

type SidebarNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

const organizationNavigation: SidebarNavItem[] = [
  {
    label: "Overview",
    href: "/organization/dashboard",
    icon: LayoutDashboard,
    description: "Organization overview",
  },
  {
    label: "My contributions",
    href: "/organization/contributions",
    icon: Package,
    description: "Track submitted contributions",
  },
  {
    label: "New contribution",
    href: "/organization/contributions/new",
    icon: ClipboardList,
    description: "Propose resources",
  },
  {
    label: "Profile",
    href: "/organization/profile",
    icon: UserRound,
    description: "Manage organization details",
  },
];

export function DashboardSidebar({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const isOrganization = pathname.startsWith("/organization");

  const navigation: SidebarNavItem[] = isOrganization
    ? organizationNavigation
    : beneficiaryNavigation;

  const sectionTitle = isOrganization
    ? "Organization"
    : "Your space";

  const workspaceDescription = isOrganization
    ? "Partner workspace"
    : "Your support space";

  const footerTitle = isOrganization
    ? "Together, we can help."
    : "Small steps matter.";

  const footerDescription = isOrganization
    ? "Your contributions help bring essential resources to people."
    : "We're here to help you find the support you need.";

  const footerLink = isOrganization
    ? "/organization/contributions"
    : "/beneficiary/resources";

  const footerLinkText = isOrganization
    ? "View contributions"
    : "Explore resources";

  return (
    <aside
      className={[
        "flex h-full flex-col bg-[#071B1A] text-[#F1F5F4]",
        mobile ? "w-full" : "w-[256px]",
      ].join(" ")}
    >
      {/* Brand */}
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-3 border-b border-[#244540] px-6 py-6"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F766E]">
          <HeartHandshake size={22} strokeWidth={1.8} />
        </span>

        <span className="flex flex-col">
          <span className="text-sm font-semibold tracking-wide">
            Hands of Hope
          </span>

          <span className="mt-0.5 text-xs text-[#F1F5F4]/50">
            {workspaceDescription}
          </span>
        </span>
      </Link>

      {/* Navigation */}
      <div className="px-4 pt-7">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F1F5F4]/40">
          {sectionTitle}
        </p>

        <nav
          aria-label={`${sectionTitle} navigation`}
          className="space-y-1.5"
        >
          {navigation.map((item) => (
            <div key={item.href} onClick={onNavigate}>
              <DashboardNavItemLink item={item} />
            </div>
          ))}
        </nav>
      </div>

      {/* Encouragement panel */}
      <div className="mt-auto p-4">
        <div className="rounded-2xl border border-[#244540] bg-[#0D2927] p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F766E]/20 text-[#99F6E4]">
            <HeartHandshake size={19} />
          </div>

          <p className="text-sm font-medium">
            {footerTitle}
          </p>

          <p className="mt-1.5 text-xs leading-5 text-[#F1F5F4]/60">
            {footerDescription}
          </p>

          <Link
            href={footerLink}
            onClick={onNavigate}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#99F6E4] transition-opacity hover:opacity-80"
          >
            {footerLinkText}
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <p className="px-2 pb-1 pt-4 text-center text-[10px] text-[#F1F5F4]/30">
          Every act of kindness counts.
        </p>
      </div>
    </aside>
  );
}