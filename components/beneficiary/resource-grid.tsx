import { Compass } from "lucide-react";

import type { Resource } from "@/libs/beneficiary/types";
import { ResourceCard } from "./resource-card";

type Props = {
  resources: Resource[];
};

export function ResourceGrid({ resources }: Props) {
  if (resources.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#DCE7E2] px-6 py-12 text-center dark:border-[#244540]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
          <Compass size={22} />
        </div>

        <h3 className="mt-4 text-base font-semibold text-[#172524] dark:text-[#F1F5F4]">
          Your next opportunity will appear here.
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#64748B] dark:text-[#F1F5F4]/60">
          There are no resources to display right now.
          Please check back for future opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {resources.map((resource, index) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          index={index}
        />
      ))}
    </div>
  );
}