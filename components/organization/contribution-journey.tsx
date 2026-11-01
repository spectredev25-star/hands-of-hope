"use client";

import { motion } from "motion/react";
import {
  FileText,
  ClipboardCheck,
  CalendarCheck,
  PackageCheck,
} from "lucide-react";

const stages = [
  {
    title: "Submitted",
    description: "Your proposal reaches our team.",
    icon: FileText,
  },
  {
    title: "Review",
    description: "Resources are checked and assessed.",
    icon: ClipboardCheck,
  },
  {
    title: "Collection",
    description: "A collection arrangement is made.",
    icon: CalendarCheck,
  },
  {
    title: "Received",
    description: "Accepted resources enter inventory.",
    icon: PackageCheck,
  },
];

export function ContributionJourney() {
  return (
    <section className="rounded-2xl border border-[#DCE7E2] bg-white p-5 dark:border-[#244540] dark:bg-[#0D2927] sm:p-6">
      <div>
        <p className="text-lg font-semibold text-[#172524] dark:text-[#F1F5F4]">
          Your contribution journey
        </p>
        <p className="mt-1 text-sm text-[#64748B] dark:text-[#F1F5F4]/55">
          See how resources move from your organization to the
          people who need them.
        </p>
      </div>

      <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              className="relative"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
                  <Icon size={20} />
                </div>

                <span className="text-xs font-semibold text-[#0F766E] dark:text-[#99F6E4]">
                  STEP 0{index + 1}
                </span>
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[#172524] dark:text-[#F1F5F4]">
                {stage.title}
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#64748B] dark:text-[#F1F5F4]/55">
                {stage.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
