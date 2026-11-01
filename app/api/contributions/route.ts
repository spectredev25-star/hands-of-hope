import { NextResponse } from "next/server";

import { createClient } from "@/libs/supabase/server";

const CATEGORIES = [
  "food",
  "clothing",
  "education",
  "household",
  "health",
  "other",
] as const;

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "organization") {
    return NextResponse.json({ error: "Organization access is required." }, { status: 403 });
  }

  const { data: organization, error: organizationError } = await supabase
    .from("organizations")
    .select("id")
    .eq("profile_id", user.id)
    .maybeSingle();

  if (organizationError || !organization) {
    return NextResponse.json({ error: "Your organization profile could not be found." }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("contributions")
    .select("id, item_name, description, category, quantity, unit, pickup_address, status, admin_notes, created_at, quantity_collected, quantity_accepted, contribution_collections(id, scheduled_at, collection_address, status, contact_name, contact_phone)")
    .eq("organization_id", organization.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("GET /api/contributions:", error);
    return NextResponse.json({ error: "Unable to load your contributions." }, { status: 500 });
  }

  return NextResponse.json({ contributions: data ?? [] });
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Please sign in to submit a contribution." }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "organization") {
    return NextResponse.json({ error: "Only organization accounts can submit contributions." }, { status: 403 });
  }

  const { data: organization, error: organizationError } = await supabase
    .from("organizations")
    .select("id")
    .eq("profile_id", user.id)
    .maybeSingle();

  if (organizationError || !organization) {
    return NextResponse.json({ error: "Your organization profile could not be found." }, { status: 404 });
  }


  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const itemName = typeof body.item_name === "string" ? body.item_name.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const category = typeof body.category === "string" ? body.category : "";
  const unit = typeof body.unit === "string" ? body.unit.trim() : "";
  const pickupAddress = typeof body.pickup_address === "string" ? body.pickup_address.trim() : "";
  const quantity = Number(body.quantity);

  if (itemName.length < 2 || itemName.length > 120) {
    return NextResponse.json({ error: "Item name must be between 2 and 120 characters." }, { status: 400 });
  }

  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
    return NextResponse.json({ error: "Choose a valid contribution category." }, { status: 400 });
  }

  if (!Number.isSafeInteger(quantity) || quantity <= 0 || quantity > 1000000) {
    return NextResponse.json({ error: "Enter a valid quantity greater than zero." }, { status: 400 });
  }

  if (!unit || unit.length > 40 || !pickupAddress || pickupAddress.length > 500) {
    return NextResponse.json({ error: "Unit and pickup address are required." }, { status: 400 });
  }

  if (description.length > 2000) {
    return NextResponse.json({ error: "Description must be 2,000 characters or fewer." }, { status: 400 });
  }

  const { data: contribution, error } = await supabase
    .from("contributions")
    .insert({
      organization_id: organization.id,
      item_name: itemName,
      description: description || null,
      category,
      quantity,
      unit,
      pickup_address: pickupAddress,
      status: "submitted",
    })
    .select("id, item_name, quantity, unit, status, created_at")
    .single();

  if (error) {
    console.error("POST /api/contributions:", error);
    return NextResponse.json({ error: "Your contribution could not be submitted. Please try again." }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Your contribution has been submitted for review.", contribution },
    { status: 201 },
  );
}
