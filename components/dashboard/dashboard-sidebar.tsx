"use client";

import Link from "next/link";
import { HeartHandshake, ArrowUpRight } from "lucide-react";

import { beneficiaryNavigation } from "@/libs/dashboard/navigation";
import { DashboardNavItemLink } from "./dashboard-nav-item";

type Props = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export function DashboardSidebar({
  mobile = false,
  onNavigate,
}: Props) {
  return (
    <aside
      className={[
        "flex h-full flex-col bg-[#071B1A] text-[#F1F5F4]",
        mobile ? "w-full" : "w-[256px]",
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
          <span className="text-sm font-semibold tracking-wide">
            Hands of Hope
          </span>

          <span className="mt-0.5 text-xs text-[#F1F5F4]/50">
            Your support space
          </span>
        </span>
      </Link>

      <div className="px-4 pt-7">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F1F5F4]/40">
          Your space
        </p>

        <nav
          aria-label="Beneficiary navigation"
          className="space-y-1.5"
        >
          {beneficiaryNavigation.map((item) => (
            <div key={item.href} onClick={onNavigate}>
              <DashboardNavItemLink item={item} />
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-2xl border border-[#244540] bg-[#0D2927] p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F766E]/20 text-[#99F6E4]">
            <HeartHandshake size={19} />
          </div>

          <p className="text-sm font-medium">
            Small steps matter.
          </p>

          <p className="mt-1.5 text-xs leading-5 text-[#F1F5F4]/60">
            We're here to help you find the support you need.
          </p>

          <Link
            href="/beneficiary/resources"
            onClick={onNavigate}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#99F6E4] transition-opacity hover:opacity-80"
          >
            Explore resources
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