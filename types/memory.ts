/**
 * Memory Types
 * Type definitions for Unified Memory Fabric
 */

/**
 * Scope of memory storage
 * - global: System-wide memory (architecture decisions, governance changes)
 * - foreman: Foreman-specific memory (orchestration patterns, builder performance)
 * - project: Project-specific memory (project lifecycle, milestones, deployments)
 */
export type MemoryScope = 'global' | 'foreman' | 'project'

/**
 * Memory entry metadata
 */
export interface MemoryMetadata {
  createdAt: string // ISO 8601 timestamp
  updatedAt: string // ISO 8601 timestamp
  createdBy: string // Agent identifier (e.g., "foreman", "qa-builder")
  version: number // Version number for tracking changes
}

/**
 * Core memory entry structure
 */
export interface MemoryEntry {
  id: string // Unique identifier for the memory entry
  scope: MemoryScope
  key: string // Unique key within scope (e.g., "architecture-decision-001")
  value: any // Memory content (can be any JSON-serializable value)
  metadata: MemoryMetadata
  tags?: string[] // Optional tags for categorization and search
}

/**
 * Context for writing memory entries
 */
export interface MemoryWriteContext {
  scope: MemoryScope
  key: string
  value: any
  tags?: string[]
  createdBy: string
  organisationId?: string // For multi-tenant support
  projectId?: string // For project-scoped memory
}

/**
 * Context for reading memory entries
 */
export interface MemoryReadContext {
  scope: MemoryScope
  key?: string // Optional - if not provided, returns all entries in scope
  tags?: string[] // Optional - filter by tags
  organisationId?: string // For multi-tenant support
  projectId?: string // For project-scoped memory
}

/**
 * Memory query result
 */
export interface MemoryQueryResult {
  entries: MemoryEntry[]
  total: number
  scope: MemoryScope
}

/**
 * Storage backend configuration
 */
export interface MemoryStorageConfig {
  basePath: string // Base path for JSON storage (e.g., "/memory")
  enableVersionControl: boolean // Whether to track versions in git
  maxEntriesPerFile: number // Maximum entries per JSON file
}

/**
 * Memory event types for tracking changes
 */
export type MemoryEventType =
  | 'architecture_decision'
  | 'wave_completion'
  | 'deployment'
  | 'qa_failure'
  | 'builder_task_completion'
  | 'governance_change'
  | 'error_escalation'
  | 'milestone_completion'
  | 'project_state_transition'
  | 'quality_integrity_incident' // QIC: Quality Integrity Incident

/**
 * Memory event for major system events
 */
export interface MemoryEvent {
  type: MemoryEventType
  scope: MemoryScope
  description: string
  data: any
  timestamp: string // ISO 8601 timestamp
  createdBy: string
}

/**
 * Quality Integrity Contract (QIC) Types
 * These types support the QIC architecture defined in /foreman/qa/quality-integrity-contract.md
 */

/**
 * Types of Quality Integrity Incidents
 */
export type QIIncidentType =
  | 'build_error'           // QIC-1: Build errors
  | 'lint_error'            // QIC-2: Linting errors
  | 'runtime_error'         // QIC-3: Runtime failures
  | 'silent_failure'        // QIC-5: Silent failures
  | 'schema_mismatch'       // QIC-5: Schema inconsistencies
  | 'deployment_failure'    // QIC-4: Deployment simulation failures
  | 'test_failure'          // Test execution failures
  | 'security_violation'    // Security-related failures

/**
 * Severity levels for QI Incidents
 */
export type QISeverity = 'critical' | 'high' | 'medium' | 'low'

/**
 * Quality Integrity Incident
 * Records quality failures in Governance Memory per QIC-6
 */
export interface QualityIntegrityIncident {
  id: string                    // Unique incident ID
  timestamp: string             // ISO 8601 timestamp
  incidentType: QIIncidentType  // Type of quality failure
  severity: QISeverity          // Severity level
  source: string                // Source of failure (module/file)
  description: string           // Human-readable description
  details: any                  // Detailed failure information
  resolution?: string           // How it was resolved (if resolved)
  resolvedAt?: string          // When it was resolved
  metadata: {
    buildId?: string
    sequenceId?: string
    commitSha?: string
    branch?: string
    environment?: string
  }
}

/**
 * QIC Configuration
 * Defines which QIC rules are enabled for a system/app
 */
export interface QICConfig {
  version: string               // QIC version
  buildIntegrityEnabled: boolean         // QIC-1
  lintIntegrityEnabled: boolean          // QIC-2
  runtimeIntegrityEnabled: boolean       // QIC-3
  deploymentSimulationEnabled: boolean   // QIC-4
  silentFailurePreventionEnabled: boolean // QIC-5
  governanceMemoryIntegrationEnabled: boolean // QIC-6
  wiringIntegrityEnabled?: boolean       // QIC-8: Wiring Integrity Enforcement (WIE)
  enforcedBy: string            // Which component enforces QIC
  appliesTo: string             // Scope of application
}

/**
 * Quality Check Result
 * Result from a single QIC check
 */
export interface QualityCheckResult {
  check: string                 // Check name (e.g., 'build_integrity')
  status: 'passed' | 'failed' | 'warning'
  message: string              // Summary message
  errors?: any[]               // Error details
  warnings?: any[]             // Warning details
  failures?: any[]             // Failure details
  source?: string              // Source of the check
}
