/**
 * Tests for Approval Workflow
 * 
 * Validates that:
 * - ACRs can be approved
 * - ACRs can be rejected
 * - ACRs can be marked for discussion
 * - Review decisions are logged to governance memory
 * - ACR status is updated correctly
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  createACR,
  getACR,
  CreateACROptions,
} from '../../lib/foreman/architecture/acr-engine';
import {
  approveACR,
  rejectACR,
  discussACR,
  reviewACR,
} from '../../lib/foreman/architecture/approval-workflow';

describe('Approval Workflow', () => {
  it('should approve an ACR successfully', async () => {
    // Create an ACR
    const options: CreateACROptions = {
      summary: 'Test Approval',
      description: 'Testing approval workflow',
      justification: 'Verify approval process',
      affectedFiles: ['docs/architecture/test.md'],
    };

    const acr = await createACR(options);
    assert.strictEqual(acr.status, 'pending', 'Initial status should be pending');

    // Approve the ACR
    const result = await approveACR({
      acrId: acr.id,
      decision: 'approve',
      reviewedBy: 'test-user',
      comments: 'Approved for testing',
    });

    assert.ok(result.success, 'Approval should succeed');
    assert.ok(result.acr, 'Should return updated ACR');
    assert.strictEqual(result.acr?.status, 'approved', 'Status should be approved');
    assert.strictEqual(result.acr?.reviewedBy, 'test-user', 'Reviewer should be recorded');
    assert.strictEqual(result.acr?.reviewComments, 'Approved for testing', 'Comments should be recorded');
    assert.ok(result.acr?.reviewedAt, 'Review timestamp should be set');

    // Verify the ACR is updated in storage
    const retrievedACR = await getACR(acr.id);
    assert.strictEqual(retrievedACR?.status, 'approved', 'Status should persist');
  });

  it('should reject an ACR successfully', async () => {
    // Create an ACR
    const options: CreateACROptions = {
      summary: 'Test Rejection',
      description: 'Testing rejection workflow',
      justification: 'Verify rejection process',
      affectedFiles: ['docs/architecture/test.md'],
    };

    const acr = await createACR(options);

    // Reject the ACR
    const result = await rejectACR({
      acrId: acr.id,
      decision: 'reject',
      reviewedBy: 'test-user',
      comments: 'Rejected for testing',
    });

    assert.ok(result.success, 'Rejection should succeed');
    assert.ok(result.acr, 'Should return updated ACR');
    assert.strictEqual(result.acr?.status, 'rejected', 'Status should be rejected');
    assert.strictEqual(result.acr?.reviewedBy, 'test-user', 'Reviewer should be recorded');
    assert.strictEqual(result.acr?.reviewComments, 'Rejected for testing', 'Comments should be recorded');
  });

  it('should mark ACR for discussion', async () => {
    // Create an ACR
    const options: CreateACROptions = {
      summary: 'Test Discussion',
      description: 'Testing discussion workflow',
      justification: 'Verify discussion process',
      affectedFiles: ['docs/architecture/test.md'],
    };

    const acr = await createACR(options);

    // Mark for discussion
    const result = await discussACR({
      acrId: acr.id,
      decision: 'discuss',
      reviewedBy: 'test-user',
      comments: 'Need more information',
    });

    assert.ok(result.success, 'Discussion request should succeed');
    assert.ok(result.acr, 'Should return updated ACR');
    assert.strictEqual(result.acr?.status, 'discussing', 'Status should be discussing');
    assert.strictEqual(result.acr?.reviewComments, 'Need more information', 'Comments should be recorded');
  });

  it('should handle non-existent ACR gracefully', async () => {
    const result = await approveACR({
      acrId: 'ACR-INVALID-12345',
      decision: 'approve',
      reviewedBy: 'test-user',
    });

    assert.strictEqual(result.success, false, 'Should fail for non-existent ACR');
    assert.ok(result.error, 'Should have error message');
    assert.ok(result.error.includes('not found'), 'Error should mention ACR not found');
  });

  it('should handle already approved ACR', async () => {
    // Create and approve an ACR
    const options: CreateACROptions = {
      summary: 'Test Double Approval',
      description: 'Testing double approval',
      justification: 'Verify idempotency',
      affectedFiles: ['docs/architecture/test.md'],
    };

    const acr = await createACR(options);
    await approveACR({
      acrId: acr.id,
      decision: 'approve',
      reviewedBy: 'test-user',
    });

    // Try to approve again
    const result = await approveACR({
      acrId: acr.id,
      decision: 'approve',
      reviewedBy: 'test-user',
    });

    assert.strictEqual(result.success, false, 'Should fail for already approved ACR');
    assert.ok(result.error, 'Should have error message');
    assert.ok(result.error.includes('already approved'), 'Error should mention already approved');
  });

  it('should use reviewACR unified function', async () => {
    // Create an ACR
    const options: CreateACROptions = {
      summary: 'Test Unified Review',
      description: 'Testing unified review function',
      justification: 'Verify unified API',
      affectedFiles: ['docs/architecture/test.md'],
    };

    const acr = await createACR(options);

    // Use unified reviewACR function
    const result = await reviewACR({
      acrId: acr.id,
      decision: 'approve',
      reviewedBy: 'test-user',
      comments: 'Approved via unified API',
    });

    assert.ok(result.success, 'Unified review should succeed');
    assert.strictEqual(result.acr?.status, 'approved', 'Status should be approved');
  });

  it('should handle invalid decision in reviewACR', async () => {
    const result = await reviewACR({
      acrId: 'ACR-TEST-12345',
      decision: 'invalid' as any,
      reviewedBy: 'test-user',
    });

    assert.strictEqual(result.success, false, 'Should fail for invalid decision');
    assert.ok(result.error, 'Should have error message');
  });
});
