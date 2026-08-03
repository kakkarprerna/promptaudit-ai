import { Progress } from "@/components/ui/progress";

interface SecurityCardProps {
  security: {
    riskLevel: string;
    promptInjectionRisk: number;
    hallucinationRisk: number;
    instructionConflict: number;
    dataLeakageRisk: number;
    missingGuardrails: string[];
  };
}

export default function SecurityCard({
  security,
}: SecurityCardProps) {
  if (!security) {
    return null;
  }

  return (
    <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        🛡 Security Audit
      </h2>

      <div className="mb-6">
        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            security.riskLevel === "Low"
              ? "bg-green-600"
              : security.riskLevel === "Medium"
              ? "bg-yellow-600"
              : "bg-red-600"
          }`}
        >
          {security.riskLevel} Risk
        </span>
      </div>

      <div className="space-y-6">
        <Metric
          title="Prompt Injection"
          value={security.promptInjectionRisk}
        />

        <Metric
          title="Hallucination"
          value={security.hallucinationRisk}
        />

        <Metric
          title="Instruction Conflict"
          value={security.instructionConflict}
        />

        <Metric
          title="Data Leakage"
          value={security.dataLeakageRisk}
        />
      </div>

      <div className="mt-8 rounded-lg bg-zinc-800 p-5">
        <h3 className="font-semibold">
          Missing Guardrails
        </h3>

        <ul className="mt-3 space-y-2 text-zinc-300">
          {security.missingGuardrails.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Metric({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span>{title}</span>
        <span>{value}%</span>
      </div>

      <Progress value={value} />
    </div>
  );
}