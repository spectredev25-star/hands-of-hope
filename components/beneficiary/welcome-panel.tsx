"use client";

import Link from "next/link";
import { ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function WelcomePanel() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative isolate overflow-hidden rounded-[28px] border border-[#244540] bg-[#0D2927] p-6 text-[#F1F5F4] sm:p-8 lg:p-10"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 360 240"
        fill="none"
        className="pointer-events-none absolute -right-16 -top-14 -z-10 w-64 opacity-20 sm:right-0 sm:top-0 sm:w-80"
      >
        <circle
          cx="210"
          cy="110"
          r="86"
          stroke="#14B8A6"
          strokeWidth="1.2"
        />

        <circle
          cx="210"
          cy="110"
          r="62"
          stroke="#99F6E4"
          strokeWidth="1.2"
        />

        <circle
          cx="210"
          cy="110"
          r="38"
          stroke="#14B8A6"
          strokeWidth="1.2"
        />

        <path
          d="M210 28 C230 56 244 82 210 110 C176 82 190 56 210 28Z"
          fill="#14B8A6"
          fillOpacity="0.35"
        />

        <path
          d="M292 110 C264 130 238 144 210 110 C238 76 264 90 292 110Z"
          fill="#99F6E4"
          fillOpacity="0.25"
        />

        <path
          d="M210 192 C190 164 176 138 210 110 C244 138 230 164 210 192Z"
          fill="#14B8A6"
          fillOpacity="0.35"
        />

        <path
          d="M128 110 C156 90 182 76 210 110 C182 144 156 130 128 110Z"
          fill="#99F6E4"
          fillOpacity="0.25"
        />

        <circle cx="210" cy="110" r="8" fill="#99F6E4" />
      </svg>

      <div className="max-w-xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#99F6E4]/20 bg-[#14B8A6]/10 px-3 py-1.5 text-xs font-medium text-[#99F6E4]">
          <Sparkles size={14} />
          A little hope goes a long way
        </div>

        <h2 className="max-w-lg text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
          Every step forward{" "}
          <span className="text-[#99F6E4]">
            matters.
          </span>
        </h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-[#F1F5F4]/70 sm:text-base">
          Explore available support, follow your requests,
          and stay informed about your next steps. We're
          here to help make the journey a little easier.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/beneficiary/resources"
            className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#14B8A6] px-5 py-3 text-sm font-semibold text-[#071B1A] transition-colors hover:bg-[#99F6E4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#99F6E4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D2927]"
          >
            Explore resources

            <ArrowUpRight
              size={17}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <span className="inline-flex items-center gap-2 text-xs text-[#F1F5F4]/50">
            <Heart size={14} />
            Built around people, not paperwork.
          </span>
        </div>
      </div>
    </motion.section>
  );
}