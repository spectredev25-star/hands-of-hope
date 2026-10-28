"use client";

import { motion } from "motion/react";
import { HeartHandshake, Building2, Check } from "lucide-react";

export type UserRole = "beneficiary" | "organization";

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
}

const roles = [
  {
    id: "beneficiary" as const,
    title: "I need support",
    description: "Discover resources and request assistance.",
    Icon: HeartHandshake,
  },
  {
    id: "organization" as const,
    title: "I'm an organization",
    description: "Share resources and support communities.",
    Icon: Building2,
  },
];

export default function RoleSelector({
  value,
  onChange,
}: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {roles.map(({ id, title, description, Icon }) => {
        const selected = value === id;

        return (
          <motion.button
            key={id}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onChange(id)}
            aria-pressed={selected}
            className={`relative flex min-h-[126px] flex-col rounded-2xl border p-4 text-left transition-colors duration-200 ${
              selected
                ? "border-[#0F766E] bg-[#F0FDFA] ring-2 ring-[#0F766E]/10"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="mb-3 flex w-full items-center justify-between">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  selected
                    ? "bg-[#0F766E] text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <Icon size={21} />
              </span>

              {selected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F766E] text-white"
                >
                  <Check size={12} />
                </motion.span>
              )}
            </div>

            <span className="text-sm font-semibold text-[#071B1A]">
              {title}
            </span>

            <span className="mt-1 text-xs leading-5 text-slate-500">
              {description}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}