"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, HeartHandshake } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { AnimatedHeadline } from "@/components/landing/animated-headline";
import { Navbar } from "@/components/landing/navbar";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const entrance = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative isolate flex min-h-[760px] min-h-svh items-center overflow-hidden bg-[#071B1A]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('Hands of Generosity.webp')",
        }}
      />

      <div
        aria-hidden="true"
        className="hero-overlay absolute inset-0 -z-10"
      />

      <div
        aria-hidden="true"
        className="hero-glow -left-40 top-1/3"
      />

      <Navbar />

      <div className="container-shell relative z-10 flex w-full flex-col justify-center pb-20 pt-30 sm:pb-24 sm:pt-35">
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.14,
                delayChildren: reduceMotion ? 0 : 0.15,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div
            variants={entrance}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200/20 bg-teal-100/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-200 backdrop-blur-sm sm:text-sm"
          >
            <HeartHandshake className="size-4" />
            A stronger, kinder tomorrow
          </motion.div>

          <motion.div variants={entrance}>
            <AnimatedHeadline />
          </motion.div>

          <motion.p
            variants={entrance}
            className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
          >
            Hands of Hope bridges the gap between generous hearts and real
            needs, helping connect people seeking assistance with available
            resources and organisations ready to help.
          </motion.p>

          <motion.div
            variants={entrance}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              asChild
              className="group h-12 rounded-full bg-teal-400 px-7 font-semibold text-[#062e2b] shadow-lg shadow-teal-950/20 transition-all hover:-translate-y-0.5 hover:bg-teal-300"
            >
              <Link href="/resources">
                Find Assistance
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 rounded-full border-white/30 bg-white/5 px-7 font-semibold text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/10 hover:text-white"
            >
              <Link href="/register?role=organisation">
                Become a Partner
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={entrance}
            className="mt-10 flex items-center gap-3 text-sm text-white/55"
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-white/20">
              <ArrowDown className="size-4 animate-bounce" />
            </span>

            <a
              href="#about"
              className="transition-colors hover:text-teal-200"
            >
              Discover how we make a difference
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#071B1A]/70 to-transparent"
      />
    </section>
  );
}