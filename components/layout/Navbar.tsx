"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center gap-3 text-left"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
            P
          </div>

          <div>
            <h1 className="text-lg font-semibold text-white">
              PromptAudit AI
            </h1>

            <p className="text-xs text-zinc-400">
              Production Prompt Evaluation
            </p>
          </div>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Features
          </a>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}