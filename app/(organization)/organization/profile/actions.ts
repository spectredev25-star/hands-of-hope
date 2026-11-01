"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireRole } from "@/libs/auth/authorize";
import { createClient } from "@/libs/supabase/server";

export async function updateOrganizationProfile(formData: FormData) {
  const { user } = await requireRole(["organization"]);
  const supabase = await createClient();

  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!fullName || fullName.length > 100) {
    redirect("/organization/profile?error=invalid-name");
  }

  if (phone.length > 30) {
    redirect("/organization/profile?error=invalid-phone");
  }

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, phone: phone || null })
    .eq("id", user.id);

  if (error) {
    console.error("updateOrganizationProfile:", error);
    redirect("/organization/profile?error=save-failed");
  }

  revalidatePath("/organization/profile");
  revalidatePath("/organization/dashboard");
  redirect("/organization/profile?updated=1");
}
