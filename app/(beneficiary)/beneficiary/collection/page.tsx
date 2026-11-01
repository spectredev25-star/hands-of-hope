
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  QrCode,
} from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { RequestStatusBadge } from "@/components/dashboard/request-status-badge";
import { SectionEmptyState } from "@/components/dashboard/section-empty-state";

import { getMyRequests } from "@/libs/beneficiary/data";

import type { AssistanceRequest } from "@/libs/beneficiary/types";

export default function CollectionPage() {
  const [requests, setRequests] = useState<AssistanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadRequests() {
      try {
        setLoading(true);
        setError(null);

        const data = await getMyRequests();

        if (isMounted) {
          setRequests(data);
        }
      } catch (err) {
        if (!isMounted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your collection information."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  const readyRequests = requests.filter(
    (request) => request.status === "ready_for_collection"
  );

  const approvedRequests = requests.filter((request) =>
    ["approved", "preparing"].includes(request.status)
  );

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="COLLECTION"
        title="Your collection space."
        description="Check whether an approved allocation is ready and review the next steps."
      />

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300"
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          <div className="h-48 animate-pulse rounded-2xl bg-[#E8EFEB] dark:bg-[#0D2927]" />
          <div className="h-24 animate-pulse rounded-2xl bg-[#E8EFEB] dark:bg-[#0D2927]" />
        </div>
      ) : readyRequests.length === 0 ? (
        <SectionEmptyState
          icon={QrCode}
          title="No collection is ready yet."
          description="When an allocation is ready, its collection instructions and authorization status will appear here."
          actionLabel="View my requests"
          actionHref="/beneficiary/requests"
        />
      ) : (
        <div className="space-y-4">
          {readyRequests.map((request) => (
            <section
              key={request.id}
              className="rounded-2xl border border-[#244540] bg-[#0D2927] p-6 text-[#F1F5F4] sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14B8A6]/10 text-[#99F6E4]">
                    <QrCode size={24} />
                  </div>

                  <h2 className="mt-5 text-xl font-semibold">
                    {request.resourceName}
                  </h2>

                  <p className="mt-2 text-sm text-[#F1F5F4]/55">
                    Request {request.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>

                <RequestStatusBadge status={request.status} />
              </div>

              <div className="mt-6 rounded-xl border border-[#99F6E4]/15 bg-[#14B8A6]/5 p-4">
                <p className="text-sm font-medium text-[#99F6E4]">
                  Authorization preview
                </p>

                <p className="mt-2 text-sm leading-6 text-[#F1F5F4]/65">
                  Your collection authorization will appear here after
                  the backend confirms the allocation and issues a valid
                  collection token. Please wait for official collection
                  instructions before visiting a distribution centre.
                </p>
              </div>

              <Link
                href={`/beneficiary/requests/${encodeURIComponent(request.id)}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#99F6E4]"
              >
                View request details
                <ArrowRight size={16} />
              </Link>
            </section>
          ))}
        </div>
      )}

      {!loading && approvedRequests.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-base font-semibold text-[#172524] dark:text-[#F1F5F4]">
              Still being prepared
            </h2>

            <p className="mt-1 text-sm text-[#64748B] dark:text-[#F1F5F4]/50">
              These requests have progressed but are not yet ready for collection.
            </p>
          </div>

          {approvedRequests.map((request) => (
            <Link
              key={request.id}
              href={`/beneficiary/requests/${encodeURIComponent(request.id)}`}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#DCE7E2] bg-white p-5 transition-colors hover:border-[#0F766E]/40 dark:border-[#244540] dark:bg-[#0D2927]"
            >
              <div>
                <p className="text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">
                  {request.resourceName}
                </p>

                <p className="mt-1 text-xs text-[#64748B] dark:text-[#F1F5F4]/45">
                  Reference: {request.id.slice(0, 8).toUpperCase()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <RequestStatusBadge status={request.status} />
                <ArrowRight
                  size={16}
                  className="text-[#0F766E] dark:text-[#99F6E4]"
                />
              </div>
            </Link>
          ))}
        </section>
      )}

      <section className="rounded-2xl border border-[#DCE7E2] bg-white p-5 dark:border-[#244540] dark:bg-[#0D2927]">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
            <CalendarClock size={19} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#172524] dark:text-[#F1F5F4]">
              Before visiting a distribution centre
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#64748B] dark:text-[#F1F5F4]/60">
              Wait for confirmed collection instructions. A request
              being approved does not automatically mean that its
              items are ready for collection.
            </p>
          </div>
        </div>
      </section>

      <div className="hidden">
        <CheckCircle2 />
        <Clock3 />
      </div>
    </div>
  );
}
