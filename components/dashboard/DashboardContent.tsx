"use client";

import HeroSection from "@/components/dashboard/HeroSection";
import PromptEditor from "@/components/dashboard/PromptEditor";
import ExecutiveSummarySection from "@/components/dashboard/ExecutiveSummarySection";
import ResultsSection from "@/components/dashboard/ResultsSection";
import ImprovedPromptSection from "@/components/dashboard/ImprovedPromptSection";
import ComparisonSection from "@/components/dashboard/ComparisonSection";
import AttackSection from "@/components/dashboard/AttackSection";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import ApiStatusBanner from "@/components/ui/ApiStatusBanner";
import WorkflowProgress from "@/components/dashboard/WorkflowProgress";
import StickyToolbar from "@/components/dashboard/StickyToolbar";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { usePromptAudit } from "@/hooks/usePromptAudit";

export default function DashboardContent() {
  const audit = usePromptAudit();

  return (
    <main>
     <div className="mx-auto max-w-7xl px-4 pb-32 pt-10 md:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* Prompt workspace */}
          <section>
            <HeroSection>
              <PromptEditor
                prompt={audit.prompt}
                setPrompt={audit.setPrompt}
                loading={audit.loading}
                onAnalyze={audit.evaluatePrompt}
              />
            </HeroSection>
          </section>

          {/* Workflow progress */}
          <WorkflowProgress
            hasPrompt={Boolean(audit.prompt.trim())}
            hasResult={Boolean(audit.result)}
            hasImprovedPrompt={Boolean(audit.improvedPrompt)}
            hasComparison={Boolean(
              audit.result && audit.improvedResult
            )}
            hasAttackResult={Boolean(audit.attackResult)}
          />

          {/* API status */}
          {audit.apiError && (
            <section>
              <ApiStatusBanner
                message={audit.apiError}
                onRetry={audit.evaluatePrompt}
              />
            </section>
          )}

          {/* Results workspace */}
          {audit.loading ? (
            <section>
              <DashboardSkeleton />
            </section>
          ) : (
            <div className="space-y-10">
              <ExecutiveSummarySection result={audit.result} />

              <ResultsSection
                result={audit.result}
                improvePrompt={audit.improvePrompt}
              />

              <ImprovedPromptSection
                improvedPrompt={audit.improvedPrompt}
                improvedLoading={audit.improvedLoading}
                improvedResult={audit.improvedResult}
                onCopy={() =>
                  navigator.clipboard.writeText(
                    audit.improvedPrompt
                  )
                }
                onEvaluate={audit.evaluateImprovedPrompt}
              />

              <ComparisonSection
                original={audit.result}
                improved={audit.improvedResult}
              />

              <AttackSection
                attackResult={audit.attackResult}
                attackLoading={audit.attackLoading}
                onRunAttack={audit.runAttackSimulation}
              />
            </div>
          )}

          {/* Sticky workspace toolbar */}
          <StickyToolbar
            loading={audit.loading}
            improvedLoading={audit.improvedLoading}
            attackLoading={audit.attackLoading}
            result={audit.result}
            improvedResult={audit.improvedResult}
            improvedPrompt={audit.improvedPrompt}
            onReset={audit.resetAudit}
          />
        </motion.div>
      </div>
    </main>
  );
}