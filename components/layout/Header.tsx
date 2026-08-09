"use client";

import {
  ShieldCheck,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    href: "#overview",
  },
  {
    label: "Security",
    href: "#security",
  },
  {
    label: "Comparison",
    href: "#comparison",
  },
  {
    label: "Attacks",
    href: "#attacks",
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand */}
        <a
          href="#overview"
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 transition-transform group-hover:scale-105">
            <ShieldCheck
              size={21}
              strokeWidth={2.2}
            />
          </div>

          <div className="leading-none">
            <h1 className="text-base font-semibold tracking-tight text-white">
              PromptAudit AI
            </h1>

            <p className="mt-1.5 text-[11px] font-medium tracking-wide text-zinc-500">
              AI Prompt Security Platform
            </p>
          </div>
        </a>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition-all hover:bg-zinc-900 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}