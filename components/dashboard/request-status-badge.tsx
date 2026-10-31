import type { RequestStatus } from "@/libs/beneficiary/types";

const statusLabels: Record<RequestStatus, string> = {
  pending_review: "Under review",
  approved: "Approved",
  preparing: "Being prepared",
  ready_for_collection: "Ready to collect",
  completed: "Completed",
  rejected: "Not approved",
  expired: "Expired",
  cancelled: "Cancelled",
};

export function RequestStatusBadge({
  status,
}: {
  status: RequestStatus;
}) {
  const isInactive = [
    "rejected",
    "expired",
    "cancelled",
  ].includes(status);

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1.5",
        "text-xs font-medium",
        isInactive
          ? "border-[#DCE7E2] bg-[#FAFAF7] text-[#64748B] dark:border-[#244540] dark:bg-[#071B1A] dark:text-[#F1F5F4]/60"
          : "border-[#0F766E]/25 bg-[#0F766E]/10 text-[#0F766E] dark:border-[#14B8A6]/25 dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]",
      ].join(" ")}
    >
      {statusLabels[status]}
    </span>
  );
}