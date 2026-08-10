"use client";

import RadarComparison from "@/components/charts/RadarComparison";
import ComparisonCard from "@/components/evaluation/ComparisonCard";

import AnimatedSection from "@/components/ui/AnimatedSection";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeader from "@/components/ui/SectionHeader";

import { EvaluationResult } from "@/types/evaluation";

type ComparisonSectionProps = {
  original: EvaluationResult | null;
  improved: EvaluationResult | null;
};

export default function ComparisonSection({
  original,
  improved,
}: ComparisonSectionProps) {
  if (!original || !improved) return null;

  const scoreChange =
    Number(improved.overallScore) - Number(original.overallScore);

  const improvementLabel =
    scoreChange > 0
      ? "Improved"
      : scoreChange < 0
        ? "Needs Review"
        : "No Score Change";

  const changeStyles =
    scoreChange > 0
      ? {
          border: "border-emerald-500/20",
          background: "bg-emerald-500/[0.04]",
          text: "text-emerald-400",
        }
      : scoreChange < 0
        ? {
            border: "border-red-500/20",
            background: "bg-red-500/[0.04]",
            text: "text-red-400",
          }
        : {
            border: "border-zinc-700",
            background: "bg-zinc-900/40",
            text: "text-zinc-300",
          };

  return (
    <AnimatedSection>
      <GlassCard>
        {/* Header */}
        <section className="p-6 md:p-8">
          <SectionHeader
            title="Score Comparison"
            subtitle="See how the improved prompt performs against the original across key quality dimensions."
          />
        </section>

        {/* Score overview */}
        <section className="border-t border-zinc-800/80 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Original */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
              <p className="text-sm font-medium text-zinc-400">
                Original Score
              </p>

              <div className="mt-3 flex items-end gap-2">
                <span className="text-4xl font-bold text-white">
                  {original.overallScore}
                </span>

                <span className="pb-1 text-sm text-zinc-500">
                  /100
                </span>
              </div>

              <p className="mt-2 text-xs text-zinc-500">
                Baseline prompt
              </p>
            </div>

            {/* Improved */}
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.05] p-5">
              <p className="text-sm font-medium text-zinc-400">
                Improved Score
              </p>

              <div className="mt-3 flex items-end gap-2">
                <span className="text-4xl font-bold text-white">
                  {improved.overallScore}
                </span>

                <span className="pb-1 text-sm text-zinc-500">
                  /100
                </span>
              </div>

              <p className="mt-2 text-xs text-zinc-500">
                AI-generated revision
              </p>
            </div>

            {/* Change */}
            <div
              className={`rounded-2xl border p-5 ${changeStyles.border} ${changeStyles.background}`}
            >
              <p className="text-sm font-medium text-zinc-400">
                Overall Change
              </p>

              <div className="mt-3 flex items-end gap-2">
                <span
                  className={`text-4xl font-bold ${changeStyles.text}`}
                >
                  {scoreChange > 0 ? "+" : ""}
                  {scoreChange}
                </span>

                <span className="pb-1 text-sm text-zinc-500">
                  points
                </span>
              </div>

              <p
                className={`mt-2 text-xs font-medium ${changeStyles.text}`}
              >
                {improvementLabel}
              </p>
            </div>
          </div>
        </section>

        {/* Metric comparison */}
        <section className="border-t border-zinc-800/80 p-6 md:p-8">
          <SectionHeader
            title="Metric Breakdown"
            subtitle="Compare the original and improved prompt across the dimensions used in the audit."
          />

          <div className="mt-6">
            <ComparisonCard
              original={original}
              improved={improved}
            />
          </div>
        </section>

       {/* Radar visualization */}
<section className="border-t border-zinc-800/80 bg-zinc-950/20 p-6 md:p-8">
  <SectionHeader
    title="Performance Comparison"
    subtitle="Visualize how the improved prompt performs across the audit dimensions."
  />

  <div className="mt-6">
    <RadarComparison
      original={original}
      improved={improved}
    />
  </div>
</section>
      </GlassCard>
    </AnimatedSection>
  );
}
