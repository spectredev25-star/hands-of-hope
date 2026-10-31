
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ClipboardList,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { RequestStatusBadge } from "@/components/dashboard/request-status-badge";
import { SectionEmptyState } from "@/components/dashboard/section-empty-state";
import { mockRequests } from "@/libs/beneficiary/mock-data";
import type { RequestStatus } from "@/libs/beneficiary/types";

const filters = [
  { label: "All requests", value: "all" },
  { label: "Under review", value: "pending_review" },
  { label: "Approved", value: "approved" },
  { label: "Being prepared", value: "preparing" },
  { label: "Ready to collect", value: "ready_for_collection" },
  { label: "Completed", value: "completed" },
  { label: "Not approved", value: "rejected" },
] as const;

type RequestFilter = (typeof filters)[number]["value"];

export default function BeneficiaryRequestsPage() {
  const [activeFilter, setActiveFilter] =
    useState<RequestFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return mockRequests.filter((request) => {
      const matchesStatus =
        activeFilter === "all" ||
        request.status === activeFilter;

      // Adjust these fields if your existing mock request type
      // uses different property names.
      const searchableText = [
        request.id,
        request.resourceName,
        request.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="YOUR ASSISTANCE"
        title="My requests"
        description="Follow every request from review to collection. We'll keep you informed as it moves forward."
      />

      {/* Search and filters */}
      <section className="space-y-4">
        <div className="relative">
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by request or resource..."
            aria-label="Search requests"
            className="h-12 w-full rounded-2xl border border-[#DCE7E2] bg-white pl-11 pr-4 text-sm text-[#071B1A] outline-none transition placeholder:text-[#64748B] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 dark:border-[#244540] dark:bg-[#0D2927] dark:text-[#F1F5F4] dark:placeholder:text-[#99F6E4]/50 dark:focus:border-[#14B8A6] sm:max-w-md"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-[#64748B]">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filter requests</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={isActive}
                className={[
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-[#0F766E] bg-[#0F766E] text-white dark:border-[#14B8A6] dark:bg-[#14B8A6] dark:text-[#071B1A]"
                    : "border-[#DCE7E2] bg-white text-[#64748B] hover:border-[#0F766E]/50 hover:text-[#0F766E] dark:border-[#244540] dark:bg-[#0D2927] dark:text-[#F1F5F4]/70 dark:hover:border-[#14B8A6]/50 dark:hover:text-[#99F6E4]",
                ].join(" ")}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results */}
      <section aria-live="polite" className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-[#071B1A] dark:text-[#F1F5F4]">
            Your requests
          </h2>
          <span className="text-sm text-[#64748B] dark:text-[#F1F5F4]/60">
            {filteredRequests.length}{" "}
            {filteredRequests.length === 1 ? "request" : "requests"}
          </span>
        </div>

        {filteredRequests.length === 0 ? (
          <SectionEmptyState
            icon={ClipboardList}
            title="No matching requests"
            description={
              searchQuery || activeFilter !== "all"
                ? "Try changing your search or selecting another status."
                : "When you request assistance, you'll be able to follow its progress here."
            }
            actionLabel="Explore resources"
            actionHref="/beneficiary/resources"
          />
        ) : (
          <div className="grid gap-4">
            {filteredRequests.map((request, index) => (
              <motion.article
                key={request.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="rounded-2xl border border-[#DCE7E2] bg-white p-5 shadow-sm transition hover:border-[#0F766E]/40 dark:border-[#244540] dark:bg-[#0D2927] dark:hover:border-[#14B8A6]/40 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-[#64748B] dark:text-[#99F6E4]/70">
                        Request #{request.id}
                      </span>
                      <RequestStatusBadge
                        status={request.status as RequestStatus}
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-[#071B1A] dark:text-[#F1F5F4]">
                      {request.resourceName}
                    </h3>

                    {request.category && (
                      <p className="text-sm text-[#64748B] dark:text-[#F1F5F4]/60">
                        {request.category}
                      </p>
                    )}

                    <p className="text-sm leading-6 text-[#64748B] dark:text-[#F1F5F4]/70">
                      Check the request details to see its current progress
                      and any next steps.
                    </p>
                  </div>

                  <Link
                    href={`/beneficiary/requests/${request.id}`}
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-[#0F766E]/25 px-4 py-2.5 text-sm font-semibold text-[#0F766E] transition hover:bg-[#0F766E]/10 dark:border-[#14B8A6]/30 dark:text-[#99F6E4] dark:hover:bg-[#14B8A6]/10 sm:self-center"
                  >
                    View details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
