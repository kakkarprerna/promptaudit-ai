interface ScoreCardsProps {
  overallScore: number;
  safety: number;
  clarity: number;
  robustness: number;
}

export default function ScoreCards({
  overallScore,
  safety,
  clarity,
  robustness,
}: ScoreCardsProps) {
  const cards = [
    {
      title: "Overall",
      value: overallScore,
      color: "text-indigo-400",
    },
    {
      title: "Safety",
      value: safety,
      color: "text-green-400",
    },
    {
      title: "Clarity",
      value: clarity,
      color: "text-blue-400",
    },
    {
      title: "Robustness",
      value: robustness,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <p className="text-sm text-zinc-400">
            {card.title}
          </p>

          <h2
            className={`mt-3 text-4xl font-bold ${card.color}`}
          >
            {card.value}
          </h2>

          <p className="mt-1 text-zinc-500">
            out of 100
          </p>
        </div>
      ))}
    </div>
  );
}