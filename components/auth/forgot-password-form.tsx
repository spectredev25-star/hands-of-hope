"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Mail, CheckCircle2, AlertCircle } from "lucide-react";

import { supabase } from "@/libs/supabase/client";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email.trim()) {
        throw new Error("Please enter your email address.");
      }

      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        }
      );

      if (error) throw error;

      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't send the reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href="/login"
        className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-[#0F766E]"
      >
        <ArrowLeft size={16} />
        Back to login
      </Link>

      {!sent ? (
        <>
          <div className="mb-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E]">
              <Mail size={23} />
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-[#071B1A]">
              Forgot your password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter the email associated with your account and we'll
              send you a password reset link.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 flex gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-teal-700/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] text-sm font-semibold text-white transition hover:bg-[#115E59] disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        </>
      ) : (
        <div className="py-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-[#0F766E]">
            <CheckCircle2 size={30} />
          </div>

          <h1 className="text-2xl font-semibold text-[#071B1A]">
            Check your inbox
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            If an account exists for that address, you'll receive
            instructions to reset your password.
          </p>

          <p className="mt-2 break-all text-sm font-medium text-[#0F766E]">
            {email}
          </p>

          <Link
            href="/login"
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#0F766E] text-sm font-semibold text-white transition-colors hover:bg-[#115E59]"
          >
            Return to login
          </Link>
        </div>
      )}
    </motion.div>
  );
}