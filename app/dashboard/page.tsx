"use client";

import { Copy } from "lucide-react";
import { useState } from "react";
import EvaluationCard from "@/components/evaluation/EvaluationCard";
import ComparisonCard from "@/components/evaluation/ComparisonCard";
import SecurityCard from "@/components/evaluation/SecurityCard";
import { EvaluationResult } from "@/types/evaluation";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
const [loading, setLoading] = useState(false);
const [result, setResult] = useState<EvaluationResult | null>(null);
const [improvedPrompt, setImprovedPrompt] = useState("");
const [improvedResult, setImprovedResult] = useState<EvaluationResult | null>(null);
  
async function evaluatePrompt() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const error = await response.text();
        alert(error);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while evaluating the prompt.");
    }

    setLoading(false);
  }

  async function improvePrompt() {
    try {
      const response = await fetch("/api/improve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const error = await response.text();
        alert(error);
        return;
      }

      const data = await response.json();
      setImprovedPrompt(data.improvedPrompt);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while improving the prompt.");
    }
  }

  async function evaluateImprovedPrompt() {
    if (!improvedPrompt.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: improvedPrompt,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        alert(error);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setImprovedResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to evaluate improved prompt.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl p-8">
        <h1 className="text-4xl font-bold">
          Prompt Evaluation Dashboard
        </h1>

        <p className="mt-2 text-zinc-400">
          Paste a production system prompt for evaluation.
        </p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Paste your system prompt..."
          className="mt-8 h-72 w-full rounded-xl border border-zinc-800 bg-zinc-900 p-5"
        />

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => navigator.clipboard.writeText(prompt)}
            className="rounded-lg bg-zinc-800 px-4 py-2 hover:bg-zinc-700"
          >
            <div className="flex items-center gap-2">
              <Copy size={16} />
              Copy Prompt
            </div>
          </button>
        </div>

        <button
          onClick={evaluatePrompt}
          disabled={loading}
          className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? "Evaluating Prompt..." : "Evaluate Prompt"}
        </button>

        {result && (
          <>
            <EvaluationCard result={result} />

            {result?.security && (
  <SecurityCard security={result.security} />
)}

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
                  className="mt-6 rounded-lg bg-green-600 px-5 py-3 font-semibold hover:bg-green-500"
                >
                  Evaluate Improved Prompt
                </button>
              </>
            )}

            {improvedResult && (
              <>
                <EvaluationCard result={improvedResult} />

               {improvedResult?.security && (
  <SecurityCard security={improvedResult.security} />
)}

                <ComparisonCard
                  original={result}
                  improved={improvedResult}
                />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}