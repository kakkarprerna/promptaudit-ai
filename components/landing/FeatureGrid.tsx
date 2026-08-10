import FeatureCard from "@/components/landing/FeatureCard";

const features = [
  {
    title: "AI Prompt Evaluation",
    description:
      "Evaluate system prompts across safety, clarity, robustness, and overall quality.",
  },
  {
    title: "Security Audit",
    description:
      "Identify prompt injection, hallucination, instruction conflict, and data leakage risks.",
  },
  {
    title: "Prompt Improvement",
    description:
      "Generate a stronger version of your prompt with improved guardrails and instruction quality.",
  },
  {
    title: "Performance Comparison",
    description:
      "Compare the original and improved prompts across the same evaluation dimensions.",
  },
  {
    title: "Attack Simulation",
    description:
      "Test prompts against adversarial scenarios to identify weaknesses before deployment.",
  },
  {
    title: "Production Readiness",
    description:
      "Use evaluation results and security findings to make better deployment decisions.",
  },
];

export default function FeatureGrid() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-indigo-400">
          Built for production prompts
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Everything you need to audit an AI prompt
        </h2>

        <p className="mt-4 text-zinc-400">
          Evaluate quality, identify security risks, improve your prompt, and
          compare the results before putting it into production.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
