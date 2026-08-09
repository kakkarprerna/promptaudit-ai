import { NextResponse } from "next/server";
import { getDemoImprovedPrompt } from "@/lib/demoData";

export async function POST(request: Request) {
  const { prompt } = await request.json();
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
  return NextResponse.json(
    {
      improvedPrompt: getDemoImprovedPrompt(prompt),
    },
    { status: 200 }
  );
}

  return NextResponse.json({
    improvedPrompt: `You are an expert AI assistant.

Your task is:

${prompt}

Requirements:
- Be accurate
- Think step by step
- If information is missing, ask clarifying questions.
- Format the answer clearly using headings and bullet points where appropriate.`,
  });
}