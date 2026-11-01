import type { ContributionStatus } from "@/libs/organization/types";

const statusStyles: Record<
  ContributionStatus,
  { label: string; className: string }
> = {
  submitted: {
    label: "Submitted",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300",
  },
  under_review: {
    label: "Under review",
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  },
  approved: {
    label: "Approved",
    className:
      "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300",
  },
  collection_scheduled: {
    label: "Collection scheduled",
    className:
      "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
  },
  collected: {
    label: "Collected",
    className:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  },
  rejected: {
    label: "Not accepted",
    className:
      "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300",
  },
};

export function ContributionStatusBadge({
  status,
}: {
  status: ContributionStatus;
}) {
  const config = statusStyles[status];

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
