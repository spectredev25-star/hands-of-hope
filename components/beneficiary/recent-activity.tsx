import {
  CheckCircle2,
  ClipboardList,
  PackageCheck,
  Truck,
} from "lucide-react";

import type { ActivityItem } from "@/libs/beneficiary/types";

type Props = {
  activities: ActivityItem[];
};

const activityIcons = {
  request: ClipboardList,
  approval: CheckCircle2,
  collection: Truck,
  distribution: PackageCheck,
};

export function RecentActivity({ activities }: Props) {
  return (
    <section className="rounded-2xl border border-[#DCE7E2] bg-white p-5 transition-colors duration-300 dark:border-[#244540] dark:bg-[#0D2927] sm:p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-[#172524] dark:text-[#F1F5F4]">
          Recent activity
        </h3>

        <p className="mt-1 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
          Updates on your assistance journey.
        </p>
      </div>

      {activities.length === 0 ? (
        <p className="py-6 text-sm leading-6 text-[#64748B] dark:text-[#F1F5F4]/60">
          Your activity will appear here when you begin
          exploring resources and submitting requests.
        </p>
      ) : (
        <div className="space-y-5">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type];

            return (
              <div
                key={activity.id}
                className="flex gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
                  <Icon size={17} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#172524] dark:text-[#F1F5F4]">
                    {activity.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#64748B] dark:text-[#F1F5F4]/60">
                    {activity.description}
                  </p>

                  <time
                    dateTime={activity.createdAt}
                    className="mt-2 block text-[10px] text-[#64748B]/80 dark:text-[#F1F5F4]/35"
                  >
                    {new Date(activity.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </time>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}