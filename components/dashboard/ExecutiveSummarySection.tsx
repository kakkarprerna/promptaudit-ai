"use client";

import {
  ShieldCheck,
  Gauge,
  FileCheck,
  Sparkles,
  BarChart3,
} from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import SectionHeader from "@/components/ui/SectionHeader";
import MetricCard from "@/components/ui/MetricCard";
import { Progress } from "@/components/ui/progress";
import { EvaluationResult } from "@/types/evaluation";

type ExecutiveSummarySectionProps = {
  result: EvaluationResult | null;
};

export default function ExecutiveSummarySection({
  result,
}: ExecutiveSummarySectionProps) {
  if (!result) return null;

  const score = Number(result.overallScore);

  const risk =
    score >= 85
      ? "Low"
      : score >= 70
        ? "Medium"
        : "High";

  const clarity =
    score >= 85
      ? "Excellent"
      : score >= 70
        ? "Good"
        : "Needs Improvement";

  const securityRisk = result.security?.riskLevel ?? "Unknown";

  const recommendation =
    score >= 85
      ? "The prompt demonstrates strong structure, clear instructions, and good safety practices. It is suitable for production use with only minor refinements."
      : score >= 70
        ? "The prompt has a solid foundation but would benefit from improvements to clarity, robustness, and security before production deployment."
        : "The prompt requires significant improvements before it should be considered for production use.";

  return (
    <GlassCard>
      {/* Header */}
      <div className="border-b border-zinc-800/80 px-6 py-6 md:px-8">
        <SectionHeader
          title="Evaluation Summary"
          description="High-level assessment of prompt quality, safety, and deployment readiness."
        />
      </div>

      {/* Summary metrics */}
      <div className="px-6 pt-6 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Overall Score */}
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/[0.08] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-300">
                Overall Score
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300">
                <Gauge size={19} />
              </div>
            </div>

            <div className="mt-5">
              <div className="text-4xl font-bold tracking-tight text-white">
                {score}
                <span className="ml-1 text-lg font-medium text-zinc-500">
                  /100
                </span>
              </div>

              <p className="mt-2 text-sm text-zinc-400">
                AI Quality Score
              </p>
            </div>
          </div>

          {/* Risk */}
          <MetricCard
            title="Risk Level"
            value={risk}
            subtitle="Deployment Risk"
            icon={<ShieldCheck size={22} />}
          />

          {/* Security */}
          <MetricCard
            title="Security"
            value={securityRisk}
            subtitle="Prompt Protection"
            icon={<FileCheck size={22} />}
          />

          {/* Clarity */}
          <MetricCard
            title="Clarity"
            value={clarity}
            subtitle="Instruction Quality"
            icon={<Sparkles size={22} />}
          />
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="mt-8 border-t border-zinc-800/80 px-6 py-7 md:px-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
            <BarChart3 size={18} />
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">
              Score Breakdown
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Detailed assessment across the core evaluation dimensions.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Safety */}
          <ScoreMetric
            label="Safety"
            value={Number(result.safety)}
          />

          {/* Clarity */}
          <ScoreMetric
            label="Clarity"
            value={Number(result.clarity)}
          />

          {/* Robustness */}
          <ScoreMetric
            label="Robustness"
            value={Number(result.robustness)}
          />
        </div>
      </div>

      {/* Recommendation */}
      <div className="border-t border-zinc-800/80 bg-zinc-950/30 px-6 py-6 md:px-8">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <Sparkles size={18} />
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">
              AI Recommendation
            </h3>

            <p className="mt-2 max-w-4xl text-sm leading-7 text-zinc-300 md:text-base">
              {recommendation}
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function ScoreMetric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-300">
          {label}
        </span>

        <span className="text-sm font-semibold text-white">
          {value}/100
        </span>
      </div>

      <Progress value={value} />

      <div className="mt-2 text-xs text-zinc-500">
        {value >= 85
          ? "Strong"
          : value >= 70
            ? "Good"
            : "Needs improvement"}
      </div>
    </div>
  );
}