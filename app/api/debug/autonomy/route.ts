/**
 * Debug Endpoint: Autonomy System Status
 * 
 * Returns comprehensive status of all autonomy layers including:
 * - CS1-CS6 implementations
 * - Constitutional systems
 * - Memory systems
 * - Builder network
 * - Governance memory
 * - MCP integration
 */

import { NextRequest, NextResponse } from 'next/server'
import { checkInitializationStatus } from '@/lib/foreman/initialization'
import { runGuardrailChecks } from '@/lib/foreman/guardrails/runtime'
import { existsSync } from 'fs'
import { join } from 'path'

interface ConstitutionalSystemStatus {
  id: string
  name: string
  status: 'implemented' | 'partial' | 'missing'
  description: string
  location?: string
}

export async function GET(request: NextRequest) {
  try {
    // Check initialization status
    const initStatus = checkInitializationStatus()
    
    // Run guardrail checks
    const guardrailResults = await runGuardrailChecks()
    
    // Check constitutional systems (CS1-CS10)
    const constitutionalSystems: ConstitutionalSystemStatus[] = [
      {
        id: 'CS1',
        name: 'Immutable Guardrail Engine',
        status: checkFileExists('lib/foreman/guardrails/runtime.ts') ? 'implemented' : 'missing',
        description: 'Prevents governance rule weakening and protected file modification',
        location: 'lib/foreman/guardrails/'
      },
      {
        id: 'CS2',
        name: 'Architecture Change Approval Workflow',
        status: checkFileExists('lib/foreman/architecture/approval-workflow.ts') ? 'implemented' : 'missing',
        description: 'Requires human approval for architectural changes',
        location: 'lib/foreman/architecture/'
      },
      {
        id: 'CS3',
        name: 'Incident Feedback Loop',
        status: checkFileExists('lib/foreman/incidents') ? 'implemented' : 'missing',
        description: 'Captures and learns from quality incidents',
        location: 'lib/foreman/incidents/'
      },
      {
        id: 'CS4',
        name: 'Governance Ping Alerts System',
        status: checkFileExists('lib/foreman/alerts/alert-engine.ts') ? 'implemented' : 'missing',
        description: 'Critical governance event notifications',
        location: 'lib/foreman/alerts/'
      },
      {
        id: 'CS5',
        name: 'Performance Enforcement System',
        status: checkFileExists('lib/foreman/qa/qiel-runner.ts') ? 'implemented' : 'missing',
        description: 'Enforces performance standards via QIEL',
        location: 'lib/foreman/qa/'
      },
      {
        id: 'CS6',
        name: 'External Builder Prohibition',
        status: checkFileExists('lib/foreman/constitution/external-builder-protection.ts') ? 'implemented' : 'missing',
        description: 'Prevents unauthorized external builders',
        location: 'lib/foreman/constitution/'
      },
      {
        id: 'CS7',
        name: 'Autonomy Pilot Log',
        status: checkFileExists('docs/autonomy/AUTONOMY_PILOT_LOG.md') ? 'implemented' : 'missing',
        description: 'Persistent log of autonomous actions',
        location: 'docs/autonomy/AUTONOMY_PILOT_LOG.md'
      },
      {
        id: 'CS8',
        name: 'Constitutional Deep Integration',
        status: 'missing',
        description: 'Supervision graph, model escalation, issue creation policies',
        location: 'To be implemented'
      },
      {
        id: 'CS9',
        name: 'Full Memory Context Activation',
        status: checkFileExists('lib/foreman/memory') ? 'partial' : 'missing',
        description: 'Complete context loading system',
        location: 'lib/foreman/memory/'
      },
      {
        id: 'CS10',
        name: 'Global Issue Backlog Cleanup',
        status: 'missing',
        description: 'Issue categorization and backlog reconciliation',
        location: 'To be implemented'
      }
    ]
    
    // Check key system components
    const systemComponents = {
      buildPhilosophy: checkFileExists('BUILD_PHILOSOPHY.md'),
      agentContract: checkFileExists('.github/foreman/agent-contract.md'),
      architectureChecklist: checkFileExists('foreman/architecture-design-checklist.md'),
      trueNorth: checkFileExists('foreman/true-north-architecture.md'),
      qaWorkflow: checkFileExists('foreman/qa/qa-first-workflow.md'),
      builderSpecs: checkFileExists('foreman/builder-specs'),
      governanceMemory: checkFileExists('lib/foreman/memory/governance-memory.ts'),
      parkingStation: checkFileExists('lib/foreman/parking-station'),
      driftMonitor: checkFileExists('lib/foreman/memory/drift-monitor.ts')
    }
    
    // Check autonomy systems
    const autonomySystems = {
      pilotSelection: checkFileExists('lib/foreman/autonomy/pilot-selection.ts'),
      preFlightChecks: checkFileExists('lib/foreman/autonomy/pre-flight.ts'),
      executionFlow: checkFileExists('lib/foreman/autonomy/execution-flow.ts'),
      modelEscalation: checkFileExists('lib/foreman/model-escalation.ts'),
      overnightExecution: checkFileExists('lib/foreman/overnight-execution.ts')
    }
    
    // Calculate overall readiness
    const implementedCS = constitutionalSystems.filter(cs => cs.status === 'implemented').length
    const totalCS = constitutionalSystems.length
    const readinessPercentage = Math.round((implementedCS / totalCS) * 100)
    
    // Determine overall status
    let overallStatus: 'ready' | 'partial' | 'not_ready' = 'not_ready'
    if (readinessPercentage === 100 && initStatus.readyForOperation && guardrailResults.overall === 'passed') {
      overallStatus = 'ready'
    } else if (readinessPercentage >= 60 && initStatus.initialized) {
      overallStatus = 'partial'
    }
    
    return NextResponse.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      overallStatus,
      readiness: {
        percentage: readinessPercentage,
        implementedSystems: implementedCS,
        totalSystems: totalCS
      },
      initialization: {
        initialized: initStatus.initialized,
        readyForOperation: initStatus.readyForOperation,
        summary: initStatus.summary,
        checks: initStatus.checks
      },
      guardrails: {
        overall: guardrailResults.overall,
        checksRun: guardrailResults.checks.length,
        violations: guardrailResults.violations,
        checks: guardrailResults.checks
      },
      constitutionalSystems,
      systemComponents,
      autonomySystems,
      buildPhilosophy: {
        active: systemComponents.buildPhilosophy,
        version: '1.0',
        process: 'Architecture → Red QA → Build to Green'
      }
    })
  } catch (error) {
    console.error('Error checking autonomy status:', error)
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

/**
 * Helper function to check if a file or directory exists
 */
function checkFileExists(relativePath: string): boolean {
  const fullPath = join(process.cwd(), relativePath)
  return existsSync(fullPath)
}
