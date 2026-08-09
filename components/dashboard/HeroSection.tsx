"use client";

import { ReactNode } from "react";

interface HeroSectionProps {
  children: ReactNode;
}

export default function HeroSection({
  children,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-800/70 bg-[#08090d] shadow-2xl">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[120px]" />

        <div className="absolute left-[10%] top-[30%] h-[280px] w-[280px] rounded-full bg-violet-600/10 blur-[100px]" />

        <div className="absolute right-[5%] top-[45%] h-[300px] w-[300px] rounded-full bg-cyan-500/5 blur-[110px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200 shadow-sm">
            AI Prompt Security Platform
          </div>
        </div>

        {/* Heading */}
        <div className="mt-7 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl">
            PromptAudit AI
          </h1>

          <p className="mt-5 text-xl font-medium text-zinc-200 md:text-2xl">
            Evaluate · Improve · Attack-Test Production Prompts
          </p>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
            Enterprise-grade prompt auditing for LLM applications. Analyze
            prompt quality, detect security risks, improve robustness,
            simulate prompt injections, compare versions, and export
            executive-ready PDF reports.
          </p>
        </div>

       {/* Feature Pills */}
<div className="mt-10 flex flex-wrap justify-center gap-3">
  <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200">
    Security Audit
  </span>

  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200">
    Prompt Improvement
  </span>

  <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-200">
    AI Evaluation
  </span>

  <span className="rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-200">
    Attack Simulation
  </span>

  <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200">
    Executive PDF Reports
  </span>
</div>
        {/* Prompt Input */}
        <div className="mt-10">
          {children}
        </div>
      </div>
    </section>
  );
}