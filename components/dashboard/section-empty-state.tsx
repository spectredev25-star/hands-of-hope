import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function SectionEmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: Props) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[#DCE7E2] px-6 py-12 text-center dark:border-[#244540]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#14B8A6]/10 dark:text-[#99F6E4]">
        <Icon size={25} strokeWidth={1.6} />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-[#172524] dark:text-[#F1F5F4]">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-[#64748B] dark:text-[#F1F5F4]/60">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#0F766E] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#14B8A6] hover:text-[#071B1A]"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}