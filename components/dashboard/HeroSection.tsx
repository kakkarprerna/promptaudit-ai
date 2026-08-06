"use client";

import { ReactNode } from "react";

interface HeroSectionProps {
  children: ReactNode;
}

export default function HeroSection({
  children,
}: HeroSectionProps) {
  return (
    <section className="mb-12 overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-indigo-950 shadow-2xl">
      {/* Decorative background */}
      <div className="absolute pointer-events-none" />

      <div className="relative mx-auto max-w-5xl p-8">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300">
            AI Prompt Security Platform
          </div>
        </div>

        {/* Heading */}
        <div className="mt-6 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            PromptAudit AI
          </h1>

          <p className="mt-5 text-xl text-zinc-300">
            Evaluate • Improve • Attack-Test Production Prompts
          </p>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
            Enterprise-grade prompt auditing for LLM applications.
            Analyze prompt quality, detect security risks, improve robustness,
            simulate prompt injections, compare versions, and export
            executive-ready PDF reports.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300">
            🔒 Security Audit
          </span>

          <span className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-300">
            ✨ Prompt Improvement
          </span>

          <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-300">
            📊 AI Evaluation
          </span>

          <span className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300">
            🛡 Attack Simulation
          </span>

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
            📄 Executive PDF Reports
          </span>
        </div>

        {/* Prompt Input Area */}
        <div className="mt-10">
          {children}
        </div>
      </div>
    </section>
  );
}