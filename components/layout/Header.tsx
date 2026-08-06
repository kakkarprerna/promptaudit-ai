import { ShieldCheck } from "lucide-react";

export default function Header() {
  return (
   <header className="sticky top-0 z-[100] border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600 p-2">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold">
              PromptAudit AI
            </h1>

            <p className="text-xs text-zinc-400">
              AI Prompt Security Platform
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-8 text-sm text-zinc-300">
          <a
            href="#overview"
            className="hover:text-white"
          >
            Overview
          </a>

          <a
            href="#security"
            className="hover:text-white"
          >
            Security
          </a>

          <a
            href="#comparison"
            className="hover:text-white"
          >
            Comparison
          </a>

          <a
            href="#attacks"
            className="hover:text-white"
          >
            Attacks
          </a>
        </nav>
      </div>
    </header>
  );
}