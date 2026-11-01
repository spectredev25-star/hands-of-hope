
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { createClient } from "@/libs/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      // STEP 1: Authenticate the user.
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        console.error("SUPABASE LOGIN ERROR:", {
          code: loginError.code,
          message: loginError.message,
          status: loginError.status,
        });

        throw loginError;
      }

      if (!data.user) {
        throw new Error("We couldn't retrieve your account.");
      }

      console.log("AUTHENTICATION SUCCESSFUL:", {
        userId: data.user.id,
        email: data.user.email,
        hasSession: !!data.session,
      });

      // STEP 2: Retrieve the user's application role.
      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();

      // STEP 3: Log the exact Supabase database error.
      if (profileError) {
        console.error("SUPABASE PROFILE ERROR:", {
          code: profileError.code,
          message: profileError.message,
          details: profileError.details,
          hint: profileError.hint,
        });

        throw new Error(
          `Profile lookup failed: ${profileError.message} (Code: ${profileError.code})`
        );
      }

      console.log("SUPABASE PROFILE RESULT:", profile);

      if (!profile) {
        throw new Error(
          "Your account profile has not been created. Please contact support."
        );
      }

      // STEP 4: Redirect according to the database role.
      const dashboardRoutes: Record<string, string> = {
        beneficiary: "/beneficiary/dashboard",
        organization: "/organization/dashboard",
        admin: "/admin/dashboard",
      };

      const destination = dashboardRoutes[profile.role];

      if (!destination) {
        console.error("INVALID PROFILE ROLE:", profile.role);

        throw new Error(
          "Your account does not have a valid assigned role."
        );
      }

      // Full navigation allows the server to read the refreshed session.
      window.location.assign(destination);

    } catch (err) {
      console.error("LOGIN FLOW ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again."
      );

      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#0F766E]"
        >
          <span className="text-xl">♡</span>
          Hands of Hope
        </Link>

        <h1 className="mt-7 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Welcome back
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Sign in to continue making a difference.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
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

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-[#0F766E] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-teal-700/10"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((current) => !current)
              }
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#115E59] disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-[#0F766E] hover:underline"
        >
          Create account
        </Link>
      </p>
    </motion.div>
  );
}
