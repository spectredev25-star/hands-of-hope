"use client";

import { useState } from "react";
import { Check, CircleUserRound } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

export default function BeneficiaryProfilePage() {
  const [fullName, setFullName] = useState("Demo Beneficiary");
  const [email, setEmail] = useState("beneficiary@example.test");
  const [phone, setPhone] = useState("");
  const [notice, setNotice] = useState(false);

  function handlePreviewSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(true);
  }

  return (
    <div className="space-y-7">
      <DashboardPageHeader
        eyebrow="YOUR ACCOUNT"
        title="Your profile."
        description="Review the information associated with your beneficiary account."
      />

      <section className="rounded-2xl border border-[#DCE7E2] bg-white p-6 dark:border-[#244540] dark:bg-[#0D2927] sm:p-8">
        <div className="flex items-center gap-4 border-b border-[#DCE7E2] pb-6 dark:border-[#244540]">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
            <CircleUserRound size={28} strokeWidth={1.5} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-[#172524] dark:text-[#F1F5F4]">
              Personal information
            </h2>

            <p className="mt-1 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
              Demonstration profile — not connected to an account.
            </p>
          </div>
        </div>

        <form onSubmit={handlePreviewSave} className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">
                Full name
              </span>

              <input
                value={fullName}
                onChange={(event) => {
                  setFullName(event.target.value);
                  setNotice(false);
                }}
                required
                maxLength={100}
                className="h-12 w-full rounded-xl border border-[#DCE7E2] bg-[#FAFAF7] px-4 text-sm text-[#172524] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 dark:border-[#244540] dark:bg-[#071B1A] dark:text-[#F1F5F4]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">
                Email address
              </span>

              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setNotice(false);
                }}
                required
                maxLength={254}
                className="h-12 w-full rounded-xl border border-[#DCE7E2] bg-[#FAFAF7] px-4 text-sm text-[#172524] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 dark:border-[#244540] dark:bg-[#071B1A] dark:text-[#F1F5F4]"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">
                Phone number
              </span>

              <input
                type="tel"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                  setNotice(false);
                }}
                maxLength={30}
                placeholder="Enter your phone number"
                className="h-12 w-full rounded-xl border border-[#DCE7E2] bg-[#FAFAF7] px-4 text-sm text-[#172524] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 dark:border-[#244540] dark:bg-[#071B1A] dark:text-[#F1F5F4] dark:placeholder:text-[#F1F5F4]/35"
              />
            </label>
          </div>

          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#14B8A6] hover:text-[#071B1A]"
          >
            <Check size={17} />
            Preview changes
          </button>

          {notice && (
            <p role="status" className="text-sm leading-6 text-[#0F766E] dark:text-[#99F6E4]">
              Your changes are visible in this preview only. They have
              not been saved to an account or database.
            </p>
          )}
        </form>
      </section>
    </div>
  );
}