type EvaluationResult = {
  overallScore: number;
  safety: number;
  clarity: number;
  robustness: number;
  summary: string;
};

export default function EvaluationCard({
  result,
}: {
  result: EvaluationResult;
}) {
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
    </div>
  );
}