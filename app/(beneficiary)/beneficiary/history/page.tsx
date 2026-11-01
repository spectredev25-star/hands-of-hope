
import { connection } from "next/server";
import Link from "next/link";
import { ArrowRight, History, PackageCheck } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { SectionEmptyState } from "@/components/dashboard/section-empty-state";
import { getMyCompletedDistributions } from "@/libs/beneficiary/server";

export default async function HistoryPage() {
  await connection();

  const distributions = await getMyCompletedDistributions();

  return (
    <div className="space-y-7">
      <DashboardPageHeader
        eyebrow="YOUR JOURNEY"
        title="Your history."
        description="Review assistance that has been fulfilled and recorded."
      />

      {distributions.length === 0 ? (
        <SectionEmptyState
          icon={History}
          title="Your story is still unfolding."
          description="Completed distributions will appear here once they have been confirmed and recorded by the Hands of Hope team."
          actionLabel="View my requests"
          actionHref="/beneficiary/requests"
        />
      ) : (
        <div className="space-y-4">
          {distributions.map((distribution) => (
            <article
              key={distribution.id}
              className="rounded-2xl border border-[#DCE7E2] bg-white p-5 dark:border-[#244540] dark:bg-[#0D2927]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
                    <PackageCheck size={19} />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-[#172524] dark:text-[#F1F5F4]">
                      {distribution.resourceName}
                    </h2>

                    <p className="mt-1 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
                      Distribution reference:{" "}
                      {distribution.id.slice(0, 8).toUpperCase()}
                    </p>

                    <p className="mt-2 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
                      Completed on{" "}
                      {new Date(distribution.completedAt).toLocaleDateString(
                        "en-NG",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#0F766E] dark:text-[#99F6E4]">
                      Distribution completed
                    </p>
                  </div>
                </div>

                <Link
                  href={`/beneficiary/requests/${encodeURIComponent(distribution.requestId)}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#0F766E] dark:text-[#99F6E4]"
                >
                  View request
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
