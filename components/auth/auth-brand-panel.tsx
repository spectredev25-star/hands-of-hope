"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Heart, HeartHandshake, Sparkles } from "lucide-react";

export function AuthBrandPanel() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <aside className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-[#071B1A] p-10 text-white lg:flex xl:p-14">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#0F766E]/20 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-[#14B8A6]/10 blur-[100px]" />

      {/* Brand */}
      <Link
        href="/"
        className="relative z-10 inline-flex items-center gap-3 self-start"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-[#99F6E4]">
          <HeartHandshake size={24} strokeWidth={1.7} />
        </span>

        <span className="text-xl font-semibold tracking-tight">
          Hands <span className="text-[#99F6E4]">of Hope</span>
        </span>
      </Link>

      {/* Illustration */}
      <div className="relative mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center py-12">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex aspect-square w-full max-w-[360px] items-center justify-center"
        >
          {/* Ambient glow */}
          <div className="absolute inset-10 rounded-full bg-[#14B8A6]/20 blur-3xl" />

          {/* Outer ring */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : { rotate: 360 }
            }
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-8 rounded-full border border-dashed border-[#99F6E4]/20"
          />

          {/* Glass-like background */}
          <div className="absolute inset-[18%] rounded-[36%] border border-white/15 bg-gradient-to-br from-white/15 via-[#14B8A6]/10 to-transparent shadow-2xl shadow-black/20 backdrop-blur-md" />

          {/* Floating heart */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, -12, 0], rotate: [-3, 2, -3] }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 flex h-40 w-40 items-center justify-center rounded-[2.5rem] border border-white/20 bg-gradient-to-br from-[#99F6E4]/30 via-[#14B8A6]/20 to-[#0F766E]/40 shadow-[0_25px_80px_rgba(20,184,166,0.2)] backdrop-blur-xl sm:h-48 sm:w-48"
          >
            <div className="absolute inset-3 rounded-[2rem] border border-white/10" />

            <Heart
              size={96}
              strokeWidth={1.2}
              fill="#99F6E4"
              className="text-[#99F6E4] drop-shadow-[0_0_22px_rgba(153,246,228,0.5)]"
            />

            <motion.span
              animate={
                shouldReduceMotion
                  ? undefined
                  : { scale: [1, 1.15, 1] }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-[#0F766E] shadow-xl"
            >
              <Sparkles size={22} className="text-[#CCFBF1]" />
            </motion.span>
          </motion.div>

          {/* Decorative floating elements */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, -8, 0] }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-4 top-[28%] flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-xl backdrop-blur-lg"
          >
            <HeartHandshake
              size={25}
              className="text-[#99F6E4]"
            />
          </motion.div>

          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, 9, 0] }
            }
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[22%] right-2 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-xl backdrop-blur-lg"
          >
            <Sparkles size={21} className="text-[#99F6E4]" />
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 mt-5 max-w-md text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#99F6E4]">
            Compassion in action
          </p>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight xl:text-4xl">
            Every act of kindness starts somewhere.
          </h2>

          <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-slate-300">
            Connect with people, discover resources, and help
            communities find the support they need.
          </p>
        </motion.div>
      </div>

      {/* Bottom note */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-slate-400">
        <span>Built on compassion.</span>
        <span>Connected by hope.</span>
      </div>
    </aside>
  );
}