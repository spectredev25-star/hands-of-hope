import { notFound } from "next/navigation";
import { requireRole } from "@/libs/auth/authorize";
import { createClient } from "@/libs/supabase/server";
import { RequestResourceForm } from "./request-form";

export default async function ResourceDetails({ params }: { params: Promise<{id:string}> }) {
  await requireRole(["beneficiary"]);
  const { id } = await params;
  const supabase = await createClient();
  const { data: resource } = await supabase.from("resources")
    .select("id,name,description,category,quantity_available,unit")
    .eq("id",id).eq("is_active",true).gt("quantity_available",0).maybeSingle();
  if (!resource) notFound();
  return <main className="mx-auto max-w-2xl space-y-6 p-6">
    <a href="/beneficiary/resources" className="text-teal-700">← Back to resources</a>
    <h1 className="text-3xl font-bold">{resource.name}</h1>
    <p>{resource.description}</p>
    <p className="text-sm">Available: {resource.quantity_available} {resource.unit ?? "units"}</p>
    <RequestResourceForm resourceId={resource.id} />
  </main>;
}
