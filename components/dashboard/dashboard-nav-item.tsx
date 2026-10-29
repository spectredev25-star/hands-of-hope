"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import type { DashboardNavItem } from "@/libs/dashboard/navigation";

type Props = {
  item: DashboardNavItem;
};

export function DashboardNavItemLink({ item }: Props) {
  const pathname = usePathname();

  const isActive =
    pathname === item.href ||
    (item.href !== "/beneficiary/dashboard" &&
      pathname.startsWith(`${item.href}/`));

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      title={item.description ?? item.label}
      className={[
        "group relative flex items-center gap-3 rounded-xl px-3 py-3",
        "text-sm font-medium outline-none transition-colors duration-200",
        "focus-visible:ring-2 focus-visible:ring-[#14B8A6]",
        isActive
          ? "bg-[#0F766E] text-white"
          : "text-[#F1F5F4]/70 hover:bg-white/[0.06] hover:text-[#F1F5F4]",
      ].join(" ")}
    >
      {isActive && (
        <motion.span
          layoutId="dashboard-active-indicator"
          className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#99F6E4]"
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 32,
          }}
        />
      )}

      <motion.span
        className="flex shrink-0 items-center justify-center"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.18 }}
      >
        <Icon size={19} strokeWidth={1.8} />
      </motion.span>

      <span>{item.label}</span>

      {isActive && (
        <motion.span
          layoutId="dashboard-active-dot"
          className="ml-auto h-1.5 w-1.5 rounded-full bg-[#99F6E4]"
        />
      )}
    </Link>
  );
}