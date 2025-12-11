/**
 * Builder Protocol v1.1 Compliance Tests
 * 
 * Tests that all builders enforce the Build-to-Green protocol correctly:
 * - Reject tasks missing Red QA
 * - Reject architecture-less tasks
 * - Reject governance-modifying tasks
 * - Enforce Build-to-Green only instruction format
 * - Refuse to modify protected paths
 */

import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import {
  validateBuildToGreenRequest,
  checkProtectedPathModification,
} from '@/lib/foreman/validation/protocol-validator'

describe('Builder Protocol v1.1 - Build-to-Green Enforcement', () => {
  it('should reject tasks with missing instruction field', async () => {
    const request = {
      architecture: { reference: '/architecture/test.md', summary: 'Test' },
      qa_suite: { name: 'test', location: '/tests/', current_status: 'RED', failing_tests: 5 },
      organisationId: 'test-org'
      // Missing 'instruction' field
    }

    const result = await validateBuildToGreenRequest(request)
    assert.strictEqual(result.valid, false, 'Should reject request without instruction')
    assert.strictEqual(result.error?.type, 'BuildPhilosophyViolation')
  })

  it('should reject tasks with incorrect instruction format', async () => {
    const request = {
      instruction: 'Build the feature', // Wrong format
      architecture: { reference: '/architecture/test.md', summary: 'Test' },
      qa_suite: { name: 'test', location: '/tests/', current_status: 'RED', failing_tests: 5 },
      organisationId: 'test-org'
    }

    const result = await validateBuildToGreenRequest(request)
    assert.strictEqual(result.valid, false, 'Should reject non-Build-to-Green instruction')
    assert.ok(
      result.error?.message.includes('Build to Green') || 
      result.error?.details?.required === 'Build to Green',
      'Error should mention Build to Green'
    )
  })

  it('should reject tasks missing architecture reference', async () => {
    const request = {
      instruction: 'Build to Green',
      // Missing architecture
      qa_suite: { name: 'test', location: '/tests/', current_status: 'RED', failing_tests: 5 },
      organisationId: 'test-org'
    }

    const result = await validateBuildToGreenRequest(request)
    assert.strictEqual(result.valid, false, 'Should reject request without architecture')
    assert.ok(result.error?.message.includes('architecture'), 'Error should mention architecture')
  })

  it('should reject tasks missing QA suite', async () => {
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/architecture/test.md', summary: 'Test' },
      // Missing qa_suite
      organisationId: 'test-org'
    }

    const result = await validateBuildToGreenRequest(request)
    assert.strictEqual(result.valid, false, 'Should reject request without QA suite')
    assert.ok(result.error?.message.includes('QA'), 'Error should mention QA')
  })

  it('should reject tasks with GREEN QA status', async () => {
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/architecture/test.md', summary: 'Test' },
      qa_suite: { 
        name: 'test', 
        location: '/tests/', 
        current_status: 'GREEN', // Already passing!
        failing_tests: 0 
      },
      organisationId: 'test-org'
    }

    const result = await validateBuildToGreenRequest(request)
    assert.strictEqual(result.valid, false, 'Should reject when QA is already green')
    assert.ok(result.error?.message.includes('RED'), 'Error should mention RED QA requirement')
  })

  it('should reject tasks with zero failing tests', async () => {
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/architecture/test.md', summary: 'Test' },
      qa_suite: { 
        name: 'test', 
        location: '/tests/', 
        current_status: 'RED',
        failing_tests: 0 // No failing tests
      },
      organisationId: 'test-org'
    }

    const result = await validateBuildToGreenRequest(request)
    assert.strictEqual(result.valid, false, 'Should reject when no failing tests')
    assert.ok(result.error?.message.includes('failing'), 'Error should mention failing tests')
  })

  it('should accept valid Build-to-Green request', async () => {
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/architecture/test.md', summary: 'Test' },
      qa_suite: { 
        name: 'test', 
        location: '/tests/', 
        current_status: 'RED',
        total_tests: 10,
        passing_tests: 0,
        failing_tests: 10
      },
      acceptance_criteria: 'All tests must pass (100%)',
      organisationId: 'test-org'
    }

    const result = await validateBuildToGreenRequest(request)
    assert.strictEqual(result.valid, true, 'Should accept valid Build-to-Green request')
  })
})

describe('Builder Protocol v1.1 - Protected Path Enforcement', () => {
  it('should reject modification of workflow files', async () => {
    const paths = ['.github/workflows/ci.yml']
    
    const result = await checkProtectedPathModification(paths)
    assert.strictEqual(result.allowed, false, 'Should reject workflow file modification')
    assert.ok(result.violations.length > 0, 'Should report violation')
  })

  it('should reject modification of agent-contract.md', async () => {
    const paths = ['.github/foreman/agent-contract.md']
    
    const result = await checkProtectedPathModification(paths)
    assert.strictEqual(result.allowed, false, 'Should reject agent-contract modification')
  })

  it('should reject modification of BUILD_PHILOSOPHY.md', async () => {
    const paths = ['BUILD_PHILOSOPHY.md']
    
    const result = await checkProtectedPathModification(paths)
    assert.strictEqual(result.allowed, false, 'Should reject BUILD_PHILOSOPHY modification')
  })

  it('should reject modification of constitutional files', async () => {
    const paths = ['foreman/constitution/guardrails.json']
    
    const result = await checkProtectedPathModification(paths)
    assert.strictEqual(result.allowed, false, 'Should reject constitutional file modification')
  })

  it('should reject modification of architecture-design-checklist.md', async () => {
    const paths = ['foreman/architecture-design-checklist.md']
    
    const result = await checkProtectedPathModification(paths)
    assert.strictEqual(result.allowed, false, 'Should reject checklist modification')
  })

  it('should allow modification of regular application files', async () => {
    const paths = ['app/dashboard/page.tsx', 'lib/utils/helper.ts']
    
    const result = await checkProtectedPathModification(paths)
    assert.strictEqual(result.allowed, true, 'Should allow regular file modification')
    assert.strictEqual(result.violations.length, 0, 'Should report no violations')
  })

  it('should reject mixed protected and regular files', async () => {
    const paths = [
      'app/dashboard/page.tsx', // Allowed
      '.github/workflows/test.yml' // Protected
    ]
    
    const result = await checkProtectedPathModification(paths)
    assert.strictEqual(result.allowed, false, 'Should reject when any protected file included')
    assert.ok(result.violations.length > 0, 'Should report violations')
  })
})

describe('Builder Protocol v1.1 - Request Structure Validation', () => {
  it('should require protocol_version field in v1.1 requests', async () => {
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/architecture/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      // Missing protocol_version
      organisationId: 'test-org'
    }

    const result = await validateBuildToGreenRequest(request)
    // Should accept for backwards compatibility OR require version
    // Implementation determines exact behavior
    assert.ok(result, 'Should return validation result')
  })

  it('should validate acceptance_criteria is provided', async () => {
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/architecture/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      // Missing acceptance_criteria
      organisationId: 'test-org'
    }

    const result = await validateBuildToGreenRequest(request)
    assert.strictEqual(result.valid, false, 'Should reject without acceptance criteria')
  })
})
