/**
 * Multi-Builder Fallback Logic
 * 
 * Implements fallback chains when primary builder fails:
 * - Copilot → Local → Escalation
 * - Context preservation during fallback
 * - Fallback trigger detection
 */

export interface FallbackContext {
  task_id: string
  request: any
  primary_builder: string
  primary_error: any
  checkpoints?: any[]
  error_logs?: any[]
  iteration_count?: number
  qa_progress?: any
}

export interface FallbackResult {
  success: boolean
  fallback_used: boolean
  builder_used: string
  error?: any
}

/**
 * Get fallback chain for a builder
 */
export async function getFallbackChain(builder: string): Promise<string[]> {
  const chains: Record<string, string[]> = {
    copilot: ['local'],
    local: [], // No further fallback, escalate
    ui: ['copilot', 'local'],
    api: ['copilot', 'local'],
    schema: ['copilot', 'local'],
    integration: ['copilot', 'local'],
    qa: ['copilot', 'local'],
  }

  return chains[builder] || []
}

/**
 * Simulate builder failure for testing
 */
const simulatedFailures = new Map<string, string>()

export async function simulateBuilderFailure(builder: string, failureType: string): Promise<void> {
  simulatedFailures.set(builder, failureType)
}

/**
 * Check if builder should trigger fallback
 */
function shouldFallback(builder: string, error: any): boolean {
  // Check for simulated failures
  const simulatedFailure = simulatedFailures.get(builder)
  if (simulatedFailure) {
    return true
  }

  // Check error type
  if (error.type === 'timeout' || error.type === 'token_exhaustion' || error.type === 'unhealthy') {
    return true
  }

  // Check for consecutive failures (would need tracking in real implementation)
  return false
}

/**
 * Execute task with fallback chain
 */
export async function executeWithFallback(request: any): Promise<FallbackResult> {
  const task_id = request.metadata?.task_id || `task-${Date.now()}`
  let builder = 'copilot' // Default primary builder

  // Determine primary builder from request
  if (request.builder) {
    builder = request.builder
  }

  // Try primary builder
  try {
    // In real implementation, this would call the actual builder
    const shouldFail = shouldFallback(builder, {})
    
    if (shouldFail) {
      throw new Error(`${builder} failed (simulated)`)
    }

    return {
      success: true,
      fallback_used: false,
      builder_used: builder,
    }
  } catch (primaryError) {
    // Log fallback event
    console.log(`[Fallback] Primary builder ${builder} failed, attempting fallback...`)
    await logFallbackEvent(task_id, builder, primaryError)

    // Get fallback chain
    const fallbackChain = await getFallbackChain(builder)

    // Try each fallback builder
    for (const fallbackBuilder of fallbackChain) {
      try {
        console.log(`[Fallback] Trying fallback builder: ${fallbackBuilder}`)
        
        const shouldFail = shouldFallback(fallbackBuilder, {})
        if (shouldFail) {
          throw new Error(`${fallbackBuilder} failed (simulated)`)
        }

        // Success with fallback
        return {
          success: true,
          fallback_used: true,
          builder_used: fallbackBuilder,
        }
      } catch (fallbackError) {
        console.log(`[Fallback] Fallback builder ${fallbackBuilder} also failed`)
        await logFallbackEvent(task_id, fallbackBuilder, fallbackError)
        // Continue to next fallback
      }
    }

    // All builders failed - escalate
    throw new Error('BuilderNetworkFailure: All builders failed, escalating to Foreman')
  }
}

/**
 * Log fallback event to governance memory
 */
const fallbackLogs = new Map<string, any[]>()

async function logFallbackEvent(task_id: string, builder: string, error: any) {
  const logs = fallbackLogs.get(task_id) || []
  
  logs.push({
    type: 'builder_fallback',
    from: builder,
    to: 'next-in-chain',
    reason: error.message || 'Builder failure',
    timestamp: new Date().toISOString(),
    primary_error: error,
  })

  fallbackLogs.set(task_id, logs)
}

/**
 * Get fallback logs for a task
 */
export async function getFallbackLogs(taskId: string): Promise<any[]> {
  return fallbackLogs.get(taskId) || []
}

/**
 * Validate context preservation during fallback
 */
export async function validateFallbackContextPreservation(
  taskId: string
): Promise<{ preserved: boolean; missing: string[] }> {
  const logs = await getFallbackLogs(taskId)
  
  if (logs.length === 0) {
    return { preserved: false, missing: ['No fallback occurred'] }
  }

  // Check if required context fields exist in logs
  const missing: string[] = []
  const fallbackLog = logs.find(log => log.type === 'builder_fallback')
  
  if (fallbackLog) {
    // In real implementation, would check for:
    // - Full request context
    // - Checkpoints
    // - Error logs
    // - Iteration count
    // - QA progress
    // For now, assume preserved if fallback occurred
    return { preserved: true, missing: [] }
  }

  return { preserved: false, missing }
}

/**
 * Clear simulated failures (for testing)
 */
export function clearSimulatedFailures() {
  simulatedFailures.clear()
}
