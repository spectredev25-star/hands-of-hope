"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireRole } from "@/libs/auth/authorize";
import { createClient } from "@/libs/supabase/server";

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function updateOrganizationProfile(formData: FormData) {
  const { user } = await requireRole(["organization"]);
  const supabase = await createClient();

  const fullName = String(formData.get("fullName") ?? "").trim();
  const contactPhone = String(formData.get("contactPhone") ?? "").trim();
  const organizationName = String(formData.get("organizationName") ?? "").trim();
  const organizationEmail = String(formData.get("organizationEmail") ?? "").trim();
  const organizationPhone = String(formData.get("organizationPhone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const avatar = formData.get("avatar");

  if (!fullName || fullName.length > 100) redirect("/organization/profile?error=invalid-name");
  if (contactPhone.length > 30 || organizationPhone.length > 30) redirect("/organization/profile?error=invalid-phone");
  if (!organizationName || organizationName.length > 150) redirect("/organization/profile?error=invalid-organization");
  if (organizationEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(organizationEmail)) {
    redirect("/organization/profile?error=invalid-email");
  }
  if (address.length > 500 || description.length > 2000) {
    redirect("/organization/profile?error=invalid-organization");
  }

  let avatarUrl: string | undefined;
  if (avatar instanceof File && avatar.size > 0) {
    if (!ALLOWED_AVATAR_TYPES.includes(avatar.type)) redirect("/organization/profile?error=invalid-avatar-type");
    if (avatar.size > MAX_AVATAR_SIZE) redirect("/organization/profile?error=avatar-too-large");

    const extension = avatar.type === "image/jpeg" ? "jpg" : avatar.type.split("/")[1];
    // Use a new immutable object path for each upload. This avoids Storage upsert
    // requiring SELECT + UPDATE policies and prevents stale CDN-cached avatars.
    const filePath = `${user.id}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatar, {
        upsert: false,
        contentType: avatar.type,
        cacheControl: "3600",
      });

    if (uploadError) {
      console.error("updateOrganizationProfile avatar upload:", uploadError);
      redirect("/organization/profile?error=avatar-upload-failed");
    }

    avatarUrl = supabase.storage.from("avatars").getPublicUrl(filePath).data.publicUrl;
  }

  const profileUpdates: {
    full_name: string;
    phone: string | null;
    avatar_url?: string;
  } = {
    full_name: fullName,
    phone: contactPhone || null,
  };

  if (avatarUrl) profileUpdates.avatar_url = avatarUrl;

  const { error: profileError } = await supabase
    .from("profiles")
    .update(profileUpdates)
    .eq("id", user.id);

  if (profileError) {
    console.error("updateOrganizationProfile profile:", profileError);
    redirect("/organization/profile?error=save-failed");
  }

  const { data: organization, error: organizationError } = await supabase
    .from("organizations")
    .update({
      organization_name: organizationName,
      email: organizationEmail || null,
      phone: organizationPhone || null,
      address: address || null,
      description: description || null,
    })
    .eq("profile_id", user.id)
    .select("profile_id")
    .maybeSingle();

  if (organizationError || !organization) {
    console.error("updateOrganizationProfile organization:", organizationError);
    redirect("/organization/profile?error=organization-save-failed");
  }

  // Refresh the shared organization layout as well as the profile page.
  // The layout supplies avatar_url to the workspace topbar, so it must be
  // revalidated after an avatar upload or the header can keep stale data.
  revalidatePath("/organization", "layout");
  revalidatePath("/organization/profile");
  revalidatePath("/organization/dashboard");
  redirect("/organization/profile?updated=1");
}
