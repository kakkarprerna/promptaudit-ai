"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface RadarComparisonProps {
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

export default function RadarComparison({
  original,
  improved,
}: RadarComparisonProps) {
  const data = [
    {
      metric: "Overall",
      Original: original.overallScore,
      Improved: improved.overallScore,
    },
    {
      metric: "Safety",
      Original: original.safety,
      Improved: improved.safety,
    },
    {
      metric: "Clarity",
      Original: original.clarity,
      Improved: improved.clarity,
    },
    {
      metric: "Robustness",
      Original: original.robustness,
      Improved: improved.robustness,
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 md:p-8">
      {/* Chart Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Original vs. Improved
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Scores are measured on a 0–100 scale.
          </p>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="mt-4 h-[520px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={data}
            cx="50%"
            cy="52%"
            outerRadius="78%"
          >
            <PolarGrid
              stroke="#27272a"
              strokeWidth={1}
            />

            <PolarAngleAxis
              dataKey="metric"
              tick={{
                fill: "#d4d4d8",
                fontSize: 15,
                fontWeight: 500,
              }}
            />

            <PolarRadiusAxis
              domain={[0, 100]}
              tick={{
                fill: "#71717a",
                fontSize: 11,
              }}
              axisLine={false}
              tickCount={5}
            />

            <Radar
              name="Original"
              dataKey="Original"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.16}
              strokeWidth={2.5}
            />

            <Radar
              name="Improved"
              dataKey="Improved"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.16}
              strokeWidth={2.5}
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                paddingBottom: "4px",
                fontSize: "14px",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Explanation */}
      <div className="border-t border-zinc-800 pt-4 text-center">
        <p className="text-sm text-zinc-500">
          Higher scores indicate stronger prompt quality. The improved
          prompt is shown in green.
        </p>
      </div>
    </div>
  );
}
