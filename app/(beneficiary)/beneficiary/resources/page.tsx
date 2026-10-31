"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { ResourceGrid } from "@/components/beneficiary/resource-grid";
import { mockResources } from "@/libs/beneficiary/mock-data";

const categories = [
  "all",
  "food",
  "clothing",
  "education",
  "household",
  "health",
  "other",
] as const;

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState<(typeof categories)[number]>("all");

  const filteredResources = useMemo(() => {
    const term = search.trim().toLowerCase();

    return mockResources.filter((resource) => {
      const matchesCategory =
        category === "all" || resource.category === category;

      const matchesSearch =
        !term ||
        resource.name.toLowerCase().includes(term) ||
        resource.description.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="DISCOVER"
        title="Find what you need."
        description="Explore resources received and reviewed by the Hands of Hope team."
      />

      <section className="rounded-2xl border border-[#DCE7E2] bg-white p-4 dark:border-[#244540] dark:bg-[#0D2927] sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row">
          <label className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-[#F1F5F4]/45"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search resources..."
              aria-label="Search resources"
              className="h-12 w-full rounded-xl border border-[#DCE7E2] bg-[#FAFAF7] pl-11 pr-4 text-sm text-[#172524] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 dark:border-[#244540] dark:bg-[#071B1A] dark:text-[#F1F5F4] dark:placeholder:text-[#F1F5F4]/35"
            />
          </label>

          <label className="flex h-12 items-center gap-2 rounded-xl border border-[#DCE7E2] bg-[#FAFAF7] px-3 dark:border-[#244540] dark:bg-[#071B1A]">
            <SlidersHorizontal
              size={17}
              className="text-[#0F766E] dark:text-[#99F6E4]"
            />

            <span className="sr-only">Filter by category</span>

            <select
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value as (typeof categories)[number]
                )
              }
              className="min-w-0 flex-1 bg-transparent text-sm text-[#172524] outline-none dark:text-[#F1F5F4]"
            >
              {categories.map((item) => (
                <option key={item} value={item} className="capitalize">
                  {item === "all"
                    ? "All categories"
                    : item.charAt(0).toUpperCase() + item.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-4 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
          {filteredResources.length} demonstration resource
          {filteredResources.length === 1 ? "" : "s"}
        </p>
      </section>

      <ResourceGrid resources={filteredResources} />

      <p className="text-xs leading-5 text-[#64748B] dark:text-[#F1F5F4]/40">
        Preview mode: these resources are sample records, not a
        live inventory feed.
      </p>
    </div>
  );
}