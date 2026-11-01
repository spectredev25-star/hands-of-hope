import { CalendarDays, PackageCheck, Truck } from "lucide-react";

import { requireRole } from "@/libs/auth/authorize";
import { createClient } from "@/libs/supabase/server";

export const instant = false;

export default async function OrganizationCollectionPage() {
  const { user } = await requireRole(["organization"]);
  const supabase = await createClient();

  const { data: organization } = await supabase
    .from("organizations")
    .select("id")
    .eq("profile_id", user.id)
    .maybeSingle();

  let collections: {
    id: string;
    scheduled_at: string;
    collection_address: string;
    status: string;
    contribution_id: string;
  }[] = [];

  let error = false;

  if (organization) {
    const { data: contributions, error: contributionError } =
      await supabase
        .from("contributions")
        .select("id")
        .eq("organization_id", organization.id);

    if (contributionError) {
      error = true;
    } else if (contributions?.length) {
      const ids = contributions.map((item) => item.id);

      const { data, error: collectionError } = await supabase
        .from("contribution_collections")
        .select(
          "id, scheduled_at, collection_address, status, contribution_id"
        )
        .in("contribution_id", ids)
        .order("scheduled_at", { ascending: true });

      if (collectionError) {
        error = true;
      } else {
        collections = data ?? [];
      }
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E] dark:text-[#5EEAD4]">
          Giving in action
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Collection schedule
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#647572] dark:text-[#9AafAA]">
          Keep track of collections arranged for your organization's
          contributions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#DCE7E2] bg-white p-5 dark:border-[#244540] dark:bg-[#0D2927]">
          <CalendarDays className="text-[#0F766E] dark:text-[#5EEAD4]" />
          <p className="mt-4 text-sm text-[#647572] dark:text-[#9AafAA]">
            Total schedules
          </p>
          <p className="mt-2 text-3xl font-semibold">
            {collections.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#DCE7E2] bg-white p-5 dark:border-[#244540] dark:bg-[#0D2927]">
          <Truck className="text-[#0F766E] dark:text-[#5EEAD4]" />
          <p className="mt-4 text-sm text-[#647572] dark:text-[#9AafAA]">
            Upcoming
          </p>
          <p className="mt-2 text-3xl font-semibold">
            {collections.filter((item) => item.status === "scheduled").length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#DCE7E2] bg-white p-5 dark:border-[#244540] dark:bg-[#0D2927]">
          <PackageCheck className="text-[#0F766E] dark:text-[#5EEAD4]" />
          <p className="mt-4 text-sm text-[#647572] dark:text-[#9AafAA]">
            Completed
          </p>
          <p className="mt-2 text-3xl font-semibold">
            {collections.filter((item) => item.status === "completed").length}
          </p>
        </div>
      </div>

      <section className="overflow-hidden rounded-3xl border border-[#DCE7E2] bg-white dark:border-[#244540] dark:bg-[#0D2927]">
        <div className="border-b border-[#DCE7E2] px-6 py-5 dark:border-[#244540]">
          <h2 className="font-semibold">Your collection appointments</h2>
          <p className="mt-1 text-xs text-[#647572] dark:text-[#9AafAA]">
            Collection arrangements made by the Hands of Hope team.
          </p>
        </div>

        {error ? (
          <p className="p-7 text-sm text-red-600 dark:text-red-300">
            We couldn't load your collection schedules. Please try again.
          </p>
        ) : collections.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <CalendarDays
              size={32}
              className="mx-auto text-[#0F766E] dark:text-[#5EEAD4]"
            />
            <h3 className="mt-4 font-semibold">
              No collections scheduled yet
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#647572] dark:text-[#9AafAA]">
              When our team arranges collection for one of your contributions,
              the appointment details will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#DCE7E2] dark:divide-[#244540]">
            {collections.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">
                    Collection appointment
                  </p>
                  <p className="mt-1 text-sm text-[#647572] dark:text-[#9AafAA]">
                    {item.collection_address}
                  </p>
                  <p className="mt-2 text-xs text-[#647572] dark:text-[#9AafAA]">
                    {new Date(item.scheduled_at).toLocaleString()}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-[#14B8A6]/10 px-3 py-1 text-xs font-semibold capitalize text-[#0F766E] dark:text-[#5EEAD4]">
                  {item.status.replaceAll("_", " ")}
                </span>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}