/**
 * Pilot Issue Selection Tests
 * 
 * Tests the pilot issue selection and safety evaluation system.
 */

import { evaluateIssueSafety, generateSafetySummary, PilotIssue } from '../../lib/foreman/autonomy/pilot-selection'

console.log('🧪 Running Pilot Issue Selection Tests...\n')

function runTests() {
  let passed = 0
  let failed = 0
  
  // Test 1: Safe documentation issue
  console.log('Test 1: Safe documentation issue...')
  try {
    const safeIssue: PilotIssue = {
      number: 1,
      title: 'Update README documentation',
      labels: ['docs', 'documentation'],
      body: 'Need to update the README with latest changes',
      state: 'open'
    }
    
    const safety = evaluateIssueSafety(safeIssue)
    
    if (safety.isSafe) {
      console.log('✅ Test 1 PASSED: Documentation issue is correctly identified as safe')
      console.log(`   Reasons: ${safety.reasons.join(', ')}`)
      passed++
    } else {
      console.log('❌ Test 1 FAILED: Documentation issue should be safe')
      console.log(`   Reasons: ${safety.reasons.join(', ')}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 1 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 2: Unsafe workflow issue
  console.log('\nTest 2: Unsafe workflow issue...')
  try {
    const unsafeIssue: PilotIssue = {
      number: 2,
      title: 'Modify GitHub workflow',
      labels: ['workflow-change'],
      body: 'Need to update the CI/CD workflow',
      state: 'open'
    }
    
    const safety = evaluateIssueSafety(unsafeIssue)
    
    if (!safety.isSafe) {
      console.log('✅ Test 2 PASSED: Workflow issue is correctly identified as unsafe')
      console.log(`   Reasons: ${safety.reasons.join(', ')}`)
      passed++
    } else {
      console.log('❌ Test 2 FAILED: Workflow issue should be unsafe')
      console.log(`   Reasons: ${safety.reasons.join(', ')}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 2 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 3: Closed issue
  console.log('\nTest 3: Closed issue...')
  try {
    const closedIssue: PilotIssue = {
      number: 3,
      title: 'Update documentation',
      labels: ['docs'],
      body: 'Documentation update',
      state: 'closed'
    }
    
    const safety = evaluateIssueSafety(closedIssue)
    
    if (!safety.isSafe) {
      console.log('✅ Test 3 PASSED: Closed issue is correctly identified as unsafe')
      console.log(`   Reasons: ${safety.reasons.join(', ')}`)
      passed++
    } else {
      console.log('❌ Test 3 FAILED: Closed issue should be unsafe')
      console.log(`   Reasons: ${safety.reasons.join(', ')}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 3 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 4: Issue without eligible labels
  console.log('\nTest 4: Issue without eligible labels...')
  try {
    const noLabelsIssue: PilotIssue = {
      number: 4,
      title: 'Random feature request',
      labels: ['feature'],
      body: 'Add a new feature',
      state: 'open'
    }
    
    const safety = evaluateIssueSafety(noLabelsIssue)
    
    if (!safety.isSafe) {
      console.log('✅ Test 4 PASSED: Issue without eligible labels is correctly identified as unsafe')
      console.log(`   Reasons: ${safety.reasons.join(', ')}`)
      passed++
    } else {
      console.log('❌ Test 4 FAILED: Issue without eligible labels should be unsafe')
      console.log(`   Reasons: ${safety.reasons.join(', ')}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 4 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 5: Critical security issue
  console.log('\nTest 5: Critical security issue...')
  try {
    const criticalIssue: PilotIssue = {
      number: 5,
      title: 'Fix security vulnerability',
      labels: ['security', 'critical'],
      body: 'Security fix needed',
      state: 'open'
    }
    
    const safety = evaluateIssueSafety(criticalIssue)
    
    if (!safety.isSafe) {
      console.log('✅ Test 5 PASSED: Critical security issue is correctly identified as unsafe')
      console.log(`   Reasons: ${safety.reasons.join(', ')}`)
      passed++
    } else {
      console.log('❌ Test 5 FAILED: Critical security issue should be unsafe')
      console.log(`   Reasons: ${safety.reasons.join(', ')}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 5 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 6: Safe parking-station issue
  console.log('\nTest 6: Safe parking-station issue...')
  try {
    const parkingIssue: PilotIssue = {
      number: 6,
      title: 'Add dashboard widget',
      labels: ['parking-station', 'enhancement'],
      body: 'Add a new widget to the parking station dashboard',
      state: 'open'
    }
    
    const safety = evaluateIssueSafety(parkingIssue)
    
    if (safety.isSafe) {
      console.log('✅ Test 6 PASSED: Parking-station issue is correctly identified as safe')
      console.log(`   Reasons: ${safety.reasons.join(', ')}`)
      passed++
    } else {
      console.log('❌ Test 6 FAILED: Parking-station issue should be safe')
      console.log(`   Reasons: ${safety.reasons.join(', ')}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 6 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 7: Generate safety summary
  console.log('\nTest 7: Generate safety summary...')
  try {
    const issue: PilotIssue = {
      number: 7,
      title: 'Update architecture docs',
      labels: ['docs'],
      body: 'Update architecture documentation',
      state: 'open'
    }
    
    const safety = evaluateIssueSafety(issue)
    const summary = generateSafetySummary(issue, safety)
    
    if (summary.includes('Autonomous Pilot Safety Evaluation') && 
        summary.includes('Scope Constraints')) {
      console.log('✅ Test 7 PASSED: Safety summary generated correctly')
      console.log(`   Summary length: ${summary.length} characters`)
      passed++
    } else {
      console.log('❌ Test 7 FAILED: Safety summary is incomplete')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 7 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 8: Verify forbidden paths are enforced
  console.log('\nTest 8: Verify forbidden paths...')
  try {
    const issue: PilotIssue = {
      number: 8,
      title: 'Update docs',
      labels: ['docs'],
      body: 'Documentation update',
      state: 'open'
    }
    
    const safety = evaluateIssueSafety(issue)
    
    const hasForbiddenPaths = safety.forbiddenPaths.some(path => 
      path.includes('.github/workflows') || 
      path.includes('foreman/constitution')
    )
    
    if (hasForbiddenPaths) {
      console.log('✅ Test 8 PASSED: Forbidden paths include critical directories')
      console.log(`   Forbidden paths: ${safety.forbiddenPaths.join(', ')}`)
      passed++
    } else {
      console.log('❌ Test 8 FAILED: Forbidden paths are missing critical directories')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 8 FAILED: ${error.message}`)
    failed++
  }
  
  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('TEST SUMMARY')
  console.log('='.repeat(60))
  console.log(`Total Tests: ${passed + failed}`)
  console.log(`Passed: ${passed}`)
  console.log(`Failed: ${failed}`)
  console.log('='.repeat(60))
  
  if (failed > 0) {
    console.log('\n❌ Some tests failed')
    process.exit(1)
  } else {
    console.log('\n✅ All tests passed')
    process.exit(0)
  }
}

runTests()
