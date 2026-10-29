"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

import { DashboardSidebar } from "./dashboard-sidebar";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function DashboardMobileNav({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 cursor-default bg-black/60 backdrop-blur-sm lg:hidden"
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 32,
            }}
            className="fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] lg:hidden"
          >
            <div className="absolute right-3 top-4 z-10">
              <button
                type="button"
                aria-label="Close navigation"
                onClick={onClose}
                className="rounded-lg p-2 text-[#F1F5F4]/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <DashboardSidebar
              mobile
              onNavigate={onClose}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}