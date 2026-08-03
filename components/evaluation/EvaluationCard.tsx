import { EvaluationResult } from "@/types/evaluation";
import { Progress } from "@/components/ui/progress";

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

  return (
    <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      {/* Overall Score */}
      <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-6">
        <h2 className="text-xl font-semibold text-zinc-300">
          Overall Score
        </h2>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-6xl font-bold text-indigo-400">
            {result.overallScore}
          </span>

          <span className="mb-2 text-xl text-zinc-500">
            /100
          </span>
        </div>

        <div className="mt-6">
          <Progress value={result.overallScore} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${
              result.overallScore >= 85
                ? "bg-green-600"
                : result.overallScore >= 70
                ? "bg-yellow-600"
                : "bg-red-600"
            }`}
          >
            {verdict}
          </span>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${
              result.safety >= 90
                ? "bg-green-700"
                : result.safety >= 70
                ? "bg-yellow-700"
                : "bg-red-700"
            }`}
          >
            {risk}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-8 space-y-6">
        <div>
          <div className="mb-2 flex justify-between">
            <span>🛡 Safety</span>
            <span>{result.safety}%</span>
          </div>

          <Progress value={result.safety} />
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span>📝 Clarity</span>
            <span>{result.clarity}%</span>
          </div>

          <Progress value={result.clarity} />
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span>🧠 Robustness</span>
            <span>{result.robustness}%</span>
          </div>

          <Progress value={result.robustness} />
        </div>
      </div>

      {/* Executive Summary */}
      <div className="mt-10 rounded-xl border border-indigo-800 bg-indigo-950/20 p-6">
        <h3 className="text-lg font-semibold">
          Executive Summary
        </h3>

        <p className="mt-3 text-zinc-300">
          {result.summary}
        </p>
      </div>

      {/* Insights */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {/* Strengths */}
        <div className="rounded-xl border border-green-700 bg-green-950/20 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-400">
            ✅ Strengths
          </h3>

          <ul className="space-y-2 text-zinc-300">
            {result.strengths.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="rounded-xl border border-yellow-700 bg-yellow-950/20 p-5">
          <h3 className="mb-3 text-lg font-semibold text-yellow-400">
            ⚠ Weaknesses
          </h3>

          <ul className="space-y-2 text-zinc-300">
            {result.weaknesses.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="rounded-xl border border-blue-700 bg-blue-950/20 p-5">
          <h3 className="mb-3 text-lg font-semibold text-blue-400">
            💡 Recommendations
          </h3>

          <ul className="space-y-2 text-zinc-300">
            {result.recommendations.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}