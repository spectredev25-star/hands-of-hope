
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, HeartHandshake, Sparkles } from "lucide-react";

export default function FooterCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="footer-cta-title"
      className="footer-cta-section"
    >
      <div className="footer-cta-glow" aria-hidden="true" />

      <motion.div
        className="footer-cta-content"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="footer-cta-icon" aria-hidden="true">
          <HeartHandshake size={28} strokeWidth={1.6} />
        </div>

        <span className="footer-cta-eyebrow">
          <Sparkles size={14} />
          EVERY CONNECTION MATTERS
        </span>

        <h2 id="footer-cta-title">
          Hope grows when
          <br />
          <span>help finds its way.</span>
        </h2>

        <p>
          Every resource shared, every request answered, and every act
          of kindness brings someone closer to a better tomorrow.
          Be part of the connection that makes it possible.
        </p>

        <div className="footer-cta-actions">
          <Link href="/signup" className="footer-cta-primary">
            Find Support
            <ArrowRight size={17} />
          </Link>

          <Link href="/signup" className="footer-cta-secondary">
            Become a Partner
            <ArrowRight size={17} />
          </Link>
        </div>
      </motion.div>

      <div className="footer-cta-decoration" aria-hidden="true">
        <span className="footer-cta-orbit footer-cta-orbit-one" />
        <span className="footer-cta-orbit footer-cta-orbit-two" />
        <span className="footer-cta-dot" />
      </div>
    </section>
  );
}
