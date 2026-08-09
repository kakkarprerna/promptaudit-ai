"use client";

import { useState } from "react";
import { toast } from "sonner";

import { EvaluationResult } from "@/types/evaluation";
import { AttackResult } from "@/types/attack";

type ApiError = {
  error?: string;
  code?: string;
};

async function getApiError(response: Response): Promise<ApiError> {
  try {
    return await response.json();
  } catch {
    return {
      error: "The server returned an unexpected response.",
    };
  }
}

export function usePromptAudit() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] =
    useState<EvaluationResult | null>(null);

  const [improvedPrompt, setImprovedPrompt] = useState("");

  const [improvedResult, setImprovedResult] =
    useState<EvaluationResult | null>(null);

  const [attackResult, setAttackResult] =
    useState<AttackResult | null>(null);

  const [attackLoading, setAttackLoading] = useState(false);
  const [improvedLoading, setImprovedLoading] = useState(false);

  const [apiError, setApiError] =
    useState<string | null>(null);

  async function evaluatePrompt() {
    if (!prompt.trim()) {
      toast.warning(
        "Please enter a prompt before running an audit."
      );
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const error = await getApiError(response);

        if (error.code === "INSUFFICIENT_QUOTA") {
          const message =
            "The OpenAI API has no remaining credits. Add API credits and try again.";

          setApiError(message);

          toast.error("AI evaluation unavailable", {
            description:
              "The OpenAI API has no remaining credits.",
          });

          return;
        }

        if (error.code === "RATE_LIMITED") {
          toast.error("Too many requests", {
            description:
              "Please wait a moment and try again.",
          });

          return;
        }

        toast.error("Prompt evaluation failed", {
          description:
            error.error ||
            "Unable to evaluate the prompt.",
        });

        return;
      }

      const data: EvaluationResult =
        await response.json();

      setResult(data);
      setApiError(null);

      toast.success("Prompt audit completed", {
        description:
          `Overall Score: ${data.overallScore}/100`,
      });
    } catch (error) {
      console.error(error);

      toast.error("Unable to evaluate prompt", {
        description:
          "Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function improvePrompt() {
    if (!prompt.trim()) {
      toast.warning(
        "Enter a prompt before generating a revision."
      );
      return;
    }

    setImprovedLoading(true);
    setApiError(null);

    try {
      const response = await fetch("/api/improve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const error = await getApiError(response);

        if (error.code === "INSUFFICIENT_QUOTA") {
          const message =
            "The OpenAI API has no remaining credits. Add API credits and try again.";

          setApiError(message);

          toast.error("AI improvement unavailable", {
            description:
              "The OpenAI API has no remaining credits.",
          });

          return;
        }

        if (error.code === "RATE_LIMITED") {
          toast.error("Too many requests", {
            description:
              "Please wait a moment and try again.",
          });

          return;
        }

        toast.error(
          "Failed to generate secure revision",
          {
            description:
              error.error ||
              "Unable to improve the prompt.",
          }
        );

        return;
      }

      const data = await response.json();

      setImprovedPrompt(data.improvedPrompt);

      toast.success("Secure revision generated", {
        description:
          "The optimized prompt is ready for evaluation.",
      });
    } catch (error) {
      console.error(error);

      toast.error("Unable to improve prompt", {
        description:
          "Please check your connection and try again.",
      });
    } finally {
      setImprovedLoading(false);
    }
  }

  async function evaluateImprovedPrompt() {
    if (!improvedPrompt.trim()) {
      toast.warning(
        "Generate an improved prompt first."
      );
      return;
    }

    setImprovedLoading(true);
    setApiError(null);

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
        const error = await getApiError(response);

        if (error.code === "INSUFFICIENT_QUOTA") {
          const message =
            "The OpenAI API has no remaining credits. Add API credits and try again.";

          setApiError(message);

          toast.error("AI evaluation unavailable", {
            description:
              "The OpenAI API has no remaining credits.",
          });

          return;
        }

        if (error.code === "RATE_LIMITED") {
          toast.error("Too many requests", {
            description:
              "Please wait a moment and try again.",
          });

          return;
        }

        toast.error("Revision evaluation failed", {
          description:
            error.error ||
            "Unable to evaluate the revision.",
        });

        return;
      }

      const data: EvaluationResult =
        await response.json();

      setImprovedResult(data);

      toast.success("Revision evaluated", {
        description:
          `Overall Score: ${data.overallScore}/100`,
      });
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to evaluate revision",
        {
          description:
            "Please check your connection and try again.",
        }
      );
    } finally {
      setImprovedLoading(false);
    }
  }

  async function runAttackSimulation() {
    if (!improvedPrompt.trim()) {
      toast.warning(
        "Evaluate the improved prompt before running Red Team Assessment."
      );
      return;
    }

    setAttackLoading(true);
    setApiError(null);

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
        const error = await getApiError(response);

        if (error.code === "INSUFFICIENT_QUOTA") {
          const message =
            "The OpenAI API has no remaining credits. Add API credits and try again.";

          setApiError(message);

          toast.error(
            "Red Team Assessment unavailable",
            {
              description:
                "The OpenAI API has no remaining credits.",
            }
          );

          return;
        }

        if (error.code === "RATE_LIMITED") {
          const message =
            "Too many requests. Please wait a moment before trying again.";

          setApiError(message);

          toast.error("Too many requests", {
            description:
              "Please wait a moment and try again.",
          });

          return;
        }

        toast.error(
          "Red Team Assessment failed",
          {
            description:
              error.error ||
              "Unable to run the assessment.",
          }
        );

        return;
      }

      const data: AttackResult =
        await response.json();

      setAttackResult(data);

      toast.success(
        "Red Team Assessment complete",
        {
          description:
            "Attack scenarios have been successfully evaluated.",
        }
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to run Red Team Assessment",
        {
          description:
            "Please check your connection and try again.",
        }
      );
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

    setApiError(null);

    setLoading(false);
    setImprovedLoading(false);
    setAttackLoading(false);

    toast.success("Audit workspace reset.");
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

    apiError,

    evaluatePrompt,
    improvePrompt,
    evaluateImprovedPrompt,
    runAttackSimulation,
    resetAudit,
  };
}

export type PromptAuditHook =
  ReturnType<typeof usePromptAudit>;