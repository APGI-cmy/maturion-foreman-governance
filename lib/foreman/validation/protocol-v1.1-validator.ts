/**
 * Builder Protocol v1.1 Validator
 * 
 * Validates all Builder Protocol v1.1 requests according to:
 * - Build Philosophy v1.1
 * - Constitutional constraints (CS1-CS6)
 * - Protocol specification
 */

import {
  BuilderRequestV1_1,
  BuildPhilosophyViolation
} from '@/types/builder-protocol-v1.1'

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean
  error?: BuildPhilosophyViolation
}

/**
 * Validate Builder Protocol v1.1 request
 * 
 * This is the entry point for all builder request validation.
 * ALL builders MUST call this before accepting any task.
 */
export function validateBuilderRequest(request: any): ValidationResult {
  const timestamp = new Date().toISOString()
  
  // GATE 1: Protocol version
  if (!request.protocol_version || request.protocol_version !== '1.1') {
    return {
      valid: false,
      error: {
        error: 'BuildPhilosophyViolation',
        message: 'REJECTED: Invalid protocol version',
        details: {
          reason: `Protocol version must be "1.1", received: ${request.protocol_version || 'none'}`,
          philosophy: 'Builder Protocol v1.1 is required for constitutional compliance',
          action: 'Update request to use protocol version "1.1"'
        },
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
        workflow_reference: '/foreman/qa/qa-first-workflow.md',
        timestamp
      }
    }
  }
  
  // GATE 2: Instruction format
  if (request.instruction !== 'Build to Green') {
    return {
      valid: false,
      error: {
        error: 'BuildPhilosophyViolation',
        message: 'REJECTED: Invalid build instruction',
        details: {
          reason: `Instruction must be "Build to Green", received: "${request.instruction || 'none'}"`,
          philosophy: 'Build Philosophy requires QA-driven building',
          action: 'Foreman must provide "Build to Green" instruction with Red QA'
        },
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
        workflow_reference: '/foreman/qa/qa-first-workflow.md',
        timestamp
      }
    }
  }
  
  // GATE 3: Architecture exists
  if (!request.architecture || !request.architecture.reference) {
    return {
      valid: false,
      error: {
        error: 'BuildPhilosophyViolation',
        message: 'REJECTED: No architecture provided',
        details: {
          reason: 'Builders require architecture specification to build against',
          philosophy: 'Architecture defines what "correct" means',
          action: 'Foreman must design architecture before creating build request'
        },
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
        workflow_reference: '/foreman/qa/qa-first-workflow.md',
        timestamp
      }
    }
  }
  
  // GATE 4: QA suite exists
  if (!request.qa_suite) {
    return {
      valid: false,
      error: {
        error: 'BuildPhilosophyViolation',
        message: 'REJECTED: No QA suite provided',
        details: {
          reason: 'Builders require failing QA to know what to build',
          philosophy: 'Red QA is the build specification',
          action: 'Foreman must create comprehensive QA suite before building'
        },
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
        workflow_reference: '/foreman/qa/qa-first-workflow.md',
        timestamp
      }
    }
  }
  
  // GATE 5: QA status is RED
  if (request.qa_suite.current_status !== 'RED') {
    const action = request.qa_suite.current_status === 'GREEN' 
      ? 'QA is already green. Nothing to build.'
      : 'Foreman must run QA to verify it\'s failing before building'
    
    return {
      valid: false,
      error: {
        error: 'BuildPhilosophyViolation',
        message: 'REJECTED: QA must be RED (failing)',
        details: {
          reason: `QA status must be RED, received: ${request.qa_suite.current_status}`,
          philosophy: 'Red QA means "architecture exists, implementation missing"',
          action
        },
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
        workflow_reference: '/foreman/qa/qa-first-workflow.md',
        timestamp
      }
    }
  }
  
  // GATE 6: Failing tests exist
  if (request.qa_suite.failing_tests === 0) {
    return {
      valid: false,
      error: {
        error: 'BuildPhilosophyViolation',
        message: 'REJECTED: No failing tests',
        details: {
          reason: 'No failing tests means nothing to build',
          philosophy: 'Failing tests define what needs to be implemented',
          action: 'If QA is all passing, feature is already complete. No build needed.'
        },
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
        workflow_reference: '/foreman/qa/qa-first-workflow.md',
        timestamp
      }
    }
  }
  
  // GATE 7: Acceptance criteria defined
  if (!request.acceptance_criteria) {
    return {
      valid: false,
      error: {
        error: 'BuildPhilosophyViolation',
        message: 'REJECTED: No acceptance criteria provided',
        details: {
          reason: 'Builders require clear definition of "done"',
          philosophy: 'Acceptance criteria defines when building is complete',
          action: 'Foreman must specify acceptance criteria (typically: "100% QA passing")'
        },
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
        workflow_reference: '/foreman/qa/qa-first-workflow.md',
        timestamp
      }
    }
  }
  
  // GATE 8: Metadata contains required fields
  if (!request.metadata || !request.metadata.task_id) {
    return {
      valid: false,
      error: {
        error: 'BuildPhilosophyViolation',
        message: 'REJECTED: Invalid metadata',
        details: {
          reason: 'Metadata must include task_id, priority, and timeout_seconds',
          philosophy: 'Metadata enables tracking and governance',
          action: 'Foreman must provide complete metadata with build request'
        },
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
        workflow_reference: '/foreman/qa/qa-first-workflow.md',
        timestamp
      }
    }
  }
  
  // All validations passed
  return { valid: true }
}

/**
 * Validate protected paths
 * 
 * Ensures builders don't modify constitutional files
 */
export function validateProtectedPaths(filePaths: string[]): ValidationResult {
  const timestamp = new Date().toISOString()
  
  const protectedPaths = [
    /^\.github\/workflows\//,
    /^\.github\/foreman\/agent-contract\.md$/,
    /^BUILD_PHILOSOPHY\.md$/,
    /^foreman\/constitution\//,
    /^foreman\/architecture-design-checklist\.md$/,
  ]
  
  for (const filePath of filePaths) {
    for (const pattern of protectedPaths) {
      if (pattern.test(filePath)) {
        return {
          valid: false,
          error: {
            error: 'BuildPhilosophyViolation',
            message: 'REJECTED: Protected path modification',
            details: {
              reason: `Cannot modify protected path: ${filePath}`,
              philosophy: 'Constitutional files are immutable',
              action: 'Remove protected path from build scope'
            },
            philosophy_reference: '/BUILD_PHILOSOPHY.md',
            workflow_reference: '/foreman/qa/qa-first-workflow.md',
            timestamp
          }
        }
      }
    }
  }
  
  return { valid: true }
}

/**
 * Create BuildPhilosophyViolation error response
 */
export function createViolationError(
  message: string,
  reason: string,
  philosophy: string,
  action: string
): BuildPhilosophyViolation {
  return {
    error: 'BuildPhilosophyViolation',
    message,
    details: {
      reason,
      philosophy,
      action
    },
    philosophy_reference: '/BUILD_PHILOSOPHY.md',
    workflow_reference: '/foreman/qa/qa-first-workflow.md',
    timestamp: new Date().toISOString()
  }
}

/**
 * Validate QA transition (RED → GREEN)
 */
export function validateQATransition(
  preStatus: string,
  postStatus: string,
  preFailingCount: number,
  postFailingCount: number
): ValidationResult {
  const timestamp = new Date().toISOString()
  
  // Must start RED
  if (preStatus !== 'RED') {
    return {
      valid: false,
      error: {
        error: 'BuildPhilosophyViolation',
        message: 'REJECTED: Invalid QA transition',
        details: {
          reason: `Build must start with RED QA, started with: ${preStatus}`,
          philosophy: 'Red QA is required before building',
          action: 'Ensure QA is RED before starting build'
        },
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
        workflow_reference: '/foreman/qa/qa-first-workflow.md',
        timestamp
      }
    }
  }
  
  // Must end GREEN
  if (postStatus !== 'GREEN') {
    return {
      valid: false,
      error: {
        error: 'BuildPhilosophyViolation',
        message: 'REJECTED: Build not complete',
        details: {
          reason: `Build must end with GREEN QA, ended with: ${postStatus}`,
          philosophy: '100% QA passing is required for completion',
          action: 'Continue building until all tests pass'
        },
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
        workflow_reference: '/foreman/qa/qa-first-workflow.md',
        timestamp
      }
    }
  }
  
  // Must have no failing tests at end
  if (postFailingCount > 0) {
    return {
      valid: false,
      error: {
        error: 'BuildPhilosophyViolation',
        message: 'REJECTED: QA still has failures',
        details: {
          reason: `QA has ${postFailingCount} failing tests`,
          philosophy: '100% QA passing is absolute',
          action: 'Continue building until all tests pass'
        },
        philosophy_reference: '/BUILD_PHILOSOPHY.md',
        workflow_reference: '/foreman/qa/qa-first-workflow.md',
        timestamp
      }
    }
  }
  
  return { valid: true }
}
