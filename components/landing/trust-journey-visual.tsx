
"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  Check,
  CircleDot,
  ShieldCheck,
} from "lucide-react";

import { trustStages } from "./trust-timeline";

interface TrustJourneyVisualProps {
  activeStage: number;
}

export default function TrustJourneyVisual({
  activeStage,
}: TrustJourneyVisualProps) {
  const shouldReduceMotion = useReducedMotion();
  const stage = trustStages[activeStage] ?? trustStages[0];

  const progress =
    (activeStage / (trustStages.length - 1)) * 100;

  const points = [
    { x: 35, y: 65 },
    { x: 160, y: 30 },
    { x: 290, y: 100 },
    { x: 485, y: 65 },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0A2422] shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
      {/* Terminal-style top bar */}
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] bg-black/10 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-rose-400/80" />
          <span className="size-2.5 rounded-full bg-amber-300/80" />
          <span className="size-2.5 rounded-full bg-teal-300/80" />
        </div>

        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
          Resource journey
        </span>

        <span className="text-[10px] font-medium tracking-wider text-teal-300/80">
          HH / 01
        </span>
      </div>

      <div className="p-4 sm:p-7">
        {/* Heading */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-300 sm:text-xs">
              Accountability trace
            </span>

            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Follow the journey.
            </h3>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Each stage has a purpose and a record that helps make
              the process easier to follow.
            </p>
          </div>

          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-teal-300/20 bg-teal-300/[0.07] text-teal-200 sm:size-12">
            <ShieldCheck size={21} strokeWidth={1.6} aria-hidden="true" />
          </span>
        </div>

        {/* Journey labels */}
        <div className="mt-8 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-[10px]">
          <span>Start</span>
          <span>In progress</span>
          <span>Completion</span>
        </div>

        {/* Desktop SVG journey */}
        <div className="mt-3 hidden sm:block">
          <svg
            className="h-auto w-full overflow-visible"
            viewBox="0 0 520 130"
            fill="none"
            role="img"
            aria-label={`Resource journey, stage ${activeStage + 1} of ${trustStages.length}`}
          >
            <defs>
              <linearGradient
                id="trustJourneyGradient"
                x1="0"
                y1="0"
                x2="520"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#14B8A6" />
                <stop offset="1" stopColor="#99F6E4" />
              </linearGradient>
            </defs>

            {/* Full path */}
            <path
              d="M35 65 C95 65 95 30 160 30 S225 100 290 100 S355 65 485 65"
              stroke="#234441"
              strokeWidth="2"
              strokeDasharray="5 7"
              strokeLinecap="round"
            />

            {/* Current progress */}
            <motion.path
              d="M35 65 C95 65 95 30 160 30 S225 100 290 100 S355 65 485 65"
              stroke="url(#trustJourneyGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={false}
              animate={{
                pathLength: Math.max(0.05, progress / 100),
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.65, ease: "easeInOut" }
              }
            />

            {/* Journey nodes */}
            {points.map((point, index) => {
              const isActive = index === activeStage;
              const isPast = index < activeStage;

              return (
                <g key={trustStages[index].id}>
                  {isActive && (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="19"
                      fill="#14B8A6"
                      opacity="0.12"
                    />
                  )}

                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isActive ? 12 : 8}
                    fill={
                      index <= activeStage ? "#0F766E" : "#102F2C"
                    }
                    stroke={isActive ? "#99F6E4" : "#31534F"}
                    strokeWidth={isActive ? 3 : 1.5}
                  />

                  {isPast && (
                    <path
                      d={`M${point.x - 3} ${point.y} l2.5 2.5 l4.5 -5`}
                      stroke="#99F6E4"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {isActive && (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="3"
                      fill="#CCFBF1"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Mobile journey: compact stage buttons */}
        <div className="mt-5 grid grid-cols-4 gap-2 sm:hidden">
          {trustStages.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeStage === index;
            const isPast = index < activeStage;

            return (
              <button
                key={item.id}
                type="button"
                aria-label={`View ${item.title}`}
                aria-pressed={isActive}
                onClick={() => {
                  document
                    .getElementById(`trust-stage-${item.id}`)
                    ?.click();
                }}
                className="flex min-w-0 flex-col items-center gap-2 rounded-xl p-2 text-center outline-none transition-colors hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-teal-300"
              >
                <span
                  className={[
                    "flex size-9 items-center justify-center rounded-full border",
                    isActive
                      ? "border-teal-200 bg-teal-200 text-[#071B1A]"
                      : isPast
                        ? "border-teal-700 bg-teal-900/70 text-teal-200"
                        : "border-white/10 bg-[#0D2927] text-slate-400",
                  ].join(" ")}
                >
                  {isPast ? (
                    <Check size={16} aria-hidden="true" />
                  ) : (
                    <Icon size={16} aria-hidden="true" />
                  )}
                </span>

                <span
                  className={[
                    "text-[10px] leading-4",
                    isActive ? "font-semibold text-teal-200" : "text-slate-400",
                  ].join(" ")}
                >
                  {item.shortTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop stage labels */}
        <div className="mt-1 hidden grid-cols-4 gap-2 sm:grid">
          {trustStages.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={activeStage === index}
              aria-label={`View ${item.title}`}
              onClick={() => {
                document
                  .getElementById(`trust-stage-${item.id}`)
                  ?.click();
              }}
              className={[
                "rounded-lg px-2 py-3 text-center outline-none transition-colors focus-visible:ring-2 focus-visible:ring-teal-300",
                activeStage === index
                  ? "text-teal-200"
                  : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-200",
              ].join(" ")}
            >
              <span className="block text-[10px] font-semibold tracking-widest">
                {item.number}
              </span>
              <span className="mt-1 block text-xs font-medium">
                {item.shortTitle}
              </span>
            </button>
          ))}
        </div>

        {/* Selected stage */}
        <motion.div
          key={stage.id}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.3,
          }}
          aria-live="polite"
          className="mt-6 rounded-2xl border border-white/[0.08] bg-[#071B1A]/80 p-4 sm:mt-8 sm:p-6"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-teal-300/20 bg-teal-300/[0.08] text-teal-200">
              <stage.icon size={21} strokeWidth={1.7} aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-300">
                  Selected stage / {stage.number}
                </span>

                <CircleDot
                  size={13}
                  className="text-teal-300/70"
                  aria-hidden="true"
                />
              </div>

              <h4 className="mt-2 text-base font-semibold text-white sm:text-lg">
                {stage.title}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {stage.description}
              </p>
            </div>
          </div>

          {/* Record associated with the stage */}
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 sm:items-center sm:p-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-teal-300/10 text-teal-200">
              <Check size={16} aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1">
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Associated record
              </span>
              <p className="mt-1 text-xs font-medium leading-5 text-slate-200 sm:text-sm">
                {stage.record}
              </p>
            </div>

            <ArrowDownRight
              size={17}
              className="mt-1 shrink-0 text-teal-300/70 sm:mt-0"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* Footer status */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
          <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400 sm:text-xs">
            <span className="size-1.5 rounded-full bg-teal-300" />
            Process overview
          </span>

          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:text-xs">
            Stage {activeStage + 1} of {trustStages.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.07]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-200"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: "easeInOut" }
            }
          />
        </div>
      </div>
    </div>
  );
}
