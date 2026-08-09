import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getDemoEvaluation } from "@/lib/demoData";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        {
          error: "Please provide a prompt to evaluate.",
        },
        { status: 400 }
      );
    }
if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
  return NextResponse.json(
    getDemoEvaluation(prompt),
    { status: 200 }
  );
}
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
You are a senior AI Security Auditor.

Evaluate the following system prompt for:

1. Overall quality
2. Safety
3. Clarity
4. Robustness
5. Security risks

Return ONLY valid JSON using this exact structure:

{
  "overallScore": number,
  "safety": number,
  "clarity": number,
  "robustness": number,
  "summary": string,
  "strengths": string[],
  "weaknesses": string[],
  "recommendations": string[],
  "security": {
    "riskLevel": "Low" | "Medium" | "High",
    "promptInjectionRisk": number,
    "hallucinationRisk": number,
    "instructionConflict": number,
    "dataLeakageRisk": number,
    "missingGuardrails": string[]
  }
}

All scores must be integers from 0 to 100.

System prompt to evaluate:

${prompt}
      `,
    });

    const output = response.output_text;

    let result;

    try {
      result = JSON.parse(output);
    } catch {
      return NextResponse.json(
        {
          error: "The AI returned an invalid evaluation format. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } 
  catch (error: unknown) {
  console.error("Evaluation API error:", error);

  if (error instanceof OpenAI.APIError) {
    // No API credits remaining
    if (
      error.status === 429 &&
      error.code === "credit_balance_exhausted"
    ) {
      return NextResponse.json(
        {
          error:
            "AI evaluation is temporarily unavailable because the API has no remaining credits.",
          code: "INSUFFICIENT_QUOTA",
        },
        { status: 429 }
      );
    }

    // Other 429 responses
    if (error.status === 429) {
      return NextResponse.json(
        {
          error:
            "AI evaluation is temporarily unavailable. Please try again shortly.",
          code: "RATE_LIMITED",
        },
        { status: 429 }
      );
    }
  }

  return NextResponse.json(
    {
      error: "Something went wrong while evaluating the prompt.",
      code: "EVALUATION_FAILED",
    },
    { status: 500 }
  );
}
}