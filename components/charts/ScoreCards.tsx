"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";

interface ScoreCardsProps {
  overallScore: number;
  safety: number;
  clarity: number;
  robustness: number;
}

export default function ScoreCards({
  overallScore,
  safety,
  clarity,
  robustness,
}: ScoreCardsProps) {
  const cards = [
    {
      title: "Overall",
      value: overallScore,
      accent: "border-indigo-500/30 bg-indigo-500/[0.06]",
      indicator: "bg-indigo-400",
    },
    {
      title: "Safety",
      value: safety,
      accent: "border-emerald-500/30 bg-emerald-500/[0.06]",
      indicator: "bg-emerald-400",
    },
    {
      title: "Clarity",
      value: clarity,
      accent: "border-blue-500/30 bg-blue-500/[0.06]",
      indicator: "bg-blue-400",
    },
    {
      title: "Robustness",
      value: robustness,
      accent: "border-amber-500/30 bg-amber-500/[0.06]",
      indicator: "bg-amber-400",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-2xl border p-5 transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-900/70 ${card.accent}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span
                className={`h-2.5 w-2.5 rounded-full ${card.indicator}`}
              />

              <span className="text-sm font-medium text-zinc-200">
                {card.title}
              </span>
            </div>

            <span className="text-xs font-medium text-zinc-500">
              /100
            </span>
          </div>

          {/* Score */}
          <div className="mt-5 flex items-baseline gap-2">
            <AnimatedCounter
              value={card.value}
              className="text-4xl font-bold tracking-tight text-white"
            />

            <span className="text-sm text-zinc-500">
              points
            </span>
          </div>

          {/* Progress */}
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-zinc-800">
            <div
              className={`h-full rounded-full transition-all duration-700 ${card.indicator}`}
              style={{
                width: `${Math.min(Math.max(card.value, 0), 100)}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}