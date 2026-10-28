"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

import { supabase } from "@/libs/supabase/client";
import AuthLayout from "@/components/auth/auth-layout";
import FormField from "@/components/auth/form-field";
import AuthSubmitButton from "@/components/auth/auth-submit-button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (!email.trim()) {
        throw new Error("Please enter your email address.");
      }

      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo: `${window.location.origin}/reset-password`,
          }
        );

      if (resetError) {
        throw resetError;
      }

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
    <AuthLayout>
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
                It happens. Enter the email associated with your
                account and we'll send you a password reset link.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <FormField
                id="email"
                name="email"
                label="Email address"
                Icon={Mail}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <AuthSubmitButton loading={loading}>
                Send reset link
              </AuthSubmitButton>
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
    </AuthLayout>
  );
}