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
    <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        📊 Prompt Comparison
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-700">
            <th className="pb-3 text-left">Metric</th>
            <th className="pb-3 text-center">Original</th>
            <th className="pb-3 text-center">Improved</th>
            <th className="pb-3 text-center">Change</th>
          </tr>
        </thead>

        <tbody>
          {metrics.map((metric) => {
            const before = original[metric.key];
            const after = improved[metric.key];
            const diff = after - before;

            return (
              <tr
                key={metric.key}
                className="border-b border-zinc-800"
              >
                <td className="py-4 font-medium">
                  {metric.label}
                </td>

                <td className="text-center">
                  {before}
                </td>

                <td className="text-center font-semibold">
                  {after}
                </td>

                <td
                  className={`text-center font-bold ${
                    diff > 0
                      ? "text-green-400"
                      : diff < 0
                      ? "text-red-400"
                      : "text-zinc-400"
                  }`}
                >
                  {diff > 0 ? "+" : ""}
                  {diff}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}