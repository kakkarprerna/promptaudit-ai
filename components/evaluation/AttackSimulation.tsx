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
    <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          🛡 Attack Simulation
        </h2>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            result.overallRisk === "Low"
              ? "bg-green-600"
              : result.overallRisk === "Medium"
              ? "bg-yellow-600"
              : "bg-red-600"
          }`}
        >
          {result.overallRisk} Risk
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        <StatCard title="Passed" value={result.passed} color="text-green-400" />
        <StatCard title="Failed" value={result.failed} color="text-red-400" />
        <StatCard title="Success Rate" value={`${passRate}%`} color="text-indigo-400" />
      </div>

      <div className="mt-8 space-y-4">
        {result.attacks.map((attack) => (
          <div
            key={attack.name}
            className="rounded-lg border border-zinc-800 bg-zinc-950 p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{attack.name}</h3>

              <div className="flex gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    attack.status === "Passed"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {attack.status}
                </span>

                <span className="rounded-full bg-zinc-700 px-3 py-1 text-sm">
                  {attack.severity}
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm text-zinc-400">
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
    <div className="rounded-xl bg-zinc-950 p-5 text-center">
      <p className="text-zinc-400">{title}</p>

      <p className={`mt-2 text-3xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}