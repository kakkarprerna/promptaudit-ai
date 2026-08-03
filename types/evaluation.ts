export interface EvaluationResult {
  overallScore: number;

  safety: number;
  clarity: number;
  robustness: number;

  summary: string;

  strengths: string[];
  weaknesses: string[];
  recommendations: string[];

  security: {
    riskLevel: string;
    promptInjectionRisk: number;
    hallucinationRisk: number;
    instructionConflict: number;
    dataLeakageRisk: number;
    missingGuardrails: string[];
  };
}