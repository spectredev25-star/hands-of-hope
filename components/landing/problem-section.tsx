"use client";

import {
  ArrowDownRight,
  ClipboardCheck,
  Network,
  Search,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { useRef } from "react";

import { ProblemPanel } from "@/components/landing/problem-panel";

const problems = [
  {
    number: "01",
    title: "Finding help isn't always easy.",
    description:
      "People seeking assistance may struggle to discover available resources or identify organisations that can meet their needs.",
    icon: Search,
    variant: "discovery" as const,
    side: "left" as const,
  },
  {
    number: "02",
    title: "Resources and needs don't always connect.",
    description:
      "Resources may be available while the people who could benefit from them have difficulty finding the right support.",
    icon: Network,
    variant: "connection" as const,
    side: "right" as const,
  },
  {
    number: "03",
    title: "Distribution needs accountability.",
    description:
      "Coordinating reviews, approvals, collection, and distribution can be difficult without a clear process for tracking each stage.",
    icon: ClipboardCheck,
    variant: "accountability" as const,
    side: "left" as const,
  },
];

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 65%"],
  });

  const lineScale = useTransform(
    scrollYProgress,
    [0.05, 0.9],
    [0, 1],
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="problem-section relative overflow-hidden bg-background text-foreground"
    >
      {/* Ambient decorative elements */}
      <div
        aria-hidden="true"
        className="problem-ambient problem-ambient-one"
      />

      <div
        aria-hidden="true"
        className="problem-ambient problem-ambient-two"
      />

      <div className="container-shell relative z-10 py-20 sm:py-12 lg:py-20">
        {/* Section introduction */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: "easeOut",
          }}
          id="mission"
          className="mx-auto max-w-3xl text-center"
        >
          <div className="problem-eyebrow">
            <span className="problem-eyebrow-dot" />
            THE PROBLEM
          </div>

          <h2 className="mt-6 font-heading text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Good intentions don't always reach{" "}
            <span className="problem-heading-accent">
              the people who need them.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Support can make a real difference, but discovering available
            resources, connecting people with assistance, and coordinating
            distribution can be challenging.
          </p>
        </motion.div>

        {/* Problem panels */}
        <div className="problem-timeline relative mx-auto mt-20 max-w-6xl sm:mt-28">
          {/* Background line */}
          <div
            aria-hidden="true"
            className="problem-timeline-track"
          />

          {/* Scroll-progress line */}
          <motion.div
            aria-hidden="true"
            className="problem-timeline-progress"
            style={
              reduceMotion
                ? { scaleY: 1 }
                : {
                    scaleY: lineScale,
                  }
            }
          />

          <div className="relative flex flex-col gap-12 sm:gap-16 lg:gap-20">
            {problems.map((problem, index) => (
              <div
                key={problem.number}
                className={`problem-timeline-row problem-timeline-row-${index + 1}`}
              >
                {/* Timeline node */}
                <div
                  aria-hidden="true"
                  className="problem-timeline-node"
                >
                  <span>{problem.number}</span>
                </div>

                <ProblemPanel {...problem} />
              </div>
            ))}
          </div>
        </div>

        {/* Transition into the next section */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: reduceMotion ? 0 : 0.15,
          }}
          className="problem-conclusion mx-auto mt-20 max-w-3xl text-center sm:mt-28"
        >
          <div className="problem-conclusion-icon">
            <ArrowDownRight className="size-5" />
          </div>

          <h3 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            That's the gap Hands of Hope is built to address.
          </h3>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
            We're building a more coordinated way to connect people seeking
            support with available resources and organisations.
          </p>

          <a
            href="#how-it-works"
            className="problem-next-link mt-7 inline-flex items-center gap-2"
          >
            Discover how it works
            <ArrowDownRight className="size-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}