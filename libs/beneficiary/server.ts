
import "server-only";

import { createClient } from "@/libs/supabase/server";
import { requireRole } from "@/libs/auth/authorize";

import type {
  AssistanceRequest,
  BeneficiaryProfile,
  Resource,
  ResourceCategory,
  RequestStatus,
} from "./types";

type ResourceRow = {
  id: string;
  name: string;
  description: string | null;
  category: ResourceCategory;
  image_url: string | null;
  quantity_available: number;
  unit: string | null;
};

type RequestRow = {
  id: string;
  title: string;
  category: ResourceCategory;
  status: RequestStatus;
  description: string | null;
  admin_notes: string | null;
  submitted_at: string;
  updated_at: string;
};

type ProfileRow = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
};

export type CompletedDistribution = {
  id: string;
  requestId: string;
  resourceName: string;
  category: ResourceCategory;
  completedAt: string;
};

function mapResource(row: ResourceRow): Resource {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    category: row.category,
    imageUrl: row.image_url ?? undefined,
    quantityAvailable: row.quantity_available,
    unit: row.unit ?? undefined,
    availabilityLabel: "Available to request",
  };
}

function mapRequest(row: RequestRow): AssistanceRequest {
  return {
    id: row.id,
    resourceName: row.title,
    category: row.category,
    status: row.status,
    description: row.description,
    adminNotes: row.admin_notes,
    submittedAt: row.submitted_at,
    updatedAt: row.updated_at,
  };
}

async function getBeneficiaryContext() {
  const auth = await requireRole(["beneficiary"]);
  const supabase = await createClient();

  return {
    supabase,
    beneficiaryId: auth.user.id,
  };
}

export async function getAvailableResources(): Promise<Resource[]> {
  const { supabase } = await getBeneficiaryContext();

  const { data, error } = await supabase
    .from("resources")
    .select(
      "id, name, description, category, image_url, quantity_available, unit"
    )
    .eq("is_active", true)
    .gt("quantity_available", 0)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAvailableResources:", error);
    throw new Error("Unable to load available resources.");
  }

  return ((data ?? []) as ResourceRow[]).map(mapResource);
}

export async function getMyRequests(): Promise<AssistanceRequest[]> {
  const { supabase, beneficiaryId } = await getBeneficiaryContext();

  const { data, error } = await supabase
    .from("assistance_requests")
    .select(
      "id, title, category, status, description, admin_notes, submitted_at, updated_at"
    )
    .eq("beneficiary_id", beneficiaryId)
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("getMyRequests:", error);
    throw new Error("Unable to load your requests.");
  }

  return ((data ?? []) as RequestRow[]).map(mapRequest);
}

export async function getMyRequest(
  requestId: string
): Promise<AssistanceRequest | null> {
  const { supabase, beneficiaryId } = await getBeneficiaryContext();

  const { data, error } = await supabase
    .from("assistance_requests")
    .select(
      "id, title, category, status, description, admin_notes, submitted_at, updated_at"
    )
    .eq("id", requestId)
    .eq("beneficiary_id", beneficiaryId)
    .maybeSingle();

  if (error) {
    console.error("getMyRequest:", error);
    throw new Error("Unable to load this request.");
  }

  return data ? mapRequest(data as RequestRow) : null;
}

export async function getMyProfile(): Promise<BeneficiaryProfile> {
  const { supabase, beneficiaryId } = await getBeneficiaryContext();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, phone")
    .eq("id", beneficiaryId)
    .single();

  if (error || !data) {
    console.error("getMyProfile:", error);
    throw new Error("Unable to load your profile.");
  }

  const profile = data as ProfileRow;

  return {
    id: profile.id,
    fullName: profile.full_name,
    email: profile.email ?? "",
    phone: profile.phone,
  };
}

export async function getMyCompletedDistributions(): Promise<
  CompletedDistribution[]
> {
  const { supabase, beneficiaryId } = await getBeneficiaryContext();

  const { data, error } = await supabase
    .from("distributions")
    .select(`
      id,
      request_id,
      completed_at,
      assistance_requests (
        title,
        category
      )
    `)
    .eq("beneficiary_id", beneficiaryId)
    .eq("status", "completed")
    .not("completed_at", "is", null)
    .order("completed_at", { ascending: false });

  if (error) {
    console.error("getMyCompletedDistributions:", error);
    throw new Error("Unable to load your distribution history.");
  }

  return (data ?? []).map((row: any) => {
    const request = Array.isArray(row.assistance_requests)
      ? row.assistance_requests[0]
      : row.assistance_requests;

    return {
      id: row.id,
      requestId: row.request_id,
      resourceName: request?.title ?? "Assistance distribution",
      category: request?.category ?? "other",
      completedAt: row.completed_at,
    };
  });
}
