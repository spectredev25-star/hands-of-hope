import Link from "next/link";
import { connection } from "next/server";
import { ArrowRight, PackagePlus, ClipboardList } from "lucide-react";

import { requireRole } from "@/libs/auth/authorize";
import { createClient } from "@/libs/supabase/server";

const statusStyles: Record<string, string> = {
  submitted: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  scheduled_for_collection: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  collected: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  inspecting: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
  accepted: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  rejected: "bg-red-500/10 text-red-700 dark:text-red-300",
};

const statusLabels: Record<string, string> = {
  submitted: "Submitted",
  scheduled_for_collection: "Collection scheduled",
  collected: "Collected",
  inspecting: "Under inspection",
  accepted: "Accepted",
  rejected: "Not accepted",
};

export default async function OrganizationContributionsPage() {
  await connection();
  const { user } = await requireRole(["organization"]);
  const supabase = await createClient();

  const { data: organization } = await supabase
    .from("organizations")
    .select("id")
    .eq("profile_id", user.id)
    .maybeSingle();

  const { data: contributions, error } = organization
    ? await supabase
        .from("contributions")
        .select("id, item_name, description, category, quantity, unit, status, created_at, quantity_collected, quantity_accepted")
        .eq("organization_id", organization.id)
        .order("created_at", { ascending: false })
    : { data: [], error: null };

  const rows = contributions ?? [];
  const pendingCount = rows.filter((item) => !["accepted", "rejected"].includes(item.status)).length;
  const acceptedCount = rows.filter((item) => item.status === "accepted").length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E] dark:text-[#5EEAD4]">Your impact</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Contributions</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#647572] dark:text-[#9AafAA]">
            Follow every contribution from submission through collection and inspection.
          </p>
        </div>
        <Link href="/organization/contributions/new" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0D625B]">
          <PackagePlus size={17} /> New contribution <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total submissions", value: rows.length, note: "All your contributions" },
          { label: "In progress", value: pendingCount, note: "Awaiting a final outcome" },
          { label: "Accepted", value: acceptedCount, note: "Added to available inventory" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-[#DCE7E2] bg-white p-5 dark:border-[#244540] dark:bg-[#0D2927]">
            <p className="text-sm text-[#647572] dark:text-[#9AafAA]">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold tabular-nums">{stat.value}</p>
            <p className="mt-1 text-xs text-[#94A3A0] dark:text-[#78918B]">{stat.note}</p>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-3xl border border-[#DCE7E2] bg-white dark:border-[#244540] dark:bg-[#0D2927]">
        <div className="flex items-center justify-between border-b border-[#DCE7E2] px-5 py-5 dark:border-[#244540] sm:px-7">
          <div>
            <h2 className="font-semibold">Submission history</h2>
            <p className="mt-1 text-xs text-[#647572] dark:text-[#9AafAA]">Latest updates from the Hands of Hope team</p>
          </div>
          <ClipboardList className="text-[#0F766E] dark:text-[#5EEAD4]" size={21} />
        </div>

        {error ? (
          <p role="alert" className="p-7 text-sm text-red-600 dark:text-red-300">We couldn't load your contributions. Please refresh and try again.</p>
        ) : rows.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14B8A6]/10 text-[#0F766E] dark:text-[#5EEAD4]">
              <PackagePlus size={25} />
            </div>
            <h3 className="mt-5 text-lg font-semibold">Your contribution story starts here</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#647572] dark:text-[#9AafAA]">
              When your organization submits resources, you will see their review and collection progress here.
            </p>
            <Link href="/organization/contributions/new" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] dark:text-[#5EEAD4]">
              Submit your first contribution <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#DCE7E2] dark:divide-[#244540]">
            {rows.map((item) => (
              <article key={item.id} className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{item.item_name}</h3>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusStyles[item.status] ?? "bg-slate-500/10 text-slate-600"}`}>
                      {statusLabels[item.status] ?? item.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs capitalize text-[#647572] dark:text-[#9AafAA]">{item.category.replaceAll("_", " ")}</p>
                  {item.description && <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-[#647572] dark:text-[#9AafAA]">{item.description}</p>}
                  <p className="mt-2 text-xs text-[#94A3A0] dark:text-[#78918B]">Submitted {new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="text-lg font-semibold tabular-nums">{item.quantity} <span className="text-sm font-normal text-[#647572] dark:text-[#9AafAA]">{item.unit}</span></p>
                  {item.status === "accepted" && <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">{item.quantity_accepted ?? item.quantity} accepted</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
