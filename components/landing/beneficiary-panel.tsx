"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Search,
  ShieldCheck,
} from "lucide-react";

import { AudienceIllustration } from "./audience-illustrations";

const features = [
  {
    id: "discover",
    number: "01",
    label: "Discover resources",
    description:
      "Explore available support and find resources relevant to your needs.",
    icon: Search,
    previewTitle: "Find the support you need",
    previewText:
      "Explore available resources by category and location.",
    status: "Resource discovery",
  },
  {
    id: "request",
    number: "02",
    label: "Request assistance",
    description:
      "Submit a request and provide the information needed for review.",
    icon: ClipboardList,
    previewTitle: "Make your needs known",
    previewText:
      "Submit an assistance request for an organization to review.",
    status: "Request submission",
  },
  {
    id: "track",
    number: "03",
    label: "Track your request",
    description:
      "Check your request's progress as it moves through the review process.",
    icon: CheckCircle2,
    previewTitle: "Stay informed",
    previewText:
      "See whether your request is pending, approved, or awaiting further action.",
    status: "Request tracking",
  },
];

export default function BeneficiaryPanel() {
  const [activeFeature, setActiveFeature] = useState(features[0]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="audience-panel audience-panel--beneficiary"
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 28 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="audience-panel__topline">
        <span className="audience-panel__eyebrow">
          FOR INDIVIDUALS
        </span>

        <span className="audience-panel__number">
          01
        </span>
      </div>

      <div className="audience-panel__heading">
        <p className="audience-panel__kicker">
          Find support. Move forward.
        </p>

        <h3>
          Help should be
          <br />
          <span>within reach.</span>
        </h3>

        <p className="audience-panel__intro">
          Discover available resources, request assistance,
          and stay informed about your request.
        </p>
      </div>

      <AudienceIllustration variant="beneficiary" />

      <div className="audience-features">
        <p className="audience-features__label">
          EXPLORE WHAT YOU CAN DO
        </p>

        <div className="audience-features__list">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive =
              activeFeature.id === feature.id;

            return (
              <button
                key={feature.id}
                type="button"
                className={`audience-feature ${
                  isActive
                    ? "audience-feature--active"
                    : ""
                }`}
                onClick={() => setActiveFeature(feature)}
                aria-pressed={isActive}
              >
                <span className="audience-feature__icon">
                  <Icon size={17} strokeWidth={1.8} />
                </span>

                <span className="audience-feature__text">
                  <span className="audience-feature__number">
                    {feature.number}
                  </span>

                  <span className="audience-feature__label">
                    {feature.label}
                  </span>
                </span>

                <ArrowDownRight
                  className="audience-feature__arrow"
                  size={17}
                />
              </button>
            );
          })}
        </div>

        <motion.div
          className="audience-preview audience-preview--light"
          key={activeFeature.id}
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 8 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          aria-live="polite"
        >
          <div className="audience-preview__top">
            <span className="audience-preview__dot" />
            <span>FEATURE PREVIEW</span>
          </div>

          <h4>{activeFeature.previewTitle}</h4>

          <p>{activeFeature.previewText}</p>

          <span className="audience-preview__status">
            <ShieldCheck size={14} />
            {activeFeature.status}
          </span>
        </motion.div>
      </div>

      <div className="audience-panel__footer">
        <Link
          href="/resources"
          className="audience-cta audience-cta--light"
        >
          Explore resources
          <ArrowRight size={17} />
        </Link>

        <span className="audience-panel__footnote">
          Support starts with access.
        </span>
      </div>
    </motion.article>
  );
}