
"use client";

import { useEffect, useMemo, useState } from "react";
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
  getAvailableResources,
  getMyRequests,
} from "@/libs/beneficiary/data";

import type {
  AssistanceRequest,
  Resource,
  ActivityItem,
} from "@/libs/beneficiary/types";

const ACTIVE_STATUSES = [
  "pending_review",
  "approved",
  "preparing",
  "ready_for_collection",
] as const;

export default function BeneficiaryDashboardPage() {
  const reduceMotion = useReducedMotion();

  const [requests, setRequests] = useState<AssistanceRequest[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch beneficiary dashboard data
  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError(null);

        const [requestData, resourceData] = await Promise.all([
          getMyRequests(),
          getAvailableResources(),
        ]);

        if (!isMounted) return;

        setRequests(requestData);
        setResources(resourceData);
      } catch (err) {
        if (!isMounted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your dashboard information."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  // Dashboard statistics
  const activeRequests = requests.filter((request) =>
    ACTIVE_STATUSES.includes(
      request.status as (typeof ACTIVE_STATUSES)[number]
    )
  ).length;

  const pendingRequests = requests.filter(
    (request) => request.status === "pending_review"
  ).length;

  const approvedRequests = requests.filter((request) =>
    ["approved", "preparing", "ready_for_collection"].includes(
      request.status
    )
  ).length;

  const readyRequests = requests.filter(
    (request) => request.status === "ready_for_collection"
  ).length;

  // Latest active request
  const featuredRequest = useMemo(() => {
    return requests
      .filter((request) =>
        ACTIVE_STATUSES.includes(
          request.status as (typeof ACTIVE_STATUSES)[number]
        )
      )
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
      )[0];
  }, [requests]);

  // Build a basic activity timeline from request timestamps.
  const activities: ActivityItem[] = useMemo(() => {
    const items: ActivityItem[] = [];

    requests.forEach((request) => {
      items.push({
        id: `${request.id}-submitted`,
        title: "Request submitted",
        description: request.resourceName,
        createdAt: request.submittedAt,
        type: "request",
      });

      if (
        request.updatedAt &&
        request.updatedAt !== request.submittedAt
      ) {
        items.push({
          id: `${request.id}-updated`,
          title: "Request updated",
          description: request.resourceName,
          createdAt: request.updatedAt,
          type: "approval",
        });
      }
    });

    return items
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [requests]);

  const featuredResources = resources.slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-5">
      <DashboardPageHeader
        eyebrow="YOUR SPACE"
        title="A little progress, every day."
        description="Stay connected to the support available to you and follow your next steps."
      />

      <WelcomePanel />

      {/* Dashboard error */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300"
        >
          {error}
        </div>
      )}

      {/* Assistance statistics */}
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
            value={loading ? 0 : activeRequests}
            description="Requests still in progress"
            icon={ClipboardList}
            index={0}
          />

          <OverviewStat
            label="Under review"
            value={loading ? 0 : pendingRequests}
            description="Waiting for a team decision"
            icon={Compass}
            index={1}
          />

          <OverviewStat
            label="Approved"
            value={loading ? 0 : approvedRequests}
            description="Approved requests being processed"
            icon={CheckCircle2}
            index={2}
          />

          <OverviewStat
            label="Ready to collect"
            value={loading ? 0 : readyRequests}
            description="Allocations ready for collection"
            icon={PackageCheck}
            index={3}
          />
        </div>
      </section>

      {/* Request progress and activity */}
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

          {loading ? (
            <div className="animate-pulse rounded-2xl border border-[#DCE7E2] bg-white p-6 dark:border-[#244540] dark:bg-[#0D2927]">
              <div className="h-4 w-32 rounded bg-gray-200 dark:bg-white/10" />
              <div className="mt-4 h-3 w-3/4 rounded bg-gray-200 dark:bg-white/10" />
              <div className="mt-6 h-2 w-full rounded bg-gray-200 dark:bg-white/10" />
            </div>
          ) : featuredRequest ? (
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
          <RecentActivity activities={activities} />
        </motion.div>
      </section>

      {/* Available resources */}
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

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-2xl bg-[#E8EFEB] dark:bg-[#0D2927]"
              />
            ))}
          </div>
        ) : featuredResources.length > 0 ? (
          <ResourceGrid resources={featuredResources} />
        ) : (
          <div className="rounded-2xl border border-[#DCE7E2] bg-white p-6 text-sm text-[#64748B] dark:border-[#244540] dark:bg-[#0D2927] dark:text-[#F1F5F4]/60">
            There are currently no resources available. Please check again
            later.
          </div>
        )}
      </section>

      {/* Footer */}
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
