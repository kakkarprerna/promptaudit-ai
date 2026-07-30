"use client";

import { useState } from "react";
import EvaluationCard from "@/components/evaluation/EvaluationCard";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function evaluatePrompt() {
    if (!prompt.trim()) return;

    setLoading(true);

    const response = await fetch("/api/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    setResult(data);
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

        <button
          onClick={evaluatePrompt}
          disabled={loading}
          className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 hover:bg-indigo-500"
        >
          {loading ? "Evaluating Prompt..." : "Evaluate Prompt"}
        </button>

       {result && <EvaluationCard result={result} />}

      </div>
    </main>
  );
}