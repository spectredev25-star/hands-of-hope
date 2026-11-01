
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  Eye,
  Fingerprint,
  ShieldCheck,
} from "lucide-react";

import TrustTimeline, { trustStages } from "./trust-timeline";
import TrustJourneyVisual from "./trust-journey-visual";

export default function TrustSection() {
  const [activeStage, setActiveStage] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="accountability"
      aria-labelledby="trust-section-heading"
      className="relative isolate overflow-hidden bg-[#071B1A] px-4 py-16 text-slate-50 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-32 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-teal-500/[0.09] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-emerald-500/[0.05] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(153,246,228,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(153,246,228,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        {/* Introduction + interactive timeline */}
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Left: section introduction */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col items-start"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/[0.07] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">
              <ShieldCheck size={16} aria-hidden="true" />
              <span>Built on accountability</span>
            </div>

            <h2
              id="trust-section-heading"
              className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Every resource matters.
              <br />
              <span className="text-teal-300">
                Every action counts.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              Assistance should be more than a promise. Hands of Hope
              is designed to make resource management, request review,
              and distribution easier to follow and account for.
            </p>

            {/* Principles */}
            <div className="mt-8 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition-colors hover:border-teal-300/20 hover:bg-white/[0.04]">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-teal-300/20 bg-teal-300/10 text-teal-200">
                  <Eye size={19} aria-hidden="true" />
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-white sm:text-base">
                    Visibility
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Make each stage easier to follow.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition-colors hover:border-teal-300/20 hover:bg-white/[0.04]">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-teal-300/20 bg-teal-300/10 text-teal-200">
                  <Fingerprint size={19} aria-hidden="true" />
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-white sm:text-base">
                    Accountability
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Keep a record of important actions.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="#how-it-works"
              className="mt-7 inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-teal-200 transition-colors hover:text-teal-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#071B1A]"
            >
              Revisit the workflow
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Right: interactive timeline experience */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[#0A2422] shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-5 sm:px-6">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-300 sm:text-xs">
                  The accountability journey
                </span>
                <p className="mt-2 text-sm text-slate-300 sm:text-base">
                  Explore what happens at each stage.
                </p>
              </div>

              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-teal-300/20 bg-teal-300/[0.07] text-teal-200">
                <ArrowDownRight size={19} aria-hidden="true" />
              </span>
            </div>

            <div className="p-4 sm:p-6">
              <TrustTimeline
                activeStage={activeStage}
                onStageChange={setActiveStage}
              />

              {/* Selected stage explanation */}
              <div className="mt-5 rounded-2xl border border-white/[0.08] bg-[#071B1A]/70 p-4 sm:p-5">
                <motion.div
                  key={activeStage}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.25,
                  }}
                  aria-live="polite"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-300">
                    What this stage means
                  </span>

                  <h3 className="mt-2 text-base font-semibold text-white">
                    {trustStages[activeStage].title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {trustStages[activeStage].detail}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Journey visual */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
          className="mt-8 sm:mt-10"
        >
          <TrustJourneyVisual activeStage={activeStage} />
        </motion.div>

        {/* Closing statement */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-7 text-center sm:mt-14 sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-teal-300/20 bg-teal-300/[0.08] text-sm font-bold tracking-tight text-teal-200">
              HH.
            </span>

            <p className="max-w-lg text-sm leading-6 text-slate-300">
              From available resources to confirmed distribution,
              every stage has a purpose.
            </p>
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-300/80 sm:text-xs">
            Transparency by design
          </span>
        </div>
      </div>
    </section>
  );
}
