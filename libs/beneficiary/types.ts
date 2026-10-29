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
};

export type AssistanceRequest = {
  id: string;
  resourceName: string;
  status: RequestStatus;
  submittedAt: string;
  updatedAt: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  type: "request" | "approval" | "collection" | "distribution";
};