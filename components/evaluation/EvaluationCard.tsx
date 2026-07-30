import { EvaluationResult } from "@/types/evaluation";
import { Progress } from "@/components/ui/progress";

interface EvaluationCardProps {
  result: EvaluationResult;
}

export default function EvaluationCard({
  result,
}: EvaluationCardProps) {
  return (
    <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-2xl font-bold">Overall Score</h2>

      <div className="mt-6 flex items-center gap-4">

  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-4xl font-bold">
    {result.overallScore}
  </div>

  <div>
    <p className="text-zinc-400">
      Overall Prompt Quality
    </p>

    <p className="text-lg font-semibold">
      Production Ready
    </p>
  </div>

</div>

      <div className="mt-8 space-y-6">

  <div>
    <div className="mb-2 flex justify-between">
      <span>Safety</span>
      <span>{result.safety}%</span>
    </div>

    <Progress value={result.safety} />
  </div>

  <div>
    <div className="mb-2 flex justify-between">
      <span>Clarity</span>
      <span>{result.clarity}%</span>
    </div>

    <Progress value={result.clarity} />
  </div>

  <div>
    <div className="mb-2 flex justify-between">
      <span>Robustness</span>
      <span>{result.robustness}%</span>
    </div>

    <Progress value={result.robustness} />
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