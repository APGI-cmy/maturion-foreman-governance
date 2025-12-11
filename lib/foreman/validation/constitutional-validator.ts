/**
 * Constitutional Enforcement Validators
 * 
 * Implements CS1-CS6 enforcement logic for builder compliance
 * - CS1: Governance Supremacy Rule (GSR)
 * - CS2: QA-First Build Philosophy
 * - CS3: Constitutional File Protection
 * - CS4: Autonomous QA Governance
 * - CS5: Secrets Protection
 * - CS6: Audit Trail Integrity
 */

export interface QAResult {
  total: number
  passing: number
  failing: number
  lintErrors?: number
  buildErrors?: number
  warnings?: number
  errors?: number
}

export interface GovernanceDecision {
  buildAllowed: boolean
  reason?: string
}

export interface AuditLogEntry {
  type: string
  builder?: string
  taskId?: string
  timestamp: string
  [key: string]: any
}

/**
 * CS1: Governance Supremacy Rule (GSR)
 * Enforce 100% QA passing requirement - ABSOLUTE, no exceptions
 */
export async function enforceGovernanceSupremacy(
  qaResult: QAResult
): Promise<GovernanceDecision> {
  // Check for any failing tests
  if (qaResult.failing > 0) {
    return {
      buildAllowed: false,
      reason: `QA has ${qaResult.failing} failing test(s). 100% passing required. ${qaResult.passing}/${qaResult.total} = TOTAL FAILURE`,
    }
  }

  // Check for lint errors
  if (qaResult.lintErrors && qaResult.lintErrors > 0) {
    return {
      buildAllowed: false,
      reason: `Lint errors exist: ${qaResult.lintErrors} error(s). Zero errors required.`,
    }
  }

  // Check for build errors
  if (qaResult.buildErrors && qaResult.buildErrors > 0) {
    return {
      buildAllowed: false,
      reason: `Build errors exist: ${qaResult.buildErrors} error(s). Zero errors required.`,
    }
  }

  // Check for QA errors
  if (qaResult.errors && qaResult.errors > 0) {
    return {
      buildAllowed: false,
      reason: `QA has ${qaResult.errors} error(s). Zero errors required.`,
    }
  }

  // Verify 100% passing
  if (qaResult.passing !== qaResult.total) {
    return {
      buildAllowed: false,
      reason: `QA is not 100% passing: ${qaResult.passing}/${qaResult.total}. 100% required.`,
    }
  }

  // All checks passed - 100% QA green
  return {
    buildAllowed: true,
  }
}

/**
 * CS5: Secrets Protection
 * Detect hardcoded secrets in code
 */
export async function checkSecretsInCode(
  code: string
): Promise<{ hasSecrets: boolean; secrets: string[] }> {
  const secrets: string[] = []

  // Pattern for OpenAI API keys
  const openAIKeyPattern = /sk-proj-[A-Za-z0-9_-]{48,}/g
  const openAIMatches = code.match(openAIKeyPattern)
  if (openAIMatches) {
    secrets.push(...openAIMatches.map((m) => `OpenAI API Key: ${m.substring(0, 20)}...`))
  }

  // Pattern for GitHub tokens
  const githubTokenPattern = /ghp_[A-Za-z0-9]{36,}/g
  const githubMatches = code.match(githubTokenPattern)
  if (githubMatches) {
    secrets.push(...githubMatches.map((m) => `GitHub Token: ${m.substring(0, 15)}...`))
  }

  // Pattern for AWS credentials
  const awsAccessKeyPattern = /AKIA[0-9A-Z]{16}/g
  const awsAccessKeyMatches = code.match(awsAccessKeyPattern)
  if (awsAccessKeyMatches) {
    secrets.push(...awsAccessKeyMatches.map((m) => `AWS Access Key: ${m}`))
  }

  const awsSecretPattern = /(?:aws_secret_access_key\s*=\s*['"][A-Za-z0-9/+=]{40,}['"])/gi
  const awsSecretMatches = code.match(awsSecretPattern)
  if (awsSecretMatches) {
    secrets.push(...awsSecretMatches.map(() => 'AWS Secret Access Key (redacted)'))
  }

  // Pattern for generic API keys in assignments
  const genericApiKeyPattern = /(?:api[_-]?key|apikey|api[_-]?secret)\s*[:=]\s*['"]([^'"]{20,})['"]/gi
  const genericMatches = [...code.matchAll(genericApiKeyPattern)]
  for (const match of genericMatches) {
    // Skip if it's in a comment
    const lineStart = code.lastIndexOf('\n', match.index || 0)
    const line = code.substring(lineStart, match.index)
    if (line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('/*')) {
      continue
    }
    // Skip if the value references process.env
    if (match[1].includes('process.env') || match[0].includes('process.env')) {
      continue
    }
    secrets.push(`API Key/Secret: ${match[1].substring(0, 10)}...`)
  }

  // Exclude environment variable usage (these are OK)
  // Already handled by negative lookahead in regex

  return {
    hasSecrets: secrets.length > 0,
    secrets,
  }
}

/**
 * CS6: Audit Trail Integrity
 * Generate audit log entry
 */
export async function generateAuditLog(
  event: AuditLogEntry
): Promise<{ logged: boolean; logId: string }> {
  // Add timestamp if not present
  if (!event.timestamp) {
    event.timestamp = new Date().toISOString()
  }

  // Generate log ID
  const logId = `log-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

  // In real implementation, this would:
  // 1. Write to governance memory
  // 2. Store in audit database
  // 3. Emit to monitoring system

  // For now, just log to console
  console.log(`[AuditLog] ${logId}:`, JSON.stringify(event, null, 2))

  return {
    logged: true,
    logId,
  }
}
