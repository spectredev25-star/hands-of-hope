"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/libs/auth/authorize";
import { createClient } from "@/libs/supabase/server";

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function updateBeneficiaryProfile(formData: FormData) {
  const { user } = await requireRole(["beneficiary"]);
  const supabase = await createClient();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const avatar = formData.get("avatar");

  if (!fullName || fullName.length > 100) redirect("/beneficiary/profile?error=invalid-name");
  if (phone.length > 30) redirect("/beneficiary/profile?error=invalid-phone");

  const updates: { full_name: string; phone: string | null; avatar_url?: string } = { full_name: fullName, phone: phone || null };

  if (avatar instanceof File && avatar.size > 0) {
    if (!ALLOWED_TYPES.includes(avatar.type)) redirect("/beneficiary/profile?error=invalid-avatar-type");
    if (avatar.size > MAX_AVATAR_SIZE) redirect("/beneficiary/profile?error=avatar-too-large");
    const extension = avatar.type === "image/png" ? "png" : avatar.type === "image/webp" ? "webp" : "jpg";
    const filePath = user.id + "/beneficiary-avatar-" + Date.now() + "." + extension;
    const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, avatar, { upsert: true, contentType: avatar.type, cacheControl: "3600" });
    if (uploadError) { console.error("Beneficiary avatar upload failed:", uploadError); redirect("/beneficiary/profile?error=avatar-upload-failed"); }
    const { data: publicUrl } = supabase.storage.from("avatars").getPublicUrl(filePath);
    updates.avatar_url = publicUrl.publicUrl;
  }

  const { error } = await supabase.from("profiles").update(updates).eq("id", user.id);
  if (error) { console.error("updateBeneficiaryProfile:", error); redirect("/beneficiary/profile?error=save-failed"); }
  revalidatePath("/beneficiary/profile");
  revalidatePath("/beneficiary/dashboard");
  redirect("/beneficiary/profile?updated=1");
}