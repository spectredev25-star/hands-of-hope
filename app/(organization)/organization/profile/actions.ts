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
  const phone = String(formData.get("phone") ?? "").trim();
  const avatar = formData.get("avatar");

  if (!fullName || fullName.length > 100) redirect("/organization/profile?error=invalid-name");
  if (phone.length > 30) redirect("/organization/profile?error=invalid-phone");

  let avatarUrl: string | undefined;
  if (avatar instanceof File && avatar.size > 0) {
    if (!ALLOWED_AVATAR_TYPES.includes(avatar.type)) redirect("/organization/profile?error=invalid-avatar-type");
    if (avatar.size > MAX_AVATAR_SIZE) redirect("/organization/profile?error=avatar-too-large");
    const extension = avatar.type === "image/jpeg" ? "jpg" : avatar.type.split("/")[1];
    const filePath = user.id + "/profile." + extension;
    const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, avatar, { upsert: true, contentType: avatar.type, cacheControl: "3600" });
    if (uploadError) {
      console.error("updateOrganizationProfile avatar upload:", uploadError);
      redirect("/organization/profile?error=avatar-upload-failed");
    }
    avatarUrl = supabase.storage.from("avatars").getPublicUrl(filePath).data.publicUrl;
  }

  const updates: { full_name: string; phone: string | null; avatar_url?: string } = { full_name: fullName, phone: phone || null };
  if (avatarUrl) updates.avatar_url = avatarUrl;
  const { error } = await supabase.from("profiles").update(updates).eq("id", user.id);
  if (error) {
    console.error("updateOrganizationProfile:", error);
    redirect("/organization/profile?error=save-failed");
  }
  revalidatePath("/organization/profile");
  revalidatePath("/organization/dashboard");
  redirect("/organization/profile?updated=1");
}
