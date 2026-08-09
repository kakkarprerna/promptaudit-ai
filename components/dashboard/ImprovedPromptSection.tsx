"use client";

import { useState } from "react";
import { Check, Copy, Sparkles, ArrowRight } from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import SectionHeader from "@/components/ui/SectionHeader";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { EvaluationResult } from "@/types/evaluation";

type ImprovedPromptSectionProps = {
  improvedPrompt: string;
  improvedLoading: boolean;
  improvedResult: EvaluationResult | null;
  onCopy: () => void;
  onEvaluate: () => Promise<void>;
};

export default function ImprovedPromptSection({
  improvedPrompt,
  improvedLoading,
  improvedResult,
  onCopy,
  onEvaluate,
}: ImprovedPromptSectionProps) {
  const [copied, setCopied] = useState(false);

  if (!improvedPrompt && !improvedLoading) {
    return null;
  }

  const handleCopy = async () => {
    onCopy();
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <GlassCard className="overflow-hidden">
      {/* Header */}
      <div className="border-b border-zinc-800/80 p-6 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <SectionHeader
            title="Secure Prompt Revision"
            subtitle="AI-generated revision designed to improve clarity, safety, and production readiness."
          />

          <div className="flex shrink-0 flex-wrap gap-3">
            {improvedPrompt && (
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}

            {improvedPrompt && (
              <PrimaryButton
                variant="success"
                onClick={onEvaluate}
                loading={improvedLoading}
                icon={<ArrowRight size={17} />}
              >
                Evaluate Revision
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>

      {/* Prompt workspace */}
      <div className="p-6 md:p-8">
        <div className="overflow-hidden rounded-2xl border border-zinc-700/70 bg-[#05070d] shadow-inner">
          {/* Workspace toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900/70 px-5 py-3.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              </div>

              <span className="ml-2 text-sm font-medium text-zinc-200">
                Optimized Prompt
              </span>
            </div>

            {improvedResult && (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <Check size={13} />
                Evaluated · {improvedResult.overallScore}/100
              </span>
            )}
          </div>

          {/* Prompt content */}
          <div className="min-h-[300px] max-h-[520px] overflow-y-auto p-6 md:p-7">
            {improvedLoading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 w-3/4 rounded bg-zinc-800" />
                <div className="h-4 w-full rounded bg-zinc-800" />
                <div className="h-4 w-5/6 rounded bg-zinc-800" />
                <div className="h-4 w-2/3 rounded bg-zinc-800" />
                <div className="h-4 w-full rounded bg-zinc-800" />
                <div className="h-4 w-4/5 rounded bg-zinc-800" />
              </div>
            ) : (
              <pre className="whitespace-pre-wrap break-words font-mono text-[14px] leading-7 text-zinc-100 md:text-[15px]">
                {improvedPrompt}
              </pre>
            )}
          </div>
        </div>

        {/* Guidance */}
        {!improvedResult && improvedPrompt && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-indigo-500/15 bg-indigo-500/[0.05] px-4 py-3.5 text-sm text-zinc-300">
            <Sparkles
              size={17}
              className="mt-0.5 shrink-0 text-indigo-400"
            />

            <p>
              Evaluate this revision to see how its security, clarity,
              robustness, and overall score compare with the original prompt.
            </p>
          </div>
        )}

        {improvedResult && (
          <div className="mt-5 flex items-center gap-2 text-sm text-emerald-300">
            <Check size={16} />
            Revision evaluated successfully. Review the comparison results
            below.
          </div>
        )}
      </div>
    </GlassCard>
  );
}