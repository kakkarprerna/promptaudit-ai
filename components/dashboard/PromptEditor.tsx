"use client";

import { ArrowRight, Check, Copy, Sparkles } from "lucide-react";
import { useState } from "react";

interface PromptEditorProps {
  prompt: string;
  setPrompt: (value: string) => void;
  loading: boolean;
  onAnalyze: () => void | Promise<void>;
}

export default function PromptEditor({
  prompt,
  setPrompt,
  loading,
  onAnalyze,
}: PromptEditorProps) {
  const [copied, setCopied] = useState(false);

  const examplePrompts = [
    {
      label: "Customer Support",
      prompt:
        "You are a customer support assistant. Help customers resolve issues clearly and professionally. Never invent account information or policies. Ask for clarification when necessary.",
    },
    {
      label: "Research Assistant",
      prompt:
        "You are a research assistant. Provide accurate, concise answers based on the information available to you. Clearly distinguish facts from uncertainty and do not fabricate sources.",
    },
    {
      label: "Data Extraction",
      prompt:
        "Extract the requested information from the provided document. Return only the requested fields in the specified format. If information is missing, return null rather than guessing.",
    },
  ];

  const maxLength = 5000;
  const characterCount = prompt.length;

  async function handleCopy() {
    if (!prompt.trim()) return;

    await navigator.clipboard.writeText(prompt);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  function handleExampleClick(example: string) {
    if (loading) return;
    setPrompt(example);
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950/90 shadow-2xl shadow-black/20">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative p-6 md:p-8 lg:p-10">
        {/* Header */}
        <div className="mb-7 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-400/30 bg-indigo-500/10 text-indigo-300">
            <Sparkles size={24} />
          </div>

          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Prompt Input
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base">
              Paste your system prompt below to evaluate its quality,
              safety, clarity, and robustness.
            </p>
          </div>
        </div>

        {/* Example prompts */}
        <div className="mb-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-300">
              Try an example
            </span>

            <span className="text-xs text-zinc-500">
              Or write your own
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example) => (
              <button
                key={example.label}
                type="button"
                onClick={() => handleExampleClick(example.prompt)}
                disabled={loading}
                className="
                          rounded-xl
                          border
                          border-zinc-700/80
                          bg-zinc-900/80
                          px-4
                          py-2.5
                          text-sm
                          font-medium
                          text-zinc-200
                          shadow-sm
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:border-indigo-400/50
                          hover:bg-indigo-500/10
                          hover:text-white
                          hover:shadow-md
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                         
              "
                
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(event) => {
              if (event.target.value.length <= maxLength) {
                setPrompt(event.target.value);
              }
            }}
            placeholder="Paste or write your system prompt here..."
            disabled={loading}
            maxLength={maxLength}
            spellCheck={false}
            className="
              min-h-[320px]
              w-full
              resize-y
              rounded-2xl
              border
              border-zinc-700/80
              bg-[#080b14]
              px-6
              py-6
              pb-12
              text-base
              leading-7
              text-white
              caret-indigo-400
              outline-none
              placeholder:text-zinc-400
              transition
              duration-200
              focus:border-indigo-400
              focus:ring-2
              focus:ring-indigo-500/20
              disabled:cursor-not-allowed
              disabled:opacity-60
              md:text-lg
            "
          />

          {/* Character counter */}
          <div className="pointer-events-none absolute bottom-4 right-5 rounded-lg border border-zinc-700/60 bg-zinc-900/90 px-2.5 py-1 text-xs font-medium text-zinc-400">
  {characterCount.toLocaleString()} / {maxLength.toLocaleString()} characters
</div>
        </div>

        {/* Bottom toolbar */}
        <div className="mt-5 flex flex-col gap-4 border-t border-zinc-800/80 pt-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Status */}
          <div className="flex items-center gap-2 text-sm">
            {prompt.trim() ? (
              <>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <Check size={13} />
                </div>

                <span className="text-zinc-300">
                  Prompt ready for analysis
                </span>
              </>
            ) : (
              <span className="text-zinc-500">
                Enter a prompt to begin
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Copy */}
            <button
              type="button"
              onClick={handleCopy}
              disabled={!prompt.trim() || loading}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-zinc-700
                bg-zinc-900
                px-5
                py-3
                text-sm
                font-medium
                text-zinc-200
                transition
                duration-200
                hover:border-zinc-600
                hover:bg-zinc-800
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {copied ? (
                <>
                  <Check size={17} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={17} />
                  Copy Prompt
                </>
              )}
            </button>

            {/* Analyze */}
            <button
              type="button"
              onClick={onAnalyze}
              disabled={!prompt.trim() || loading}
              className="
                group
                inline-flex
                min-w-[220px]
                items-center
                justify-center
                gap-3
                rounded-xl
                border
                border-indigo-400/40
                bg-gradient-to-r
                from-indigo-600
                to-violet-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-indigo-950/40
                transition
                duration-200
                hover:-translate-y-0.5
                hover:border-indigo-300/50
                hover:from-indigo-500
                hover:to-violet-500
                hover:shadow-xl
                hover:shadow-indigo-900/40
                disabled:cursor-not-allowed
                disabled:opacity-50
                hover:scale-[1.01]
                disabled:hover:translate-y-0
              "
            >
              <Sparkles size={18} />

              {loading ? "Analyzing..." : "Analyze Prompt"}

              {!loading && (
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}