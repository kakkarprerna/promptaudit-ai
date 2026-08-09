"use client";

import { ArrowRight, ShieldAlert, ShieldCheck } from "lucide-react";

import AttackSimulation from "@/components/evaluation/AttackSimulation";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { AttackResult } from "@/types/attack";

interface AttackSectionProps {
  attackResult: AttackResult | null;
  attackLoading: boolean;
  onRunAttack: () => Promise<void>;
}

export default function AttackSection({
  attackResult,
  attackLoading,
  onRunAttack,
}: AttackSectionProps) {
  const hasResult = Boolean(attackResult);

  return (
    <GlassCard className="relative overflow-hidden">
      {/* Ambient security glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-500/[0.04] blur-3xl" />

      {/* Decorative radar rings */}
      <div className="pointer-events-none absolute -right-24 -top-24 hidden h-[360px] w-[360px] rounded-full border border-red-500/[0.08] md:block">
        <div className="absolute inset-10 rounded-full border border-red-500/[0.08]" />
        <div className="absolute inset-20 rounded-full border border-red-500/[0.08]" />
        <div className="absolute inset-30 rounded-full border border-red-500/[0.08]" />
      </div>

      <div className="relative p-6 md:p-8 lg:p-10">
        {/* Header */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
                hasResult
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-red-500/30 bg-red-500/10 text-red-400"
              }`}
            >
              {hasResult ? (
                <ShieldCheck size={24} />
              ) : (
                <ShieldAlert size={24} />
              )}
            </div>

            <SectionHeader
              title="Red Team Assessment"
              subtitle="Test the improved prompt against adversarial prompt injection scenarios and identify potential security weaknesses."
            />
          </div>

          {/* CTA */}
          {!attackResult && (
            <button
              type="button"
              onClick={onRunAttack}
              disabled={attackLoading}
              className="
                group
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-3
                rounded-xl
                border
                border-red-400/30
                bg-gradient-to-r
                from-red-600
                to-rose-600
                px-6
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-red-950/40
                transition
                duration-200
                hover:-translate-y-0.5
                hover:border-red-300/40
                hover:from-red-500
                hover:to-rose-500
                hover:shadow-xl
                hover:shadow-red-900/40
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:hover:translate-y-0
              "
            >
              <ShieldAlert size={18} />

              {attackLoading
                ? "Running Assessment..."
                : "Run Red Team Assessment"}

              {!attackLoading && (
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              )}
            </button>
          )}
        </div>

        {/* Assessment status */}
        {attackLoading && (
          <div className="mt-8 rounded-2xl border border-red-500/15 bg-red-500/[0.04] p-5">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-400" />

              <div>
                <p className="text-sm font-semibold text-white">
                  Running security assessment
                </p>

                <p className="mt-1 text-sm text-zinc-400">
                  Testing the prompt against adversarial scenarios...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {attackResult && (
          <div className="mt-8 border-t border-zinc-800/80 pt-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">
                  Assessment Results
                </p>

                <p className="mt-1 text-sm text-zinc-400">
                  Review the simulated attacks and the prompt's defensive
                  response.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                <ShieldCheck size={14} />
                Assessment Complete
              </div>
            </div>

            <AttackSimulation result={attackResult} />
          </div>
        )}

        {/* Empty state */}
        {!attackResult && !attackLoading && (
          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                <ShieldAlert size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Security testing has not been run yet
                </p>

                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  Run the red team assessment to test the improved prompt
                  against adversarial scenarios before considering it
                  production-ready.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
}