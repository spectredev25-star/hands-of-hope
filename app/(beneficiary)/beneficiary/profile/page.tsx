
import { connection } from "next/server";
import { Check, CircleUserRound } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { getMyProfile } from "@/libs/beneficiary/server";
import { updateBeneficiaryProfile } from "./actions";

type ProfilePageProps = {
  searchParams: Promise<{
    updated?: string;
    error?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "invalid-name": "Please enter a valid full name.",
  "invalid-phone": "Your phone number is too long.",
  "save-failed": "We couldn't save your changes. Please try again.",
};

export default async function BeneficiaryProfilePage({
  searchParams,
}: ProfilePageProps) {
  await connection();

  const [profile, params] = await Promise.all([
    getMyProfile(),
    searchParams,
  ]);

  const errorMessage = params.error
    ? errorMessages[params.error] ?? "Something went wrong."
    : null;

  return (
    <div className="space-y-7">
      <DashboardPageHeader
        eyebrow="YOUR ACCOUNT"
        title="Your profile."
        description="Review and update the information associated with your beneficiary account."
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
              Your information is connected to your Hands of Hope account.
            </p>
          </div>
        </div>

        <form action={updateBeneficiaryProfile} className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">
                Full name
              </span>

              <input
                name="fullName"
                defaultValue={profile.fullName}
                required
                maxLength={100}
                autoComplete="name"
                className="h-12 w-full rounded-xl border border-[#DCE7E2] bg-[#FAFAF7] px-4 text-sm text-[#172524] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 dark:border-[#244540] dark:bg-[#071B1A] dark:text-[#F1F5F4]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">
                Email address
              </span>

              <input
                type="email"
                value={profile.email}
                readOnly
                aria-readonly="true"
                className="h-12 w-full cursor-not-allowed rounded-xl border border-[#DCE7E2] bg-[#F1F5F4] px-4 text-sm text-[#64748B] outline-none dark:border-[#244540] dark:bg-[#071B1A]/60 dark:text-[#F1F5F4]/50"
              />

              <span className="mt-2 block text-xs text-[#64748B] dark:text-[#F1F5F4]/40">
                Your account email cannot be changed from this form.
              </span>
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">
                Phone number
              </span>

              <input
                name="phone"
                type="tel"
                defaultValue={profile.phone ?? ""}
                maxLength={30}
                autoComplete="tel"
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
            Save changes
          </button>

          {params.updated === "1" && (
            <p
              role="status"
              className="text-sm leading-6 text-[#0F766E] dark:text-[#99F6E4]"
            >
              Your profile has been updated successfully.
            </p>
          )}

          {errorMessage && (
            <p role="alert" className="text-sm leading-6 text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
