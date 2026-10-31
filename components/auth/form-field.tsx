"use client";

import type { InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  Icon?: LucideIcon;
  error?: string;
}

export default function FormField({
  label,
  Icon,
  error,
  id,
  className = "",
  ...props
}: FormFieldProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-[#071B1A]"
      >
        {label}
      </label>

      <div
        className={`flex h-9 items-center gap-3 rounded-xl border bg-white px-3.5 transition-all duration-200 focus-within:border-[#0F766E] focus-within:ring-4 focus-within:ring-[#0F766E]/10 ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      >
        {Icon && (
          <Icon
            size={18}
            aria-hidden="true"
            className="shrink-0 text-slate-400"
          />
        )}

        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`h-full min-w-0 flex-1 bg-transparent text-sm text-[#071B1A] outline-none placeholder:text-slate-400 ${className}`}
          {...props}
        />
      </div>

      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="text-xs text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}