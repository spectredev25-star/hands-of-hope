
export type ContributionStatus =
  | "submitted"
  | "under_review"
  | "approved"
  | "collection_scheduled"
  | "collected"
  | "rejected";

export type Contribution = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  submittedAt: string;
  status: ContributionStatus;
  collectionDate?: string;
  description?: string;
};

export type OrganizationStats = {
  total: number;
  underReview: number;
  approved: number;
  collected: number;
};