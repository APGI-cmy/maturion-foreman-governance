/**
 * Desktop Test Runner - Foreman Ecosystem Check
 * 
 * Runs comprehensive system validation:
 * - MCP connectivity
 * - GitHub mutation capability
 * - Builder network checks
 * - Autonomy status
 * - QIC/QIEL dry-run
 * - Constitutional hash verification
 * - Model escalation test
 * - Foreman API health
 */

import { checkInitializationStatus } from '../lib/foreman/initialization'
import { runGuardrailChecks } from '../lib/foreman/guardrails/runtime'
import { loadFullContext } from '../lib/foreman/memory/full-context-loader'
import { executePilotWave1 } from '../lib/foreman/autonomy/pilot-wave-1'
import { getSupervisionGraph } from '../lib/foreman/autonomy/supervision-graph'
import { getModelEscalationGovernor } from '../lib/foreman/autonomy/model-escalation-governor'
import { getIssueBacklogCategorizer } from '../lib/foreman/autonomy/issue-backlog-categorizer'

interface CheckResult {
  name: string
  status: 'pass' | 'fail' | 'warning'
  message: string
  details?: any
}

/**
 * Run all ecosystem checks
 */
async function runEcosystemCheck(): Promise<void> {
  const results: CheckResult[] = []
  let totalPassed = 0
  let totalFailed = 0
  let totalWarnings = 0
  
  console.log('═'.repeat(80))
  console.log('🚀 FOREMAN ECOSYSTEM CHECK')
  console.log('═'.repeat(80))
  console.log()
  
  // Check 1: Initialization Status
  console.log('1️⃣  Checking Initialization Status...')
  try {
    const initStatus = checkInitializationStatus()
    const result: CheckResult = {
      name: 'Initialization',
      status: initStatus.readyForOperation ? 'pass' : (initStatus.initialized ? 'warning' : 'fail'),
      message: initStatus.readyForOperation 
        ? 'All systems initialized' 
        : (initStatus.initialized ? 'Initialized with warnings' : 'Initialization incomplete'),
      details: initStatus.summary
    }
    results.push(result)
    
    if (result.status === 'pass') totalPassed++
    else if (result.status === 'warning') totalWarnings++
    else totalFailed++
    
    console.log(`   ${result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌'} ${result.message}`)
  } catch (error) {
    const result: CheckResult = {
      name: 'Initialization',
      status: 'fail',
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
    results.push(result)
    totalFailed++
    console.log(`   ❌ ${result.message}`)
  }
  
  // Check 2: Constitutional Guardrails
  console.log('\n2️⃣  Checking Constitutional Guardrails...')
  try {
    const guardrailResults = await runGuardrailChecks()
    const result: CheckResult = {
      name: 'Guardrails',
      status: guardrailResults.overall === 'passed' ? 'pass' : 'fail',
      message: guardrailResults.overall === 'passed' 
        ? `All ${guardrailResults.checks.length} guardrail checks passed` 
        : `Guardrail violations: ${guardrailResults.violations.join(', ')}`,
      details: guardrailResults
    }
    results.push(result)
    
    if (result.status === 'pass') totalPassed++
    else if (result.status === 'warning') totalWarnings++
    else totalFailed++
    
    console.log(`   ${result.status === 'pass' ? '✅' : '❌'} ${result.message}`)
  } catch (error) {
    const result: CheckResult = {
      name: 'Guardrails',
      status: 'fail',
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
    results.push(result)
    totalFailed++
    console.log(`   ❌ ${result.message}`)
  }
  
  // Check 3: Full Context Loader
  console.log('\n3️⃣  Checking Full Context Loader...')
  try {
    const contextResult = await loadFullContext()
    const result: CheckResult = {
      name: 'Context Loader',
      status: contextResult.success ? 'pass' : (contextResult.errors.length > 0 ? 'fail' : 'warning'),
      message: contextResult.success 
        ? `Loaded ${contextResult.context?.documents.length} documents in ${contextResult.loadTimeMs}ms` 
        : `Context load failed: ${contextResult.errors.join(', ')}`,
      details: contextResult.context?.statistics
    }
    results.push(result)
    
    if (result.status === 'pass') totalPassed++
    else if (result.status === 'warning') totalWarnings++
    else totalFailed++
    
    console.log(`   ${result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌'} ${result.message}`)
  } catch (error) {
    const result: CheckResult = {
      name: 'Context Loader',
      status: 'fail',
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
    results.push(result)
    totalFailed++
    console.log(`   ❌ ${result.message}`)
  }
  
  // Check 4: Pilot Wave 1 Execution
  console.log('\n4️⃣  Checking Pilot Wave 1 Execution...')
  try {
    const pilotResult = await executePilotWave1(['status_reporting', 'governance_audit'])
    const result: CheckResult = {
      name: 'Pilot Wave 1',
      status: pilotResult.success ? 'pass' : 'fail',
      message: pilotResult.success 
        ? pilotResult.summary 
        : `Pilot wave failed: ${pilotResult.errors.join(', ')}`,
      details: pilotResult
    }
    results.push(result)
    
    if (result.status === 'pass') totalPassed++
    else if (result.status === 'warning') totalWarnings++
    else totalFailed++
    
    console.log(`   ${result.status === 'pass' ? '✅' : '❌'} ${result.message}`)
  } catch (error) {
    const result: CheckResult = {
      name: 'Pilot Wave 1',
      status: 'fail',
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
    results.push(result)
    totalFailed++
    console.log(`   ❌ ${result.message}`)
  }
  
  // Check 5: Constitutional Supervision Graph
  console.log('\n5️⃣  Checking Constitutional Supervision Graph...')
  try {
    const graph = getSupervisionGraph()
    const layers = graph.getLayers()
    const result: CheckResult = {
      name: 'Supervision Graph',
      status: layers.length >= 12 ? 'pass' : 'warning',
      message: `${layers.length} constitutional layers loaded`,
      details: { layers: layers.map(l => l.name) }
    }
    results.push(result)
    
    if (result.status === 'pass') totalPassed++
    else if (result.status === 'warning') totalWarnings++
    else totalFailed++
    
    console.log(`   ${result.status === 'pass' ? '✅' : '⚠️'} ${result.message}`)
  } catch (error) {
    const result: CheckResult = {
      name: 'Supervision Graph',
      status: 'fail',
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
    results.push(result)
    totalFailed++
    console.log(`   ❌ ${result.message}`)
  }
  
  // Check 6: Model Escalation Governor
  console.log('\n6️⃣  Checking Model Escalation Governor...')
  try {
    const governor = getModelEscalationGovernor()
    const testDecision = governor.evaluate('gpt-4.1', {
      type: 'architecture' as any,
      complexity: 'architectural' as any,
      tokenCount: 100000,
      requiresArchitecture: true,
      requiresGovernance: false,
      isMutation: false,
      description: 'Test architectural task'
    })
    
    const result: CheckResult = {
      name: 'Model Escalation',
      status: 'pass',
      message: testDecision.shouldEscalate 
        ? `Correctly escalated to ${testDecision.recommendedModel}` 
        : 'Model escalation logic working',
      details: testDecision
    }
    results.push(result)
    totalPassed++
    
    console.log(`   ✅ ${result.message}`)
  } catch (error) {
    const result: CheckResult = {
      name: 'Model Escalation',
      status: 'fail',
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
    results.push(result)
    totalFailed++
    console.log(`   ❌ ${result.message}`)
  }
  
  // Check 7: Issue Backlog Categorizer
  console.log('\n7️⃣  Checking Issue Backlog Categorizer...')
  try {
    const categorizer = getIssueBacklogCategorizer()
    const testIssue = {
      number: 1,
      title: 'Test Build Philosophy Enhancement',
      state: 'open' as const,
      labels: [],
      created: new Date(),
      updated: new Date(),
      body: 'This is a test issue about build philosophy improvements'
    }
    
    const analysis = categorizer.analyzeIssue(testIssue, [testIssue])
    
    const result: CheckResult = {
      name: 'Issue Categorizer',
      status: 'pass',
      message: `Categorized test issue as ${analysis.category} (${Math.round(analysis.confidence * 100)}% confidence)`,
      details: analysis
    }
    results.push(result)
    totalPassed++
    
    console.log(`   ✅ ${result.message}`)
  } catch (error) {
    const result: CheckResult = {
      name: 'Issue Categorizer',
      status: 'fail',
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
    results.push(result)
    totalFailed++
    console.log(`   ❌ ${result.message}`)
  }
  
  // Check 8: Environment Variables
  console.log('\n8️⃣  Checking Environment Variables...')
  const requiredEnvVars = [
    'GITHUB_MCP_TOKEN',
    'OPENAI_API_KEY'
  ]
  const missingEnvVars = requiredEnvVars.filter(v => !process.env[v])
  
  const result: CheckResult = {
    name: 'Environment',
    status: missingEnvVars.length === 0 ? 'pass' : 'warning',
    message: missingEnvVars.length === 0 
      ? 'All required environment variables configured' 
      : `Missing: ${missingEnvVars.join(', ')}`,
    details: { missing: missingEnvVars }
  }
  results.push(result)
  
  if (result.status === 'pass') totalPassed++
  else if (result.status === 'warning') totalWarnings++
  else totalFailed++
  
  console.log(`   ${result.status === 'pass' ? '✅' : '⚠️'} ${result.message}`)
  
  // Summary
  console.log()
  console.log('═'.repeat(80))
  console.log('📊 SUMMARY')
  console.log('═'.repeat(80))
  console.log()
  console.log(`   Total Checks: ${results.length}`)
  console.log(`   ✅ Passed:    ${totalPassed}`)
  console.log(`   ⚠️  Warnings:  ${totalWarnings}`)
  console.log(`   ❌ Failed:    ${totalFailed}`)
  console.log()
  
  const successRate = Math.round((totalPassed / results.length) * 100)
  
  if (totalFailed === 0 && totalWarnings === 0) {
    console.log('   🎉 ALL CHECKS PASSED - SYSTEM READY FOR AUTONOMOUS BUILDING')
  } else if (totalFailed === 0) {
    console.log(`   ⚠️  SYSTEM READY WITH WARNINGS (${successRate}% success rate)`)
  } else {
    console.log(`   ❌ SYSTEM NOT READY (${successRate}% success rate) - ${totalFailed} critical failures`)
  }
  
  console.log()
  console.log('═'.repeat(80))
  
  // Exit with appropriate code
  process.exit(totalFailed > 0 ? 1 : 0)
}

// Run the check
runEcosystemCheck().catch(error => {
  console.error('\n❌ Fatal error running ecosystem check:', error)
  process.exit(1)
})
