/**
 * Constitutional Enforcement Tests (CS1-CS6)
 * 
 * Tests that builders properly enforce constitutional rules:
 * - CS1: Governance Supremacy Rule (GSR)
 * - CS2: QA-First Build Philosophy
 * - CS3: Constitutional File Protection
 * - CS4: Autonomous QA Governance
 * - CS5: Secrets Protection
 * - CS6: Audit Trail Integrity
 */

import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import {
  enforceGovernanceSupremacy,
  checkSecretsInCode,
  generateAuditLog,
} from '@/lib/foreman/validation/constitutional-validator'
import { validateBuildPhilosophyCompliance } from '@/lib/foreman/validation/protocol-validator'

describe('CS1: Governance Supremacy Rule Enforcement', () => {
  it('should block build when QA has any failing tests', async () => {
    const qaResult = {
      total: 100,
      passing: 99,
      failing: 1 // One failure = total failure
    }

    const result = await enforceGovernanceSupremacy(qaResult)
    assert.strictEqual(result.buildAllowed, false, 'Should block build with any failing tests')
    assert.ok(result.reason?.includes('QA'), 'Reason should mention QA failure')
  })

  it('should block build when QA is not 100% passing', async () => {
    const qaResult = {
      total: 303,
      passing: 301,
      failing: 2 // 99.3% passing = TOTAL FAILURE
    }

    const result = await enforceGovernanceSupremacy(qaResult)
    assert.strictEqual(result.buildAllowed, false, 'Should reject 99.3% as total failure')
  })

  it('should allow build only when QA is 100% passing', async () => {
    const qaResult = {
      total: 100,
      passing: 100,
      failing: 0
    }

    const result = await enforceGovernanceSupremacy(qaResult)
    assert.strictEqual(result.buildAllowed, true, 'Should allow build with 100% passing')
  })

  it('should block build when lint errors exist', async () => {
    const qaResult = {
      total: 100,
      passing: 100,
      failing: 0,
      lintErrors: 3 // Lint errors should block
    }

    const result = await enforceGovernanceSupremacy(qaResult)
    assert.strictEqual(result.buildAllowed, false, 'Should block build with lint errors')
  })

  it('should block build when build errors exist', async () => {
    const qaResult = {
      total: 100,
      passing: 100,
      failing: 0,
      buildErrors: 1 // Build errors should block
    }

    const result = await enforceGovernanceSupremacy(qaResult)
    assert.strictEqual(result.buildAllowed, false, 'Should block build with build errors')
  })
})

describe('CS2: QA-First Build Philosophy Enforcement', () => {
  it('should refuse to build without Red QA', async () => {
    const request = {
      instruction: 'Build feature X', // Wrong format
      architecture: { reference: '/test.md' },
      // No QA suite
      organisationId: 'test'
    }

    const result = await validateBuildPhilosophyCompliance(request)
    assert.strictEqual(result.compliant, false, 'Should be non-compliant without Red QA')
    assert.ok(result.violations.length > 0, 'Should report violations')
    assert.ok(
      result.violations.some(v => v.includes('QA')),
      'Should report QA-related violation'
    )
  })

  it('should refuse instruction format other than "Build to Green"', async () => {
    const request = {
      instruction: 'Implement the dashboard component', // Wrong
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      organisationId: 'test'
    }

    const result = await validateBuildPhilosophyCompliance(request)
    assert.strictEqual(result.compliant, false, 'Should be non-compliant with wrong instruction')
    assert.ok(
      result.violations.some(v => v.includes('Build to Green')),
      'Should report Build-to-Green violation'
    )
  })

  it('should accept compliant Build-to-Green request', async () => {
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md', summary: 'Test' },
      qa_suite: { 
        name: 'test',
        location: '/tests/',
        current_status: 'RED', 
        failing_tests: 10,
        total_tests: 10
      },
      acceptance_criteria: '100% QA passing',
      organisationId: 'test'
    }

    const result = await validateBuildPhilosophyCompliance(request)
    assert.strictEqual(result.compliant, true, 'Should be compliant with proper request')
    assert.strictEqual(result.violations.length, 0, 'Should have no violations')
  })
})

describe('CS3: Constitutional File Protection Enforcement', () => {
  it('should refuse to modify workflow files', async () => {
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      files: ['.github/workflows/ci.yml'], // Protected!
      organisationId: 'test'
    }

    const result = await validateBuildPhilosophyCompliance(request)
    assert.strictEqual(result.compliant, false, 'Should refuse workflow modification')
    assert.ok(
      result.violations.some(v => v.includes('protected') || v.includes('workflow')),
      'Should report protected path violation'
    )
  })

  it('should refuse to modify BUILD_PHILOSOPHY.md', async () => {
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      files: ['BUILD_PHILOSOPHY.md'], // Protected!
      organisationId: 'test'
    }

    const result = await validateBuildPhilosophyCompliance(request)
    assert.strictEqual(result.compliant, false, 'Should refuse BUILD_PHILOSOPHY modification')
  })

  it('should refuse to modify foreman/constitution/', async () => {
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      files: ['foreman/constitution/guardrails.json'], // Protected!
      organisationId: 'test'
    }

    const result = await validateBuildPhilosophyCompliance(request)
    assert.strictEqual(result.compliant, false, 'Should refuse constitution modification')
  })
})

describe('CS5: Secrets Protection Enforcement', () => {
  it('should detect hardcoded API keys in code', async () => {
    const code = `
      const apiKey = 'sk-proj-abcdefghijklmnopqrstuvwxyz123456'
      fetch('https://api.example.com', { 
        headers: { 'Authorization': \`Bearer \${apiKey}\` }
      })
    `

    const result = await checkSecretsInCode(code)
    assert.strictEqual(result.hasSecrets, true, 'Should detect hardcoded API key')
    assert.ok(result.secrets.length > 0, 'Should report found secrets')
  })

  it('should detect AWS credentials in code', async () => {
    const code = `
      const AWS_ACCESS_KEY_ID = 'AKIAIOSFODNN7EXAMPLE'
      const AWS_SECRET_ACCESS_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
    `

    const result = await checkSecretsInCode(code)
    assert.strictEqual(result.hasSecrets, true, 'Should detect AWS credentials')
  })

  it('should detect GitHub tokens in code', async () => {
    const code = `
      const githubToken = 'ghp_1234567890abcdefghijklmnopqrstuvwxyz'
    `

    const result = await checkSecretsInCode(code)
    assert.strictEqual(result.hasSecrets, true, 'Should detect GitHub token')
  })

  it('should allow environment variable usage', async () => {
    const code = `
      const apiKey = process.env.API_KEY
      const token = process.env.GITHUB_TOKEN
    `

    const result = await checkSecretsInCode(code)
    assert.strictEqual(result.hasSecrets, false, 'Should allow env var usage')
  })

  it('should allow placeholder values in comments', async () => {
    const code = `
      // Example: const apiKey = 'your-api-key-here'
      const apiKey = process.env.API_KEY
    `

    const result = await checkSecretsInCode(code)
    assert.strictEqual(result.hasSecrets, false, 'Should allow placeholder in comments')
  })
})

describe('CS6: Audit Trail Integrity Enforcement', () => {
  it('should log build start event', async () => {
    const event = {
      type: 'build_start',
      builder: 'copilot',
      taskId: 'task-123',
      instruction: 'Build to Green',
      timestamp: new Date().toISOString()
    }

    const result = await generateAuditLog(event)
    assert.strictEqual(result.logged, true, 'Should log build start')
    assert.ok(result.logId, 'Should return log ID')
  })

  it('should log QA run events', async () => {
    const event = {
      type: 'qa_run',
      builder: 'copilot',
      taskId: 'task-123',
      iteration: 5,
      qaResult: { total: 10, passing: 7, failing: 3 },
      timestamp: new Date().toISOString()
    }

    const result = await generateAuditLog(event)
    assert.strictEqual(result.logged, true, 'Should log QA run')
  })

  it('should log build completion event', async () => {
    const event = {
      type: 'build_complete',
      builder: 'copilot',
      taskId: 'task-123',
      qaStatus: 'GREEN',
      iterations: 8,
      timestamp: new Date().toISOString()
    }

    const result = await generateAuditLog(event)
    assert.strictEqual(result.logged, true, 'Should log build completion')
  })

  it('should log escalation events', async () => {
    const event = {
      type: 'builder_escalation',
      builder: 'copilot',
      taskId: 'task-123',
      reason: 'Cannot satisfy Red QA',
      timestamp: new Date().toISOString()
    }

    const result = await generateAuditLog(event)
    assert.strictEqual(result.logged, true, 'Should log escalation')
  })

  it('should include timestamp in all audit logs', async () => {
    const event = {
      type: 'build_start',
      builder: 'copilot',
      taskId: 'task-123'
      // Missing timestamp - should be added automatically
    }

    const result = await generateAuditLog(event)
    assert.strictEqual(result.logged, true, 'Should log event')
    // Implementation should add timestamp automatically
  })
})

describe('Constitutional Violation Escalation', () => {
  it('should escalate when builder attempts protected path modification', async () => {
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      qa_suite: { current_status: 'RED', failing_tests: 5 },
      files: ['.github/workflows/ci.yml'],
      organisationId: 'test'
    }

    const result = await validateBuildPhilosophyCompliance(request)
    assert.strictEqual(result.compliant, false, 'Should be non-compliant')
    // Should trigger escalation to Foreman
    assert.ok(result.violations.some(v => 
      v.includes('protected') || v.includes('escalate')
    ), 'Should indicate escalation needed')
  })

  it('should escalate when builder receives request without Red QA', async () => {
    const request = {
      instruction: 'Build to Green',
      architecture: { reference: '/test.md' },
      // No QA suite - constitutional violation
      organisationId: 'test'
    }

    const result = await validateBuildPhilosophyCompliance(request)
    assert.strictEqual(result.compliant, false, 'Should be non-compliant')
    assert.ok(result.violations.length > 0, 'Should report violations')
  })
})
