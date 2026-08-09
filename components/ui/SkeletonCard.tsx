export default function SkeletonCard({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-3xl border border-zinc-800 bg-zinc-900/60 ${className}`}
    />
  );
}