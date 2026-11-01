import { connection } from "next/server";
import Image from "next/image";
import { Building2, CircleUserRound, Mail, MapPin, ShieldCheck } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { requireRole } from "@/libs/auth/authorize";
import { createClient } from "@/libs/supabase/server";
import { updateOrganizationProfile } from "./actions";
import { SaveProfileButton } from "./save-profile-button";

export const instant = false;

type ProfilePageProps = {
  searchParams: Promise<{ updated?: string; error?: string }>;
};

const errorMessages: Record<string, string> = {
  "invalid-name": "Please enter a valid contact name.",
  "invalid-phone": "Please check the phone number; it must be 30 characters or fewer.",
  "invalid-organization": "Please check the organization name, address and description.",
  "invalid-email": "Please enter a valid organization email address.",
  "save-failed": "We couldn't save your account contact details. Please try again.",
  "organization-save-failed": "Your account details were saved, but organization information could not be updated. Check that the organization update migration has been run.",
  "invalid-avatar-type": "Choose a PNG, JPG or WebP image.",
  "avatar-too-large": "Your profile image must be 2 MB or smaller.",
  "avatar-upload-failed": "We couldn't upload your profile image. Please check the avatars storage bucket and try again.",
};

const verificationLabels: Record<string, string> = {
  pending: "Verification pending",
  verified: "Verified organization",
  rejected: "Verification needs attention",
};

export default async function OrganizationProfilePage({ searchParams }: ProfilePageProps) {
  await connection();

  const [{ user }, params] = await Promise.all([
    requireRole(["organization"]),
    searchParams,
  ]);
  const supabase = await createClient();

  const [{ data: profile, error: profileError }, { data: organization, error: organizationError }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("full_name, email, phone, avatar_url")
        .eq("id", user.id)
        .single(),
      supabase
        .from("organizations")
        .select("organization_name, description, email, phone, address, verification_status")
        .eq("profile_id", user.id)
        .maybeSingle(),
    ]);

  if (profileError || !profile) throw new Error("Unable to load your organization profile.");
  if (organizationError) console.error("Organization profile:", organizationError);

  const errorMessage = params.error
    ? errorMessages[params.error] ?? "Something went wrong. Please try again."
    : null;
  const verificationStatus = organization?.verification_status ?? "pending";

  return (
    <div className="space-y-7">
      <DashboardPageHeader
        eyebrow="YOUR ORGANIZATION"
        title="Organization profile."
        description="Keep your account contact and organization information accurate so the Hands of Hope team can coordinate with you."
      />

      <form action={updateOrganizationProfile} className="space-y-7">
        <section className="rounded-2xl border border-[#DCE7E2] bg-white p-6 dark:border-[#244540] dark:bg-[#0D2927] sm:p-8">
          <div className="flex flex-col gap-4 border-b border-[#DCE7E2] pb-6 dark:border-[#244540] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
                <CircleUserRound size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#172524] dark:text-[#F1F5F4]">Account contact</h2>
                <p className="mt-1 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">The person managing this organization account.</p>
              </div>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0F766E]/10 px-3 py-2 text-xs font-semibold text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
              <ShieldCheck size={15} />
              {verificationLabels[verificationStatus] ?? "Verification status unavailable"}
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-dashed border-[#B8D2CB] bg-[#F8FAF7] p-4 dark:border-[#315B54] dark:bg-[#071B1A]/60 sm:flex-row sm:items-center">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
              {profile.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt="Organization profile image"
                  fill
                  sizes="80px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <Building2 size={30} strokeWidth={1.5} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <label htmlFor="organization-avatar" className="block text-sm font-semibold text-[#172524] dark:text-[#F1F5F4]">
                Organization profile image
              </label>
              <input
                id="organization-avatar"
                name="avatar"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="mt-2 block w-full text-sm text-[#64748B] file:mr-3 file:rounded-lg file:border-0 file:bg-[#0F766E] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-[#0D625B] dark:text-[#9AafAA]"
              />
              <p className="mt-2 text-xs leading-5 text-[#64748B] dark:text-[#9AafAA]">
                PNG, JPG or WebP · Maximum 2 MB. This image will appear in your workspace header.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">Contact person's name</span>
              <input name="fullName" defaultValue={profile.full_name ?? ""} required maxLength={100} autoComplete="name"
                className="h-12 w-full rounded-xl border border-[#DCE7E2] bg-[#FAFAF7] px-4 text-sm text-[#172524] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 dark:border-[#244540] dark:bg-[#071B1A] dark:text-[#F1F5F4]" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">Account email</span>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3A0]" size={17} />
                <input type="email" value={profile.email ?? user.email ?? ""} readOnly aria-readonly="true"
                  className="h-12 w-full cursor-not-allowed rounded-xl border border-[#DCE7E2] bg-[#F1F5F4] pl-11 pr-4 text-sm text-[#64748B] outline-none dark:border-[#244540] dark:bg-[#071B1A]/60 dark:text-[#F1F5F4]/50" />
              </div>
              <span className="mt-2 block text-xs text-[#64748B] dark:text-[#F1F5F4]/40">Your login email is managed by your account settings.</span>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">Contact phone</span>
              <input name="contactPhone" type="tel" defaultValue={profile.phone ?? ""} maxLength={30} autoComplete="tel" placeholder="Enter your phone number"
                className="h-12 w-full rounded-xl border border-[#DCE7E2] bg-[#FAFAF7] px-4 text-sm text-[#172524] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 dark:border-[#244540] dark:bg-[#071B1A] dark:text-[#F1F5F4] dark:placeholder:text-[#F1F5F4]/35" />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-[#DCE7E2] bg-white p-6 dark:border-[#244540] dark:bg-[#0D2927] sm:p-8">
          <div className="flex items-center gap-3 border-b border-[#DCE7E2] pb-5 dark:border-[#244540]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
              <Building2 size={22} />
            </div>
            <div>
              <h2 className="font-semibold text-[#172524] dark:text-[#F1F5F4]">Organization information</h2>
              <p className="mt-1 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">Update the details used by the Hands of Hope team to coordinate with your organization.</p>
            </div>
          </div>

          {organization ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">Organization name</span>
                <input name="organizationName" required maxLength={150} defaultValue={organization.organization_name ?? ""}
                  className="h-12 w-full rounded-xl border border-[#DCE7E2] bg-[#FAFAF7] px-4 text-sm text-[#172524] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 dark:border-[#244540] dark:bg-[#071B1A] dark:text-[#F1F5F4]" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">Organization email</span>
                <input name="organizationEmail" type="email" maxLength={254} defaultValue={organization.email ?? ""} placeholder="contact@organization.org"
                  className="h-12 w-full rounded-xl border border-[#DCE7E2] bg-[#FAFAF7] px-4 text-sm text-[#172524] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 dark:border-[#244540] dark:bg-[#071B1A] dark:text-[#F1F5F4]" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">Organization phone</span>
                <input name="organizationPhone" type="tel" maxLength={30} defaultValue={organization.phone ?? ""} placeholder="Organization contact number"
                  className="h-12 w-full rounded-xl border border-[#DCE7E2] bg-[#FAFAF7] px-4 text-sm text-[#172524] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 dark:border-[#244540] dark:bg-[#071B1A] dark:text-[#F1F5F4]" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">Registered address</span>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3A0]" size={17} />
                  <input name="address" maxLength={500} defaultValue={organization.address ?? ""} placeholder="Organization address"
                    className="h-12 w-full rounded-xl border border-[#DCE7E2] bg-[#FAFAF7] pl-11 pr-4 text-sm text-[#172524] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 dark:border-[#244540] dark:bg-[#071B1A] dark:text-[#F1F5F4]" />
                </div>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">About the organization</span>
                <textarea name="description" rows={4} maxLength={2000} defaultValue={organization.description ?? ""} placeholder="Tell us briefly about your organization and the work you do."
                  className="w-full rounded-xl border border-[#DCE7E2] bg-[#FAFAF7] px-4 py-3 text-sm text-[#172524] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 dark:border-[#244540] dark:bg-[#071B1A] dark:text-[#F1F5F4]" />
              </label>
            </div>
          ) : (
            <p className="mt-5 text-sm text-[#647572] dark:text-[#9AafAA]">Organization details have not been registered yet. Please contact the Hands of Hope team for assistance.</p>
          )}
          <p className="mt-6 border-t border-[#DCE7E2] pt-4 text-xs leading-5 text-[#64748B] dark:border-[#244540] dark:text-[#F1F5F4]/45">
            Your verification status is managed by the Hands of Hope team and cannot be changed here.
          </p>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SaveProfileButton />
          {params.updated === "1" && <p role="status" className="text-sm text-[#0F766E] dark:text-[#99F6E4]">Your profile and organization information have been updated.</p>}
          {errorMessage && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}
