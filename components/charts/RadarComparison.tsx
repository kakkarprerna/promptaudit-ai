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
    <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        📈 Prompt Quality Comparison
      </h2>

      <div className="h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />

            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: "#d4d4d8" }}
            />

            <PolarRadiusAxis
              domain={[0, 100]}
              tick={{ fill: "#71717a" }}
            />

            <Radar
              name="Original"
              dataKey="Original"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.35}
            />

            <Radar
              name="Improved"
              dataKey="Improved"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.35}
            />

            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}