"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  Boxes,
  ClipboardCheck,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";

import { AudienceIllustration } from "./audience-illustrations";

const features = [
  {
    id: "resources",
    number: "01",
    label: "Manage resources",
    description:
      "Keep records of available supplies and the resources your organization can provide.",
    icon: Boxes,
    previewTitle: "Resource inventory",
    previewText:
      "Maintain an organized record of available resources and their quantities.",
    status: "Inventory management",
  },
  {
    id: "review",
    number: "02",
    label: "Review requests",
    description:
      "Assess incoming assistance requests and record decisions.",
    icon: ClipboardCheck,
    previewTitle: "Request review",
    previewText:
      "Review submitted requests and document approval or other decisions.",
    status: "Request assessment",
  },
  {
    id: "distribution",
    number: "03",
    label: "Track distributions",
    description:
      "Record collections and confirm when assistance has actually been provided.",
    icon: PackageCheck,
    previewTitle: "Distribution records",
    previewText:
      "Track resource allocation and separately confirm completed distributions.",
    status: "Distribution tracking",
  },
];

export default function OrganizationPanel() {
  const [activeFeature, setActiveFeature] = useState(features[0]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="audience-panel audience-panel--organization"
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 28 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: 0.12,
        ease: "easeOut",
      }}
    >
      <div className="audience-panel__topline">
        <span className="audience-panel__eyebrow">
          FOR ORGANIZATIONS
        </span>

        <span className="audience-panel__number">
          02
        </span>
      </div>

      <div className="audience-panel__heading">
        <p className="audience-panel__kicker">
          Coordinate. Deliver. Account.
        </p>

        <h3>
          Turn resources
          <br />
          into <span>real impact.</span>
        </h3>

        <p className="audience-panel__intro">
          Organize available resources, review assistance
          requests, and maintain accountable distribution records.
        </p>
      </div>

      <AudienceIllustration variant="organization" />

      <div className="audience-features audience-features--dark">
        <p className="audience-features__label">
          EXPLORE YOUR CAPABILITIES
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
          className="audience-preview audience-preview--dark"
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
            <span>OPERATIONS PREVIEW</span>
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
          href="/signup"
          className="audience-cta audience-cta--dark"
        >
          Explore the platform
          <ArrowRight size={17} />
        </Link>

        <span className="audience-panel__footnote">
          Every resource. Accounted for.
        </span>
      </div>
    </motion.article>
  );
}