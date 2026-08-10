# PromptAudit AI

AI-powered prompt evaluation and security analysis for testing, improving, and stress-testing system prompts before they reach production.

**[Live Demo → promptaudit-ai.vercel.app](https://promptaudit-ai.vercel.app)**

## What it does

PromptAudit AI helps evaluate the quality and resilience of AI system prompts through a structured evaluation workflow.

### Prompt Evaluation

Analyze a system prompt across key dimensions:

* **Overall Score** — combined assessment of prompt quality
* **Safety** — identifies potential safety and security weaknesses
* **Clarity** — evaluates how clearly the prompt defines its intended behavior
* **Robustness** — assesses resilience against ambiguous or adversarial inputs
* **Recommendations** — provides actionable improvements

### Prompt Improvement

Generate an improved version of an existing prompt based on the evaluation results, then re-evaluate the updated prompt.

### Attack Simulation

Test prompts against simulated adversarial scenarios to identify potential weaknesses before deployment.

### Prompt Comparison

Compare the original and improved prompts through:

* Executive summary
* Evaluation scores
* Safety assessment
* Radar comparison
* Improvement analysis

### Export

Export evaluation results and comparisons as a PDF for sharing or review.

## How it works

```text
System Prompt
     ↓
Evaluation
     ↓
Security Analysis
     ↓
Improvement
     ↓
Attack Simulation
     ↓
Comparison & Export
```

## Tech Stack

* **Next.js**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **OpenAI API**
* **Lucide React**

## Getting Started

### Prerequisites

* Node.js
* npm
* OpenAI API key

### Installation

Clone the repository:

```bash
git clone https://github.com/kakkarprerna/promptaudit-ai.git
cd promptaudit-ai
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```bash
OPENAI_API_KEY=your_api_key_here
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Project Structure

```text
app/
├── api/
│   ├── attack/
│   ├── evaluate/
│   └── improve/
├── dashboard/
└── evaluate/

components/
├── dashboard/
├── evaluation/
└── ui/

lib/
└── pdf/
```

## Status

PromptAudit AI is an actively developed product prototype focused on making prompt evaluation more systematic, measurable, and practical for production AI systems.

## License

This project is currently intended as a product prototype and portfolio project.
# PromptAudit AI

AI-powered prompt evaluation and security analysis.

**[Live Demo → promptaudit-ai.vercel.app](https://promptaudit-ai.vercel.app)**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

