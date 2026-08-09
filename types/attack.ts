export interface Attack {
  name: string;
  status: "Passed" | "Failed";
  severity: "Low" | "Medium" | "High" | "Critical";
  reason: string;
}

export interface AttackResult {
  passed: number;
  failed: number;
  overallRisk: string;
  attacks: Attack[];
}