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
        <div className="absolute left-1/2 top-[-160px] h-[360px] w-[620px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />

        <div className="absolute left-[8%] top-[35%] h-[240px] w-[240px] rounded-full bg-violet-600/10 blur-[100px]" />

        <div className="absolute right-[4%] top-[48%] h-[260px] w-[260px] rounded-full bg-cyan-500/5 blur-[110px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-9 sm:px-7 md:px-10 md:py-11">
        {/* Product identity */}
        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-indigo-400/25 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-indigo-200">
            AI Prompt Security Platform
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            PromptAudit AI
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
            Audit your AI prompts before they reach production.
            Evaluate quality, security, robustness, and production readiness.
          </p>
        </div>

        {/* Capability indicators */}
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          <span className="rounded-full border border-indigo-400/25 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-200">
            Security Audit
          </span>

          <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200">
            Prompt Improvement
          </span>

          <span className="rounded-full border border-amber-400/25 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-200">
            AI Evaluation
          </span>

          <span className="rounded-full border border-red-400/25 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-200">
            Attack Simulation
          </span>

          <span className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-200">
            Executive Reports
          </span>
        </div>

        {/* Prompt workspace */}
        <div className="mt-8">
          {children}
        </div>
      </div>
    </section>
  );
}
