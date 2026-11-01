
import { connection } from "next/server";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { getAvailableResources } from "@/libs/beneficiary/server";
import { ResourceBrowser } from "./resource-browser";

export default async function ResourcesPage() {
  await connection();

  const resources = await getAvailableResources();

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="DISCOVER"
        title="Find what you need."
        description="Explore resources received and reviewed by the Hands of Hope team."
      />

      <ResourceBrowser resources={resources} />
    </div>
  );
}
