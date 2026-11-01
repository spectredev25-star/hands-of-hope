
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireRole } from "@/libs/auth/authorize";
import { createClient } from "@/libs/supabase/server";

export async function updateBeneficiaryProfile(formData: FormData) {
  const { user } = await requireRole(["beneficiary"]);
  const supabase = await createClient();

  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!fullName || fullName.length > 100) {
    redirect("/beneficiary/profile?error=invalid-name");
  }

  if (phone.length > 30) {
    redirect("/beneficiary/profile?error=invalid-phone");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      phone: phone || null,
    })
    .eq("id", user.id);

  if (error) {
    console.error("updateBeneficiaryProfile:", error);
    redirect("/beneficiary/profile?error=save-failed");
  }

  revalidatePath("/beneficiary/profile");
  revalidatePath("/beneficiary/dashboard");

  redirect("/beneficiary/profile?updated=1");
}
