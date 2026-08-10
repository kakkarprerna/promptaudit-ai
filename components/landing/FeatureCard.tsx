type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 transition hover:border-indigo-500/30 hover:bg-zinc-900/60">
      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        {description}
      </p>
    </div>
  );
}
