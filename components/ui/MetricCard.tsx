import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
};

export default function MetricCard({
  title,
  value,
  subtitle,
  icon,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-2 text-sm text-zinc-400">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div className="rounded-xl bg-zinc-800 p-3">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}