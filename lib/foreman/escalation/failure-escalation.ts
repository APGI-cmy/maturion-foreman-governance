/**
 * Builder Failure Escalation Logic
 * 
 * Detects when builders should escalate to Foreman:
 * - Impossible QA scenarios
 * - Architecture-test contradictions
 * - Multiple retry failures
 * - Architectural ambiguity
 */

export interface EscalationRequest {
  escalation_type: 'non_recoverable_error' | 'architectural_ambiguity' | 'constitutional_uncertainty'
  builder: string
  task_id: string
  issue: string
  details: {
    error_message: string
    attempted_fixes?: string[]
    architecture_reference?: string
    qa_suite_reference?: string
    current_qa_status?: {
      total: number
      passing: number
      failing: number
    }
    [key: string]: any
  }
  suggested_resolution?: string
  timestamp: string
}

export interface EscalationResponse {
  escalated: boolean
  escalationId: string
}

/**
 * Detect when Red QA is impossible to satisfy
 */
export async function detectImpossibleQA(
  qaResult: any,
  attempts: number
): Promise<{ impossible: boolean; reason: string }> {
  // If same test fails 10+ times, likely impossible
  if (attempts >= 10 && qaResult.failing > 0) {
    return {
      impossible: true,
      reason: 'Same test(s) failing after 10 attempts - likely architecture or test issue',
    }
  }

  // Check for contradictory test failures
  if (qaResult.failures && qaResult.failures.length >= 2) {
    // Simple heuristic: look for "visible" vs "NOT visible" type contradictions
    const messages = qaResult.failures.map((f: any) => f.message?.toLowerCase() || '')
    const hasVisible = messages.some((m: string) => m.includes('visible') && !m.includes('not'))
    const hasNotVisible = messages.some((m: string) => m.includes('not') && m.includes('visible'))
    
    if (hasVisible && hasNotVisible) {
      return {
        impossible: true,
        reason: 'Tests contradict each other (visible vs not visible requirements)',
      }
    }
  }

  return {
    impossible: false,
    reason: '',
  }
}

/**
 * Detect when architecture and tests contradict
 */
export async function detectArchitectureTestContradiction(
  architecture: any,
  tests: any
): Promise<{ contradicts: boolean; details: string[] }> {
  const details: string[] = []

  // Check if tests require features not in architecture
  if (Array.isArray(tests)) {
    for (const test of tests) {
      if (test.expects && typeof architecture === 'object') {
        // Simple check: test expects endpoint not in architecture.endpoints
        if (test.expects.includes('endpoint') && architecture.endpoints) {
          const expectedEndpoint = test.expects.match(/\/api\/[^\s]+/)?.[0]
          if (expectedEndpoint && !architecture.endpoints.includes(expectedEndpoint)) {
            details.push(`Test expects ${expectedEndpoint} but not in architecture`)
          }
        }
      }
    }
  }

  // Check visibility contradictions
  if (architecture.visibility && Array.isArray(tests)) {
    for (const test of tests) {
      if (test.assertion) {
        const assertion = test.assertion.toLowerCase()
        if (architecture.visibility === 'always visible' && assertion.includes('not visible')) {
          details.push('Architecture says always visible but test expects not visible')
        }
      }
    }
  }

  return {
    contradicts: details.length > 0,
    details,
  }
}

/**
 * Determine if should escalate after retry failures
 */
export async function shouldEscalateAfterRetries(
  failures: any[]
): Promise<{ shouldEscalate: boolean; reason: string }> {
  if (failures.length >= 10) {
    return {
      shouldEscalate: true,
      reason: '10+ consecutive failures without resolution',
    }
  }

  // Check for no progress in last 5 iterations
  if (failures.length >= 5) {
    const last5 = failures.slice(-5)
    const allSamePassing = last5.every((f: any) => f.passing === last5[0].passing)
    if (allSamePassing) {
      return {
        shouldEscalate: true,
        reason: 'No progress in last 5 iterations',
      }
    }
  }

  // Check for regression
  if (failures.length >= 3) {
    const last = failures[failures.length - 1]
    const prev = failures[failures.length - 2]
    if (last.passing < prev.passing) {
      return {
        shouldEscalate: true,
        reason: 'Regression detected - passing tests decreased',
      }
    }
  }

  return {
    shouldEscalate: false,
    reason: '',
  }
}

/**
 * Detect architectural ambiguity from errors
 */
export async function detectArchitecturalAmbiguity(
  error: any,
  architecture: any
): Promise<{ ambiguous: boolean; missing: string[] }> {
  const missing: string[] = []

  // Check for ambiguity keywords in error
  const ambiguityKeywords = ['cannot determine', 'ambiguous', 'unclear', 'unknown', 'missing specification']
  const errorMessage = error.message?.toLowerCase() || ''
  
  if (ambiguityKeywords.some(keyword => errorMessage.includes(keyword))) {
    missing.push('Error indicates ambiguity or missing specification')
  }

  // Check if architecture is incomplete
  if (typeof architecture === 'object') {
    // Check for missing common fields
    if (architecture.component && !architecture.props) {
      missing.push('Component defined but props not specified')
    }
    if (architecture.fields && !architecture.propTypes && !architecture.fieldTypes) {
      missing.push('Fields defined but types not specified')
    }
  }

  return {
    ambiguous: missing.length > 0,
    missing,
  }
}

/**
 * Escalate to Foreman
 */
export async function escalateToForeman(
  escalation: EscalationRequest
): Promise<EscalationResponse> {
  // Ensure timestamp exists
  if (!escalation.timestamp) {
    escalation.timestamp = new Date().toISOString()
  }

  // Generate escalation ID
  const escalationId = `esc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

  // Log escalation
  console.log(`[Escalation] ${escalationId}:`, JSON.stringify(escalation, null, 2))

  // In real implementation:
  // 1. Write to governance memory
  // 2. Notify Foreman via API/event
  // 3. Create escalation ticket
  // 4. Alert monitoring system

  return {
    escalated: true,
    escalationId,
  }
}
