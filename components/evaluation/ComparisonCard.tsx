interface ComparisonCardProps {
  original: {
    overallScore: number;
    safety: number;
    clarity: number;
    robustness: number;
  };

  improved: {
    overallScore: number;
    safety: number;
    clarity: number;
    robustness: number;
  };
}

const metrics = [
  {
    label: "Overall",
    key: "overallScore",
  },
  {
    label: "Safety",
    key: "safety",
  },
  {
    label: "Clarity",
    key: "clarity",
  },
  {
    label: "Robustness",
    key: "robustness",
  },
] as const;

export default function ComparisonCard({
  original,
  improved,
}: ComparisonCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50">
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Metric
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Original
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Improved
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Change
              </th>
            </tr>
          </thead>

          <tbody>
            {metrics.map((metric) => {
              const before = original[metric.key];
              const after = improved[metric.key];
              const diff = after - before;

              const changeClass =
                diff > 0
                  ? "text-emerald-400"
                  : diff < 0
                    ? "text-red-400"
                    : "text-zinc-400";

              return (
                <tr
                  key={metric.key}
                  className="border-b border-zinc-800/80 last:border-b-0"
                >
                  <td className="px-5 py-5 text-sm font-medium text-zinc-200">
                    {metric.label}
                  </td>

                  <td className="px-5 py-5 text-center text-sm text-zinc-500">
                    {before}
                  </td>

                  <td className="px-5 py-5 text-center text-sm font-semibold text-white">
                    {after}
                  </td>

                  <td className="px-5 py-5 text-center">
                    <span
                      className={`inline-flex min-w-[52px] justify-center rounded-full px-2.5 py-1 text-xs font-bold ${changeClass} bg-white/[0.03]`}
                    >
                      {diff > 0 ? "+" : ""}
                      {diff}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
