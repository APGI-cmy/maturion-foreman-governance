/**
 * Builder Types
 * Type definitions for Builder Agents
 */

import { HistoricalIssue, ArchitectureLesson, ReasoningPattern, GovernanceMemory } from './reasoning'

export type BuilderType = 'ui' | 'api' | 'schema' | 'integration' | 'qa'

export interface BuilderCapability {
  name: string
  type: BuilderType
  description: string
  permissions: BuilderPermission[]
  supportedTaskTypes: string[]
  inputFormat: BuilderInputFormat
  outputFormat: BuilderOutputFormat
}

export interface BuilderPermission {
  resource: string
  access: 'read' | 'write' | 'execute'
  scope: string
}

export interface BuilderInputFormat {
  required: string[]
  optional: string[]
  schema: Record<string, any>
}

export interface BuilderOutputFormat {
  fields: string[]
  schema: Record<string, any>
}

export interface BuilderTask {
  id: string
  builder: BuilderType
  module: string
  taskDescription: string
  status: BuilderTaskStatus
  approved: boolean
  approvedBy?: string
  approvedAt?: Date
  createdAt: Date
  updatedAt: Date
  input?: Record<string, any>
  output?: BuilderTaskOutput
  error?: string
  /** Memory context provided to the builder */
  memoryContext?: BuilderMemoryContext
}

export type BuilderTaskStatus = 'pending_approval' | 'approved' | 'running' | 'completed' | 'failed' | 'rejected'

export interface BuilderTaskOutput {
  success: boolean
  data?: any
  artifacts?: BuilderArtifact[]
  qaResults?: QAResult[]
  error?: string
}

export interface BuilderArtifact {
  type: 'code' | 'schema' | 'documentation' | 'test'
  name: string
  path?: string
  content?: string
  metadata?: Record<string, any>
}

export interface QAResult {
  check: string
  status: 'passed' | 'failed' | 'warning'
  message?: string
  details?: Record<string, any>
}

/**
 * Memory context provided to builders
 * Contains relevant memory slices to guide builder decisions
 */
export interface BuilderMemoryContext {
  /** Historical issues relevant to this task */
  historicalIssues: HistoricalIssue[]
  /** Architecture lessons to follow */
  architectureLessons: ArchitectureLesson[]
  /** Reasoning patterns to apply */
  reasoningPatterns: ReasoningPattern[]
  /** Governance rules to enforce */
  governanceRules: GovernanceMemory[]
  /** Project-specific requirements */
  projectRequirements?: string[]
  /** QA insights from past builds */
  qaInsights?: string[]
  /** Memory references used */
  memoryReferences: string[]
  /** Timestamp when context was compiled */
  compiledAt: string
  /** Total memory size in bytes */
  sizeBytes: number
}

export interface BuilderRequest {
  module: string
  taskDescription: string
  organisationId: string
  context?: Record<string, any>
  metadata?: Record<string, any>
  /** Memory context to guide builder decisions (injected by Foreman) */
  memoryContext?: BuilderMemoryContext
}

export interface BuilderResponse {
  success: boolean
  taskId?: string
  status: string
  message?: string
  output?: BuilderTaskOutput
  error?: string
}
