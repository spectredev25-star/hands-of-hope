import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3 } from "lucide-react";

import type { RequestStatus } from "@/libs/beneficiary/types";

type Props = {
  requestId: string;
  resourceName: string;
  status: RequestStatus;
};

const journeySteps = [
  {
    label: "Submitted",
    description: "Request received",
  },
  {
    label: "Under review",
    description: "Team reviewing",
  },
  {
    label: "Preparing",
    description: "Getting things ready",
  },
  {
    label: "Ready",
    description: "Collection details available",
  },
];

const statusToStep: Partial<Record<RequestStatus, number>> = {
  pending_review: 1,
  approved: 2,
  preparing: 2,
  ready_for_collection: 3,
  completed: 4,
};

const statusMessages: Record<RequestStatus, string> = {
  pending_review:
    "Your request has been received. Our team will review it and update you.",
  approved:
    "Your request has been approved. Follow the updates as we prepare the next steps.",
  preparing:
    "Your approved request is being prepared by our team.",
  ready_for_collection:
    "Your allocation is ready. Check your collection instructions before visiting.",
  completed:
    "Your request has been fulfilled. Thank you for being part of our community.",
  rejected:
    "This request was not approved. Please review the available information or contact the support team.",
  expired:
    "This request has expired. Please check your dashboard for available next steps.",
  cancelled:
    "This request has been cancelled.",
};

export function AssistanceJourney({
  requestId,
  resourceName,
  status,
}: Props) {
  const currentStep = statusToStep[status] ?? 0;

  const isTerminal =
    status === "rejected" ||
    status === "expired" ||
    status === "cancelled";

  return (
    <section className="rounded-2xl border border-[#DCE7E2] bg-white p-5 transition-colors duration-300 dark:border-[#244540] dark:bg-[#0D2927] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#64748B] dark:text-[#F1F5F4]/50">
            Your assistance journey
          </p>

          <h3 className="mt-2 text-lg font-semibold text-[#172524] dark:text-[#F1F5F4]">
            {resourceName}
          </h3>

          <p className="mt-1 text-xs text-[#64748B] dark:text-[#F1F5F4]/45">
            Request {requestId}
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE7E2] px-3 py-1.5 text-xs font-medium text-[#0F766E] dark:border-[#244540] dark:text-[#99F6E4]">
          <Clock3 size={13} />

          {status.replaceAll("_", " ")}
        </span>
      </div>

      <div className="mt-6">
        {isTerminal ? (
          <div className="rounded-xl bg-[#0F766E]/5 p-4 dark:bg-[#14B8A6]/10">
            <p className="text-sm leading-6 text-[#172524] dark:text-[#F1F5F4]/80">
              {statusMessages[status]}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
            {journeySteps.map((step, index) => {
              const completed = index < currentStep;
              const active = index === currentStep;

              return (
                <div key={step.label} className="min-w-0">
                  <div className="mb-3 flex items-center">
                    <div
                      className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                        completed
                          ? "border-[#0F766E] bg-[#0F766E] text-white dark:border-[#14B8A6] dark:bg-[#14B8A6] dark:text-[#071B1A]"
                          : active
                            ? "border-[#0F766E] bg-[#0F766E]/10 text-[#0F766E] dark:border-[#14B8A6] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]"
                            : "border-[#DCE7E2] text-[#64748B] dark:border-[#244540] dark:text-[#F1F5F4]/40",
                      ].join(" ")}
                    >
                      {completed ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <span className="text-xs font-semibold">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    {index < journeySteps.length - 1 && (
                      <div
                        className={[
                          "ml-2 h-px flex-1",
                          completed
                            ? "bg-[#0F766E] dark:bg-[#14B8A6]"
                            : "bg-[#DCE7E2] dark:bg-[#244540]",
                        ].join(" ")}
                      />
                    )}
                  </div>

                  <p
                    className={[
                      "text-xs font-semibold",
                      active || completed
                        ? "text-[#172524] dark:text-[#F1F5F4]"
                        : "text-[#64748B] dark:text-[#F1F5F4]/45",
                    ].join(" ")}
                  >
                    {step.label}
                  </p>

                  <p className="mt-1 text-[11px] leading-4 text-[#64748B] dark:text-[#F1F5F4]/45">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="mt-5 border-t border-[#DCE7E2] pt-4 text-sm leading-6 text-[#64748B] dark:border-[#244540] dark:text-[#F1F5F4]/65">
        {statusMessages[status]}
      </p>

      <Link
        href={`/beneficiary/requests/${encodeURIComponent(requestId)}`}
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#0F766E] transition-colors hover:text-[#14B8A6] dark:text-[#99F6E4] dark:hover:text-[#14B8A6]"
      >
        View request details
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}