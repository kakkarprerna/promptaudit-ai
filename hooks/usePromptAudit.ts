"use client";

import { useState } from "react";
import { EvaluationResult } from "@/types/evaluation";

export function usePromptAudit() {
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<EvaluationResult | null>(null);

  const [improvedPrompt, setImprovedPrompt] = useState("");

  const [improvedResult, setImprovedResult] =
    useState<EvaluationResult | null>(null);

  const [attackResult, setAttackResult] = useState<any>(null);

  const [attackLoading, setAttackLoading] = useState(false);

  const [improvedLoading, setImprovedLoading] = useState(false);

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
        return;
      }

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while evaluating the prompt.");
    } finally {
      setLoading(false);
    }
  }

  async function improvePrompt() {
    if (!prompt.trim()) return;

    try {
      const response = await fetch("/api/improve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
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

    setImprovedLoading(true);

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
        return;
      }

      const data = await response.json();

      setImprovedResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to evaluate improved prompt.");
    } finally {
      setImprovedLoading(false);
    }
  }

  async function runAttackSimulation() {
    if (!improvedPrompt.trim()) return;

    setAttackLoading(true);

    try {
      const response = await fetch("/api/attack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: improvedPrompt,
        }),
      });

      if (!response.ok) {
        alert("Failed to run attack simulation.");
        return;
      }

      const data = await response.json();

      setAttackResult(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while running the attack simulation.");
    } finally {
      setAttackLoading(false);
    }
  }

  function resetAudit() {
    setPrompt("");
    setResult(null);
    setImprovedPrompt("");
    setImprovedResult(null);
    setAttackResult(null);
  }

  return {
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
  };
}