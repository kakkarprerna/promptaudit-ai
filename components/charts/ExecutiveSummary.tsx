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
    <div className="mt-10 rounded-xl border border-zinc-800 bg-gradient-to-r from-indigo-950 to-zinc-900 p-8">
      <h2 className="text-2xl font-bold">
        📋 Executive Summary
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-zinc-400">
            Original Score
          </p>

          <p className="mt-2 text-5xl font-bold text-zinc-200">
            {original.overallScore}
          </p>
        </div>

        <div>
          <p className="text-zinc-400">
            Improved Score
          </p>

          <p className="mt-2 text-5xl font-bold text-green-400">
            {improved.overallScore}
          </p>
        </div>

        <div>
          <p className="text-zinc-400">
            Improvement
          </p>

          <p className="mt-2 text-5xl font-bold text-indigo-400">
            {improvement > 0 ? "+" : ""}
            {improvement}
          </p>

          <p className="mt-2 text-zinc-500">
            ({percent}%)
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-indigo-800 bg-indigo-950/30 p-5">
        <p className="text-lg leading-8 text-zinc-300">
          The improved prompt demonstrates a measurable increase in overall
          quality compared with the original version. The automated refinement
          process strengthened the prompt while preserving its intent. Review
          the detailed metrics below to identify which dimensions improved the
          most.
        </p>
      </div>
    </div>
  );
}