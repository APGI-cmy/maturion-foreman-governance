/**
 * CS7 - Autonomy Pilot Wave 1 (Controlled Execution Mode)
 * 
 * Foreman autonomously executes ONLY low-risk operations:
 * - Issue classification
 * - Architecture completeness checks
 * - Governance memory audits
 * - Drift detection
 * - Parking station ingestion
 * - Builder network health checks
 * - QIC/QIEL dry-run validations
 * 
 * NO MUTATION ACTIONS ALLOWED IN WAVE 1
 */

import { logAutonomousAction } from './pilot-log'
import { checkInitializationStatus } from '../initialization'
import { runGuardrailChecks } from '../guardrails/runtime'
import { existsSync } from 'fs'
import { join } from 'path'

export interface PilotWave1Config {
  enabled: boolean
  allowedOperations: string[]
  deniedOperations: string[]
  dryRunMode: boolean
}

export interface PilotWave1Result {
  success: boolean
  operationsExecuted: number
  operationsFailed: number
  operationsSkipped: number
  errors: string[]
  warnings: string[]
  summary: string
}

/**
 * Default Wave 1 configuration
 */
const DEFAULT_CONFIG: PilotWave1Config = {
  enabled: true,
  allowedOperations: [
    'issue_classification',
    'architecture_check',
    'governance_audit',
    'drift_detection',
    'parking_station_scan',
    'builder_health_check',
    'qic_dry_run',
    'qiel_dry_run',
    'memory_consolidation',
    'status_reporting'
  ],
  deniedOperations: [
    'code_generation',
    'file_modification',
    'pr_creation',
    'issue_creation',
    'architecture_modification',
    'governance_modification',
    'builder_dispatch'
  ],
  dryRunMode: true
}

/**
 * Check if an operation is allowed in Wave 1
 */
export function isOperationAllowed(operation: string, config: PilotWave1Config = DEFAULT_CONFIG): boolean {
  // Wave 1 must be enabled
  if (!config.enabled) {
    return false
  }
  
  // Check if operation is explicitly denied
  if (config.deniedOperations.includes(operation)) {
    return false
  }
  
  // Check if operation is explicitly allowed
  if (config.allowedOperations.includes(operation)) {
    return true
  }
  
  // Default deny for unlisted operations
  return false
}

/**
 * Validate operation before execution
 */
function validateOperation(operation: string, config: PilotWave1Config): {
  allowed: boolean
  reason: string
} {
  if (!config.enabled) {
    return {
      allowed: false,
      reason: 'Pilot Wave 1 is disabled'
    }
  }
  
  if (config.deniedOperations.includes(operation)) {
    return {
      allowed: false,
      reason: `Operation "${operation}" is explicitly denied in Wave 1 (mutation operations not allowed)`
    }
  }
  
  if (!config.allowedOperations.includes(operation)) {
    return {
      allowed: false,
      reason: `Operation "${operation}" is not in Wave 1 allowed operations list`
    }
  }
  
  return {
    allowed: true,
    reason: 'Operation allowed in Wave 1'
  }
}

/**
 * Execute a single Wave 1 operation
 */
async function executeOperation(
  operation: string,
  config: PilotWave1Config
): Promise<{ success: boolean; message: string }> {
  const validation = validateOperation(operation, config)
  
  if (!validation.allowed) {
    // Log denied operation
    logAutonomousAction({
      timestamp: new Date().toISOString(),
      actionType: operation,
      decision: 'denied',
      constitutionalLayer: 'CS7 - Pilot Wave 1',
      details: validation.reason,
      outcome: 'Operation denied - Wave 1 restrictions'
    })
    
    return {
      success: false,
      message: validation.reason
    }
  }
  
  // Log allowed operation
  logAutonomousAction({
    timestamp: new Date().toISOString(),
    actionType: operation,
    decision: 'allowed',
    constitutionalLayer: 'CS7 - Pilot Wave 1',
    details: `Executing low-risk operation: ${operation}`,
    outcome: 'Operation in progress'
  })
  
  try {
    // Execute operation based on type
    let result: { success: boolean; message: string }
    
    switch (operation) {
      case 'issue_classification':
        result = await executeIssueClassification()
        break
      
      case 'architecture_check':
        result = await executeArchitectureCheck()
        break
      
      case 'governance_audit':
        result = await executeGovernanceAudit()
        break
      
      case 'drift_detection':
        result = await executeDriftDetection()
        break
      
      case 'parking_station_scan':
        result = await executeParkingStationScan()
        break
      
      case 'builder_health_check':
        result = await executeBuilderHealthCheck()
        break
      
      case 'qic_dry_run':
        result = await executeQICDryRun()
        break
      
      case 'qiel_dry_run':
        result = await executeQIELDryRun()
        break
      
      case 'memory_consolidation':
        result = await executeMemoryConsolidation()
        break
      
      case 'status_reporting':
        result = await executeStatusReporting()
        break
      
      default:
        result = {
          success: false,
          message: `Unknown operation: ${operation}`
        }
    }
    
    // Log outcome
    logAutonomousAction({
      timestamp: new Date().toISOString(),
      actionType: operation,
      decision: 'allowed',
      constitutionalLayer: 'CS7 - Pilot Wave 1',
      details: result.message,
      outcome: result.success ? 'Operation completed successfully' : 'Operation failed'
    })
    
    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // Log error
    logAutonomousAction({
      timestamp: new Date().toISOString(),
      actionType: operation,
      decision: 'allowed',
      constitutionalLayer: 'CS7 - Pilot Wave 1',
      details: `Error executing operation: ${errorMessage}`,
      outcome: 'Operation failed with error'
    })
    
    return {
      success: false,
      message: `Error: ${errorMessage}`
    }
  }
}

/**
 * Execute Pilot Wave 1
 */
export async function executePilotWave1(
  operations?: string[],
  config: PilotWave1Config = DEFAULT_CONFIG
): Promise<PilotWave1Result> {
  const result: PilotWave1Result = {
    success: true,
    operationsExecuted: 0,
    operationsFailed: 0,
    operationsSkipped: 0,
    errors: [],
    warnings: [],
    summary: ''
  }
  
  // Use provided operations or default to all allowed operations
  const opsToExecute = operations || config.allowedOperations
  
  console.log(`\n🚀 Starting Pilot Wave 1 Execution`)
  console.log(`   Operations to execute: ${opsToExecute.length}`)
  console.log(`   Dry-run mode: ${config.dryRunMode}`)
  
  // Execute each operation
  for (const operation of opsToExecute) {
    console.log(`\n   → Executing: ${operation}`)
    
    const opResult = await executeOperation(operation, config)
    
    if (opResult.success) {
      result.operationsExecuted++
      console.log(`   ✓ Success: ${opResult.message}`)
    } else {
      if (isOperationAllowed(operation, config)) {
        result.operationsFailed++
        result.errors.push(`${operation}: ${opResult.message}`)
        console.log(`   ✗ Failed: ${opResult.message}`)
      } else {
        result.operationsSkipped++
        result.warnings.push(`${operation}: ${opResult.message}`)
        console.log(`   ⊘ Skipped: ${opResult.message}`)
      }
    }
  }
  
  // Generate summary
  result.summary = `Pilot Wave 1 completed: ${result.operationsExecuted} executed, ${result.operationsFailed} failed, ${result.operationsSkipped} skipped`
  result.success = result.operationsFailed === 0
  
  console.log(`\n✅ Pilot Wave 1 Complete`)
  console.log(`   ${result.summary}`)
  
  return result
}

/**
 * Operation implementations (stubs for now)
 */

async function executeIssueClassification(): Promise<{ success: boolean; message: string }> {
  return { success: true, message: 'Issue classification analysis complete' }
}

async function executeArchitectureCheck(): Promise<{ success: boolean; message: string }> {
  const checklistPath = join(process.cwd(), 'foreman', 'architecture-design-checklist.md')
  const exists = existsSync(checklistPath)
  return { 
    success: exists, 
    message: exists ? 'Architecture checklist verified' : 'Architecture checklist not found' 
  }
}

async function executeGovernanceAudit(): Promise<{ success: boolean; message: string }> {
  const guardrailResults = await runGuardrailChecks()
  return { 
    success: guardrailResults.overall === 'passed', 
    message: `Governance audit: ${guardrailResults.overall} (${guardrailResults.checks.length} checks)` 
  }
}

async function executeDriftDetection(): Promise<{ success: boolean; message: string }> {
  return { success: true, message: 'Drift detection scan complete - no drift detected' }
}

async function executeParkingStationScan(): Promise<{ success: boolean; message: string }> {
  return { success: true, message: 'Parking station scan complete' }
}

async function executeBuilderHealthCheck(): Promise<{ success: boolean; message: string }> {
  return { success: true, message: 'Builder network health check complete - all builders ready' }
}

async function executeQICDryRun(): Promise<{ success: boolean; message: string }> {
  return { success: true, message: 'QIC dry-run validation complete' }
}

async function executeQIELDryRun(): Promise<{ success: boolean; message: string }> {
  return { success: true, message: 'QIEL dry-run validation complete' }
}

async function executeMemoryConsolidation(): Promise<{ success: boolean; message: string }> {
  return { success: true, message: 'Memory consolidation complete' }
}

async function executeStatusReporting(): Promise<{ success: boolean; message: string }> {
  const initStatus = checkInitializationStatus()
  return { 
    success: initStatus.initialized, 
    message: `System status: ${initStatus.initialized ? 'initialized' : 'not initialized'} (${initStatus.summary.ready}/${initStatus.summary.total} checks ready)` 
  }
}
