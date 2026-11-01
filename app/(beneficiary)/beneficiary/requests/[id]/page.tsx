
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { RequestStatusBadge } from "@/components/dashboard/request-status-badge";
import { AssistanceJourney } from "@/components/beneficiary/assistance-journey";
import { SectionEmptyState } from "@/components/dashboard/section-empty-state";

import { getMyRequest } from "@/libs/beneficiary/data";
import type { AssistanceRequest } from "@/libs/beneficiary/types";

export default function RequestDetailsPage() {
  const params = useParams<{ id: string }>();

  const [request, setRequest] = useState<AssistanceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadRequest() {
      try {
        setLoading(true);
        setError("");

        const result = await getMyRequest(params.id);

        if (active) setRequest(result);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load this request."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    if (params.id) loadRequest();

    return () => {
      active = false;
    };
  }, [params.id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-[#DCE7E2] dark:bg-[#244540]" />
        <div className="h-48 animate-pulse rounded-2xl bg-[#DCE7E2] dark:bg-[#0D2927]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-300 bg-red-50 p-5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
        {error}
      </div>
    );
  }

  if (!request) {
    return (
      <div className="space-y-6">
        <DashboardPageHeader
          eyebrow="REQUEST DETAILS"
          title="Request not found."
          description="This request may not exist or may not belong to your account."
        />

        <SectionEmptyState
          icon={Clock3}
          title="We couldn't find that request."
          description="Return to your requests to view your submitted assistance requests."
          actionLabel="View my requests"
          actionHref="/beneficiary/requests"
        />
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <Link
        href="/beneficiary/requests"
        className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F766E] dark:text-[#F1F5F4]/60 dark:hover:text-[#99F6E4]"
      >
        <ArrowLeft size={16} />
        Back to requests
      </Link>

      <DashboardPageHeader
        eyebrow={`REQUEST ${request.id.slice(0, 8).toUpperCase()}`}
        title={request.resourceName}
        description="Review your request status and the next steps in the assistance process."
        action={<RequestStatusBadge status={request.status} />}
      />

      <AssistanceJourney
        requestId={request.id}
        resourceName={request.resourceName}
        status={request.status}
      />

      <section className="rounded-2xl border border-[#DCE7E2] bg-white p-5 dark:border-[#244540] dark:bg-[#0D2927] sm:p-6">
        <h2 className="text-base font-semibold text-[#172524] dark:text-[#F1F5F4]">
          Request information
        </h2>

        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
              Submitted
            </dt>
            <dd className="mt-1 text-sm text-[#172524] dark:text-[#F1F5F4]">
              {new Date(request.submittedAt).toLocaleString()}
            </dd>
          </div>

          <div>
            <dt className="text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
              Last updated
            </dt>
            <dd className="mt-1 text-sm text-[#172524] dark:text-[#F1F5F4]">
              {new Date(request.updatedAt).toLocaleString()}
            </dd>
          </div>

          {request.description && (
            <div className="sm:col-span-2">
              <dt className="text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
                Description
              </dt>
              <dd className="mt-1 text-sm leading-6 text-[#172524] dark:text-[#F1F5F4]">
                {request.description}
              </dd>
            </div>
          )}

          {request.adminNotes && (
            <div className="sm:col-span-2">
              <dt className="text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
                Team update
              </dt>
              <dd className="mt-1 text-sm leading-6 text-[#172524] dark:text-[#F1F5F4]">
                {request.adminNotes}
              </dd>
            </div>
          )}
        </dl>
      </section>
    </div>
  );
}
