"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, HeartHandshake } from "lucide-react";

export default function AudienceConnection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="audience-connection"
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, scale: 0.9 }
      }
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      aria-label="Connecting people who need assistance with organizations providing resources"
    >
      <svg
        className="audience-connection__svg"
        viewBox="0 0 160 100"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 50 C35 10, 55 10, 80 50 S125 90, 152 50"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />

        <circle
          cx="8"
          cy="50"
          r="4"
          fill="currentColor"
        />

        <circle
          cx="152"
          cy="50"
          r="4"
          fill="currentColor"
        />

        <circle
          cx="80"
          cy="50"
          r="7"
          fill="#0F766E"
          stroke="#99F6E4"
          strokeWidth="3"
        />
      </svg>

      <div className="audience-connection__badge">
        <HeartHandshake size={19} strokeWidth={1.7} />
        <span>One shared mission</span>
        <ArrowRight size={14} />
      </div>
    </motion.div>
  );
}