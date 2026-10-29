"use client";

import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type Props = {
  label: string;
  value: number;
  description: string;
  icon: LucideIcon;
  index?: number;
};

export function OverviewStat({
  label,
  value,
  description,
  icon: Icon,
  index = 0,
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: reduceMotion ? 0 : index * 0.07,
      }}
      className="rounded-2xl border border-[#DCE7E2] bg-white p-5 transition-colors duration-300 dark:border-[#244540] dark:bg-[#0D2927]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#64748B] dark:text-[#F1F5F4]/60">
            {label}
          </p>

          <p className="mt-3 text-3xl font-semibold tracking-tight text-[#172524] dark:text-[#F1F5F4]">
            {value.toString().padStart(2, "0")}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
          <Icon size={19} strokeWidth={1.8} />
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-[#64748B] dark:text-[#F1F5F4]/45">
        {description}
      </p>
    </motion.div>
  );
}