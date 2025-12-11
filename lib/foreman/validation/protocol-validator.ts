/**
 * Builder Protocol v1.1 Validator
 * 
 * Implements validation logic for Build-to-Green protocol enforcement
 * All builders must validate requests using these functions before accepting tasks
 */

export interface BuildToGreenRequest {
  protocol_version?: string
  instruction: string
  architecture: {
    reference: string
    summary?: string
  }
  qa_suite: {
    name: string
    location: string
    current_status: 'RED' | 'GREEN' | 'UNKNOWN'
    total_tests?: number
    passing_tests?: number
    failing_tests: number
  }
  acceptance_criteria?: string
  organisationId: string
  metadata?: {
    task_id?: string
    priority?: 'low' | 'normal' | 'high' | 'critical'
    timeout_seconds?: number
  }
  files?: string[]
  philosophy_context?: {
    principles?: string[]
    constraints?: string[]
  }
}

export interface ValidationResult {
  valid: boolean
  error?: {
    type: string
    message: string
    details: Record<string, any>
    action_required?: string
    philosophy_reference?: string
    workflow_reference?: string
  }
}

export interface ProtectedPathCheck {
  allowed: boolean
  violations: string[]
}

/**
 * Protected paths that builders MUST NOT modify
 * Constitutional requirement (CS3)
 */
const PROTECTED_PATHS = [
  /^\.github\/workflows\//,
  /^\.github\/foreman\/agent-contract\.md$/,
  /^BUILD_PHILOSOPHY\.md$/,
  /^foreman\/constitution\//,
  /^foreman\/architecture-design-checklist\.md$/,
  /^maturion-philosophy-tree\.md$/,
  /philosophy-tree/i, // Any file with "philosophy-tree" in path
]

/**
 * Validate Build-to-Green request structure and requirements
 * This is the primary validation function all builders must call
 */
export async function validateBuildToGreenRequest(
  request: any
): Promise<ValidationResult> {
  // VALIDATION 1: Instruction format must be "Build to Green"
  if (request.instruction !== 'Build to Green') {
    return {
      valid: false,
      error: {
        type: 'BuildPhilosophyViolation',
        message: 'REJECTED: Invalid build instruction',
        details: {
          received: request.instruction,
          required: 'Build to Green',
          reason: 'Builders only accept "Build to Green" instructions',
          philosophy: 'Build Philosophy requires QA-driven building',
        },
        action_required: 'Foreman must provide "Build to Green" instruction with Red QA',
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
        workflow_reference: '/foreman/qa/qa-first-workflow.md',
      },
    }
  }

  // VALIDATION 2: Architecture must exist
  if (!request.architecture) {
    return {
      valid: false,
      error: {
        type: 'BuildPhilosophyViolation',
        message: 'REJECTED: No architecture provided',
        details: {
          reason: 'Builders require architecture specification to build against',
          philosophy: 'Architecture defines what "correct" means',
        },
        action_required: 'Foreman must design architecture before creating build request',
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
      },
    }
  }

  // VALIDATION 3: QA suite must exist
  if (!request.qa_suite) {
    return {
      valid: false,
      error: {
        type: 'BuildPhilosophyViolation',
        message: 'REJECTED: No QA suite provided',
        details: {
          reason: 'Builders require failing QA to know what to build',
          philosophy: 'Red QA is the build specification',
        },
        action_required: 'Foreman must create comprehensive QA suite before building',
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
      },
    }
  }

  // VALIDATION 4: QA status must be RED (failing)
  if (request.qa_suite.current_status !== 'RED') {
    return {
      valid: false,
      error: {
        type: 'BuildPhilosophyViolation',
        message: 'REJECTED: QA must be RED (failing)',
        details: {
          qa_status: request.qa_suite.current_status,
          required: 'RED',
          reason: 'Cannot build to green if QA is already green',
          philosophy: 'Red QA means "architecture exists, implementation missing"',
        },
        action_required:
          request.qa_suite.current_status === 'GREEN'
            ? 'QA is already green. Nothing to build.'
            : 'Foreman must run QA to verify it\'s failing before building',
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
      },
    }
  }

  // VALIDATION 5: Failing tests must exist
  if (request.qa_suite.failing_tests === 0) {
    return {
      valid: false,
      error: {
        type: 'BuildPhilosophyViolation',
        message: 'REJECTED: No failing tests',
        details: {
          reason: 'No failing tests means nothing to build',
          philosophy: 'Failing tests define what needs to be implemented',
        },
        action_required: 'If QA is all passing, feature is already complete. No build needed.',
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
      },
    }
  }

  // VALIDATION 6: Acceptance criteria must be defined
  if (!request.acceptance_criteria) {
    return {
      valid: false,
      error: {
        type: 'BuildPhilosophyViolation',
        message: 'REJECTED: No acceptance criteria provided',
        details: {
          reason: 'Builders require clear definition of "done"',
          philosophy: 'Acceptance criteria defines when building is complete',
        },
        action_required: 'Foreman must specify acceptance criteria (typically: "100% QA passing")',
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
      },
    }
  }

  // VALIDATION 7: Check protected paths if files specified
  if (request.files && request.files.length > 0) {
    const pathCheck = await checkProtectedPathModification(request.files)
    if (!pathCheck.allowed) {
      return {
        valid: false,
        error: {
          type: 'ConstitutionalViolation',
          message: 'REJECTED: Protected path modification requested',
          details: {
            violations: pathCheck.violations,
            reason: 'Builders cannot modify protected constitutional files',
            constitutional_rule: 'CS3: Constitutional File Protection',
          },
          action_required: 'Remove protected paths from task scope',
        },
      }
    }
  }

  // All validations passed
  return { valid: true }
}

/**
 * Check if file paths include protected constitutional paths
 * Returns false if ANY path is protected
 */
export async function checkProtectedPathModification(
  filePaths: string[]
): Promise<ProtectedPathCheck> {
  const violations: string[] = []

  for (const filePath of filePaths) {
    for (const pattern of PROTECTED_PATHS) {
      if (pattern.test(filePath)) {
        violations.push(filePath)
        break
      }
    }
  }

  return {
    allowed: violations.length === 0,
    violations,
  }
}

/**
 * Validate Build Philosophy compliance
 * Checks for broader philosophy violations beyond protocol
 */
export async function validateBuildPhilosophyCompliance(
  request: any
): Promise<{ compliant: boolean; violations: string[] }> {
  const violations: string[] = []

  // Check Build-to-Green requirement
  const validation = await validateBuildToGreenRequest(request)
  if (!validation.valid) {
    violations.push(validation.error?.message || 'Build-to-Green validation failed')
  }

  // Check for protected path modifications
  if (request.files && request.files.length > 0) {
    const pathCheck = await checkProtectedPathModification(request.files)
    if (!pathCheck.allowed) {
      violations.push(`Protected path modification: ${pathCheck.violations.join(', ')}`)
    }
  }

  // Check for direct Philosophy Tree references
  if (request.philosophy_reference && typeof request.philosophy_reference === 'string') {
    if (request.philosophy_reference.includes('philosophy-tree')) {
      violations.push('Direct Philosophy Tree reference not allowed (only Foreman can reference)')
    }
  }

  return {
    compliant: violations.length === 0,
    violations,
  }
}

/**
 * Validate Philosophy Tree references
 * Only Foreman can include Philosophy context
 */
export async function validatePhilosophyTreeReference(
  request: any
): Promise<ValidationResult> {
  // Check for direct Philosophy Tree file references (not allowed)
  if (request.philosophy_reference && typeof request.philosophy_reference === 'string') {
    if (request.philosophy_reference.includes('philosophy-tree')) {
      return {
        valid: false,
        error: {
          type: 'PhilosophyTreeViolation',
          message: 'REJECTED: Direct Philosophy Tree reference',
          details: {
            reason: 'Only Foreman can reference Philosophy Tree',
            received: request.philosophy_reference,
          },
          action_required: 'Remove direct Philosophy Tree reference',
        },
      }
    }
  }

  // Philosophy context from Foreman is allowed
  if (request.philosophy_context) {
    // Validate structure
    if (request.philosophy_context.principles) {
      if (!Array.isArray(request.philosophy_context.principles)) {
        return {
          valid: false,
          error: {
            type: 'ValidationError',
            message: 'Philosophy context principles must be array',
            details: {},
          },
        }
      }
    }
    if (request.philosophy_context.constraints) {
      if (!Array.isArray(request.philosophy_context.constraints)) {
        return {
          valid: false,
          error: {
            type: 'ValidationError',
            message: 'Philosophy context constraints must be array',
            details: {},
          },
        }
      }
    }
  }

  return { valid: true }
}

/**
 * Check if builder attempts to modify Philosophy Tree
 */
export async function attemptPhilosophyTreeModification(
  builder: string,
  filePath: string
): Promise<{ allowed: boolean; error?: string }> {
  // Check if path contains "philosophy-tree"
  if (filePath.toLowerCase().includes('philosophy-tree')) {
    return {
      allowed: false,
      error: 'Philosophy Tree files are protected. Only Foreman can modify Philosophy Tree.',
    }
  }

  // Check if it's the main philosophy tree file
  if (filePath === 'maturion-philosophy-tree.md') {
    return {
      allowed: false,
      error: 'maturion-philosophy-tree.md is protected. Only Foreman has Philosophy Tree authority.',
    }
  }

  return { allowed: true }
}

/**
 * Validate that Philosophy context comes from Foreman
 */
export async function validateForemanPhilosophyContext(
  request: any
): Promise<{ fromForeman: boolean; context: any }> {
  // If philosophy_context exists, it should be from Foreman
  // In a real implementation, this would verify the request source
  if (request.philosophy_context) {
    return {
      fromForeman: true,
      context: request.philosophy_context,
    }
  }

  return {
    fromForeman: false,
    context: null,
  }
}

/**
 * Check if builder is interpreting Philosophy Tree independently
 * Builders MUST NOT do this - only Foreman interprets Philosophy Tree
 */
export async function checkBuilderPhilosophyTreeInterpretation(
  builder: string
): Promise<{ interprets: boolean; evidence: string[] }> {
  // In a real implementation, this would check builder logs, code, and behavior
  // For now, assume builders do NOT interpret Philosophy Tree
  return {
    interprets: false,
    evidence: [],
  }
}
