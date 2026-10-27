"use client";

import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import {
  AccountabilityIllustration,
  ConnectionIllustration,
  DiscoveryIllustration,
} from "@/components/landing/problem-illustrations";

type ProblemVariant = "discovery" | "connection" | "accountability";

type ProblemPanelProps = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  variant: ProblemVariant;
  side: "left" | "right";
};

const illustrations = {
  discovery: DiscoveryIllustration,
  connection: ConnectionIllustration,
  accountability: AccountabilityIllustration,
};

export function ProblemPanel({
  number,
  title,
  description,
  icon: Icon,
  variant,
  side,
}: ProblemPanelProps) {
  const reduceMotion = useReducedMotion();
  const Illustration = illustrations[variant];

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: side === "left" ? -38 : 38,
              y: 24,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`problem-panel problem-panel-${variant} problem-panel-${side}`}
    >
      <div className="problem-panel-outline" aria-hidden="true" />

      <span className="problem-panel-number" aria-hidden="true">
        {number}
      </span>

      <div className="problem-panel-content">
        <div className="problem-panel-heading">
          <span className="problem-icon">
            <Icon className="size-5" strokeWidth={1.7} />
          </span>

          <span className="problem-panel-kicker">
            THE CHALLENGE
          </span>
        </div>

        <h3 className="problem-panel-title">
          {title}
        </h3>

        <p className="problem-panel-description">
          {description}
        </p>
      </div>

      <div className="problem-panel-visual">
        <Illustration />
      </div>
    </motion.article>
  );
}