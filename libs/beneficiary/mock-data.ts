import type {
  ActivityItem,
  AssistanceRequest,
  Resource,
} from "./types";

export const mockResources: Resource[] = [
  {
    id: "resource-001",
    name: "Family Food Support",
    description:
      "Essential food supplies intended to support households with everyday needs.",
    category: "food",
    availabilityLabel: "Available to request",
  },
  {
    id: "resource-002",
    name: "Learning Essentials",
    description:
      "School supplies to help children continue their learning journey.",
    category: "education",
    availabilityLabel: "Available to request",
  },
  {
    id: "resource-003",
    name: "Everyday Clothing",
    description:
      "Clothing essentials collected and inspected by our team.",
    category: "clothing",
    availabilityLabel: "Available to request",
  },
];

export const mockRequests: AssistanceRequest[] = [
  {
    id: "REQ-1042",
    resourceName: "Family Food Support",
    category: "food",
    status: "pending_review",
    submittedAt: "2026-10-25",
    updatedAt: "2026-10-25",
  },
  {
    id: "REQ-1031",
    resourceName: "Learning Essentials",
    category: "education",
    status: "approved",
    submittedAt: "2026-10-20",
    updatedAt: "2026-10-24",
  },
];

export const mockActivities: ActivityItem[] = [
  {
    id: "activity-001",
    title: "Request submitted",
    description:
      "Your Family Food Support request has been received.",
    createdAt: "2026-10-25T10:30:00.000Z",
    type: "request",
  },
  {
    id: "activity-002",
    title: "Request approved",
    description:
      "Your Learning Essentials request has been approved.",
    createdAt: "2026-10-24T13:15:00.000Z",
    type: "approval",
  },
];