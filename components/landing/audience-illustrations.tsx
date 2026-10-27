"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface IllustrationProps {
  variant: "beneficiary" | "organization";
}

export function AudienceIllustration({
  variant,
}: IllustrationProps) {
  const shouldReduceMotion = useReducedMotion();

  const isBeneficiary = variant === "beneficiary";

  return (
    <div
      className={`audience-illustration ${
        isBeneficiary
          ? "audience-illustration--beneficiary"
          : "audience-illustration--organization"
      }`}
      aria-hidden="true"
    >
      <div className="audience-illustration__glow" />

      <motion.div
        className="audience-illustration__image-wrap"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, -8, 0],
                rotate: [0, 1, 0],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src={
            isBeneficiary
              ? "/images/charity-donation.png"
              : "/images/gift-box.png"
          }
          alt=""
          width={500}
          height={500}
          className="audience-illustration__image"
          sizes="(max-width: 768px) 75vw, 35vw"
        />
      </motion.div>

      <div className="audience-illustration__orbit audience-illustration__orbit--one" />
      <div className="audience-illustration__orbit audience-illustration__orbit--two" />

      <div className="audience-illustration__index">
        {isBeneficiary ? "01 / FIND SUPPORT" : "02 / CREATE IMPACT"}
      </div>
    </div>
  );
}