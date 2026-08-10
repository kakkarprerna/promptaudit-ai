interface ExecutiveSummaryProps {
  original: {
    overallScore: number;
  };

  improved: {
    overallScore: number;
  };
}

export default function ExecutiveSummary({
  original,
  improved,
}: ExecutiveSummaryProps) {
  const improvement =
    improved.overallScore - original.overallScore;

  const percent =
    original.overallScore === 0
      ? 0
      : Math.round(
          (improvement / original.overallScore) * 100
        );

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-lg">📋</span>

        <h3 className="text-xl font-semibold text-white">
          Executive Summary
        </h3>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
          <p className="text-sm font-medium text-zinc-400">
            Original Score
          </p>

          <p className="mt-2 text-5xl font-bold text-zinc-100">
            {original.overallScore}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Baseline prompt
          </p>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
          <p className="text-sm font-medium text-zinc-400">
            Improved Score
          </p>

          <p className="mt-2 text-5xl font-bold text-green-400">
            {improved.overallScore}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Revised prompt
          </p>
        </div>

        <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/[0.04] p-5">
          <p className="text-sm font-medium text-zinc-400">
            Improvement
          </p>

          <p className="mt-2 text-5xl font-bold text-indigo-400">
            {improvement > 0 ? "+" : ""}
            {improvement}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            {percent}% relative improvement
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-5">
        <p className="text-base leading-7 text-zinc-300">
          The improved prompt demonstrates a measurable increase in
          overall quality compared with the original version. The
          automated refinement process strengthened the prompt while
          preserving its intent. Review the detailed metrics below to
          identify which dimensions improved the most.
        </p>
      </div>
    </div>
  );
}