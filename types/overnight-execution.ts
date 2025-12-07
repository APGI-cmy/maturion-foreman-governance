/**
 * Overnight Execution Types
 * 
 * Defines types for the overnight execution cycle that processes all open issues.
 */

export interface OvernightExecutionConfig {
  enabled: boolean;
  scheduleExpression: string; // cron expression
  maxIssuesPerRun: number;
  sequenceOrder: IssueSequenceType[];
  enableModelEscalation: boolean;
  enableAutoHeal: boolean;
  enableDesktopSync: boolean;
  createPRsAutomatically: boolean;
}

export type IssueSequenceType = 
  | 'architecture'
  | 'memory'
  | 'governance'
  | 'qa'
  | 'build'
  | 'deployment'
  | 'self_evolution';

export interface IssueWithDependencies {
  issueNumber: number;
  title: string;
  body: string;
  labels: string[];
  sequenceType: IssueSequenceType;
  dependencies: number[]; // issue numbers this depends on
  estimatedComplexity: 'low' | 'medium' | 'high';
  requiresEscalation: boolean;
}

export interface OvernightExecutionRun {
  id: string;
  startTime: string;
  endTime?: string;
  status: 'running' | 'completed' | 'failed' | 'partial';
  totalIssues: number;
  processedIssues: number;
  successfulIssues: number;
  failedIssues: number;
  skippedIssues: number;
  issueResults: IssueExecutionResult[];
  errors: string[];
}

export interface IssueExecutionResult {
  issueNumber: number;
  title: string;
  sequenceType: IssueSequenceType;
  status: 'success' | 'failed' | 'skipped';
  buildId?: string;
  sequenceId?: string;
  prUrl?: string;
  qaResults?: QAValidationSummary;
  governanceResults?: GovernanceValidationSummary;
  modelEscalations?: number;
  executionTime: number; // milliseconds
  errorMessage?: string;
}

export interface QAValidationSummary {
  passed: boolean;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  qicPassed: boolean;
  qielPassed: boolean;
  cdwPassed: boolean;
  memoryFabricPassed: boolean;
  driftCheckPassed: boolean;
  governanceCheckPassed: boolean;
}

export interface GovernanceValidationSummary {
  passed: boolean;
  violations: GovernanceViolation[];
  escalationsLogged: number;
  driftIntroduced: boolean;
  conflictingInstructions: boolean;
}

export interface GovernanceViolation {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  file?: string;
  line?: number;
}

export interface DependencyChain {
  issueNumber: number;
  dependsOn: number[];
  blocks: number[];
  depth: number;
  canExecuteNow: boolean;
}
