/**
 * Build Philosophy Validator Tests (RED QA)
 * 
 * Tests for Build Philosophy validator: Ensures Build Philosophy process was followed.
 * Control 9: Build Philosophy Compliance
 * 
 * Per BUILD_PHILOSOPHY.md: Red QA → Build to Green
 */

import { describe, it, expect } from '@jest/globals';

describe('Build Philosophy Validator', () => {
  describe('Architecture Completeness Evidence', () => {
    it('should validate architecture document exists', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.evidence).toContainEqual(expect.objectContaining({
        type: 'document',
        path: expect.stringContaining('architecture')
      }));
    });

    it('should validate checklist validation exists', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.evidence).toContainEqual(expect.objectContaining({
        type: 'report',
        path: expect.stringContaining('checklist-validation')
      }));
    });

    it('should pass when architecture complete', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-complete-arch',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.checks.architectureComplete).toBe(true);
    });

    it('should fail when architecture document missing', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-no-arch',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.architectureComplete).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'ARCHITECTURE_MISSING',
        description: expect.stringContaining('Architecture document not found')
      }));
    });

    it('should fail when checklist validation missing', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-no-checklist',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'CHECKLIST_VALIDATION_MISSING',
        description: expect.stringContaining('Checklist validation not found')
      }));
    });
  });

  describe('Red QA Creation Evidence', () => {
    it('should validate Red QA suite exists', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.checks.redQACreated).toBe(true);
    });

    it('should validate pre-build QA run evidence', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.evidence).toContainEqual(expect.objectContaining({
        type: 'log',
        path: expect.stringContaining('pre-build-qa')
      }));
    });

    it('should validate QA was RED before build', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-red-qa',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.checks.qaWasRed).toBe(true);
    });

    it('should fail when no Red QA evidence', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-no-red-qa',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.redQACreated).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'RED_QA_MISSING',
        description: expect.stringContaining('Red QA evidence not found')
      }));
    });

    it('should fail when QA was not RED before build', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-qa-not-red',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.qaWasRed).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'QA_NOT_RED',
        description: expect.stringContaining('QA was not RED before building')
      }));
    });
  });

  describe('Build-to-Green Instruction Evidence', () => {
    it('should validate Build-to-Green instruction format', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.checks.buildToGreenInstruction).toBe(true);
    });

    it('should validate architecture reference provided', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.checks.architectureReferenceProvided).toBe(true);
    });

    it('should validate QA suite reference provided', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.checks.qaSuiteReferenceProvided).toBe(true);
    });

    it('should fail when instruction is not Build-to-Green', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-wrong-instruction',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'WRONG_INSTRUCTION_FORMAT',
        description: expect.stringContaining('Instruction must be "Build to Green"')
      }));
    });
  });

  describe('Green QA Achievement Evidence', () => {
    it('should validate Green QA achieved', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-green-qa',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.checks.greenQAAchieved).toBe(true);
    });

    it('should validate 100% tests passing', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-100-pass',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.checks.allTestsPassing).toBe(true);
    });

    it('should fail when QA not 100% green', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-not-100',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.greenQAAchieved).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'QA_NOT_100_GREEN',
        description: expect.stringContaining('QA is not 100% passing')
      }));
    });
  });

  describe('Process Timeline Validation', () => {
    it('should validate steps in correct order', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-correct-order',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.checks.processTimelineCorrect).toBe(true);
    });

    it('should validate Architecture → Red QA → Build order', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.checks.correctProcessOrder).toBe(true);
      expect(result.timeline).toMatchObject({
        architecture: expect.any(String),
        redQA: expect.any(String),
        build: expect.any(String),
      });
      
      // Verify correct timeline order
      const archTime = new Date(result.timeline.architecture).getTime();
      const qaTime = new Date(result.timeline.redQA).getTime();
      const buildTime = new Date(result.timeline.build).getTime();
      
      // Architecture → Red QA → Build
      expect(archTime).toBeLessThan(qaTime);
      expect(qaTime).toBeLessThan(buildTime);
    });

    it('should fail when steps out of order', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-wrong-order',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.processTimelineCorrect).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'PROCESS_OUT_OF_ORDER',
        description: expect.stringContaining('Process steps not in correct order')
      }));
    });

    it('should fail when build started before Red QA', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-build-before-qa',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'BUILD_BEFORE_RED_QA',
        description: expect.stringContaining('Build started before Red QA created')
      }));
    });
  });

  describe('Zero Test Debt Validation', () => {
    it('should validate zero test debt', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-zero-debt',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.checks.zeroTestDebt).toBe(true);
    });

    it('should fail when test debt detected', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-test-debt',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.zeroTestDebt).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'TEST_DEBT_DETECTED',
        severity: 'HIGH',
        description: expect.stringContaining('Test debt found')
      }));
    });
  });

  describe('Test Infrastructure Completeness', () => {
    it('should validate test infrastructure complete', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-complete-infra',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.checks.testInfrastructureComplete).toBe(true);
    });

    it('should fail when test helpers incomplete', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-incomplete-helpers',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.testInfrastructureComplete).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'TEST_INFRASTRUCTURE_INCOMPLETE',
        description: expect.stringContaining('Test helpers incomplete')
      }));
    });
  });

  describe('Overall Build Philosophy Result', () => {
    it('should return PASS only when all checks pass', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-all-pass',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.status).toBe('PASS');
      expect(result.checks.architectureComplete).toBe(true);
      expect(result.checks.redQACreated).toBe(true);
      expect(result.checks.qaWasRed).toBe(true);
      expect(result.checks.buildToGreenInstruction).toBe(true);
      expect(result.checks.greenQAAchieved).toBe(true);
      expect(result.checks.processTimelineCorrect).toBe(true);
      expect(result.checks.zeroTestDebt).toBe(true);
      expect(result.checks.testInfrastructureComplete).toBe(true);
      expect(result.violations).toEqual([]);
    });

    it('should return HIGH severity for process violations', async () => {
      const { validateBuildPhilosophy } = await import('@/lib/foreman/governance/validators/build-philosophy-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-process-violation',
        workspaceRoot: '/workspace',
      };
      
      const result = await validateBuildPhilosophy(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.severity).toBe('HIGH');
    });
  });
});
