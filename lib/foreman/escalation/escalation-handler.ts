/**
 * Builder Escalation Handler - Phase 3 v1.1
 */

import { BuilderEscalation } from '@/types/builder-protocol-v1.1'
import { logGovernanceEvent } from '../memory/governance-memory'

export async function escalateToForeman(escalation: BuilderEscalation): Promise<void> {
  console.log('[Escalation] Escalating to Foreman:', escalation.issue)
  
  await logGovernanceEvent({
    type: 'builder_escalation',
    level: 'warning',
    message: `Builder ${escalation.builder} escalating: ${escalation.issue}`,
    context: {
      escalation_type: escalation.escalation_type,
      task_id: escalation.task_id,
      details: escalation.details,
      suggested_resolution: escalation.suggested_resolution
    },
    timestamp: escalation.timestamp
  })
}

export function createEscalation(
  type: 'non_recoverable_error' | 'architectural_ambiguity' | 'constitutional_uncertainty',
  builder: string,
  taskId: string,
  issue: string,
  errorMessage: string,
  attemptedFixes: string[],
  archRef: string,
  qaRef: string,
  qaStatus: { total: number; passing: number; failing: number },
  suggestedResolution: string
): BuilderEscalation {
  return {
    escalation_type: type,
    builder,
    task_id: taskId,
    issue,
    details: {
      error_message: errorMessage,
      attempted_fixes: attemptedFixes,
      architecture_reference: archRef,
      qa_suite_reference: qaRef,
      current_qa_status: qaStatus
    },
    suggested_resolution: suggestedResolution,
    timestamp: new Date().toISOString()
  }
}
