
"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ClipboardCheck,
  PackageCheck,
  PackageOpen,
  ScanLine,
} from "lucide-react";

export const trustStages = [
  {
    id: "recorded",
    number: "01",
    title: "Resource recorded",
    shortTitle: "Recorded",
    description:
      "An organization records the resources it can make available, including relevant quantities and availability details.",
    detail:
      "Resource records establish what assistance is available before requests are matched to it.",
    record: "Resource details & availability",
    icon: PackageOpen,
  },
  {
    id: "reviewed",
    number: "02",
    title: "Request reviewed",
    shortTitle: "Reviewed",
    description:
      "An organization assesses an assistance request and records its decision.",
    detail:
      "A recorded decision makes the review stage easier to understand and follow.",
    record: "Review status & decision",
    icon: ClipboardCheck,
  },
  {
    id: "collection",
    number: "03",
    title: "Collection arranged",
    shortTitle: "Collection",
    description:
      "Collection or delivery arrangements are recorded so the next step is clear to the relevant people.",
    detail:
      "Recording arrangements helps coordinate the handover without treating an arrangement as a completed delivery.",
    record: "Collection or delivery details",
    icon: ScanLine,
  },
  {
    id: "distributed",
    number: "04",
    title: "Distribution confirmed",
    shortTitle: "Confirmed",
    description:
      "The organization separately records when assistance has actually been provided to the beneficiary.",
    detail:
      "A request being approved or a collection being arranged does not, by itself, prove that assistance was received.",
    record: "Distribution confirmation",
    icon: PackageCheck,
  },
];

interface TrustTimelineProps {
  activeStage: number;
  onStageChange: (index: number) => void;
}

export default function TrustTimeline({
  activeStage,
  onStageChange,
}: TrustTimelineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Timeline connector on larger screens */}
      <div
        aria-hidden="true"
        className="absolute left-6 top-6 bottom-6 w-px bg-white/10 sm:hidden"
      />

      <div
        role="group"
        aria-label="Explore the resource accountability stages"
        className="relative flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-3"
      >
        {trustStages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = activeStage === index;
          const isPast = activeStage > index;

          return (
            <motion.button
              key={stage.id}
              id={`trust-stage-${stage.id}`}
              type="button"
              aria-pressed={isActive}
              aria-label={`${stage.number}: ${stage.title}`}
              onClick={() => onStageChange(index)}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                delay: shouldReduceMotion ? 0 : index * 0.04,
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
              className={[
                "group relative flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-2xl border p-3 text-left outline-none transition-colors duration-200 sm:gap-3.5 sm:p-4",
                "focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A2422]",
                isActive
                  ? "border-teal-300/40 bg-teal-300/[0.09]"
                  : "border-white/[0.07] bg-white/[0.02] hover:border-teal-300/20 hover:bg-white/[0.04]",
              ].join(" ")}
            >
              {/* Active accent */}
              {isActive && (
                <motion.span
                  layoutId="trust-timeline-active"
                  className="absolute bottom-3 left-0 top-3 w-0.5 rounded-full bg-teal-300"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }
                  }
                />
              )}

              {/* Stage icon */}
              <span
                className={[
                  "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-200",
                  isActive
                    ? "border-teal-200/30 bg-teal-200 text-[#071B1A]"
                    : isPast
                      ? "border-teal-500/20 bg-teal-900/60 text-teal-200"
                      : "border-white/[0.08] bg-[#0D2927] text-slate-400 group-hover:text-teal-200",
                ].join(" ")}
              >
                <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
              </span>

              {/* Stage information */}
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-teal-300/80 sm:text-[10px]">
                  Stage {stage.number}
                </span>

                <span
                  className={[
                    "text-xs font-semibold leading-5 sm:text-sm",
                    isActive ? "text-white" : "text-slate-200",
                  ].join(" ")}
                >
                  {stage.title}
                </span>

                <span className="text-[10px] leading-4 text-slate-500 sm:text-xs">
                  {isActive
                    ? "Currently viewing"
                    : isPast
                      ? "Previous stage"
                      : "Select to explore"}
                </span>
              </span>

              {/* State indicator */}
              <span
                aria-hidden="true"
                className={[
                  "size-2 shrink-0 rounded-full transition-colors",
                  isActive
                    ? "bg-teal-300 shadow-[0_0_10px_rgba(94,234,212,0.5)]"
                    : isPast
                      ? "bg-teal-700"
                      : "bg-white/10",
                ].join(" ")}
              />
            </motion.button>
          );
        })}
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Select a stage to explore its purpose and associated record.
      </p>
    </div>
  );
}
