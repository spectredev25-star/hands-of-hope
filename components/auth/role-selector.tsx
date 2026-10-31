"use client";

import { motion } from "motion/react";
import { HeartHandshake, Building2 } from "lucide-react";

export type UserRole = "beneficiary" | "organization";

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
}

const roles = [
  {
    value: "beneficiary" as const,
    label: "Beneficiary",
    description: "I need assistance and support.",
    icon: HeartHandshake,
  },
  {
    value: "organization" as const,
    label: "Organization",
    description: "I want to contribute resources.",
    icon: Building2,
  },
];

export default function RoleSelector({
  value,
  onChange,
}: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {roles.map((role) => {
        const Icon = role.icon;
        const active = value === role.value;

        return (
          <motion.button
            key={role.value}
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(role.value)}
            aria-pressed={active}
            className={`rounded-xl border p-4 text-left transition ${
              active
                ? "border-[#0F766E] bg-[#F0FDFA] ring-2 ring-[#0F766E]/10"
                : "border-slate-200 bg-white hover:border-teal-300"
            }`}
          >
            <Icon
              size={22}
              className={active ? "text-[#0F766E]" : "text-slate-400"}
            />
            <p className="mt-3 text-sm font-semibold text-[#071B1A]">
              {role.label}
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {role.description}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}