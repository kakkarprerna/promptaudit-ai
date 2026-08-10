import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDemoEvaluation } from "@/lib/demoData";

const client = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "Please provide a prompt to evaluate." },
        { status: 400 }
      );
    }

    if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
      return NextResponse.json(getDemoEvaluation(prompt), {
        status: 200,
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "AI service is not configured.",
          code: "MISSING_API_KEY",
        },
        { status: 503 }
      );
    }

    const model = client.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
    });

    const result = await model.generateContent(`
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
`);

    const output = result.response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let evaluation;

    try {
      evaluation = JSON.parse(output);
    } catch {
      return NextResponse.json(
        {
          error:
            "The AI returned an invalid evaluation format. Please try again.",
          code: "INVALID_AI_RESPONSE",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(evaluation, { status: 200 });
  } catch (error) {
    console.error("Evaluation API error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while evaluating the prompt. Please try again.",
        code: "EVALUATION_FAILED",
      },
      { status: 500 }
    );
  }
}
