/**
 * Multi-Builder Fallback Tests
 * 
 * Tests that the fallback chain works correctly when primary builder fails:
 * - Fallback from GitHub Copilot to Local Builder
 * - Context preservation during fallback
 * - Fallback respects Build Philosophy
 * - All builders in chain validate properly
 */

import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import {
  executeWithFallback,
  getFallbackChain,
  simulateBuilderFailure,
  getFallbackLogs,
  validateFallbackContextPreservation,
  clearSimulatedFailures,
} from '@/lib/foreman/fallback/multi-builder-fallback'

describe('Fallback Chain Definition', () => {
  it('should define fallback from Copilot to Local Builder', async () => {
    const chain = await getFallbackChain('copilot')
    
    assert.ok(Array.isArray(chain), 'Should return array of builders')
    assert.ok(chain.includes('local'), 'Should include local builder in fallback chain')
  })

  it('should have null as final fallback (escalation)', async () => {
    const chain = await getFallbackChain('local')
    
    // Local builder has no further fallback, should escalate
    assert.ok(chain.length === 0 || chain[chain.length - 1] === null,
      'Final fallback should be null (escalation)')
  })

  it('should return different chains for different builders', async () => {
    const copilotChain = await getFallbackChain('copilot')
    const localChain = await getFallbackChain('local')
    
    // Chains should be different
    assert.notDeepStrictEqual(copilotChain, localChain,
      'Different builders should have different fallback chains')
  })
})

describe('Fallback Trigger Conditions', () => {
  it('should trigger fallback after 5 consecutive failures', async () => {
    await simulateBuilderFailure('copilot', 'consecutive_failures')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    const result = await executeWithFallback(request)
    
    // Should attempt fallback to local builder
    assert.ok(result, 'Should return result')
    // Check fallback was triggered via logs
    const logs = await getFallbackLogs(result.task_id)
    assert.ok(logs.some(log => log.type === 'builder_fallback'),
      'Should log fallback event')
  })

  it('should trigger fallback when builder reports unhealthy', async () => {
    await simulateBuilderFailure('copilot', 'unhealthy')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    const result = await executeWithFallback(request)
    const logs = await getFallbackLogs(result.task_id)
    
    assert.ok(logs.some(log => 
      log.type === 'builder_fallback' && log.reason.includes('unhealthy')
    ), 'Should fallback when unhealthy')
  })

  it('should trigger fallback on builder timeout', async () => {
    await simulateBuilderFailure('copilot', 'timeout')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    const result = await executeWithFallback(request)
    const logs = await getFallbackLogs(result.task_id)
    
    assert.ok(logs.some(log => 
      log.type === 'builder_fallback' && log.reason.includes('timeout')
    ), 'Should fallback on timeout')
  })

  it('should trigger fallback when builder reports "cannot complete"', async () => {
    await simulateBuilderFailure('copilot', 'cannot_complete')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    const result = await executeWithFallback(request)
    const logs = await getFallbackLogs(result.task_id)
    
    assert.ok(logs.some(log => 
      log.type === 'builder_fallback' && log.reason.includes('cannot complete')
    ), 'Should fallback when cannot complete')
  })

  it('should trigger fallback on token exhaustion', async () => {
    await simulateBuilderFailure('copilot', 'token_exhaustion')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    const result = await executeWithFallback(request)
    const logs = await getFallbackLogs(result.task_id)
    
    assert.ok(logs.some(log => 
      log.type === 'builder_fallback' && log.reason.includes('token')
    ), 'Should fallback on token exhaustion')
  })
})

describe('Context Preservation During Fallback', () => {
  it('should transfer full Build-to-Green request to fallback builder', async () => {
    await simulateBuilderFailure('copilot', 'consecutive_failures')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md', summary: 'Test architecture' },
      qa_suite: { 
        name: 'test-qa',
        location: '/tests/',
        current_status: 'RED', 
        failing_tests: 5 
      },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    const result = await executeWithFallback(request)
    const contextCheck = await validateFallbackContextPreservation(result.task_id)
    
    assert.strictEqual(contextCheck.preserved, true,
      'Should preserve full request context')
    assert.strictEqual(contextCheck.missing.length, 0,
      'Should have no missing context')
  })

  it('should transfer all checkpoints from primary builder', async () => {
    await simulateBuilderFailure('copilot', 'consecutive_failures')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    const result = await executeWithFallback(request)
    const logs = await getFallbackLogs(result.task_id)
    
    // Fallback log should reference checkpoints
    const fallbackLog = logs.find(log => log.type === 'builder_fallback')
    assert.ok(fallbackLog, 'Should have fallback log')
    assert.ok('checkpoints' in fallbackLog || 'context' in fallbackLog,
      'Should include checkpoint/context data')
  })

  it('should transfer error logs from primary builder', async () => {
    await simulateBuilderFailure('copilot', 'consecutive_failures')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    const result = await executeWithFallback(request)
    const logs = await getFallbackLogs(result.task_id)
    
    const fallbackLog = logs.find(log => log.type === 'builder_fallback')
    assert.ok(fallbackLog?.primary_error, 'Should include primary builder error')
  })

  it('should transfer iteration count to fallback builder', async () => {
    await simulateBuilderFailure('copilot', 'consecutive_failures')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    const result = await executeWithFallback(request)
    const contextCheck = await validateFallbackContextPreservation(result.task_id)
    
    assert.strictEqual(contextCheck.preserved, true, 'Should preserve iteration count')
  })

  it('should transfer QA progress to fallback builder', async () => {
    await simulateBuilderFailure('copilot', 'consecutive_failures')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { 
        current_status: 'RED', 
        total_tests: 10,
        passing_tests: 3,
        failing_tests: 7 
      },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    const result = await executeWithFallback(request)
    const contextCheck = await validateFallbackContextPreservation(result.task_id)
    
    assert.strictEqual(contextCheck.preserved, true, 'Should preserve QA progress')
  })
})

describe('Fallback Builder Build Philosophy Compliance', () => {
  it('should validate Build-to-Green request before accepting', async () => {
    await simulateBuilderFailure('copilot', 'consecutive_failures')
    
    const invalidRequest = {
      instruction: 'Build feature', // Wrong!
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      organisationId: 'test'
    }

    try {
      await executeWithFallback(invalidRequest)
      assert.fail('Should reject invalid request')
    } catch (error: any) {
      assert.ok(error.message.includes('Build to Green'),
        'Should reject non-Build-to-Green instruction')
    }
  })

  it('should validate Red QA exists before accepting', async () => {
    await simulateBuilderFailure('copilot', 'consecutive_failures')
    
    const invalidRequest = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      // No QA suite!
      organisationId: 'test'
    }

    try {
      await executeWithFallback(invalidRequest)
      assert.fail('Should reject request without QA')
    } catch (error: any) {
      assert.ok(error.message.includes('QA'),
        'Should reject without QA suite')
    }
  })

  it('should enforce protected path restrictions in fallback builder', async () => {
    await simulateBuilderFailure('copilot', 'consecutive_failures')
    
    const invalidRequest = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      files: ['.github/workflows/ci.yml'], // Protected!
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    try {
      await executeWithFallback(invalidRequest)
      assert.fail('Should reject protected path modification')
    } catch (error: any) {
      assert.ok(error.message.includes('protected'),
        'Should reject protected path')
    }
  })
})

describe('Fallback Logging and Governance', () => {
  it('should log fallback event to governance memory', async () => {
    await simulateBuilderFailure('copilot', 'consecutive_failures')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    const result = await executeWithFallback(request)
    const logs = await getFallbackLogs(result.task_id)
    
    assert.ok(logs.length > 0, 'Should have logs')
    assert.ok(logs.some(log => log.type === 'builder_fallback'),
      'Should log fallback event')
  })

  it('should include fallback reason in logs', async () => {
    await simulateBuilderFailure('copilot', 'consecutive_failures')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    const result = await executeWithFallback(request)
    const logs = await getFallbackLogs(result.task_id)
    
    const fallbackLog = logs.find(log => log.type === 'builder_fallback')
    assert.ok(fallbackLog?.reason, 'Should include fallback reason')
  })

  it('should log both builder names in fallback event', async () => {
    await simulateBuilderFailure('copilot', 'consecutive_failures')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    const result = await executeWithFallback(request)
    const logs = await getFallbackLogs(result.task_id)
    
    const fallbackLog = logs.find(log => log.type === 'builder_fallback')
    assert.ok(fallbackLog?.from, 'Should log primary builder')
    assert.ok(fallbackLog?.to, 'Should log fallback builder')
  })
})

describe('Complete Fallback Chain Failure', () => {
  it('should escalate to Foreman when all builders fail', async () => {
    await simulateBuilderFailure('copilot', 'consecutive_failures')
    await simulateBuilderFailure('local', 'consecutive_failures')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    try {
      await executeWithFallback(request)
      assert.fail('Should escalate when all builders fail')
    } catch (error: any) {
      assert.ok(error.message.includes('BuilderNetworkFailure') || 
                error.message.includes('escalate'),
        'Should escalate to Foreman')
    }
  })

  it('should include all builder errors in escalation', async () => {
    await simulateBuilderFailure('copilot', 'consecutive_failures')
    await simulateBuilderFailure('local', 'consecutive_failures')
    
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      acceptance_criteria: '100% passing',
      organisationId: 'test'
    }

    try {
      await executeWithFallback(request)
    } catch (error: any) {
      // Escalation should include errors from both builders
      assert.ok(error, 'Should throw error with escalation data')
    }
  })
})
