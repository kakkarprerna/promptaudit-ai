"use client";

import {
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
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

  const isLowRisk = security.riskLevel === "Low";
  const isMediumRisk = security.riskLevel === "Medium";

  const riskClass = isLowRisk
    ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
    : isMediumRisk
      ? "border-amber-500/25 bg-amber-500/10 text-amber-300"
      : "border-red-500/25 bg-red-500/10 text-red-300";

  const metrics = [
    {
      title: "Prompt Injection",
      value: security.promptInjectionRisk,
    },
    {
      title: "Hallucination",
      value: security.hallucinationRisk,
    },
    {
      title: "Instruction Conflict",
      value: security.instructionConflict,
    },
    {
      title: "Data Leakage",
      value: security.dataLeakageRisk,
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 md:p-7">
      {/* Security Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
            <ShieldCheck
              size={19}
              className="text-zinc-300"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Security Audit
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Security risk assessment for the submitted prompt.
            </p>
          </div>
        </div>

        <span
          className={`inline-flex w-fit rounded-full border px-3 py-1.5 text-xs font-semibold ${riskClass}`}
        >
          {security.riskLevel} Risk
        </span>
      </div>

      {/* Risk Metrics */}
      <div className="mt-7 border-t border-zinc-800/80 pt-7">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-white">
            Risk Indicators
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Higher scores indicate greater exposure.
          </p>
        </div>

        <div className="space-y-6">
          {metrics.map((metric) => (
            <Metric
              key={metric.title}
              title={metric.title}
              value={metric.value}
            />
          ))}
        </div>
      </div>

      {/* Missing Guardrails */}
      <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
        <div className="flex items-center gap-2">
          <AlertTriangle
            size={17}
            className="text-amber-300"
          />

          <h3 className="text-sm font-semibold text-amber-200">
            Missing Guardrails
          </h3>
        </div>

        {security.missingGuardrails.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {security.missingGuardrails.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-6 text-zinc-200"
              >
                <span className="mt-0.5 text-amber-400">
                  •
                </span>

                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-zinc-400">
            No missing guardrails were identified.
          </p>
        )}
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
  const riskLabel =
    value >= 80
      ? "Critical"
      : value >= 60
        ? "Elevated"
        : value >= 30
          ? "Moderate"
          : "Low";

  const riskTextClass =
    value >= 80
      ? "text-red-400"
      : value >= 60
        ? "text-orange-400"
        : value >= 30
          ? "text-amber-400"
          : "text-emerald-400";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-200">
            {title}
          </span>

          <span
            className={`text-xs font-medium ${riskTextClass}`}
          >
            {riskLabel}
          </span>
        </div>

        <span className="text-sm font-semibold text-white">
          {value}%
        </span>
      </div>

      <Progress value={value} />
    </div>
  );
}
