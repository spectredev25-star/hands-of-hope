"use client";

import Link from "next/link";
import { ArrowUpRight, PackageOpen } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import type { Resource } from "@/libs/beneficiary/types";

type Props = {
  resource: Resource;
  index?: number;
};

export function ResourceCard({
  resource,
  index = 0,
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.35,
        delay: reduceMotion ? 0 : index * 0.06,
      }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      className="group overflow-hidden rounded-2xl border border-[#DCE7E2] bg-white transition-colors duration-300 dark:border-[#244540] dark:bg-[#0D2927]"
    >
      <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-[#0F766E]/5 dark:bg-[#14B8A6]/5">
        {resource.imageUrl ? (
          // Replace with next/image if we settle on a fixed,
          // configured image source for these resources.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resource.imageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#DCE7E2] bg-white text-[#0F766E] dark:border-[#244540] dark:bg-[#0D2927] dark:text-[#99F6E4]">
            <PackageOpen size={28} strokeWidth={1.5} />
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full border border-[#DCE7E2] bg-white/90 px-3 py-1 text-[10px] font-semibold capitalize text-[#0F766E] backdrop-blur dark:border-[#244540] dark:bg-[#071B1A]/90 dark:text-[#99F6E4]">
          {resource.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-base font-semibold text-[#172524] dark:text-[#F1F5F4]">
          {resource.name}
        </h3>

        <p className="mt-2 min-h-[60px] text-sm leading-5 text-[#64748B] dark:text-[#F1F5F4]/60">
          {resource.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE7E2] pt-4 dark:border-[#244540]">
          <span className="text-[11px] font-medium text-[#0F766E] dark:text-[#99F6E4]">
            {resource.availabilityLabel}
          </span>

          <Link
            href={`/beneficiary/resources/${encodeURIComponent(resource.id)}`}
            aria-label={`View details for ${resource.name}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#DCE7E2] text-[#0F766E] transition-colors hover:border-[#0F766E] hover:bg-[#0F766E] hover:text-white dark:border-[#244540] dark:text-[#99F6E4] dark:hover:border-[#14B8A6] dark:hover:bg-[#14B8A6] dark:hover:text-[#071B1A]"
          >
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}