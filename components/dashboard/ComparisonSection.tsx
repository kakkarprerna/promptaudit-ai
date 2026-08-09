"use client";

import ExecutiveSummary from "@/components/charts/ExecutiveSummary";
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

  return (
    <AnimatedSection>
      <GlassCard className="overflow-hidden">
        {/* Header */}
        <div className="border-b border-zinc-800/80 p-6 md:p-8">
          <SectionHeader
            title="Prompt Comparison"
            subtitle="Compare the original prompt with the AI-generated secure revision."
          />
        </div>

        {/* Score Overview */}
        <div className="grid gap-4 border-b border-zinc-800/80 p-6 md:grid-cols-3 md:p-8">
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
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
            <p className="text-sm font-medium text-zinc-400">
              Overall Change
            </p>

            <div className="mt-3 flex items-end gap-2">
              <span
                className={`text-4xl font-bold ${
                  scoreChange > 0
                    ? "text-emerald-400"
                    : scoreChange < 0
                      ? "text-red-400"
                      : "text-zinc-300"
                }`}
              >
                {scoreChange > 0 ? "+" : ""}
                {scoreChange}
              </span>

              <span className="pb-1 text-sm text-zinc-500">
                points
              </span>
            </div>

            <p
              className={`mt-2 text-xs font-medium ${
                scoreChange > 0
                  ? "text-emerald-400"
                  : scoreChange < 0
                    ? "text-red-400"
                    : "text-zinc-500"
              }`}
            >
              {improvementLabel}
            </p>
          </div>
        </div>

        {/* Executive Summary */}
        <section className="p-6 md:p-8">
          <SectionHeader
            title="AI Assessment"
            subtitle="High-level assessment of how the revised prompt compares with the original."
          />

          <div className="mt-6">
            <ExecutiveSummary
              original={original}
              improved={improved}
            />
          </div>
        </section>

        {/* Score Comparison */}
        <section className="border-t border-zinc-800/80 bg-zinc-950/20 p-6 md:p-8">
          <SectionHeader
            title="Score Comparison"
            subtitle="Visual comparison across safety, clarity, robustness, and overall quality."
          />

          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 md:p-6">
            <RadarComparison
              original={original}
              improved={improved}
            />
          </div>
        </section>

        {/* Detailed Improvements */}
        <section className="border-t border-zinc-800/80 p-6 md:p-8">
          <SectionHeader
            title="Detailed Improvements"
            subtitle="Review the specific changes between the original and revised prompts."
          />

          <div className="mt-6">
            <ComparisonCard
              original={original}
              improved={improved}
            />
          </div>
        </section>
      </GlassCard>
    </AnimatedSection>
  );
}