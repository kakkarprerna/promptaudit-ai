"use client";

import SecurityCard from "@/components/evaluation/SecurityCard";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeader from "@/components/ui/SectionHeader";
import PrimaryButton from "@/components/ui/PrimaryButton";

import { EvaluationResult } from "@/types/evaluation";

type ResultsSectionProps = {
  result: EvaluationResult | null;
  improvePrompt: () => Promise<void>;
};

export default function ResultsSection({
  result,
  improvePrompt,
}: ResultsSectionProps) {
  if (!result) return null;

  return (
    <GlassCard>
      {/* Header */}
      <section className="p-6 md:p-8">
        <SectionHeader
          title="Security Assessment"
          subtitle="Review the security risks and guardrails identified in your prompt."
        />

        {/* Security Findings */}
        {result.security && (
          <div className="mt-6">
            <SecurityCard security={result.security} />
          </div>
        )}
      </section>

      {/* Primary CTA */}
      <div className="border-t border-zinc-800/80 p-6 md:p-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-white">
              Ready to strengthen your prompt?
            </h3>

            <p className="mt-1 text-sm text-zinc-400">
              Generate an AI-improved version with stronger clarity,
              safety, and robustness.
            </p>
          </div>

          <PrimaryButton
            variant="primary"
            onClick={improvePrompt}
            className="shrink-0"
          >
            Generate Secure Revision
          </PrimaryButton>
        </div>
      </div>
    </GlassCard>
  );
}