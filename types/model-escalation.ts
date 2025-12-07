/**
 * Model Escalation Types
 * 
 * Defines types for model escalation, fallback, and high-cost model governance.
 */

export type ModelTier = 'gpt-4' | 'gpt-4-turbo' | 'gpt-5.1' | 'local-builder';

export type EscalationReason = 
  | 'heavy_task'
  | 'architecture_impact'
  | 'multi_file_refactor'
  | 'governance_task'
  | 'complex_reasoning'
  | 'multi_agent_coordination'
  | 'project_milestone';

export interface ModelEscalationConfig {
  defaultModel: ModelTier;
  escalationRules: EscalationRule[];
  fallbackChain: ModelTier[];
  quotaLimits: QuotaLimits;
  autoHealEnabled: boolean;
}

export interface EscalationRule {
  reason: EscalationReason;
  targetModel: ModelTier;
  requiresJustification: boolean;
  bypassQuotaCheck: boolean;
}

export interface QuotaLimits {
  dailyEscalations: number;
  hourlyEscalations: number;
  maxConcurrentEscalations: number;
}

export interface EscalationEvent {
  id: string;
  timestamp: string;
  taskId: string;
  buildId?: string;
  sequenceId?: string;
  fromModel: ModelTier;
  toModel: ModelTier;
  reason: EscalationReason;
  justification?: string;
  success: boolean;
  fallbackUsed: boolean;
  actualModel: ModelTier;
  errorMessage?: string;
}

export interface EscalationAttempt {
  attemptNumber: number;
  model: ModelTier;
  timestamp: string;
  success: boolean;
  errorMessage?: string;
  retryScheduled?: boolean;
}

export interface ModelSelectionContext {
  taskType: string;
  complexity: 'low' | 'medium' | 'high';
  filesAffected: number;
  isArchitectureTask: boolean;
  isGovernanceTask: boolean;
  isMilestoneNearing: boolean;
  existingEscalationsToday: number;
  quotaRemaining: number;
}

export interface ModelSelectionResult {
  selectedModel: ModelTier;
  escalated: boolean;
  escalationReason?: EscalationReason;
  fallbackChain: ModelTier[];
  quotaImpact: number;
  requiresApproval: boolean;
}

export interface DesktopBuilderConfig {
  enabled: boolean;
  localPaths: Record<string, string>;
  healthCheckInterval: number; // in minutes
  syncEnabled: boolean;
  driftDetectionEnabled: boolean;
  autoSwitchOnCopilotFailure: boolean;
}

export interface DriftDetectionResult {
  hasDrift: boolean;
  localCommit?: string;
  remoteCommit?: string;
  divergedFiles: string[];
  conflictResolutionRequired: boolean;
  safeToMerge: boolean;
}

export interface DesktopSyncEvent {
  id: string;
  timestamp: string;
  eventType: 'health_check' | 'drift_detected' | 'sync_started' | 'sync_completed' | 'sync_failed';
  repositoryId: string;
  driftResult?: DriftDetectionResult;
  syncSuccess?: boolean;
  errorMessage?: string;
}
