import Link from "next/link";
import {
  ArrowUpRight,
  ClipboardList,
  PackagePlus,
  Truck,
} from "lucide-react";

const actions = [
  {
    title: "Submit a contribution",
    description: "Propose resources your organization can provide.",
    href: "/organization/contributions/new",
    icon: PackagePlus,
  },
  {
    title: "Track contributions",
    description: "Review the status of your submissions.",
    href: "/organization/contributions",
    icon: ClipboardList,
  },
  {
    title: "Collection updates",
    description: "See upcoming collection arrangements.",
    href: "/organization/collection",
    icon: Truck,
  },
];

export function OrganizationQuickActions() {
  return (
    <section className="rounded-2xl border border-[#DCE7E2] bg-white p-5 dark:border-[#244540] dark:bg-[#0D2927] sm:p-6">
      <h2 className="text-lg font-semibold text-[#172524] dark:text-[#F1F5F4]">
        Quick actions
      </h2>

      <p className="mt-1 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
        Everything you need to manage your contributions.
      </p>

      <div className="mt-5 space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-center gap-3 rounded-xl border border-[#DCE7E2] p-3 transition-all hover:border-[#14B8A6] hover:bg-[#0F766E]/5 dark:border-[#244540] dark:hover:bg-[#14B8A6]/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#172524] dark:text-[#F1F5F4]">
                  {action.title}
                </p>

                <p className="mt-1 text-xs text-[#64748B] dark:text-[#F1F5F4]/50">
                  {action.description}
                </p>
              </div>

              <ArrowUpRight
                size={17}
                className="shrink-0 text-[#64748B] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0F766E] dark:text-[#F1F5F4]/50 dark:group-hover:text-[#99F6E4]"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
