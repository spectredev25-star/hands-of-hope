"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ClipboardCheck,
  Compass,
  HandHeart,
  Search,
  ShieldCheck,
} from "lucide-react";

import { WorkflowVisual } from "./workflow-visual";

const workflowSteps = [
  {
    number: "01",
    id: "discover",
    eyebrow: "START WITH A NEED",
    title: "Discover",
    description:
      "Explore available resources and find support that aligns with your needs.",
    detail:
      "A clearer starting point for people looking for meaningful assistance.",
    icon: Compass,
    color: "mint",
  },
  {
    number: "02",
    id: "request",
    eyebrow: "MAKE YOUR NEED KNOWN",
    title: "Request",
    description:
      "Submit a request that explains what you need, so the right people can review it.",
    detail:
      "A structured request helps make the next steps easier to understand.",
    icon: Search,
    color: "blue",
  },
  {
    number: "03",
    id: "review",
    eyebrow: "BUILD ACCOUNTABILITY",
    title: "Review",
    description:
      "Requests go through a review process before assistance is approved.",
    detail:
      "Clear statuses help everyone understand where a request stands.",
    icon: ShieldCheck,
    color: "violet",
  },
  {
    number: "04",
    id: "collect",
    eyebrow: "TURN SUPPORT INTO ACTION",
    title: "Collect",
    description:
      "Coordinate collection and record distribution so assistance can be tracked.",
    detail:
      "A more accountable process from approved request to recorded distribution.",
    icon: HandHeart,
    color: "orange",
  },
] as const;

type WorkflowStep = (typeof workflowSteps)[number];

export function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tickingRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const prefersReducedMotion = useReducedMotion();

  const activeStep = workflowSteps[activeIndex];

  const updateActiveStep = useCallback(() => {
    if (tickingRef.current) return;

    tickingRef.current = true;

    window.requestAnimationFrame(() => {
      const viewportCenter = window.innerHeight * 0.52;

      let closestIndex = activeIndex;
      let closestDistance = Infinity;

      stepRefs.current.forEach((element, index) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();

        const elementCenter = rect.top + rect.height / 2;

        const distance = Math.abs(
          elementCenter - viewportCenter,
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      const section = sectionRef.current;

      if (section) {
        const rect = section.getBoundingClientRect();

        const isNearWorkflow =
          rect.bottom > window.innerHeight * 0.25 &&
          rect.top < window.innerHeight * 0.75;

        if (isNearWorkflow) {
          setActiveIndex(closestIndex);
        }
      }

      tickingRef.current = false;
    });
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          updateActiveStep();
        }
      },
      {
        threshold: 0,
      },
    );

    observer.observe(section);

    window.addEventListener("scroll", updateActiveStep, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveStep);

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "scroll",
        updateActiveStep,
      );

      window.removeEventListener(
        "resize",
        updateActiveStep,
      );
    };
  }, [updateActiveStep]);

  const selectStep = (index: number) => {
    setActiveIndex(index);

    stepRefs.current[index]?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="workflow-section"
      aria-labelledby="workflow-heading"
    >
      <div className="workflow-container">
        {/* Section heading */}

        <motion.div
          className="workflow-intro"
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 24 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="workflow-kicker">
            <span className="workflow-kicker-line" />

            <span>HOW IT WORKS</span>

            <span className="workflow-kicker-line" />
          </div>

          <h2
            id="workflow-heading"
            className="workflow-main-heading"
          >
            From a simple need
            <br />

            <span>to meaningful action.</span>
          </h2>

          <p className="workflow-intro-description">
            Every act of support deserves a process that is
            clear, thoughtful, and accountable.
          </p>
        </motion.div>

        {/* Main interactive experience */}

        <div className="workflow-experience">
          {/* Left column */}

          <div className="workflow-steps-column">
            <div className="workflow-steps-header">
              <span>THE PROCESS</span>

              <span className="workflow-step-count">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="workflow-count-divider">
                  /
                </span>
                {String(workflowSteps.length).padStart(2, "0")}
              </span>
            </div>

            <div className="workflow-steps">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;

                const isActive = activeIndex === index;

                return (
                  <motion.button
                    key={step.id}
                    ref={(element) => {
                      stepRefs.current[index] = element;
                    }}
                    type="button"
                    className={`workflow-step ${
                      isActive ? "is-active" : ""
                    }`}
                    onClick={() => selectStep(index)}
                    aria-pressed={isActive}
                    aria-controls="workflow-visual-panel"
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, x: -18 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: prefersReducedMotion
                        ? 0
                        : index * 0.08,
                      ease: "easeOut",
                    }}
                  >
                    <span
                      className={`workflow-step-number ${
                        isActive ? "is-active" : ""
                      }`}
                    >
                      {isActive ? (
                        <Icon size={18} strokeWidth={1.8} />
                      ) : (
                        step.number
                      )}
                    </span>

                    <span className="workflow-step-content">
                      <span className="workflow-step-eyebrow">
                        {step.eyebrow}
                      </span>

                      <span className="workflow-step-title">
                        {step.title}
                      </span>

                      <span className="workflow-step-description">
                        {step.description}
                      </span>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            className="workflow-step-detail"
                            initial={
                              prefersReducedMotion
                                ? false
                                : {
                                    opacity: 0,
                                    height: 0,
                                  }
                            }
                            animate={{
                              opacity: 1,
                              height: "auto",
                            }}
                            exit={{
                              opacity: 0,
                              height: 0,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut",
                            }}
                          >
                            <span className="workflow-detail-indicator" />

                            {step.detail}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>

                    <span className="workflow-step-action">
                      <ArrowUpRight
                        size={19}
                        strokeWidth={1.7}
                      />
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="workflow-bottom-note">
              <span className="workflow-bottom-note-icon">
                <ShieldCheck size={18} />
              </span>

              <p>
                <strong>Designed around trust.</strong>

                <br />

                Clear steps. Thoughtful reviews.
                Accountable distribution.
              </p>
            </div>
          </div>

          {/* Right column */}

          <motion.div
            id="workflow-visual-panel"
            className="workflow-visual-column"
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 24 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            <div className="workflow-visual-topbar">
              <div className="workflow-window-controls">
                <span />
                <span />
                <span />
              </div>

              <span className="workflow-window-label">
                HANDS OF HOPE
                <span className="workflow-window-separator">
                  /
                </span>
                PROCESS OVERVIEW
              </span>

              <span className="workflow-live-indicator">
                <span />
                LIVE
              </span>
            </div>

            <div className="workflow-visual-content">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeStep.id}
                  className="workflow-stage"
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.3,
                    ease: "easeOut",
                  }}
                >
                  <div className="workflow-stage-heading">
                    <div>
                      <span className="workflow-stage-label">
                        STAGE {activeStep.number}
                      </span>

                      <h3>{activeStep.title}</h3>
                    </div>

                    <span className="workflow-stage-icon">
                      {(() => {
                        const Icon = activeStep.icon;

                        return <Icon size={21} />;
                      })()}
                    </span>
                  </div>

                  <WorkflowVisual
                    step={activeStep as WorkflowStep}
                    prefersReducedMotion={Boolean(
                      prefersReducedMotion,
                    )}
                  />

                  <div className="workflow-stage-footer">
                    <div>
                      <span className="workflow-stage-footer-dot" />

                      <span>
                        {activeIndex === 0 &&
                          "Explore available support"}

                        {activeIndex === 1 &&
                          "Submit a request for review"}

                        {activeIndex === 2 &&
                          "Review before approval"}

                        {activeIndex === 3 &&
                          "Coordinate and record distribution"}
                      </span>
                    </div>

                    <span className="workflow-stage-index">
                      {activeStep.number}
                      <span> / 04</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="workflow-visual-bottom">
              <div className="workflow-progress-track">
                <motion.div
                  className="workflow-progress-fill"
                  animate={{
                    width: `${((activeIndex + 1) / workflowSteps.length) * 100}%`,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.4,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <div className="workflow-visual-navigation">
                <span>
                  STEP {activeStep.number} OF 04
                </span>

                <button
                  type="button"
                  onClick={() =>
                    selectStep(
                      (activeIndex + 1) % workflowSteps.length,
                    )
                  }
                  className="workflow-next-button"
                  aria-label="Go to next workflow stage"
                >
                  <span>
                    {activeIndex === workflowSteps.length - 1
                      ? "Start again"
                      : "Next stage"}
                  </span>

                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom statement */}

        <motion.div
          className="workflow-outro"
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 16 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <div className="workflow-outro-icon">
            <ClipboardCheck size={22} />
          </div>

          <p>
            <span>More than connecting resources.</span>

            We are building a clearer path between people
            who need support and those ready to give it.
          </p>

          <ArrowDown
            className="workflow-outro-arrow"
            size={21}
          />
        </motion.div>
      </div>
    </section>
  );
}