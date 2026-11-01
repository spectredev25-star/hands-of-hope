
import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: number;
  description: string;
  icon: LucideIcon;
  accent?: string;
};

export function OrganizationOverviewStat({
  label,
  value,
  description,
  icon: Icon,
  accent = "#14B8A6",
}: Props) {
  return (
    <div className="group rounded-2xl border border-[#DCE7E2] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0F766E]/5 dark:border-[#244540] dark:bg-[#0D2927]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#64748B] dark:text-[#F1F5F4]/55">
            {label}
          </p>

          <p className="mt-3 text-3xl font-semibold tracking-tight text-[#172524] dark:text-[#F1F5F4]">
            {value}
          </p>
        </div>

        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${accent}18`,
            color: accent,
          }}
        >
          <Icon size={21} />
        </div>
      </div>

      <p className="mt-4 text-xs text-[#64748B] dark:text-[#F1F5F4]/45">
        {description}
      </p>
    </div>
  );
}
