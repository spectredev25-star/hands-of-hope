"use client";

import { motion } from "motion/react";
import { ArrowRight, LoaderCircle } from "lucide-react";

interface AuthSubmitButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export default function AuthSubmitButton({
  children,
  loading = false,
  disabled = false,
}: AuthSubmitButtonProps) {
  return (
    <motion.button
      type="submit"
      whileHover={!loading && !disabled ? { y: -1 } : undefined}
      whileTap={!loading && !disabled ? { scale: 0.99 } : undefined}
      disabled={loading || disabled}
      className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-lg shadow-[#0F766E]/15 transition-colors hover:bg-[#115E59] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <LoaderCircle size={18} className="animate-spin" />
          Please wait...
        </>
      ) : (
        <>
          {children}
          <ArrowRight
            size={17}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </>
      )}
    </motion.button>
  );
}