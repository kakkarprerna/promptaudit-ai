export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
            P
          </div>

          <div>
            <h1 className="text-lg font-semibold">
              PromptAudit AI
            </h1>

            <p className="text-xs text-zinc-400">
              Production Prompt Evaluation
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-zinc-400 hover:text-white">
            Features
          </a>

          <a href="#" className="text-zinc-400 hover:text-white">
            Docs
          </a>

          <button className="rounded-xl bg-indigo-600 px-4 py-2 hover:bg-indigo-500">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}