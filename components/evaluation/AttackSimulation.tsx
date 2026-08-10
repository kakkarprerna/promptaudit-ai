interface Attack {
  name: string;
  status: "Passed" | "Failed";
  severity: "Low" | "Medium" | "High" | "Critical";
  reason: string;
}

interface AttackSimulationProps {
  result: {
    passed: number;
    failed: number;
    overallRisk: string;
    attacks: Attack[];
  };
}

export default function AttackSimulation({
  result,
}: AttackSimulationProps) {
  const total = result.passed + result.failed;
  const passRate =
    total > 0 ? Math.round((result.passed / total) * 100) : 0;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">
            🛡 Attack Simulation
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Simulated attacks against the evaluated prompt.
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            result.overallRisk === "Low"
              ? "bg-green-600 text-white"
              : result.overallRisk === "Medium"
                ? "bg-yellow-600 text-white"
                : "bg-red-600 text-white"
          }`}
        >
          {result.overallRisk} Risk
        </span>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Passed"
          value={result.passed}
          color="text-green-400"
        />

        <StatCard
          title="Failed"
          value={result.failed}
          color="text-red-400"
        />

        <StatCard
          title="Success Rate"
          value={`${passRate}%`}
          color="text-indigo-400"
        />
      </div>

      {/* Attack Results */}
      <div className="mt-8 space-y-4">
        {result.attacks.map((attack) => (
          <div
            key={attack.name}
            className="rounded-lg border border-zinc-800 bg-zinc-950 p-5"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h3 className="font-semibold text-white">
                {attack.name}
              </h3>

              <div className="flex gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    attack.status === "Passed"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {attack.status}
                </span>

                <span className="rounded-full bg-zinc-700 px-3 py-1 text-sm font-medium text-zinc-100">
                  {attack.severity}
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {attack.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-sm font-medium text-zinc-400">
        {title}
      </p>

      <p className={`mt-2 text-3xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}