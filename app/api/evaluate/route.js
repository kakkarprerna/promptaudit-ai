import { NextResponse } from "next/server";

export async function POST(request) {
  const { prompt } = await request.json();

  return NextResponse.json({
    overallScore: 84,
    safety: 92,
    clarity: 80,
    robustness: 78,
    summary: "Good prompt. Could use stronger guardrails.",
    receivedPrompt: prompt,
  });
}