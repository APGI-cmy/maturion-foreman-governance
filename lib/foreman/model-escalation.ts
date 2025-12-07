/**
 * Model Escalation Service
 * 
 * Implements unified model selection logic with escalation rules and fallback support.
 * Integrates with Governance Safety Rails (GSR-Model).
 */

import type {
  ModelTier,
  EscalationReason,
  ModelEscalationConfig,
  EscalationEvent,
  EscalationAttempt,
  ModelSelectionContext,
  ModelSelectionResult,
} from '@/types/model-escalation';
import { logGovernanceEvent } from '@/lib/foreman/memory/governance-memory';

const DEFAULT_CONFIG: ModelEscalationConfig = {
  defaultModel: 'gpt-4',
  escalationRules: [
    { reason: 'architecture_impact', targetModel: 'gpt-5.1', requiresJustification: false, bypassQuotaCheck: true },
    { reason: 'governance_task', targetModel: 'gpt-5.1', requiresJustification: false, bypassQuotaCheck: true },
    { reason: 'multi_agent_coordination', targetModel: 'gpt-5.1', requiresJustification: false, bypassQuotaCheck: true },
    { reason: 'project_milestone', targetModel: 'gpt-5.1', requiresJustification: false, bypassQuotaCheck: true },
    { reason: 'heavy_task', targetModel: 'gpt-4-turbo', requiresJustification: true, bypassQuotaCheck: false },
    { reason: 'multi_file_refactor', targetModel: 'gpt-4-turbo', requiresJustification: true, bypassQuotaCheck: false },
    { reason: 'complex_reasoning', targetModel: 'gpt-4-turbo', requiresJustification: true, bypassQuotaCheck: false },
  ],
  fallbackChain: ['gpt-5.1', 'gpt-4-turbo', 'gpt-4', 'local-builder'],
  quotaLimits: {
    dailyEscalations: 50,
    hourlyEscalations: 10,
    maxConcurrentEscalations: 5,
  },
  autoHealEnabled: true,
};

/**
 * In-memory quota tracking (should be persisted to governance memory in production)
 */
class QuotaTracker {
  private escalationsToday: EscalationEvent[] = [];
  private escalationsThisHour: EscalationEvent[] = [];
  private concurrentEscalations = 0;

  addEscalation(event: EscalationEvent): void {
    const now = new Date();
    
    // Clean up old events
    this.escalationsToday = this.escalationsToday.filter(
      e => new Date(e.timestamp) > new Date(now.getTime() - 24 * 60 * 60 * 1000)
    );
    this.escalationsThisHour = this.escalationsThisHour.filter(
      e => new Date(e.timestamp) > new Date(now.getTime() - 60 * 60 * 1000)
    );

    this.escalationsToday.push(event);
    this.escalationsThisHour.push(event);
  }

  getUsage(): { daily: number; hourly: number; concurrent: number } {
    return {
      daily: this.escalationsToday.length,
      hourly: this.escalationsThisHour.length,
      concurrent: this.concurrentEscalations,
    };
  }

  incrementConcurrent(): void {
    this.concurrentEscalations++;
  }

  decrementConcurrent(): void {
    this.concurrentEscalations = Math.max(0, this.concurrentEscalations - 1);
  }

  hasQuotaRemaining(config: ModelEscalationConfig): boolean {
    const usage = this.getUsage();
    return (
      usage.daily < config.quotaLimits.dailyEscalations &&
      usage.hourly < config.quotaLimits.hourlyEscalations &&
      usage.concurrent < config.quotaLimits.maxConcurrentEscalations
    );
  }

  getQuotaRemaining(config: ModelEscalationConfig): number {
    const usage = this.getUsage();
    return Math.min(
      config.quotaLimits.dailyEscalations - usage.daily,
      config.quotaLimits.hourlyEscalations - usage.hourly,
      config.quotaLimits.maxConcurrentEscalations - usage.concurrent
    );
  }
}

const quotaTracker = new QuotaTracker();

/**
 * Select the appropriate model for a task based on context and escalation rules
 */
export function selectModel(
  context: ModelSelectionContext,
  config: ModelEscalationConfig = DEFAULT_CONFIG
): ModelSelectionResult {
  // Determine if escalation is needed
  const escalationReason = determineEscalationReason(context);
  
  if (!escalationReason) {
    // No escalation needed, use default model
    return {
      selectedModel: config.defaultModel,
      escalated: false,
      fallbackChain: config.fallbackChain,
      quotaImpact: 0,
      requiresApproval: false,
    };
  }

  // Find matching escalation rule
  const rule = config.escalationRules.find(r => r.reason === escalationReason);
  
  if (!rule) {
    // No rule found, use default
    return {
      selectedModel: config.defaultModel,
      escalated: false,
      fallbackChain: config.fallbackChain,
      quotaImpact: 0,
      requiresApproval: false,
    };
  }

  // Check quota unless rule bypasses check
  const quotaRemaining = quotaTracker.getQuotaRemaining(config);
  const hasQuota = rule.bypassQuotaCheck || quotaTracker.hasQuotaRemaining(config);

  if (!hasQuota) {
    // Quota exhausted, use fallback
    console.warn(`Model escalation quota exhausted. Falling back to ${config.defaultModel}`);
    return {
      selectedModel: config.defaultModel,
      escalated: false,
      escalationReason,
      fallbackChain: config.fallbackChain,
      quotaImpact: 0,
      requiresApproval: false,
    };
  }

  // Escalation approved
  return {
    selectedModel: rule.targetModel,
    escalated: true,
    escalationReason,
    fallbackChain: getFallbackChain(rule.targetModel, config.fallbackChain),
    quotaImpact: 1,
    requiresApproval: rule.requiresJustification,
  };
}

/**
 * Determine if a task requires model escalation
 */
function determineEscalationReason(context: ModelSelectionContext): EscalationReason | null {
  // Architecture tasks
  if (context.isArchitectureTask) {
    return 'architecture_impact';
  }

  // Governance tasks
  if (context.isGovernanceTask) {
    return 'governance_task';
  }

  // Project milestones
  if (context.isMilestoneNearing) {
    return 'project_milestone';
  }

  // Multi-file refactoring
  if (context.filesAffected >= 10) {
    return 'multi_file_refactor';
  }

  // High complexity tasks
  if (context.complexity === 'high') {
    return 'heavy_task';
  }

  // Complex reasoning tasks
  if (context.taskType === 'reasoning' || context.taskType === 'analysis') {
    return 'complex_reasoning';
  }

  // Multi-agent coordination
  if (context.taskType === 'orchestration' || context.taskType === 'coordination') {
    return 'multi_agent_coordination';
  }

  return null;
}

/**
 * Get fallback chain starting from a specific model
 */
function getFallbackChain(model: ModelTier, fullChain: ModelTier[]): ModelTier[] {
  const index = fullChain.indexOf(model);
  if (index === -1) return fullChain;
  return fullChain.slice(index);
}

/**
 * Execute a task with model escalation and auto-heal on failures
 */
export async function executeWithEscalation<T>(
  context: ModelSelectionContext,
  taskFn: (model: ModelTier) => Promise<T>,
  config: ModelEscalationConfig = DEFAULT_CONFIG
): Promise<{ result: T; event: EscalationEvent }> {
  const selection = selectModel(context, config);
  const attempts: EscalationAttempt[] = [];
  let lastError: Error | null = null;

  quotaTracker.incrementConcurrent();

  try {
    // Try each model in fallback chain
    for (const model of selection.fallbackChain) {
      const attemptNumber = attempts.length + 1;
      const attemptStart = Date.now();

      try {
        console.log(`Attempt ${attemptNumber}: Executing with ${model}`);
        const result = await taskFn(model);

        // Success!
        const event: EscalationEvent = {
          id: `esc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
          taskId: context.taskType,
          fromModel: config.defaultModel,
          toModel: selection.selectedModel,
          reason: selection.escalationReason || 'heavy_task',
          success: true,
          fallbackUsed: model !== selection.selectedModel,
          actualModel: model,
        };

        attempts.push({
          attemptNumber,
          model,
          timestamp: new Date(attemptStart).toISOString(),
          success: true,
        });

        // Log to governance memory
        quotaTracker.addEscalation(event);
        await logGovernanceEvent({
          type: 'model_escalation',
          severity: 'info',
          description: `Model escalation successful: ${config.defaultModel} → ${model}`,
          metadata: { event, attempts },
        });

        return { result, event };
      } catch (error) {
        lastError = error as Error;
        
        attempts.push({
          attemptNumber,
          model,
          timestamp: new Date(attemptStart).toISOString(),
          success: false,
          errorMessage: (error as Error).message,
          retryScheduled: attemptNumber < selection.fallbackChain.length,
        });

        console.warn(`Attempt ${attemptNumber} failed with ${model}: ${(error as Error).message}`);

        if (attemptNumber < selection.fallbackChain.length) {
          // Try next model in fallback chain
          console.log(`Falling back to next model in chain...`);
          continue;
        } else {
          // All models failed
          throw error;
        }
      }
    }

    // Should never reach here, but TypeScript needs it
    throw lastError || new Error('All escalation attempts failed');
  } catch (error) {
    // All attempts failed
    const event: EscalationEvent = {
      id: `esc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      taskId: context.taskType,
      fromModel: config.defaultModel,
      toModel: selection.selectedModel,
      reason: selection.escalationReason || 'heavy_task',
      success: false,
      fallbackUsed: true,
      actualModel: config.defaultModel,
      errorMessage: (error as Error).message,
    };

    await logGovernanceEvent({
      type: 'model_escalation_failed',
      severity: 'high',
      description: `All model escalation attempts failed`,
      metadata: { event, attempts, error: (error as Error).message },
    });

    throw error;
  } finally {
    quotaTracker.decrementConcurrent();
  }
}

/**
 * Get current quota usage
 */
export function getQuotaUsage(): { daily: number; hourly: number; concurrent: number } {
  return quotaTracker.getUsage();
}

/**
 * Check if quota is available
 */
export function hasQuotaAvailable(config: ModelEscalationConfig = DEFAULT_CONFIG): boolean {
  return quotaTracker.hasQuotaRemaining(config);
}

/**
 * Get model escalation configuration
 */
export function getModelEscalationConfig(): ModelEscalationConfig {
  return DEFAULT_CONFIG;
}
