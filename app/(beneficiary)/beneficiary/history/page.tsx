import Link from "next/link";
import { ArrowRight, History, PackageCheck } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { SectionEmptyState } from "@/components/dashboard/section-empty-state";
import { mockRequests } from "@/libs/beneficiary/mock-data";

export default function HistoryPage() {
  const completedRequests = mockRequests.filter(
    (request) => request.status === "completed"
  );

  return (
    <div className="space-y-7">
      <DashboardPageHeader
        eyebrow="YOUR JOURNEY"
        title="Your history."
        description="Review assistance that has been fulfilled and recorded."
      />

      {completedRequests.length === 0 ? (
        <SectionEmptyState
          icon={History}
          title="Your story is still unfolding."
          description="Completed distributions will appear here once they have been confirmed and recorded by the Hands of Hope team."
          actionLabel="View my requests"
          actionHref="/beneficiary/requests"
        />
      ) : (
        <div className="space-y-4">
          {completedRequests.map((request) => (
            <article
              key={request.id}
              className="rounded-2xl border border-[#DCE7E2] bg-white p-5 dark:border-[#244540] dark:bg-[#0D2927]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
                    <PackageCheck size={19} />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-[#172524] dark:text-[#F1F5F4]">
                      {request.resourceName}
                    </h2>

                    <p className="mt-1 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
                      Reference: {request.id}
                    </p>

                    <p className="mt-2 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
                      Recorded status: Completed
                    </p>
                  </div>
                </div>

                <Link
                  href={`/beneficiary/requests/${encodeURIComponent(request.id)}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#0F766E] dark:text-[#99F6E4]"
                >
                  View details
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="text-xs leading-5 text-[#64748B] dark:text-[#F1F5F4]/40">
        In production, distribution history should be sourced from
        recorded fulfillment events, including partial distributions
        where applicable—not inferred from a frontend status alone.
      </p>
    </div>
  );
}