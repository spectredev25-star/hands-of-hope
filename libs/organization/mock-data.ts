
import type {
  Contribution,
  OrganizationStats,
} from "./types";

export const organizationStats: OrganizationStats = {
  total: 24,
  underReview: 5,
  approved: 16,
  collected: 12,
};

export const mockContributions: Contribution[] = [
  {
    id: "CON-001",
    name: "Food supplies",
    category: "Food",
    quantity: 120,
    unit: "packs",
    submittedAt: "October 28, 2026",
    status: "under_review",
    description: "Non-perishable food supplies.",
  },
  {
    id: "CON-002",
    name: "Educational materials",
    category: "Education",
    quantity: 80,
    unit: "kits",
    submittedAt: "October 25, 2026",
    status: "approved",
    description: "School supplies for students.",
  },
  {
    id: "CON-003",
    name: "Clothing donations",
    category: "Clothing",
    quantity: 60,
    unit: "items",
    submittedAt: "October 22, 2026",
    status: "collection_scheduled",
    collectionDate: "November 3, 2026",
    description: "Clean clothing in good condition.",
  },
  {
    id: "CON-004",
    name: "Hygiene packages",
    category: "Personal care",
    quantity: 45,
    unit: "packages",
    submittedAt: "October 18, 2026",
    status: "collected",
    description: "Basic personal hygiene supplies.",
  },
  {
    id: "CON-005",
    name: "Medical supplies",
    category: "Healthcare",
    quantity: 30,
    unit: "boxes",
    submittedAt: "October 15, 2026",
    status: "rejected",
    description: "Medical supplies pending quality requirements.",
  },
];