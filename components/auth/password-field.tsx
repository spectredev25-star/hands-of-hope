"use client";

import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
}

export default function PasswordField({
  label,
  name,
  value,
  onChange,
  placeholder = "Enter your password",
  error,
  autoComplete = "new-password",
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  const inputId = name;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-[#071B1A]"
      >
        {label}
      </label>

      <div
        className={`flex h-12 items-center gap-3 rounded-xl border bg-white px-3.5 transition-all duration-200 focus-within:border-[#0F766E] focus-within:ring-4 focus-within:ring-[#0F766E]/10 ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      >
        <LockKeyhole
          size={18}
          aria-hidden="true"
          className="shrink-0 text-slate-400"
        />

        <input
          id={inputId}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#071B1A] outline-none placeholder:text-slate-400"
        />

        <button
          type="button"
          onClick={() => setVisible((previous) => !previous)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0F766E]"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
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