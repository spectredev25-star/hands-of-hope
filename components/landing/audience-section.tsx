"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, HeartHandshake } from "lucide-react";

import BeneficiaryPanel from "./beneficiary-panel";
import OrganizationPanel from "./organization-panel";
import AudienceConnection from "./audience-connection";

export default function AudienceSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="audiences"
      className="audience-section"
      aria-labelledby="audience-heading"
    >
      <div className="audience-section__container">
        <motion.header
          className="audience-section__header"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 18 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="audience-section__eyebrow">
            <HeartHandshake size={16} />
            <span>BUILT FOR BOTH SIDES</span>
          </div>

          <h2 id="audience-heading">
            One mission.
            <br />
            <span>Two perspectives.</span>
          </h2>

          <p>
            Connecting people who need support with the
            organizations working to provide it.
          </p>
        </motion.header>

        <div className="audience-section__panels">
          <BeneficiaryPanel />

          <AudienceConnection />

          <OrganizationPanel />
        </div>

        <motion.div
          className="audience-section__bottom-note"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0 }
          }
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="audience-section__bottom-line" />

          <p>
            <span>Discover.</span> <ArrowDown size={13} />
            <span>Coordinate.</span> <ArrowDown size={13} />
            <span>Deliver with accountability.</span>
          </p>

          <span className="audience-section__bottom-line" />
        </motion.div>
      </div>
    </section>
  );
}