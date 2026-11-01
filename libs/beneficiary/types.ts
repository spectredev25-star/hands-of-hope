
export type RequestStatus =
  | "pending_review"
  | "approved"
  | "preparing"
  | "ready_for_collection"
  | "completed"
  | "rejected"
  | "expired"
  | "cancelled";

export type ResourceCategory =
  | "food"
  | "clothing"
  | "education"
  | "household"
  | "health"
  | "other";

export type Resource = {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  imageUrl?: string;
  availabilityLabel: string;
  quantityAvailable?: number;
  unit?: string;
};

export type AssistanceRequest = {
  id: string;
  resourceName: string;
  category: ResourceCategory;
  status: RequestStatus;
  submittedAt: string;
  updatedAt: string;
  description?: string | null;
  adminNotes?: string | null;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  type: "request" | "approval" | "collection" | "distribution";
};

export type BeneficiaryProfile = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
};
