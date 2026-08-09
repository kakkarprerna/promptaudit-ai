"use client";

import { Check, Circle } from "lucide-react";

type WorkflowProgressProps = {
  hasPrompt: boolean;
  hasResult: boolean;
  hasImprovedPrompt: boolean;
  hasComparison: boolean;
  hasAttackResult: boolean;
};

const steps = [
  { id: 1, label: "Evaluate" },
  { id: 2, label: "Improve" },
  { id: 3, label: "Compare" },
  { id: 4, label: "Attack-Test" },
];

export default function WorkflowProgress({
  hasPrompt,
  hasResult,
  hasImprovedPrompt,
  hasComparison,
  hasAttackResult,
}: WorkflowProgressProps) {
  const completed = [
    hasResult,
    hasImprovedPrompt,
    hasComparison,
    hasAttackResult,
  ];

  const activeIndex = completed.findIndex((step) => !step);

  const currentIndex =
    activeIndex === -1
      ? steps.length - 1
      : hasPrompt
        ? activeIndex
        : 0;

  const statusText = !hasPrompt
    ? "Enter a prompt to begin."
    : hasAttackResult
      ? "Audit workflow complete."
      : hasComparison
        ? "Ready for attack testing."
        : hasImprovedPrompt
          ? "Ready to compare results."
          : hasResult
            ? "Ready to improve your prompt."
            : "Prompt ready for evaluation.";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        {/* Workflow */}
        <div className="flex min-w-0 flex-1 items-center">
          {steps.map((step, index) => {
            const isComplete = completed[index];
            const isActive =
              !isComplete && index === currentIndex;

            return (
              <div
                key={step.id}
                className="flex min-w-0 flex-1 items-center"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all",
                      isComplete
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                        : isActive
                          ? "border-indigo-500/60 bg-indigo-500/15 text-indigo-300 shadow-[0_0_18px_rgba(99,102,241,0.15)]"
                          : "border-zinc-700 bg-zinc-900 text-zinc-500",
                    ].join(" ")}
                  >
                    {isComplete ? (
                      <Check size={16} strokeWidth={2.5} />
                    ) : (
                      <span className="text-xs font-semibold">
                        {step.id}
                      </span>
                    )}
                  </div>

                  <div className="hidden sm:block">
                    <p
                      className={[
                        "text-sm font-medium whitespace-nowrap",
                        isComplete
                          ? "text-emerald-400"
                          : isActive
                            ? "text-white"
                            : "text-zinc-500",
                      ].join(" ")}
                    >
                      {step.label}
                    </p>

                    {isActive && (
                      <p className="mt-0.5 text-xs text-indigo-400">
                        Current step
                      </p>
                    )}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={[
                      "mx-4 h-px flex-1 transition-colors",
                      isComplete
                        ? "bg-emerald-500/30"
                        : "bg-zinc-800",
                    ].join(" ")}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Status */}
        <div className="hidden h-12 w-px bg-zinc-800 lg:block" />

        <div className="min-w-[230px] lg:max-w-[260px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Workflow Status
          </p>

          <div className="mt-1.5 flex items-center gap-2">
            <Circle
              size={8}
              fill={
                hasAttackResult
                  ? "currentColor"
                  : hasPrompt
                    ? "currentColor"
                    : "none"
              }
              className={
                hasAttackResult
                  ? "text-emerald-400"
                  : hasPrompt
                    ? "text-indigo-400"
                    : "text-zinc-600"
              }
            />

            <p className="text-sm text-zinc-300">
              {statusText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}