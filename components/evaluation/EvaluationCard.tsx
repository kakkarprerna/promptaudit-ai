import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Progress } from "@/components/ui/progress";
import { EvaluationResult } from "@/types/evaluation";

interface EvaluationCardProps {
  result: EvaluationResult;
}

export default function EvaluationCard({
  result,
}: EvaluationCardProps) {
  const verdict =
    result.overallScore >= 85
      ? "Excellent"
      : result.overallScore >= 70
        ? "Good"
        : "Needs Improvement";

  const risk =
    result.safety >= 90
      ? "Low Risk"
      : result.safety >= 70
        ? "Medium Risk"
        : "High Risk";

  const verdictClass =
    result.overallScore >= 85
      ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
      : result.overallScore >= 70
        ? "border-amber-500/25 bg-amber-500/10 text-amber-300"
        : "border-red-500/25 bg-red-500/10 text-red-300";

  const riskClass =
    result.safety >= 90
      ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
      : result.safety >= 70
        ? "border-amber-500/25 bg-amber-500/10 text-amber-300"
        : "border-red-500/25 bg-red-500/10 text-red-300";

  const metrics = [
    {
      label: "Safety",
      value: result.safety,
    },
    {
      label: "Clarity",
      value: result.clarity,
    },
    {
      label: "Robustness",
      value: result.robustness,
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 md:p-7">
      {/* Overall Score */}
      <div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-zinc-400">
              Overall Score
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              AI-generated prompt quality assessment
            </p>
          </div>

          <span
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${verdictClass}`}
          >
            {verdict}
          </span>
        </div>

        <div className="mt-6 flex items-end gap-2">
          <AnimatedCounter
            value={result.overallScore}
            className="text-6xl font-bold tracking-tight text-white"
          />

          <span className="mb-2 text-xl font-medium text-zinc-500">
            /100
          </span>
        </div>

        <div className="mt-6">
          <Progress value={result.overallScore} />
        </div>

        <div className="mt-5">
          <span
            className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${riskClass}`}
          >
            {risk}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-8 border-t border-zinc-800/80 pt-7">
        <div className="mb-5">
          <h3 className="text-base font-semibold text-white">
            Quality Metrics
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Breakdown of the prompt evaluation.
          </p>
        </div>

        <div className="space-y-6">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-200">
                  {metric.label}
                </span>

                <span className="text-sm font-semibold text-white">
                  {metric.value}%
                </span>
              </div>

              <Progress value={metric.value} />
            </div>
          ))}
        </div>
      </div>

      {/* Executive Summary */}
      <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
          Executive Summary
        </p>

        <p className="mt-3 text-sm leading-7 text-zinc-200">
          {result.summary}
        </p>
      </div>

      {/* Insights */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {/* Strengths */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
          <h3 className="text-sm font-semibold text-emerald-300">
            Strengths
          </h3>

          <ul className="mt-4 space-y-3">
            {result.strengths.map((item) => (
              <li
                key={item}
                className="text-sm leading-6 text-zinc-200"
              >
                <span className="mr-2 text-emerald-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
          <h3 className="text-sm font-semibold text-amber-300">
            Weaknesses
          </h3>

          <ul className="mt-4 space-y-3">
            {result.weaknesses.map((item) => (
              <li
                key={item}
                className="text-sm leading-6 text-zinc-200"
              >
                <span className="mr-2 text-amber-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.04] p-5">
          <h3 className="text-sm font-semibold text-blue-300">
            Recommendations
          </h3>

          <ul className="mt-4 space-y-3">
            {result.recommendations.map((item) => (
              <li
                key={item}
                className="text-sm leading-6 text-zinc-200"
              >
                <span className="mr-2 text-blue-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}