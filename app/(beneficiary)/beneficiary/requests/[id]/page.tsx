"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { RequestStatusBadge } from "@/components/dashboard/request-status-badge";
import { AssistanceJourney } from "@/components/beneficiary/assistance-journey";
import { SectionEmptyState } from "@/components/dashboard/section-empty-state";
import { mockRequests } from "@/libs/beneficiary/mock-data";

export default function RequestDetailsPage() {
  const params = useParams<{ id: string }>();

  const request = mockRequests.find(
    (item) => item.id === params.id
  );

  if (!request) {
    return (
      <div className="space-y-6">
        <DashboardPageHeader
          eyebrow="REQUEST DETAILS"
          title="Request not found."
          description="This reference isn't present in the current demo data."
        />

        <SectionEmptyState
          icon={Clock3}
          title="We couldn't find that request."
          description="Return to your requests to view the available demonstration records."
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
        eyebrow={`REQUEST ${request.id}`}
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
              {request.submittedAt}
            </dd>
          </div>

          <div>
            <dt className="text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
              Last updated
            </dt>

            <dd className="mt-1 text-sm text-[#172524] dark:text-[#F1F5F4]">
              {request.updatedAt}
            </dd>
          </div>
        </dl>

        <p className="mt-6 border-t border-[#DCE7E2] pt-4 text-xs leading-5 text-[#64748B] dark:border-[#244540] dark:text-[#F1F5F4]/45">
          The status and dates shown here are mock data. In production,
          the backend will determine the authoritative status and which
          actions are available to you.
        </p>
      </section>
    </div>
  );
}