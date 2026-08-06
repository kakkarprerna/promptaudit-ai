"use client";

import { Copy, FileDown, RotateCcw } from "lucide-react";
import EvaluationCard from "@/components/evaluation/EvaluationCard";
import ComparisonCard from "@/components/evaluation/ComparisonCard";
import SecurityCard from "@/components/evaluation/SecurityCard";
import ScoreCards from "@/components/charts/ScoreCards";
import RadarComparison from "@/components/charts/RadarComparison";
import ExecutiveSummary from "@/components/charts/ExecutiveSummary";
import { generatePDF } from "@/lib/pdf";
import AttackSimulation from "@/components/evaluation/AttackSimulation";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/dashboard/HeroSection";
import { usePromptAudit } from "@/hooks/usePromptAudit";

export default function DashboardPage() {
const {
  prompt,
  setPrompt,
  loading,
  result,
  improvedPrompt,
  improvedResult,
  attackResult,
  attackLoading,
  improvedLoading,
  evaluatePrompt,
  improvePrompt,
  evaluateImprovedPrompt,
  runAttackSimulation,
  resetAudit,
} = usePromptAudit();
  return (
     <>
    <Header />
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl p-8">
       
<div className="sticky top-20 z-40 mb-8">
  {(result || improvedResult) && (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/95 px-6 py-4 shadow-xl backdrop-blur">
      <div>
        <h2 className="text-lg font-bold">PromptAudit AI</h2>

        <p className="text-sm text-zinc-400">
          {loading
            ? "Running AI analysis..."
            : improvedLoading
            ? "Evaluating improved prompt..."
            : attackLoading
            ? "Running attack simulation..."
            : result && improvedResult
            ? "Audit Complete"
            : result
            ? "Prompt Evaluated"
            : "Ready"}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {result && improvedResult && (
          <button
            onClick={() =>
              generatePDF(result, improvedResult, improvedPrompt)
            }
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold hover:bg-indigo-500"
          >
            <FileDown size={18} />
            PDF
          </button>
        )}

        {improvedPrompt && (
          <button
            onClick={() =>
              navigator.clipboard.writeText(improvedPrompt)
            }
            className="flex items-center gap-2 rounded-xl bg-zinc-800 px-5 py-3 hover:bg-zinc-700"
          >
            <Copy size={18} />
            Copy
          </button>
        )}

        <button
          onClick={resetAudit}
          className="flex items-center gap-2 rounded-xl bg-zinc-800 px-5 py-3 hover:bg-zinc-700"
        >
          <RotateCcw size={18} />
          New Audit
        </button>
      </div>
    </div>
  )}
</div>
    
  <HeroSection>
  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur">
    <textarea
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder="Paste your production system prompt here..."
      className="h-72 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-5 font-mono text-sm outline-none transition focus:border-indigo-500"
    />

    <div className="mt-5 flex items-center justify-between">
      <button
        onClick={() => navigator.clipboard.writeText(prompt)}
        className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 hover:bg-zinc-700"
      >
        <Copy size={16} />
        Copy Prompt
      </button>

      <button
        onClick={evaluatePrompt}
        disabled={loading}
        className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500 disabled:opacity-50"
      >
        {loading ? "Analyzing Prompt..." : "🚀 Analyze Prompt"}
      </button>
    </div>
  </div>
</HeroSection>
        {result && (
          <>
         <div id="overview">
  <ScoreCards
    overallScore={result.overallScore}
    safety={result.safety}
    clarity={result.clarity}
    robustness={result.robustness}
  />

  <EvaluationCard result={result} />
</div>

<div id="security">
  {result?.security && (
    <SecurityCard security={result.security} />
  )}
</div>

            <button
              onClick={improvePrompt}
              className="mt-6 rounded-lg bg-green-600 px-5 py-3 font-semibold hover:bg-green-500"
            >
              ✨ Improve Prompt
            </button>

            {improvedPrompt && (
              <>
                <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                      ✨ Improved Prompt
                    </h2>

                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(improvedPrompt)
                      }
                      className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 hover:bg-zinc-700"
                    >
                      <Copy size={16} />
                      Copy
                    </button>
                  </div>

                  <pre className="mt-5 whitespace-pre-wrap text-zinc-300">
                    {improvedPrompt}
                  </pre>
                </div>

               <button
  onClick={evaluateImprovedPrompt}
 disabled={improvedLoading}
  className="mt-6 rounded-lg bg-green-600 px-5 py-3 font-semibold hover:bg-green-500 disabled:opacity-50"
>
  {improvedLoading
    ? "Evaluating Improved Prompt..."
    : "Evaluate Improved Prompt"}
</button>
              </>
            )}

            {improvedResult && (
              <>
              <ExecutiveSummary
  original={result}
  improved={improvedResult}
/>
                <EvaluationCard result={improvedResult} />

               {improvedResult?.security && (
  <SecurityCard security={improvedResult.security} />
)}

                <div id="comparison">
  <ComparisonCard
    original={result}
    improved={improvedResult}
  />

  <RadarComparison
    original={result}
    improved={improvedResult}
  />
</div>
<div className="mt-8">
  <button
    onClick={runAttackSimulation}
    disabled={attackLoading}
    className="rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-500 disabled:opacity-50"
  >
    {attackLoading
      ? "Running Security Tests..."
      : "🛡 Run Attack Simulation"}
  </button>
</div>

{attackResult && (
  <div id="attacks">
  <AttackSimulation result={attackResult} />
</div>
)}

              </>
            )}
          </>
        )}
      </div>
       </main>
  </>
);
}