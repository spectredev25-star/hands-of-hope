
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  UserRound,
  Building2,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { createClient } from "@/libs/supabase/client";
import RoleSelector, { type UserRole } from "./role-selector";

const SITE_URL = "https://hands-of-hope.vercel.app";

export default function SignupForm() {
  const [role, setRole] = useState<UserRole>("beneficiary");
  const [fullName, setFullName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dashboardRoutes: Record<UserRole, string> = {
    beneficiary: "/beneficiary/dashboard",
    organization: "/organization/dashboard",
  };

  async function handleSignup(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (fullName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (role === "organization" && !organizationName.trim()) {
      setError("Please enter your organization name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: signupError } =
        await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${SITE_URL}/auth/callback?next=/login`,
            data: {
              full_name: fullName.trim(),
              signup_role: role,
              organization_name:
                role === "organization"
                  ? organizationName.trim()
                  : null,
            },
          },
        });

      if (signupError) {
        throw signupError;
      }

      if (data.session) {
        window.location.assign(dashboardRoutes[role]);
        return;
      }

      setSuccess(
        "Your account has been created. Please check your email to verify your address before signing in."
      );
    } catch (err) {
      console.error("Signup error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setError("");
    setSuccess("");

    if (!acceptedTerms) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    if (role === "organization" && !organizationName.trim()) {
      setError("Please enter your organization name.");
      return;
    }

    setGoogleLoading(true);

    try {
      const supabase = createClient();

      sessionStorage.setItem("pending_signup_role", role);

      sessionStorage.setItem(
        "pending_organization_name",
        role === "organization"
          ? organizationName.trim()
          : ""
      );

      const { error: oauthError } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${SITE_URL}/auth/callback?next=${encodeURIComponent(
              dashboardRoutes[role]
            )}`,
          },
        });

      if (oauthError) {
        throw oauthError;
      }
    } catch (err) {
      console.error("Google signup error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to continue with Google. Please try again."
      );

      setGoogleLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#0F766E] transition hover:text-[#115E59]"
        >
          <span className="text-xl">♡</span>
          <span>Hands of Hope</span>
        </Link>

        <h1 className="mt-7 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Create your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Join a community making assistance more accessible,
          transparent, and meaningful.
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-5">
        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-700">
            I want to join as a
          </label>

          <RoleSelector value={role} onChange={setRole} />
        </div>

        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full name
          </label>

          <div className="relative">
            <UserRound
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0F766E] focus:ring-4 focus:ring-teal-700/10"
            />
          </div>
        </div>

        {role === "organization" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden"
          >
            <label
              htmlFor="organizationName"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Organization name
            </label>

            <div className="relative">
              <Building2
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="organizationName"
                name="organizationName"
                type="text"
                autoComplete="organization"
                required
                value={organizationName}
                onChange={(event) =>
                  setOrganizationName(event.target.value)
                }
                placeholder="Enter your organization name"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0F766E] focus:ring-4 focus:ring-teal-700/10"
              />
            </div>
          </motion.div>
        )}

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
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0F766E] focus:ring-4 focus:ring-teal-700/10"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <span className="text-xs text-slate-400">
              At least 8 characters
            </span>
          </div>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a strong password"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0F766E] focus:ring-4 focus:ring-teal-700/10"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((current) => !current)
              }
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Confirm password
          </label>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="Enter your password again"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0F766E] focus:ring-4 focus:ring-teal-700/10"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((current) => !current)
              }
              aria-label={
                showConfirmPassword
                  ? "Hide confirmation password"
                  : "Show confirmation password"
              }
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="terms"
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) =>
              setAcceptedTerms(event.target.checked)
            }
            className="mt-1 size-4 shrink-0 accent-[#0F766E]"
          />

          <label
            htmlFor="terms"
            className="text-sm leading-6 text-slate-500"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-medium text-[#0F766E] hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-[#0F766E] hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div
            role="status"
            className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
          >
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <p>{success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || googleLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating your account...
            </>
          ) : (
            <>
              Create account
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />

        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
          or continue with
        </span>

        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignup}
        disabled={loading || googleLoading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {googleLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <span className="text-lg font-bold">G</span>
        )}

        {googleLoading
          ? "Connecting to Google..."
          : "Continue with Google"}
      </button>

      <p className="mt-7 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#0F766E] transition hover:text-[#115E59]"
        >
          Sign in
        </Link>
      </p>

      <p className="mt-8 text-center text-xs leading-5 text-slate-400">
        By joining Hands of Hope, you become part of a community
        working toward accessible and accountable assistance.
      </p>
    </div>
  );
}
