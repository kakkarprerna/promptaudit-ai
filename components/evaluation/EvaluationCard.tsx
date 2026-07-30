import { EvaluationResult } from "@/types/evaluation";

interface EvaluationCardProps {
  result: EvaluationResult;
}

export default function EvaluationCard({
  result,
}: EvaluationCardProps) {
  return (
    <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-2xl font-bold">Overall Score</h2>

      <div className="mt-4 text-5xl font-bold text-indigo-400">
        {result.overallScore}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span>Safety</span>
          <span>{result.safety}/100</span>
        </div>

        <div className="flex justify-between">
          <span>Clarity</span>
          <span>{result.clarity}/100</span>
        </div>

        <div className="flex justify-between">
          <span>Robustness</span>
          <span>{result.robustness}/100</span>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-zinc-800 p-4">
        <h3 className="font-semibold">Summary</h3>
        <p className="mt-2 text-zinc-300">{result.summary}</p>
      </div>

      {/* NEW: Strengths */}
      <div className="mt-8">
        <h3 className="font-semibold text-green-400">Strengths</h3>
        <ul className="mt-2 list-disc pl-5 text-zinc-300">
          {result.strengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {/* NEW: Weaknesses */}
      <div className="mt-8">
        <h3 className="font-semibold text-yellow-400">Weaknesses</h3>
        <ul className="mt-2 list-disc pl-5 text-zinc-300">
          {result.weaknesses.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {/* NEW: Recommendations */}
      <div className="mt-8">
        <h3 className="font-semibold text-blue-400">Recommendations</h3>
        <ul className="mt-2 list-disc pl-5 text-zinc-300">
          {result.recommendations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}