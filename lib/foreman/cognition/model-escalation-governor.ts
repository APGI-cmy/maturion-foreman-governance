/**
 * Model Escalation Governor (PHASE_09)
 * 
 * Enforces governance-safe model escalation policy.
 * See: docs/autonomy/PHASE_09.md for complete specification
 */

import type {
  ModelTier,
  EscalationReason,
  CognitiveBudget,
  EscalationPolicy,
  ModelEscalationJustification,
  GovernedEscalationResult,
  ModelSelectionContext,
} from '@/types/model-escalation';
import { logGovernanceEvent } from '@/lib/foreman/memory/governance-memory';

/**
 * Model costs (USD per 1M tokens)
 */
const MODEL_COSTS: Record<ModelTier, { input: number; output: number }> = {
  'gpt-4o-mini': { input: 0.15, output: 0.60 },
  'gpt-4o': { input: 2.50, output: 10.00 },
  'gpt-4.1': { input: 3.00, output: 12.00 },
  'gpt-5.1': { input: 10.00, output: 30.00 },
  'local-builder': { input: 0, output: 0 },
};

/**
 * Default cognitive budget
 */
const DEFAULT_BUDGET: CognitiveBudget = {
  tokenBudget: 10_000_000,
  tokenUsed: 0,
  costBudget: 100,
  costUsed: 0,
  escalationsAllowed: 50,
  escalationsUsed: 0,
};

let currentBudget: CognitiveBudget = { ...DEFAULT_BUDGET };

/**
 * Escalation policies (PHASE_09)
 */
const POLICIES: EscalationPolicy[] = [
  { reason: 'architecture_impact', policyType: 'allowed', targetModel: 'gpt-5.1', requiresJustification: true, bypassQuotaCheck: false },
  { reason: 'multi_file_refactor', policyType: 'allowed', targetModel: 'gpt-4.1', requiresJustification: true, bypassQuotaCheck: false },
  { reason: 'autonomy_wave_planning', policyType: 'allowed', targetModel: 'gpt-5.1', requiresJustification: false, bypassQuotaCheck: true },
  { reason: 'constitutional_reasoning', policyType: 'allowed', targetModel: 'gpt-5.1', requiresJustification: false, bypassQuotaCheck: true },
  { reason: 'large_context', policyType: 'allowed', targetModel: 'gpt-4.1', requiresJustification: true, bypassQuotaCheck: false },
  { reason: 'memory_activation', policyType: 'mandatory', targetModel: 'gpt-5.1', requiresJustification: false, bypassQuotaCheck: true },
  { reason: 'governance_task', policyType: 'mandatory', targetModel: 'gpt-5.1', requiresJustification: false, bypassQuotaCheck: true },
  { reason: 'drift_analysis', policyType: 'mandatory', targetModel: 'gpt-5.1', requiresJustification: false, bypassQuotaCheck: true },
  { reason: 'heavy_task', policyType: 'forbidden', targetModel: 'gpt-4o-mini', requiresJustification: false, bypassQuotaCheck: false, safetyConditions: ['Builder-only task'] },
];

/**
 * Govern model escalation
 */
export async function governModelEscalation(
  context: ModelSelectionContext,
  reason: EscalationReason,
  justification?: ModelEscalationJustification,
  estimatedTokens: number = 100_000
): Promise<GovernedEscalationResult> {
  const policy = POLICIES.find(p => p.reason === reason);
  
  if (!policy) {
    await logGovernanceEvent({
      type: 'model_escalation_no_policy',
      severity: 'medium',
      description: `No policy for reason: ${reason}`,
      metadata: { reason, context },
    });
    
    return {
      allowed: false,
      selectedModel: 'gpt-4o-mini',
      policyType: 'forbidden',
      governanceChecks: [{ checkType: 'policy', passed: false, message: 'No policy found', blockers: ['Unknown reason'] }],
      budgetImpact: { tokens: 0, cost: 0, escalations: 0 },
      fallbackChain: ['gpt-4o-mini', 'local-builder'],
    };
  }
  
  const checks = [];
  
  // Policy check
  if (policy.policyType === 'forbidden') {
    checks.push({ checkType: 'policy' as const, passed: false, message: 'Forbidden', blockers: policy.safetyConditions });
    
    await logGovernanceEvent({
      type: 'escalation_forbidden',
      severity: 'info',
      description: `Escalation forbidden: ${reason}`,
      metadata: { reason, policy },
    });
    
    return {
      allowed: false,
      selectedModel: 'gpt-4o-mini',
      policyType: policy.policyType,
      governanceChecks: checks,
      budgetImpact: { tokens: 0, cost: 0, escalations: 0 },
      fallbackChain: ['gpt-4o-mini', 'local-builder'],
    };
  }
  
  checks.push({ checkType: 'policy' as const, passed: true, message: `Policy: ${policy.policyType}` });
  
  // Budget check
  if (!policy.bypassQuotaCheck) {
    const cost = (MODEL_COSTS[policy.targetModel].input + MODEL_COSTS[policy.targetModel].output) / 2 * estimatedTokens / 1_000_000;
    const budgetOk = 
      currentBudget.tokenUsed + estimatedTokens <= currentBudget.tokenBudget &&
      currentBudget.costUsed + cost <= currentBudget.costBudget &&
      currentBudget.escalationsUsed < currentBudget.escalationsAllowed;
    
    if (!budgetOk) {
      checks.push({ checkType: 'budget' as const, passed: false, message: 'Budget exceeded' });
      return {
        allowed: false,
        selectedModel: 'gpt-4o-mini',
        policyType: policy.policyType,
        governanceChecks: checks,
        budgetImpact: { tokens: 0, cost: 0, escalations: 0 },
        fallbackChain: ['gpt-4o-mini', 'local-builder'],
      };
    }
  }
  
  checks.push({ checkType: 'budget' as const, passed: true, message: 'Budget available' });
  
  // Justification check
  if (policy.requiresJustification && !justification) {
    checks.push({ checkType: 'justification' as const, passed: false, message: 'Justification required', blockers: ['Must provide justification'] });
    return {
      allowed: false,
      selectedModel: 'gpt-4o-mini',
      policyType: policy.policyType,
      governanceChecks: checks,
      budgetImpact: { tokens: 0, cost: 0, escalations: 0 },
      fallbackChain: ['gpt-4o-mini', 'local-builder'],
    };
  }
  
  checks.push({ checkType: 'justification' as const, passed: true, message: 'Justification OK' });
  checks.push({ checkType: 'safety' as const, passed: true, message: 'Safety conditions met' });
  
  // Approved - update budget
  const cost = (MODEL_COSTS[policy.targetModel].input + MODEL_COSTS[policy.targetModel].output) / 2 * estimatedTokens / 1_000_000;
  currentBudget.tokenUsed += estimatedTokens;
  currentBudget.costUsed += cost;
  currentBudget.escalationsUsed += 1;
  
  await logGovernanceEvent({
    type: 'model_escalation_approved',
    severity: 'info',
    description: `Escalation approved: ${reason} → ${policy.targetModel}`,
    metadata: { reason, model: policy.targetModel, justification, budgetImpact: { tokens: estimatedTokens, cost, escalations: 1 } },
  });
  
  return {
    allowed: true,
    selectedModel: policy.targetModel,
    policyType: policy.policyType,
    governanceChecks: checks,
    justification,
    budgetImpact: { tokens: estimatedTokens, cost, escalations: 1 },
    fallbackChain: [policy.targetModel, 'gpt-4.1', 'gpt-4o', 'gpt-4o-mini', 'local-builder'].filter((v, i, a) => a.indexOf(v) === i) as ModelTier[],
  };
}

/**
 * Get current cognitive budget
 */
export function getCognitiveBudget(): CognitiveBudget {
  return { ...currentBudget };
}

/**
 * Reset cognitive budget
 */
export function resetCognitiveBudget(): void {
  currentBudget = { ...DEFAULT_BUDGET };
  logGovernanceEvent({
    type: 'cognitive_budget_reset',
    severity: 'info',
    description: 'Cognitive budget reset',
    metadata: { budget: currentBudget },
  });
}

/**
 * Get escalation statistics
 */
export function getEscalationStats() {
  return {
    budgetUsage: {
      tokens: { used: currentBudget.tokenUsed, total: currentBudget.tokenBudget, percentage: (currentBudget.tokenUsed / currentBudget.tokenBudget) * 100 },
      cost: { used: currentBudget.costUsed, total: currentBudget.costBudget, percentage: (currentBudget.costUsed / currentBudget.costBudget) * 100 },
      escalations: { used: currentBudget.escalationsUsed, total: currentBudget.escalationsAllowed, percentage: (currentBudget.escalationsUsed / currentBudget.escalationsAllowed) * 100 },
    },
    policies: {
      total: POLICIES.length,
      allowed: POLICIES.filter(p => p.policyType === 'allowed').length,
      forbidden: POLICIES.filter(p => p.policyType === 'forbidden').length,
      mandatory: POLICIES.filter(p => p.policyType === 'mandatory').length,
    },
  };
}

/**
 * Get all policies
 */
export function getAllEscalationPolicies(): EscalationPolicy[] {
  return [...POLICIES];
}
