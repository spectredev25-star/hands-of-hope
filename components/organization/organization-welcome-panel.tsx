
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  HeartHandshake,
  PackagePlus,
  Sparkles,
} from "lucide-react";

export function OrganizationWelcomePanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative isolate overflow-hidden rounded-3xl bg-[#071B1A] p-6 text-white sm:p-8 lg:p-10"
    >
      <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-[#0F766E]/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-28 right-1/4 -z-10 h-64 w-64 rounded-full bg-[#14B8A6]/15 blur-3xl" />

      <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#99F6E4]/20 bg-[#0F766E]/20 px-3 py-1.5 text-xs font-medium text-[#99F6E4]">
            <Sparkles size={14} />
            Your impact matters
          </div>

          <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Together, we turn
            <span className="block text-[#99F6E4]">
              generosity into hope.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#F1F5F4]/65 sm:text-base">
            Welcome to your organization workspace. Manage your
            contributions, follow their progress and help essential
            resources reach the people who need them.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/organization/contributions/new"
              className="inline-flex items-center gap-2 rounded-xl bg-[#14B8A6] px-5 py-3 text-sm font-semibold text-[#071B1A] transition hover:bg-[#99F6E4]"
            >
              <PackagePlus size={17} />
              Make a contribution
              <ArrowUpRight size={16} />
            </Link>

            <Link
              href="/organization/contributions"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              View contributions
            </Link>
          </div>
        </div>

        <div className="hidden justify-center lg:flex">
          <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-[#99F6E4]/15 bg-[#0D2927]">
            <div className="absolute inset-4 rounded-full border border-dashed border-[#99F6E4]/25" />
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#0F766E] text-[#99F6E4] shadow-2xl shadow-[#14B8A6]/20">
              <HeartHandshake size={52} strokeWidth={1.3} />
            </div>

            <div className="absolute -right-3 top-7 rounded-xl border border-[#244540] bg-[#0D2927] p-3 text-[#99F6E4] shadow-xl">
              <PackagePlus size={20} />
            </div>

            <div className="absolute -bottom-2 left-2 rounded-xl border border-[#244540] bg-[#0D2927] px-3 py-2 text-xs text-[#99F6E4]">
              Making an impact
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
