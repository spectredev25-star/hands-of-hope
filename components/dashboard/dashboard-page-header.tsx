import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function DashboardPageHeader({
  eyebrow,
  title,
  description,
  action,
}: Props) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E] dark:text-[#99F6E4]">
            {eyebrow}
          </p>
        )}

        <h1 className="text-2xl font-semibold tracking-tight text-[#172524] dark:text-[#F1F5F4] sm:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B] dark:text-[#F1F5F4]/60">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}