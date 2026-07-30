"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <div className="mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
          🚀 AI Prompt Evaluation Platform
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Evaluate Production
          <br />
          System Prompts
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Analyze prompt quality, identify risks, benchmark performance,
          and generate actionable improvements for production AI systems.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium transition hover:bg-indigo-500"
          >
            Start Evaluation
          </button>

          <button className="rounded-xl border border-zinc-700 px-6 py-3 hover:bg-zinc-900">
            View Demo
          </button>
        </div>
      </section>
    </main>
  );
}