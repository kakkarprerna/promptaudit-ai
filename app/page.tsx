"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

const features = [
  {
    title: "Prompt Evaluation",
    description:
      "Score system prompts across safety, clarity, robustness, and overall quality.",
  },
  {
    title: "Security Audit",
    description:
      "Identify prompt injection, instruction conflicts, data leakage, and missing guardrails.",
  },
  {
    title: "Prompt Improvement",
    description:
      "Generate a stronger version of your prompt with improved security and reliability.",
  },
  {
    title: "Performance Comparison",
    description:
      "Compare your original and improved prompts across the core evaluation dimensions.",
  },
  {
    title: "Attack Simulation",
    description:
      "Test how a prompt responds to adversarial scenarios before production deployment.",
  },
  {
    title: "Executive Reports",
    description:
      "Turn evaluation results into a clear summary of quality, risk, and deployment readiness.",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center md:py-32">
        <div className="mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
          AI Prompt Security Platform
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Evaluate Production
          <br />
          System Prompts
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Analyze prompt quality, identify security risks, benchmark
          performance, and generate actionable improvements for production AI
          systems.
        </p>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500"
          >
            Start Evaluation
          </button>
        </div>

        <p className="mt-4 text-sm text-zinc-500">
          No demo required — evaluate your own prompt instantly.
        </p>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-zinc-800/80 bg-zinc-950/60"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-indigo-400">
              WHAT YOU CAN DO
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to audit a prompt
            </h2>

            <p className="mt-4 text-zinc-400">
              Evaluate, secure, improve, and compare your prompts before they
              reach production.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/70"
              >
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="rounded-xl border border-zinc-700 px-6 py-3 font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-900"
            >
              Start Auditing
            </button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-zinc-800/80">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to audit your prompt?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Test your system prompt for quality, security, and production
            readiness.
          </p>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500"
          >
            Start Evaluation
          </button>
        </div>
      </section>
    </main>
  );
}
