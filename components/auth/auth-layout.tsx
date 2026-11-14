"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { AuthBrandPanel } from "./auth-brand-panel";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="auth-screen grid h-dvh min-h-0 overflow-hidden bg-[#071B1A] text-[#F1F5F4] lg:grid-cols-[0.9fr_1.1fr]">
      {/* Brand panel */}
      <AuthBrandPanel />

      {/* Form panel */}
      <section className="relative flex min-h-0 flex-col justify-center overflow-y-auto px-5 py-4 sm:px-10 lg:px-12 xl:px-20">
        {/* Mobile brand */}
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 self-start lg:hidden"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F766E] text-white">
            <HeartHandshake size={22} />
          </span>

          <span className="text-lg font-semibold tracking-tight text-[#071B1A]">
            Hands <span className="text-[#0F766E]">of Hope</span>
          </span>
        </Link>

        <div className="mx-auto w-full max-w-[440px] py-2">
          {children}
        </div>

        <p className="mt-3 text-center text-xs leading-5 text-slate-400">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="font-medium text-[#0F766E] hover:underline"
          >
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-medium text-[#0F766E] hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </main>
  );
}