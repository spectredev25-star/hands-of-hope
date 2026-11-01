
import { createClient } from "@/libs/supabase/client";

import type {
  AssistanceRequest,
  BeneficiaryProfile,
  Resource,
  ResourceCategory,
  RequestStatus,
} from "./types";

// ---------------------------------------------
// DATABASE ROW TYPES
// ---------------------------------------------

type ResourceRow = {
  id: string;
  name: string;
  description: string | null;
  category: ResourceCategory;
  image_url: string | null;
  quantity_available: number;
  unit: string | null;
};

type AssistanceRequestRow = {
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

// ---------------------------------------------
// DATA MAPPERS
// ---------------------------------------------

function mapResource(resource: ResourceRow): Resource {
  return {
    id: resource.id,
    name: resource.name,
    description: resource.description ?? "",
    category: resource.category,
    imageUrl: resource.image_url ?? undefined,
    quantityAvailable: resource.quantity_available,
    unit: resource.unit ?? undefined,
    availabilityLabel: "Available to request",
  };
}

function mapRequest(request: AssistanceRequestRow): AssistanceRequest {
  return {
    id: request.id,
    resourceName: request.title,
    category: request.category,
    status: request.status,
    submittedAt: request.submitted_at,
    updatedAt: request.updated_at,
    description: request.description,
    adminNotes: request.admin_notes,
  };
}

// ---------------------------------------------
// AUTHENTICATED BENEFICIARY
// ---------------------------------------------

export async function getCurrentBeneficiaryId(): Promise<string> {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("You must be logged in to access this information.");
  }

  return user.id;
}

// ---------------------------------------------
// AVAILABLE RESOURCES
// ---------------------------------------------

export async function getAvailableResources(): Promise<Resource[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("resources")
    .select(
      "id, name, description, category, image_url, quantity_available, unit"
    )
    .eq("is_active", true)
    .gt("quantity_available", 0)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as ResourceRow[]).map(mapResource);
}

// ---------------------------------------------
// BENEFICIARY REQUESTS
// ---------------------------------------------

export async function getMyRequests(): Promise<AssistanceRequest[]> {
  const supabase = createClient();
  const beneficiaryId = await getCurrentBeneficiaryId();

  const { data, error } = await supabase
    .from("assistance_requests")
    .select(
      "id, title, category, status, description, admin_notes, submitted_at, updated_at"
    )
    .eq("beneficiary_id", beneficiaryId)
    .order("submitted_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as AssistanceRequestRow[]).map(mapRequest);
}

// ---------------------------------------------
// SINGLE BENEFICIARY REQUEST
// ---------------------------------------------

export async function getMyRequest(
  requestId: string
): Promise<AssistanceRequest | null> {
  const supabase = createClient();
  const beneficiaryId = await getCurrentBeneficiaryId();

  const { data, error } = await supabase
    .from("assistance_requests")
    .select(
      "id, title, category, status, description, admin_notes, submitted_at, updated_at"
    )
    .eq("id", requestId)
    .eq("beneficiary_id", beneficiaryId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  return mapRequest(data as AssistanceRequestRow);
}

// ---------------------------------------------
// BENEFICIARY PROFILE
// ---------------------------------------------

export async function getMyProfile(): Promise<BeneficiaryProfile> {
  const supabase = createClient();
  const beneficiaryId = await getCurrentBeneficiaryId();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, phone")
    .eq("id", beneficiaryId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const profile = data as ProfileRow;

  return {
    id: profile.id,
    fullName: profile.full_name,
    email: profile.email ?? "",
    phone: profile.phone,
  };
}

// ---------------------------------------------
// UPDATE BENEFICIARY PROFILE
// ---------------------------------------------

export async function updateMyProfile(input: {
  fullName: string;
  phone: string;
}): Promise<void> {
  const supabase = createClient();
  const beneficiaryId = await getCurrentBeneficiaryId();

  const fullName = input.fullName.trim();
  const phone = input.phone.trim();

  if (!fullName) {
    throw new Error("Full name cannot be empty.");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      phone: phone || null,
    })
    .eq("id", beneficiaryId);

  if (error) {
    throw new Error(error.message);
  }
}
