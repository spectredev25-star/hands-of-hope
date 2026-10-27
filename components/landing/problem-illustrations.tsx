"use client";

import { motion, useReducedMotion } from "motion/react";

export function DiscoveryIllustration() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="problem-illustration discovery-illustration"
    >
      <div className="discovery-orbit discovery-orbit-outer" />
      <div className="discovery-orbit discovery-orbit-inner" />

      <motion.div
        className="discovery-search"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <svg
          viewBox="0 0 120 120"
          fill="none"
          className="h-full w-full"
        >
          <circle
            cx="49"
            cy="47"
            r="27"
            stroke="currentColor"
            strokeWidth="5"
          />

          <path
            d="M69 67L94 92"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <circle
            cx="49"
            cy="47"
            r="12"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="3 5"
          />
        </svg>
      </motion.div>

      <motion.span
        className="discovery-dot discovery-dot-one"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, -8, 0], opacity: [0.55, 1, 0.55] }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.span
        className="discovery-dot discovery-dot-two"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, 7, 0], opacity: [0.5, 1, 0.5] }
        }
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />

      <span className="discovery-label discovery-label-top">
        FINDING HELP
      </span>

      <span className="discovery-label discovery-label-bottom">
        NOT ALWAYS SIMPLE
      </span>
    </div>
  );
}

const networkNodes = [
  { id: "a", x: 26, y: 30 },
  { id: "b", x: 55, y: 17 },
  { id: "c", x: 65, y: 52 },
  { id: "d", x: 37, y: 72 },
  { id: "e", x: 91, y: 34 },
  { id: "f", x: 112, y: 62 },
];

const networkEdges = [
  ["a", "b"],
  ["a", "d"],
  ["b", "c"],
  ["c", "d"],
  ["c", "e"],
  ["e", "f"],
] as const;

export function ConnectionIllustration() {
  const reduceMotion = useReducedMotion();

  const nodeById = Object.fromEntries(
    networkNodes.map((node) => [node.id, node]),
  );

  return (
    <div
      aria-hidden="true"
      className="problem-illustration connection-illustration"
    >
      <div className="connection-caption connection-caption-left">
        AVAILABLE
        <br />
        RESOURCES
      </div>

      <div className="connection-caption connection-caption-right">
        UNMET
        <br />
        NEEDS
      </div>

      <svg
        viewBox="0 0 150 100"
        fill="none"
        className="connection-svg"
      >
        {networkEdges.map(([from, to], index) => {
          const start = nodeById[from];
          const end = nodeById[to];

          return (
            <motion.line
              key={`${from}-${to}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              initial={
                reduceMotion
                  ? false
                  : { pathLength: 0, opacity: 0.2 }
              }
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: reduceMotion ? 0 : index * 0.12,
              }}
            />
          );
        })}

        {networkNodes.map((node, index) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={index === 2 ? 5 : 3.5}
            fill={index === 2 ? "#14B8A6" : "currentColor"}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, scale: 0.5 }
            }
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              delay: reduceMotion ? 0 : index * 0.1,
            }}
          />
        ))}
      </svg>

      <div className="connection-gap">
        <span />
        <span />
        <span />
      </div>

      <p className="connection-bottom-label">
        THE GAP BETWEEN THEM
      </p>
    </div>
  );
}

export function AccountabilityIllustration() {
  const reduceMotion = useReducedMotion();

  const stages = [
    { label: "Review", number: "01" },
    { label: "Approve", number: "02" },
    { label: "Distribute", number: "03" },
  ];

  return (
    <div
      aria-hidden="true"
      className="problem-illustration accountability-illustration"
    >
      <div className="accountability-topline">
        <span>THE PROCESS</span>
        <span className="accountability-status">
          <span />
          NEEDS STRUCTURE
        </span>
      </div>

      <div className="accountability-stages">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.number}
            className="accountability-stage"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 12 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              delay: reduceMotion ? 0 : index * 0.18,
            }}
          >
            <span className="accountability-stage-number">
              {stage.number}
            </span>

            <span className="accountability-stage-label">
              {stage.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="accountability-track">
        <motion.div
          className="accountability-track-progress"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: reduceMotion ? 0 : 1.2,
            ease: "easeInOut",
            delay: reduceMotion ? 0 : 0.2,
          }}
        />
      </div>

      <p className="accountability-note">
        Every stage needs a clear process.
      </p>
    </div>
  );
}