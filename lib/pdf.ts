import jsPDF from "jspdf";
import { EvaluationResult } from "@/types/evaluation";

export function generatePDF(
  original: EvaluationResult,
  improved: EvaluationResult
) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(22);
  doc.text("PromptAudit AI Report", 20, y);

  y += 15;

  doc.setFontSize(14);
  doc.text(`Original Score: ${original.overallScore}`, 20, y);

  y += 10;
  doc.text(`Improved Score: ${improved.overallScore}`, 20, y);

  y += 10;
  doc.text(
    `Improvement: ${improved.overallScore - original.overallScore}`,
    20,
    y
  );

  y += 20;

  doc.setFontSize(18);
  doc.text("Security Audit", 20, y);

  y += 12;

  doc.setFontSize(12);
  doc.text(`Risk Level: ${improved.security.riskLevel}`, 20, y);

  y += 10;
  doc.text(
    `Prompt Injection Risk: ${improved.security.promptInjectionRisk}`,
    20,
    y
  );

  y += 10;
  doc.text(
    `Hallucination Risk: ${improved.security.hallucinationRisk}`,
    20,
    y
  );

  y += 10;
  doc.text(
    `Instruction Conflict: ${improved.security.instructionConflict}`,
    20,
    y
  );

  y += 10;
  doc.text(
    `Data Leakage Risk: ${improved.security.dataLeakageRisk}`,
    20,
    y
  );

  y += 20;

  doc.setFontSize(18);
  doc.text("Recommendations", 20, y);

  y += 10;

  doc.setFontSize(12);

  improved.recommendations.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  doc.save("PromptAudit-Report.pdf");
}