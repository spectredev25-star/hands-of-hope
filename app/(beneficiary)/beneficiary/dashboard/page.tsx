"use client";

import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Compass,
  PackageCheck,
} from "lucide-react";

import { motion, useReducedMotion } from "motion/react";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

import { WelcomePanel } from "@/components/beneficiary/welcome-panel";
import { OverviewStat } from "@/components/beneficiary/overview-stat";
import { AssistanceJourney } from "@/components/beneficiary/assistance-journey";
import { ResourceGrid } from "@/components/beneficiary/resource-grid";
import { RecentActivity } from "@/components/beneficiary/recent-activity";

import {
  mockActivities,
  mockRequests,
  mockResources,
} from "@/libs/beneficiary/mock-data";

export default function BeneficiaryDashboardPage() {
  const reduceMotion = useReducedMotion();

  const activeRequests = mockRequests.filter((request) =>
    ["pending_review", "approved", "preparing", "ready_for_collection"].includes(
      request.status
    )
  ).length;

  const pendingRequests = mockRequests.filter(
    (request) => request.status === "pending_review"
  ).length;

  const approvedRequests = mockRequests.filter((request) =>
    ["approved", "preparing", "ready_for_collection"].includes(
      request.status
    )
  ).length;

  const readyRequests = mockRequests.filter(
    (request) => request.status === "ready_for_collection"
  ).length;

  const featuredRequest = mockRequests.find((request) =>
    ["pending_review", "approved", "preparing", "ready_for_collection"].includes(
      request.status
    )
  );

  return (
    <div className="space-y-6 sm:space-y-5">
      <DashboardPageHeader
        eyebrow="YOUR SPACE"
        title="A little progress, every day."
        description="Stay connected to the support available to you and follow your next steps."
      />

      <WelcomePanel />

      <section aria-label="Your assistance summary">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-[#172524] dark:text-[#F1F5F4]">
            Your assistance at a glance
          </h2>

          <p className="mt-1 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
            A clear picture of where things stand.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <OverviewStat
            label="Active requests"
            value={activeRequests}
            description="Requests still in progress"
            icon={ClipboardList}
            index={0}
          />

          <OverviewStat
            label="Under review"
            value={pendingRequests}
            description="Waiting for a team decision"
            icon={Compass}
            index={1}
          />

          <OverviewStat
            label="Approved"
            value={approvedRequests}
            description="Approved requests being processed"
            icon={CheckCircle2}
            index={2}
          />

          <OverviewStat
            label="Ready to collect"
            value={readyRequests}
            description="Allocations ready for collection"
            icon={PackageCheck}
            index={3}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.8fr)]">
        <div>
          <div className="mb-4">
            <h2 className="text-base font-semibold text-[#172524] dark:text-[#F1F5F4]">
              Where things stand
            </h2>

            <p className="mt-1 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
              Follow the progress of your latest request.
            </p>
          </div>

          {featuredRequest ? (
            <AssistanceJourney
              requestId={featuredRequest.id}
              resourceName={featuredRequest.resourceName}
              status={featuredRequest.status}
            />
          ) : (
            <div className="rounded-2xl border border-[#DCE7E2] bg-white p-6 dark:border-[#244540] dark:bg-[#0D2927]">
              <h3 className="text-base font-semibold text-[#172524] dark:text-[#F1F5F4]">
                Ready to explore?
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#64748B] dark:text-[#F1F5F4]/60">
                Browse the resources available and discover
                what may help you take your next step.
              </p>

              <Link
                href="/beneficiary/resources"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#0F766E] dark:text-[#99F6E4]"
              >
                Explore resources
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          <RecentActivity activities={mockActivities} />
        </motion.div>
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0F766E] dark:text-[#99F6E4]">
              Discover
            </p>

            <h2 className="text-xl font-semibold tracking-tight text-[#172524] dark:text-[#F1F5F4] sm:text-2xl">
              Support that moves you forward.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#64748B] dark:text-[#F1F5F4]/55">
              Explore resources received and reviewed by the
              Hands of Hope team.
            </p>
          </div>

          <Link
            href="/beneficiary/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0F766E] transition-colors hover:text-[#14B8A6] dark:text-[#99F6E4]"
          >
            View all resources
            <ArrowRight size={16} />
          </Link>
        </div>

        <ResourceGrid resources={mockResources.slice(0, 3)} />
      </section>

      <footer className="border-t border-[#DCE7E2] pb-2 pt-6 dark:border-[#244540]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#64748B] dark:text-[#F1F5F4]/40">
            Every act of kindness creates a possibility.
          </p>

          <p className="text-xs text-[#64748B] dark:text-[#F1F5F4]/40">
            Hands of Hope
          </p>
        </div>
      </footer>
    </div>
  );
}