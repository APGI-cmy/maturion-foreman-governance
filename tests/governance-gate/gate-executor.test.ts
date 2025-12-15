/**
 * Governance Gate Executor Tests (RED QA)
 * 
 * These tests validate the complete Governance Gate execution flow.
 * Tests are designed to FAIL initially (Red QA) because implementation doesn't exist yet.
 * 
 * Per BUILD_PHILOSOPHY.md: Red QA → Build to Green
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';

describe('Governance Gate Executor', () => {
  describe('Gate Initialization', () => {
    it('should load canonical governance definition from GOVERNANCE_GATE_CANON.md', async () => {
      const { loadGateCanon } = await import('@/lib/foreman/governance/gate-executor');
      
      const canon = await loadGateCanon();
      
      expect(canon).toBeDefined();
      expect(canon.version).toBe('1.0');
      expect(canon.controls).toHaveLength(9); // QIEL, CS1-CS6, GSR, Build Philosophy
      expect(canon.executionPoint).toBe('pr_merge');
    });

    it('should validate gate configuration on startup', async () => {
      const { validateGateConfiguration } = await import('@/lib/foreman/governance/gate-executor');
      
      const validationResult = await validateGateConfiguration();
      
      expect(validationResult.valid).toBe(true);
      expect(validationResult.errors).toEqual([]);
    });
  });

  describe('Pre-Condition Validation', () => {
    it('should validate Build-to-Green completion', async () => {
      const { validatePreConditions } = await import('@/lib/foreman/governance/gate-executor');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        baseBranch: 'main',
        changedFiles: [],
        evidenceDir: '/tmp/evidence',
        logsDir: '/tmp/logs',
        workspaceRoot: '/workspace',
      };
      
      const result = await validatePreConditions(context);
      
      expect(result.buildToGreenComplete).toBe(true);
      expect(result.qaSuiteExecuted).toBe(true);
      expect(result.evidenceBundleExists).toBe(true);
      expect(result.allPreConditionsMet).toBe(true);
    });

    it('should fail if Build-to-Green incomplete', async () => {
      const { validatePreConditions } = await import('@/lib/foreman/governance/gate-executor');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/incomplete',
        baseBranch: 'main',
        changedFiles: [],
        evidenceDir: '/tmp/evidence',
        logsDir: '/tmp/logs',
        workspaceRoot: '/workspace',
      };
      
      const result = await validatePreConditions(context);
      
      expect(result.buildToGreenComplete).toBe(false);
      expect(result.allPreConditionsMet).toBe(false);
      expect(result.blockingIssues).toContain('Build-to-Green not complete');
    });
  });

  describe('Evidence Snapshot Creation', () => {
    it('should create immutable evidence snapshot before validation', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      expect(snapshot.snapshotId).toBeDefined();
      expect(snapshot.timestamp).toBeDefined();
      expect(snapshot.prNumber).toBe(123);
      expect(snapshot.commitSha).toBe('abc123');
      expect(snapshot.immutable).toBe(true);
      expect(snapshot.hash).toBeDefined();
    });

    it('should include all evidence files in snapshot', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      expect(snapshot.evidence).toBeDefined();
      expect(Object.keys(snapshot.evidence).length).toBeGreaterThan(0);
      
      // Check for expected evidence categories
      expect(snapshot.evidence['QIEL']).toBeDefined();
      expect(snapshot.evidence['CS1']).toBeDefined();
      expect(snapshot.evidence['BuildPhilosophy']).toBeDefined();
    });

    it('should compute hash for each evidence file', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      const qielEvidence = snapshot.evidence['QIEL'];
      expect(qielEvidence.files.length).toBeGreaterThan(0);
      
      qielEvidence.files.forEach(file => {
        expect(file.hash).toBeDefined();
        expect(file.hash).toMatch(/^[a-f0-9]{64}$/); // SHA-256 hash
      });
    });
  });

  describe('Control Validation Execution', () => {
    it('should execute all 9 controls in correct order', async () => {
      const { executeGate } = await import('@/lib/foreman/governance/gate-executor');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        baseBranch: 'main',
        changedFiles: [],
        evidenceDir: '/tmp/evidence',
        logsDir: '/tmp/logs',
        workspaceRoot: '/workspace',
      };
      
      const result = await executeGate(context);
      
      expect(result.controls).toHaveLength(9);
      
      // Verify execution order
      const controlNames = result.controls.map(c => c.controlName);
      expect(controlNames).toEqual([
        'QIEL',
        'CS1',
        'CS2',
        'CS3',
        'CS4',
        'CS5',
        'CS6',
        'GSR',
        'BuildPhilosophy'
      ]);
    });

    it('should stop execution on first control failure', async () => {
      const { executeGate } = await import('@/lib/foreman/governance/gate-executor');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/qiel-failure',
        baseBranch: 'main',
        changedFiles: [],
        evidenceDir: '/tmp/evidence',
        logsDir: '/tmp/logs',
        workspaceRoot: '/workspace',
      };
      
      const result = await executeGate(context);
      
      expect(result.passed).toBe(false);
      
      // Only QIEL should have executed (first failure)
      expect(result.controls.length).toBe(1);
      expect(result.controls[0].controlName).toBe('QIEL');
      expect(result.controls[0].status).toBe('FAIL');
    });
  });

  describe('Merge Blocking Logic', () => {
    it('should allow merge when all controls pass', async () => {
      const { executeGate } = await import('@/lib/foreman/governance/gate-executor');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/all-pass',
        baseBranch: 'main',
        changedFiles: [],
        evidenceDir: '/tmp/evidence',
        logsDir: '/tmp/logs',
        workspaceRoot: '/workspace',
      };
      
      const result = await executeGate(context);
      
      expect(result.passed).toBe(true);
      expect(result.violations).toEqual([]);
      expect(result.mergeAllowed).toBe(true);
    });

    it('should block merge when any control fails', async () => {
      const { executeGate } = await import('@/lib/foreman/governance/gate-executor');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/one-failure',
        baseBranch: 'main',
        changedFiles: [],
        evidenceDir: '/tmp/evidence',
        logsDir: '/tmp/logs',
        workspaceRoot: '/workspace',
      };
      
      const result = await executeGate(context);
      
      expect(result.passed).toBe(false);
      expect(result.violations.length).toBeGreaterThan(0);
      expect(result.mergeAllowed).toBe(false);
    });
  });

  describe('Performance Requirements', () => {
    it('should complete execution in less than 60 seconds (CI-safe threshold)', async () => {
      const { executeGate } = await import('@/lib/foreman/governance/gate-executor');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        baseBranch: 'main',
        changedFiles: [],
        evidenceDir: '/tmp/evidence',
        logsDir: '/tmp/logs',
        workspaceRoot: '/workspace',
      };
      
      const startTime = Date.now();
      await executeGate(context);
      const duration = Date.now() - startTime;
      
      // Target is 30s, but use 60s for CI environment tolerance
      expect(duration).toBeLessThan(60000); // 60 seconds (CI-safe)
    });
  });
});
