/**
 * Tests for ACR Engine
 * 
 * Validates that:
 * - ACRs can be created with required fields
 * - ACRs are stored in governance memory
 * - ACR IDs are unique and properly formatted
 * - Risk levels are correctly determined
 * - Architecture change approval validation works
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  createACR,
  getACR,
  validateArchitectureChangeApproval,
  CreateACROptions,
} from '../../lib/foreman/architecture/acr-engine';

describe('ACR Engine', () => {
  it('should create an ACR with required fields', async () => {
    const options: CreateACROptions = {
      summary: 'Test Architecture Change',
      description: 'This is a test ACR for unit testing',
      justification: 'Testing the ACR creation workflow',
      affectedFiles: ['docs/architecture/test.md'],
    };

    const acr = await createACR(options);

    assert.ok(acr, 'ACR should be created');
    assert.ok(acr.id, 'ACR should have an ID');
    assert.ok(acr.id.startsWith('ACR-'), 'ACR ID should start with ACR-');
    assert.strictEqual(acr.status, 'pending', 'ACR status should be pending');
    assert.strictEqual(acr.summary, options.summary, 'Summary should match');
    assert.strictEqual(acr.description, options.description, 'Description should match');
    assert.strictEqual(acr.justification, options.justification, 'Justification should match');
    assert.ok(acr.createdAt, 'ACR should have creation timestamp');
    assert.strictEqual(acr.createdBy, 'foreman', 'ACR should be created by foreman');
  });

  it('should create ACR with correct risk level based on files', async () => {
    const criticalOptions: CreateACROptions = {
      summary: 'Critical Change',
      description: 'Modifying constitutional files',
      justification: 'Testing critical risk',
      affectedFiles: ['foreman/constitution/README.md'],
    };

    const criticalACR = await createACR(criticalOptions);
    assert.strictEqual(criticalACR.riskLevel, 'critical', 'Constitutional changes should be critical risk');

    const highOptions: CreateACROptions = {
      summary: 'High Risk Change',
      description: 'Modifying governance files',
      justification: 'Testing high risk',
      affectedFiles: ['foreman/governance/test.md'],
    };

    const highACR = await createACR(highOptions);
    assert.strictEqual(highACR.riskLevel, 'high', 'Governance changes should be high risk');
  });

  it('should determine scope correctly', async () => {
    const minorOptions: CreateACROptions = {
      summary: 'Minor Change',
      description: 'Small documentation update',
      justification: 'Testing minor scope',
      affectedFiles: ['docs/architecture/test.md'],
    };

    const minorACR = await createACR(minorOptions);
    assert.strictEqual(minorACR.impact.scope, 'minor', 'Should be minor scope for 1 file');

    const moderateOptions: CreateACROptions = {
      summary: 'Moderate Change',
      description: 'Multiple file update',
      justification: 'Testing moderate scope',
      affectedFiles: [
        'docs/architecture/file1.md',
        'docs/architecture/file2.md',
        'docs/architecture/file3.md',
        'docs/architecture/file4.md',
      ],
    };

    const moderateACR = await createACR(moderateOptions);
    assert.strictEqual(moderateACR.impact.scope, 'moderate', 'Should be moderate scope for 4 files');
  });

  it('should retrieve created ACR by ID', async () => {
    const options: CreateACROptions = {
      summary: 'Test Retrieval',
      description: 'Testing ACR retrieval',
      justification: 'Verify get operation',
      affectedFiles: ['docs/architecture/test.md'],
    };

    const createdACR = await createACR(options);
    const retrievedACR = await getACR(createdACR.id);

    assert.ok(retrievedACR, 'Should retrieve ACR');
    assert.strictEqual(retrievedACR?.id, createdACR.id, 'Retrieved ACR ID should match');
    assert.strictEqual(retrievedACR?.summary, createdACR.summary, 'Retrieved ACR summary should match');
  });

  it('should validate architecture change approval correctly', async () => {
    // Test without ACR - should fail
    const files = ['docs/architecture/test.md'];
    const result1 = await validateArchitectureChangeApproval(files);

    assert.strictEqual(result1.approved, false, 'Should not be approved without ACR');
    assert.ok(result1.reason, 'Should have a reason for rejection');

    // Test with non-existent ACR - should fail
    const result2 = await validateArchitectureChangeApproval(files, 'ACR-INVALID-12345');

    assert.strictEqual(result2.approved, false, 'Should not be approved with invalid ACR');
    assert.ok(result2.reason.includes('not found'), 'Reason should mention ACR not found');
  });

  it('should include build context in ACR', async () => {
    const options: CreateACROptions = {
      summary: 'Test with Context',
      description: 'Testing build context',
      justification: 'Verify context storage',
      affectedFiles: ['docs/architecture/test.md'],
      buildId: 'build-123',
      sequenceId: 'seq-456',
      commitSha: 'abc123',
      branch: 'feature/test',
    };

    const acr = await createACR(options);

    assert.ok(acr.context, 'ACR should have context');
    assert.strictEqual(acr.context?.buildId, 'build-123', 'Build ID should match');
    assert.strictEqual(acr.context?.sequenceId, 'seq-456', 'Sequence ID should match');
    assert.strictEqual(acr.context?.commitSha, 'abc123', 'Commit SHA should match');
    assert.strictEqual(acr.context?.branch, 'feature/test', 'Branch should match');
  });

  it('should handle alternatives in ACR', async () => {
    const options: CreateACROptions = {
      summary: 'Test Alternatives',
      description: 'Testing alternatives tracking',
      justification: 'Verify alternatives storage',
      affectedFiles: ['docs/architecture/test.md'],
      alternatives: [
        'Alternative 1: Do nothing',
        'Alternative 2: Use different approach',
      ],
    };

    const acr = await createACR(options);

    assert.ok(acr.alternatives, 'ACR should have alternatives');
    assert.strictEqual(acr.alternatives.length, 2, 'Should have 2 alternatives');
    assert.ok(acr.alternatives.includes('Alternative 1: Do nothing'), 'Should include first alternative');
  });
});
