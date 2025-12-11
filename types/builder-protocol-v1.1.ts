/**
 * Builder Protocol v1.1 Types
 * 
 * Type definitions for Builder Protocol v1.1
 * Constitutional alignment with Build Philosophy v1.1
 */

export interface ArchitectureReference {
  reference: string  // Path to architecture document
  summary: string    // Brief summary of architecture
}

export interface QASuiteReference {
  name: string
  location: string
  current_status: 'RED' | 'GREEN' | 'UNKNOWN'
  total_tests: number
  passing_tests: number
  failing_tests: number
}

export interface BuilderMetadata {
  task_id: string
  priority: 'low' | 'normal' | 'high' | 'critical'
  timeout_seconds: number
}

export interface PhilosophyContext {
  principles: string[]
  constraints: string[]
}

/**
 * Builder Protocol v1.1 Request Structure
 */
export interface BuilderRequestV1_1 {
  protocol_version: '1.1'
  instruction: 'Build to Green'
  architecture: ArchitectureReference
  qa_suite: QASuiteReference
  acceptance_criteria: string
  organisationId: string
  metadata: BuilderMetadata
  philosophy_context?: PhilosophyContext
}

/**
 * Builder Protocol v1.1 Response Structure (Success)
 */
export interface BuilderResponseV1_1_Success {
  success: true
  protocol_version: '1.1'
  task_id: string
  builder: string
  result: {
    qa_status: 'GREEN'
    tests_passing: number
    tests_total: number
    iterations: number
    artifacts: Artifact[]
    evidence: Evidence
  }
  telemetry: BuilderTelemetry
  timestamp: string
}

/**
 * Builder Protocol v1.1 Response Structure (Error)
 */
export interface BuilderResponseV1_1_Error {
  success: false
  protocol_version: '1.1'
  task_id: string
  builder: string
  error: {
    type: string
    message: string
    details: object
    action_required: string
  }
  telemetry: BuilderTelemetry
  timestamp: string
}

export type BuilderResponseV1_1 = BuilderResponseV1_1_Success | BuilderResponseV1_1_Error

/**
 * Telemetry attached to every response
 */
export interface BuilderTelemetry {
  duration_ms: number
  retry_count: number
  final_status: string
  iterations?: number
}

/**
 * Artifact produced by builder
 */
export interface Artifact {
  type: 'file' | 'pr' | 'evidence'
  path?: string
  content?: string
  url?: string
}

/**
 * Evidence for PR validation
 */
export interface Evidence {
  architecture_reference: string
  architecture_validation: boolean
  red_qa_evidence: {
    pre_build_status: 'RED'
    failing_tests: number
    log_reference: string
  }
  build_instruction: 'Build to Green'
  builder_validation: {
    builder: string
    protocol_version: '1.1'
    validation_passed: boolean
    no_violations: boolean
  }
  green_qa_evidence: {
    final_status: 'GREEN'
    all_tests_passing: boolean
    pass_rate: string
    iteration_count: number
    log_reference: string
  }
  timeline_integrity: {
    valid: boolean
    steps: TimelineStep[]
  }
}

export interface TimelineStep {
  step: string
  timestamp: string
}

/**
 * Checkpoint structure
 */
export interface BuilderCheckpoint {
  checkpoint_id: string
  task_id: string
  builder: string
  iteration: number
  qa_status: {
    total: number
    passing: number
    failing: number
  }
  architecture_assumptions: string[]
  qa_assumptions: string[]
  next_action: string
  timestamp: string
}

/**
 * BuildPhilosophyViolation error
 */
export interface BuildPhilosophyViolation {
  error: 'BuildPhilosophyViolation'
  message: string
  details: {
    reason: string
    philosophy: string
    action: string
  }
  philosophy_reference: '/BUILD_PHILOSOPHY.md'
  workflow_reference: '/foreman/qa/qa-first-workflow.md'
  timestamp: string
}

/**
 * Escalation structure
 */
export interface BuilderEscalation {
  escalation_type: 'non_recoverable_error' | 'architectural_ambiguity' | 'constitutional_uncertainty'
  builder: string
  task_id: string
  issue: string
  details: {
    error_message: string
    attempted_fixes: string[]
    architecture_reference: string
    qa_suite_reference: string
    current_qa_status: {
      total: number
      passing: number
      failing: number
    }
  }
  suggested_resolution: string
  timestamp: string
}

/**
 * Builder Health Status
 */
export interface BuilderHealthStatus {
  builder: string
  status: 'healthy' | 'degraded' | 'unhealthy' | 'dead'
  timestamp: string
  checks: {
    api_reachable: boolean
    auth_valid: boolean
    recent_success: boolean
    error_rate: number
    avg_latency_ms: number
  }
  last_success: string | null
  last_error: string | null
}

/**
 * Builder Heartbeat
 */
export interface BuilderHeartbeat {
  builder: string
  status: 'active' | 'idle' | 'unhealthy' | 'degraded'
  last_task_id: string | null
  timestamp: string
  health_indicators: {
    api_latency_ms: number
    error_rate: number
    success_rate: number
  }
}
