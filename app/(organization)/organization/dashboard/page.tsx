import {
  Package,
  Clock3,
  BadgeCheck,
  Truck,
} from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { OrganizationWelcomePanel } from "@/components/organization/organization-welcome-panel";
import { OrganizationOverviewStat } from "@/components/organization/organization-overview-stat";
import { ContributionJourney } from "@/components/organization/contribution-journey";
import { RecentContributions } from "@/components/organization/recent-contributions";
import { OrganizationQuickActions } from "@/components/organization/organization-quick-actions";

import { organizationStats } from "@/libs/organization/mock-data";

export default function OrganizationDashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Organization workspace"
        title="Your impact at a glance"
        description="Manage your contributions and follow the journey of the resources you share."
      />

      <OrganizationWelcomePanel />

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#172524] dark:text-[#F1F5F4]">
            Contribution overview
          </h2>

          <p className="mt-1 text-sm text-[#64748B] dark:text-[#F1F5F4]/50">
            A snapshot of your organization's activity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <OrganizationOverviewStat
            label="Total contributions"
            value={organizationStats.total}
            description="All proposals submitted"
            icon={Package}
          />

          <OrganizationOverviewStat
            label="Awaiting review"
            value={organizationStats.underReview}
            description="Being assessed by our team"
            icon={Clock3}
            accent="#D97706"
          />

          <OrganizationOverviewStat
            label="Approved"
            value={organizationStats.approved}
            description="Accepted for the next stage"
            icon={BadgeCheck}
            accent="#0F766E"
          />

          <OrganizationOverviewStat
            label="Collected"
            value={organizationStats.collected}
            description="Successfully received by Hands of Hope"
            icon={Truck}
            accent="#2563EB"
          />
        </div>
      </section>

      <ContributionJourney />

      <div className="grid items-start gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <RecentContributions />
        <OrganizationQuickActions />
      </div>

      <div className="rounded-2xl border border-[#99F6E4]/30 bg-[#0F766E]/5 p-5 dark:border-[#14B8A6]/20 dark:bg-[#14B8A6]/5">
        <p className="text-sm font-semibold text-[#0F766E] dark:text-[#99F6E4]">
          Every contribution creates an opportunity.
        </p>

        <p className="mt-1 text-sm leading-6 text-[#64748B] dark:text-[#F1F5F4]/60">
          Thank you for being part of a community that believes
          everyone deserves access to essential resources.
        </p>
      </div>
    </div>
  );
}