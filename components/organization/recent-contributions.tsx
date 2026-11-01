import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

import { mockContributions } from "@/libs/organization/mock-data";
import { ContributionStatusBadge } from "./contribution-status-badge";

export function RecentContributions() {
  const contributions = mockContributions.slice(0, 4);

  return (
    <section className="rounded-2xl border border-[#DCE7E2] bg-white p-5 dark:border-[#244540] dark:bg-[#0D2927] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#172524] dark:text-[#F1F5F4]">
            Recent contributions
          </h2>
          <p className="mt-1 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
            Keep track of your latest submissions.
          </p>
        </div>

        <Link
          href="/organization/contributions"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F766E] transition hover:text-[#14B8A6] dark:text-[#99F6E4]"
        >
          View all
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-5 divide-y divide-[#DCE7E2] dark:divide-[#244540]">
        {contributions.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
                <Package size={19} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#172524] dark:text-[#F1F5F4]">
                  {item.name}
                </p>

                <p className="mt-1 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
                  {item.quantity} {item.unit} · {item.submittedAt}
                </p>
              </div>
            </div>

            <div className="sm:pl-3">
              <ContributionStatusBadge status={item.status} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
