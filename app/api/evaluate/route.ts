import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  return NextResponse.json({
    overallScore: 84,
    safety: 92,
    clarity: 80,
    robustness: 78,
    summary: "Good prompt. Could use stronger guardrails.",
    strengths: [
      "Clear role definition",
      "Concise instructions",
      "Focused objective",
    ],
    weaknesses: [
      "Missing safety guardrails",
      "No output format specified",
    ],
    recommendations: [
      "Add refusal instructions.",
      "Specify the expected output format.",
      "Handle ambiguous user requests.",
    ],
  });
}