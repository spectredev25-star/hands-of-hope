"use client";

import { motion } from "motion/react";

import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Heart,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

type WorkflowStep = {
  number: string;
  id: string;
  title: string;
};

type WorkflowVisualProps = {
  step: WorkflowStep;
  prefersReducedMotion: boolean;
};

const resources = [
  {
    icon: Package,
    title: "Essential supplies",
    category: "DAILY NEEDS",
    color: "resource-mint",
  },
  {
    icon: Heart,
    title: "Community support",
    category: "WELLBEING",
    color: "resource-peach",
  },
  {
    icon: Users,
    title: "Local assistance",
    category: "COMMUNITY",
    color: "resource-blue",
  },
];

export function WorkflowVisual({
  step,
  prefersReducedMotion,
}: WorkflowVisualProps) {
  const floatingTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      };

  if (step.id === "discover") {
    return (
      <div className="workflow-discover">
        <div className="workflow-search">
          <Search size={17} />

          <span>Find resources and support...</span>

          <span className="workflow-search-shortcut">
            /
          </span>
        </div>

        <div className="workflow-discover-heading">
          <div>
            <span className="workflow-micro-label">
              EXPLORE RESOURCES
            </span>

            <h4>Support starts here.</h4>
          </div>

          <span className="workflow-resource-count">
            03 CATEGORIES
          </span>
        </div>

        <div className="workflow-resource-list">
          {resources.map((resource, index) => {
            const Icon = resource.icon;

            return (
              <motion.div
                key={resource.title}
                className="workflow-resource-card"
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, x: 12 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: prefersReducedMotion ? 0 : index * 0.08,
                }}
              >
                <span
                  className={`workflow-resource-icon ${resource.color}`}
                >
                  <Icon size={19} />
                </span>

                <span className="workflow-resource-text">
                  <span>{resource.category}</span>

                  <strong>{resource.title}</strong>
                </span>

                <ArrowUpRight
                  size={17}
                  className="workflow-resource-arrow"
                />
              </motion.div>
            );
          })}
        </div>

        <div className="workflow-discover-footer">
          <Sparkles size={15} />

          <span>
            Discover resources that can make a difference.
          </span>
        </div>

        <motion.div
          className="workflow-orb workflow-orb-discover"
          animate={
            prefersReducedMotion
              ? {}
              : { y: [0, -7, 0], rotate: [0, 4, 0] }
          }
          transition={floatingTransition}
        />
      </div>
    );
  }

  if (step.id === "request") {
    return (
      <div className="workflow-request">
        <div className="workflow-request-top">
          <div>
            <span className="workflow-micro-label">
              ASSISTANCE REQUEST
            </span>

            <h4>Tell us what you need.</h4>
          </div>

          <span className="workflow-document-icon">
            <FileText size={19} />
          </span>
        </div>

        <div className="workflow-form-preview">
          <label>REQUEST CATEGORY</label>

          <div className="workflow-fake-input">
            Essential supplies

            <span className="workflow-input-chevron">⌄</span>
          </div>

          <label>DESCRIBE YOUR NEED</label>

          <div className="workflow-fake-textarea">
            Share details that will help the team understand
            your request...
          </div>

          <div className="workflow-form-bottom">
            <span>
              <ShieldCheck size={15} />

              Information handled with care
            </span>

            <span className="workflow-character-count">
              0 / 500
            </span>
          </div>

          <motion.div
            className="workflow-submit-button"
            animate={
              prefersReducedMotion
                ? {}
                : { y: [0, -1, 0] }
            }
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Request assistance

            <ArrowUpRight size={16} />
          </motion.div>
        </div>

        <div className="workflow-request-note">
          <Clock3 size={15} />

          <span>
            Submission begins the review process.
          </span>
        </div>
      </div>
    );
  }

  if (step.id === "review") {
    return (
      <div className="workflow-review">
        <div className="workflow-review-top">
          <div>
            <span className="workflow-micro-label">
              REQUEST TRACKING
            </span>

            <h4>Every step has a status.</h4>
          </div>

          <span className="workflow-review-shield">
            <ShieldCheck size={21} />
          </span>
        </div>

        <div className="workflow-status-card">
          <div className="workflow-status-card-heading">
            <div>
              <span>REQUEST</span>

              <strong>Essential supplies</strong>
            </div>

            <span className="workflow-status-id">
              #REQ-001
            </span>
          </div>

          <div className="workflow-status-timeline">
            <div className="workflow-status-item is-complete">
              <span className="workflow-status-marker">
                <Check size={12} />
              </span>

              <span className="workflow-status-copy">
                <strong>Submitted</strong>

                <span>Request received</span>
              </span>

              <span className="workflow-status-state">
                <CheckCircle2 size={15} />
              </span>
            </div>

            <div className="workflow-status-connector" />

            <div className="workflow-status-item is-current">
              <span className="workflow-status-marker">
                <Clock3 size={12} />
              </span>

              <span className="workflow-status-copy">
                <strong>Under review</strong>

                <span>Awaiting review outcome</span>
              </span>

              <span className="workflow-review-badge">
                IN REVIEW
              </span>
            </div>

            <div className="workflow-status-connector" />

            <div className="workflow-status-item is-pending">
              <span className="workflow-status-marker">
                <span />
              </span>

              <span className="workflow-status-copy">
                <strong>Decision</strong>

                <span>Pending review outcome</span>
              </span>
            </div>
          </div>
        </div>

        <div className="workflow-review-note">
          <ShieldCheck size={16} />

          <span>
            Approval follows review, not submission.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="workflow-collect">
      <div className="workflow-collect-heading">
        <div>
          <span className="workflow-micro-label">
            DISTRIBUTION
          </span>

          <h4>Support, made accountable.</h4>
        </div>

        <span className="workflow-collect-icon">
          <Package size={20} />
        </span>
      </div>

      <div className="workflow-collection-card">
        <div className="workflow-collection-info">
          <span className="workflow-micro-label">
            COLLECTION REFERENCE
          </span>

          <strong>COLLECT-001</strong>

          <span className="workflow-collection-description">
            Example collection record
          </span>

          <div className="workflow-collection-status">
            <span />

            Ready for coordination
          </div>
        </div>

        <motion.div
          className="workflow-qr-frame"
          animate={
            prefersReducedMotion
              ? {}
              : { rotate: [0, 1, 0] }
          }
          transition={floatingTransition}
          aria-label="Decorative QR-inspired pattern"
        >
          <div className="workflow-qr-pattern">
            {Array.from({ length: 64 }).map((_, index) => {
              const filled =
                (
                  index * 7 +
                  Math.floor(index / 4) * 3 +
                  index % 5
                ) %
                  4 !==
                0;

              return (
                <span
                  key={index}
                  className={filled ? "is-filled" : ""}
                />
              );
            })}
          </div>

          <span className="workflow-qr-corner top-left" />
          <span className="workflow-qr-corner top-right" />
          <span className="workflow-qr-corner bottom-left" />
        </motion.div>
      </div>

      <div className="workflow-collection-steps">
        <div>
          <span className="workflow-collection-step-icon">
            <Check size={14} />
          </span>

          <span>
            <strong>Approved request</strong>

            <span>Eligible for coordination</span>
          </span>
        </div>

        <ArrowDownRight
          size={17}
          className="workflow-collection-arrow"
        />

        <div>
          <span className="workflow-collection-step-icon">
            <Package size={14} />
          </span>

          <span>
            <strong>Collection and distribution</strong>

            <span>Record the actual outcome</span>
          </span>
        </div>
      </div>

      <div className="workflow-collect-note">
        <ShieldCheck size={16} />

        <span>
          The record must reflect actual distribution.
        </span>
      </div>
    </div>
  );
}