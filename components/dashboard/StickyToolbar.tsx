"use client";

import {
  Copy,
  FileDown,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import { generatePDF } from "@/lib/pdf";
import { EvaluationResult } from "@/types/evaluation";

interface StickyToolbarProps {
  loading: boolean;
  improvedLoading: boolean;
  attackLoading: boolean;

  result: EvaluationResult | null;
  improvedResult: EvaluationResult | null;

  improvedPrompt: string;

  onReset: () => void;
}

export default function StickyToolbar({
  loading,
  improvedLoading,
  attackLoading,
  result,
  improvedResult,
  improvedPrompt,
  onReset,
}: StickyToolbarProps) {
  const status = attackLoading
    ? "Running attack simulation..."
    : improvedLoading
    ? "Evaluating improved prompt..."
    : loading
    ? "Running AI analysis..."
    : result && improvedResult
    ? "Audit complete"
    : result
    ? "Prompt evaluated"
    : "Ready for audit";

  const isBusy =
    loading ||
    improvedLoading ||
    attackLoading;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-7xl">
      <div className="rounded-2xl border border-zinc-700/80 bg-zinc-950/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Status */}
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                isBusy
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "bg-emerald-500/10 text-emerald-400"
              }`}
            >
              <Sparkles size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">
                Prompt Audit Workspace
              </p>

              <div className="mt-0.5 flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isBusy
                      ? "animate-pulse bg-indigo-400"
                      : "bg-emerald-400"
                  }`}
                />

                <p className="text-xs text-zinc-400">
                  {status}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {result && improvedResult && (
              <button
                type="button"
                onClick={() =>
                  generatePDF(
                    result,
                    improvedResult,
                    improvedPrompt
                  )
                }
                disabled={isBusy}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FileDown size={16} />
                Export Report
              </button>
            )}

            {improvedPrompt && (
              <button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(
                    improvedPrompt
                  )
                }
                disabled={isBusy}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Copy size={16} />
                Copy Prompt
              </button>
            )}

            {result && (
              <button
                type="button"
                onClick={onReset}
                disabled={isBusy}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RotateCcw size={16} />
                New Audit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}