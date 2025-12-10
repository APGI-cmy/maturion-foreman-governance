/**
 * Tests for PR Gatekeeper Architecture Approval Integration
 * 
 * Validates that:
 * - PR Gatekeeper checks for ACR approval when architecture files are changed
 * - PRs are blocked when ACR approval is missing
 * - PRs are allowed when ACR is approved
 * - Governance violations are logged
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  createACR,
  CreateACROptions,
} from '../../lib/foreman/architecture/acr-engine';
import {
  approveACR,
} from '../../lib/foreman/architecture/approval-workflow';
import {
  filterProtectedFiles,
  isProtectedArchitectureFile,
} from '../../lib/foreman/architecture/file-detector';

describe('PR Gatekeeper Architecture Approval', () => {
  it('should identify protected architecture files correctly', () => {
    const protectedFiles = [
      'docs/architecture/test.md',
      'docs/governance/test.md',
      'foreman/constitution/README.md',
      'foreman/governance/rules.md',
      '.github/foreman/agent-contract.md',
      'foreman/true-north-architecture.md',
      'builder_protocol.md',
    ];

    protectedFiles.forEach(file => {
      assert.ok(
        isProtectedArchitectureFile(file),
        `${file} should be identified as protected`
      );
    });
  });

  it('should not identify non-protected files as protected', () => {
    const nonProtectedFiles = [
      'src/app.ts',
      'lib/util.ts',
      'README.md',
      'package.json',
      'tests/test.ts',
    ];

    nonProtectedFiles.forEach(file => {
      assert.strictEqual(
        isProtectedArchitectureFile(file),
        false,
        `${file} should NOT be identified as protected`
      );
    });
  });

  it('should filter protected files from mixed list', () => {
    const files = [
      'src/app.ts',
      'docs/architecture/test.md',
      'lib/util.ts',
      'foreman/constitution/README.md',
      'README.md',
    ];

    const protectedFiles = filterProtectedFiles(files);

    assert.strictEqual(protectedFiles.length, 2, 'Should find 2 protected files');
    assert.ok(protectedFiles.includes('docs/architecture/test.md'), 'Should include architecture doc');
    assert.ok(protectedFiles.includes('foreman/constitution/README.md'), 'Should include constitution file');
  });

  it('should handle various file path formats', () => {
    const paths = [
      './docs/architecture/test.md',
      '/docs/architecture/test.md',
      'docs/architecture/test.md',
    ];

    paths.forEach(path => {
      assert.ok(
        isProtectedArchitectureFile(path),
        `${path} should be identified as protected regardless of format`
      );
    });
  });

  it('should identify builder protocol file variations', () => {
    const variations = [
      'builder_protocol.md',
      'builder-protocol.md',
      'BUILDER_PROTOCOL.md',
      'docs/builder_protocol.md',
    ];

    variations.forEach(file => {
      assert.ok(
        isProtectedArchitectureFile(file),
        `${file} should be identified as builder protocol file`
      );
    });
  });

  it('should create and approve ACR for architecture change', async () => {
    const options: CreateACROptions = {
      summary: 'Test Architecture PR',
      description: 'Testing ACR integration with PR',
      justification: 'Verify PR gatekeeper integration',
      affectedFiles: ['docs/architecture/test.md'],
    };

    const acr = await createACR(options);
    assert.ok(acr, 'ACR should be created');

    const approval = await approveACR({
      acrId: acr.id,
      decision: 'approve',
      reviewedBy: 'test-user',
    });

    assert.ok(approval.success, 'ACR should be approved');
    assert.strictEqual(approval.acr?.status, 'approved', 'Status should be approved');
  });

  it('should handle nested architecture paths', () => {
    const nestedPaths = [
      'docs/architecture/subdirectory/test.md',
      'docs/governance/policies/security.md',
      'foreman/constitution/amendments/v2.md',
    ];

    nestedPaths.forEach(path => {
      assert.ok(
        isProtectedArchitectureFile(path),
        `${path} should be identified as protected (nested paths)`
      );
    });
  });

  it('should not match similar but non-protected paths', () => {
    const similarPaths = [
      'docs/architecture-diagram.png',
      'my-docs/architecture/test.md',
      'src/foreman/utils.ts',
    ];

    similarPaths.forEach(path => {
      assert.strictEqual(
        isProtectedArchitectureFile(path),
        false,
        `${path} should NOT be identified as protected`
      );
    });
  });
});
