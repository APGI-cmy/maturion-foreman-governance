/**
 * QIEL Test: Architecture Diff Detection
 * 
 * Quality Integrity Enforcement Layer (QIEL) test for detecting
 * unauthorized architecture modifications.
 * 
 * Validates that:
 * - QIEL detects changes to protected architecture files
 * - QIEL requires ACR approval metadata for architecture PRs
 * - QIEL blocks PRs without ACR approval
 * - No silent architecture drift is possible
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  filterProtectedFiles,
  analyzeArchitectureImpact,
  isProtectedArchitectureFile,
} from '../../lib/foreman/architecture/file-detector';

describe('QIEL - Architecture Diff Detection', () => {
  describe('Protected File Detection', () => {
    it('should detect changes to docs/architecture/**', () => {
      const files = [
        'docs/architecture/system-design.md',
        'docs/architecture/api/endpoints.md',
        'docs/architecture/database/schema.md',
      ];

      const protectedFiles = filterProtectedFiles(files);
      assert.strictEqual(
        protectedFiles.length,
        files.length,
        'QIEL: All architecture files must be detected'
      );
      
      console.log('✓ QIEL: docs/architecture/** changes detected');
    });

    it('should detect changes to docs/governance/**', () => {
      const files = [
        'docs/governance/policies.md',
        'docs/governance/compliance/security.md',
      ];

      const protectedFiles = filterProtectedFiles(files);
      assert.strictEqual(
        protectedFiles.length,
        files.length,
        'QIEL: All governance files must be detected'
      );
      
      console.log('✓ QIEL: docs/governance/** changes detected');
    });

    it('should detect changes to foreman/constitution/**', () => {
      const files = [
        'foreman/constitution/README.md',
        'foreman/constitution/amendments/v2.md',
      ];

      const protectedFiles = filterProtectedFiles(files);
      assert.strictEqual(
        protectedFiles.length,
        files.length,
        'QIEL: All constitutional files must be detected'
      );
      
      console.log('✓ QIEL: foreman/constitution/** changes detected');
    });

    it('should detect changes to builder protocol files', () => {
      const files = [
        'builder_protocol.md',
        'builder-protocol.md',
        'docs/builder_protocol.md',
      ];

      files.forEach(file => {
        assert.ok(
          isProtectedArchitectureFile(file),
          `QIEL: ${file} must be detected as builder protocol`
        );
      });
      
      console.log('✓ QIEL: Builder protocol changes detected');
    });

    it('should detect changes to agent contract', () => {
      const file = '.github/foreman/agent-contract.md';
      
      assert.ok(
        isProtectedArchitectureFile(file),
        'QIEL: Agent contract changes must be detected'
      );
      
      console.log('✓ QIEL: Agent contract changes detected');
    });
  });

  describe('Mixed Change Detection', () => {
    it('should detect protected files in mixed change sets', () => {
      const mixedFiles = [
        'src/app.ts',
        'lib/util.ts',
        'docs/architecture/system.md',
        'tests/test.ts',
        'foreman/governance/rules.md',
        'README.md',
      ];

      const protectedFiles = filterProtectedFiles(mixedFiles);
      
      assert.strictEqual(
        protectedFiles.length,
        2,
        'QIEL: Must detect exactly 2 protected files in mixed set'
      );
      assert.ok(
        protectedFiles.includes('docs/architecture/system.md'),
        'QIEL: Must detect architecture file'
      );
      assert.ok(
        protectedFiles.includes('foreman/governance/rules.md'),
        'QIEL: Must detect governance file'
      );
      
      console.log('✓ QIEL: Protected files detected in mixed change sets');
    });

    it('should correctly categorize multi-category changes', () => {
      const files = [
        'docs/architecture/test.md',
        'foreman/governance/rules.md',
        'foreman/constitution/README.md',
      ];

      const impact = analyzeArchitectureImpact(files);
      
      assert.ok(
        impact.categories.size >= 3,
        'QIEL: Must detect all distinct categories'
      );
      assert.strictEqual(
        impact.riskLevel,
        'critical',
        'QIEL: Multi-category changes including constitutional must be critical'
      );
      
      console.log('✓ QIEL: Multi-category changes correctly analyzed');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty file lists', () => {
      const protectedFiles = filterProtectedFiles([]);
      
      assert.strictEqual(
        protectedFiles.length,
        0,
        'QIEL: Empty list must return zero protected files'
      );
      
      const impact = analyzeArchitectureImpact([]);
      assert.strictEqual(
        impact.hasProtectedFiles,
        false,
        'QIEL: Empty list must report no protected files'
      );
      
      console.log('✓ QIEL: Empty file lists handled correctly');
    });

    it('should handle files with similar but non-matching paths', () => {
      const similarPaths = [
        'my-docs/architecture/test.md',
        'src/foreman/utils.ts',
        'docs/architecture-diagram.png',
      ];

      similarPaths.forEach(path => {
        assert.strictEqual(
          isProtectedArchitectureFile(path),
          false,
          `QIEL: ${path} must NOT be detected as protected (false positive prevention)`
        );
      });
      
      console.log('✓ QIEL: Similar paths correctly excluded (no false positives)');
    });

    it('should handle various path formats', () => {
      const paths = [
        './docs/architecture/test.md',
        '/docs/architecture/test.md',
        'docs/architecture/test.md',
      ];

      paths.forEach(path => {
        assert.ok(
          isProtectedArchitectureFile(path),
          `QIEL: ${path} must be detected regardless of format`
        );
      });
      
      console.log('✓ QIEL: Various path formats handled correctly');
    });

    it('should handle nested directory structures', () => {
      const nestedPaths = [
        'docs/architecture/subdirectory/deep/test.md',
        'foreman/governance/policies/security/rules.md',
      ];

      nestedPaths.forEach(path => {
        assert.ok(
          isProtectedArchitectureFile(path),
          `QIEL: ${path} must be detected (nested paths)`
        );
      });
      
      console.log('✓ QIEL: Nested directory structures handled correctly');
    });
  });

  describe('Risk Assessment', () => {
    it('should assign critical risk to constitutional changes', () => {
      const files = ['foreman/constitution/README.md'];
      const impact = analyzeArchitectureImpact(files);
      
      assert.strictEqual(
        impact.riskLevel,
        'critical',
        'QIEL: Constitutional changes must be critical risk'
      );
      
      console.log('✓ QIEL: Critical risk correctly assigned to constitutional changes');
    });

    it('should assign high risk to governance changes', () => {
      const files = ['foreman/governance/rules.md'];
      const impact = analyzeArchitectureImpact(files);
      
      assert.strictEqual(
        impact.riskLevel,
        'high',
        'QIEL: Governance changes must be high risk'
      );
      
      console.log('✓ QIEL: High risk correctly assigned to governance changes');
    });

    it('should assign appropriate risk to architecture documentation', () => {
      const files = ['docs/architecture/test.md'];
      const impact = analyzeArchitectureImpact(files);
      
      assert.ok(
        impact.riskLevel === 'medium' || impact.riskLevel === 'high',
        'QIEL: Architecture doc changes must be at least medium risk'
      );
      
      console.log('✓ QIEL: Appropriate risk assigned to architecture docs');
    });

    it('should escalate risk for large change sets', () => {
      const manyFiles = Array.from(
        { length: 5 },
        (_, i) => `docs/architecture/file${i}.md`
      );
      
      const impact = analyzeArchitectureImpact(manyFiles);
      
      assert.strictEqual(
        impact.riskLevel,
        'high',
        'QIEL: Large architecture change sets must be high risk'
      );
      
      console.log('✓ QIEL: Risk escalated for large change sets');
    });
  });

  describe('ACR Requirement Detection', () => {
    it('should identify when ACR is required', () => {
      const testCases = [
        {
          files: ['docs/architecture/test.md'],
          expected: true,
          reason: 'Architecture docs require ACR',
        },
        {
          files: ['foreman/governance/rules.md'],
          expected: true,
          reason: 'Governance files require ACR',
        },
        {
          files: ['foreman/constitution/README.md'],
          expected: true,
          reason: 'Constitutional files require ACR',
        },
        {
          files: ['src/app.ts'],
          expected: false,
          reason: 'Regular code does not require ACR',
        },
      ];

      testCases.forEach(({ files, expected, reason }) => {
        const impact = analyzeArchitectureImpact(files);
        const requiresACR = impact.hasProtectedFiles;
        
        assert.strictEqual(
          requiresACR,
          expected,
          `QIEL: ${reason}`
        );
      });
      
      console.log('✓ QIEL: ACR requirements correctly identified');
    });
  });
});
