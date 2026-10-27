"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const phrases = [
  "those who need it most.",
  "communities seeking support.",
  "people who need a helping hand.",
];

export function AnimatedHeadline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % phrases.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <h1 className="max-w-4xl text-balance font-heading text-2xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-3xl md:text-4xl lg:text-5xl">
      Connecting generosity
      <br className="hidden sm:block" /> with{" "}
      <span className="relative inline-grid align-baseline">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={phrases[activeIndex]}
            initial={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 16, filter: "blur(5px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -12, filter: "blur(4px)" }
            }
            transition={{ duration: reduceMotion ? 0 : 0.45 }}
            className="text-[#5EEAD4]"
          >
            {phrases[activeIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}