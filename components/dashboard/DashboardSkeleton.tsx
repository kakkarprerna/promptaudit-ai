export default function DashboardSkeleton() {
  return (
    <div className="mt-10 animate-pulse space-y-8">

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 rounded-3xl border border-zinc-800 bg-zinc-900"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">

        <div className="space-y-6">

          <div className="h-96 rounded-3xl border border-zinc-800 bg-zinc-900" />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-72 rounded-3xl border border-zinc-800 bg-zinc-900" />
            <div className="h-72 rounded-3xl border border-zinc-800 bg-zinc-900" />
          </div>

        </div>

        <div className="h-[760px] rounded-3xl border border-zinc-800 bg-zinc-900" />

      </div>

    </div>
  );
}