/**
 * Evidence Snapshot Tests (RED QA)
 * 
 * Tests for evidence snapshot creation and validation.
 * Ensures evidence is captured immutably before gate validation.
 * 
 * Per BUILD_PHILOSOPHY.md: Red QA → Build to Green
 */

import { describe, it, expect } from '@jest/globals';

describe('Evidence Snapshot', () => {
  describe('Snapshot Creation', () => {
    it('should create snapshot with unique ID', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      expect(snapshot.snapshotId).toBeDefined();
      expect(snapshot.snapshotId).toMatch(/^snapshot_\d+_[a-z0-9]+$/);
    });

    it('should include timestamp in snapshot', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      expect(snapshot.timestamp).toBeDefined();
      expect(new Date(snapshot.timestamp).getTime()).toBeLessThanOrEqual(Date.now());
    });

    it('should include PR metadata', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123def456',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      expect(snapshot.prNumber).toBe(123);
      expect(snapshot.commitSha).toBe('abc123def456');
    });

    it('should mark snapshot as immutable', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      expect(snapshot.immutable).toBe(true);
    });

    it('should compute snapshot hash', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      expect(snapshot.hash).toBeDefined();
      expect(snapshot.hash).toMatch(/^[a-f0-9]{64}$/); // SHA-256
    });
  });

  describe('Evidence Collection', () => {
    it('should collect QIEL evidence', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      expect(snapshot.evidence['QIEL']).toBeDefined();
      expect(snapshot.evidence['QIEL'].files.length).toBeGreaterThan(0);
    });

    it('should collect CS1 evidence', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      expect(snapshot.evidence['CS1']).toBeDefined();
      expect(snapshot.evidence['CS1'].files.length).toBeGreaterThan(0);
    });

    it('should collect Build Philosophy evidence', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      expect(snapshot.evidence['BuildPhilosophy']).toBeDefined();
      expect(snapshot.evidence['BuildPhilosophy'].files.length).toBeGreaterThan(0);
    });

    it('should hash each evidence file', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      Object.values(snapshot.evidence).forEach(controlEvidence => {
        controlEvidence.files.forEach(file => {
          expect(file.hash).toBeDefined();
          expect(file.hash).toMatch(/^[a-f0-9]{64}$/); // SHA-256
          expect(file.size).toBeGreaterThan(0);
          expect(file.timestamp).toBeDefined();
        });
      });
    });

    it('should include metadata for each control', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      Object.values(snapshot.evidence).forEach(controlEvidence => {
        expect(controlEvidence.metadata).toBeDefined();
        expect(typeof controlEvidence.metadata).toBe('object');
      });
    });
  });

  describe('Snapshot Immutability', () => {
    it('should prevent modification after creation', async () => {
      const { createEvidenceSnapshot, modifySnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      await expect(modifySnapshot(snapshot.snapshotId, {
        immutable: false
      })).rejects.toThrow('Snapshot is immutable and cannot be modified');
    });

    it('should prevent adding evidence after creation', async () => {
      const { createEvidenceSnapshot, addEvidence } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      await expect(addEvidence(snapshot.snapshotId, 'NEW_CONTROL', [])).rejects.toThrow('Cannot add evidence to immutable snapshot');
    });

    it('should prevent removing evidence after creation', async () => {
      const { createEvidenceSnapshot, removeEvidence } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      await expect(removeEvidence(snapshot.snapshotId, 'QIEL')).rejects.toThrow('Cannot remove evidence from immutable snapshot');
    });

    it('should detect tampering via hash validation', async () => {
      const { createEvidenceSnapshot, validateSnapshotIntegrity } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      // Simulate tampering (modifying evidence object directly - should be caught)
      const tamperedSnapshot = {
        ...snapshot,
        evidence: {
          ...snapshot.evidence,
          QIEL: {
            ...snapshot.evidence.QIEL,
            files: []
          }
        }
      };
      
      const integrity = await validateSnapshotIntegrity(tamperedSnapshot);
      
      expect(integrity.valid).toBe(false);
      expect(integrity.reason).toContain('Hash mismatch - tampering detected');
    });
  });

  describe('Snapshot Persistence', () => {
    it('should save snapshot to disk', async () => {
      const { createEvidenceSnapshot, saveSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      const savedPath = await saveSnapshot(snapshot);
      
      expect(savedPath).toBeDefined();
      expect(savedPath).toMatch(/\/evidence-snapshots\/snapshot_\d+_[a-z0-9]+\.json$/);
    });

    it('should load snapshot from disk', async () => {
      const { createEvidenceSnapshot, saveSnapshot, loadSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      await saveSnapshot(snapshot);
      
      const loaded = await loadSnapshot(snapshot.snapshotId);
      
      expect(loaded).toEqual(snapshot);
    });

    it('should validate snapshot integrity on load', async () => {
      const { createEvidenceSnapshot, saveSnapshot, loadSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      await saveSnapshot(snapshot);
      
      // Load should validate hash automatically
      const loaded = await loadSnapshot(snapshot.snapshotId);
      
      expect(loaded.hash).toBe(snapshot.hash);
    });
  });

  describe('Evidence Validation', () => {
    it('should validate all required evidence present', async () => {
      const { createEvidenceSnapshot, validateEvidenceCompleteness } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence-complete',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      const validation = await validateEvidenceCompleteness(snapshot);
      
      expect(validation.complete).toBe(true);
      expect(validation.missingEvidence).toEqual([]);
    });

    it('should detect missing evidence', async () => {
      const { createEvidenceSnapshot, validateEvidenceCompleteness } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence-incomplete',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      const validation = await validateEvidenceCompleteness(snapshot);
      
      expect(validation.complete).toBe(false);
      expect(validation.missingEvidence.length).toBeGreaterThan(0);
      expect(validation.missingEvidence).toContain('CS2'); // Example missing
    });

    it('should validate evidence file integrity', async () => {
      const { createEvidenceSnapshot, validateEvidenceFileIntegrity } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      const validation = await validateEvidenceFileIntegrity(snapshot, 'QIEL');
      
      expect(validation.valid).toBe(true);
      expect(validation.corruptFiles).toEqual([]);
    });
  });

  describe('Snapshot Metadata', () => {
    it('should include creation context', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        baseBranch: 'main',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      expect(snapshot.metadata).toBeDefined();
      expect(snapshot.metadata.branch).toBe('feature/test');
      expect(snapshot.metadata.baseBranch).toBe('main');
    });

    it('should include evidence collection statistics', async () => {
      const { createEvidenceSnapshot } = await import('@/lib/foreman/governance/evidence/evidence-snapshot');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        branch: 'feature/test',
        evidenceDir: '/tmp/evidence',
      };
      
      const snapshot = await createEvidenceSnapshot(context);
      
      expect(snapshot.metadata.statistics).toBeDefined();
      expect(snapshot.metadata.statistics.totalFiles).toBeGreaterThan(0);
      expect(snapshot.metadata.statistics.totalSize).toBeGreaterThan(0);
      expect(snapshot.metadata.statistics.controlsIncluded).toBeGreaterThan(0);
    });
  });
});
