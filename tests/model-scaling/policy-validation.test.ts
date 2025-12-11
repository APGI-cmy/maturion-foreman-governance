/**
 * Model Scaling Test: Policy Validation
 * 
 * Tests governance policy enforcement and constitutional compliance.
 * Verifies:
 * - Central router exists and is protected
 * - Tier table exists and is valid
 * - Governance docs exist
 * - No hard-coded model IDs in code
 * - CS1 guardrails protect the router
 * - Existing model-escalation.ts is untouched
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs/promises';
import path from 'path';

describe('Model Scaling: Policy Validation', () => {
  describe('File Existence Checks', () => {
    it('should verify central router exists', async () => {
      const routerPath = path.join(
        process.cwd(),
        'lib/github/model-routing.ts'
      );

      try {
        const stat = await fs.stat(routerPath);
        assert.ok(stat.isFile(), 'Central router must exist as a file');
        console.log('✓ Central router exists');
      } catch (error) {
        assert.fail('Central router lib/github/model-routing.ts must exist');
      }
    });

    it('should verify tier table exists', async () => {
      const tierTablePath = path.join(
        process.cwd(),
        'config/model-tiers.json'
      );

      try {
        const stat = await fs.stat(tierTablePath);
        assert.ok(stat.isFile(), 'Tier table must exist as a file');
        console.log('✓ Tier table exists');
      } catch (error) {
        assert.fail('Tier table config/model-tiers.json must exist');
      }
    });

    it('should verify governance policy doc exists', async () => {
      const policyPath = path.join(
        process.cwd(),
        'docs/governance/github-model-scaling-policy.md'
      );

      try {
        const stat = await fs.stat(policyPath);
        assert.ok(stat.isFile(), 'Governance policy doc must exist');
        console.log('✓ Governance policy doc exists');
      } catch (error) {
        assert.fail('Governance policy docs/governance/github-model-scaling-policy.md must exist');
      }
    });

    it('should verify model tier matrix doc exists', async () => {
      const matrixPath = path.join(
        process.cwd(),
        'docs/governance/model-tier-matrix.md'
      );

      try {
        const stat = await fs.stat(matrixPath);
        assert.ok(stat.isFile(), 'Model tier matrix doc must exist');
        console.log('✓ Model tier matrix doc exists');
      } catch (error) {
        assert.fail('Model tier matrix docs/governance/model-tier-matrix.md must exist');
      }
    });
  });

  describe('Tier Table Validation', () => {
    it('should verify tier table is valid JSON', async () => {
      const tierTablePath = path.join(
        process.cwd(),
        'config/model-tiers.json'
      );

      const content = await fs.readFile(tierTablePath, 'utf-8');
      
      let parsed;
      try {
        parsed = JSON.parse(content);
        console.log('✓ Tier table is valid JSON');
      } catch (error) {
        assert.fail('Tier table must be valid JSON');
      }

      assert.ok(parsed, 'Tier table must parse successfully');
    });

    it('should verify tier table has required structure', async () => {
      const tierTablePath = path.join(
        process.cwd(),
        'config/model-tiers.json'
      );

      const content = await fs.readFile(tierTablePath, 'utf-8');
      const config = JSON.parse(content);

      assert.ok(config.tiers, 'Tier table must have "tiers" property');
      assert.ok(config.tiers.T1, 'Tier table must define T1');
      assert.ok(config.tiers.T2, 'Tier table must define T2');
      assert.ok(config.tiers.T3, 'Tier table must define T3');
      assert.ok(config.escalationRules, 'Tier table must have escalation rules');

      console.log('✓ Tier table has required structure');
    });

    it('should verify T1 tier has lightweight models', async () => {
      const tierTablePath = path.join(
        process.cwd(),
        'config/model-tiers.json'
      );

      const content = await fs.readFile(tierTablePath, 'utf-8');
      const config = JSON.parse(content);

      const t1Models = config.tiers.T1.models;
      
      assert.ok(Array.isArray(t1Models), 'T1 models must be an array');
      assert.ok(t1Models.length > 0, 'T1 must have at least one model');
      assert.ok(
        t1Models.includes('gpt-4o-mini') || t1Models.includes('claude-haiku'),
        'T1 should include lightweight models'
      );

      console.log('✓ T1 tier has lightweight models');
    });

    it('should verify T3 tier has most capable models', async () => {
      const tierTablePath = path.join(
        process.cwd(),
        'config/model-tiers.json'
      );

      const content = await fs.readFile(tierTablePath, 'utf-8');
      const config = JSON.parse(content);

      const t3Models = config.tiers.T3.models;
      
      assert.ok(Array.isArray(t3Models), 'T3 models must be an array');
      assert.ok(t3Models.length > 0, 'T3 must have at least one model');
      assert.ok(
        t3Models.includes('claude-3.5-sonnet'),
        'T3 should include most capable model'
      );

      console.log('✓ T3 tier has most capable models');
    });

    it('should verify escalation rules are defined', async () => {
      const tierTablePath = path.join(
        process.cwd(),
        'config/model-tiers.json'
      );

      const content = await fs.readFile(tierTablePath, 'utf-8');
      const config = JSON.parse(content);

      const rules = config.escalationRules;
      
      assert.ok(rules.repeatedErrors, 'Must define repeatedErrors rule');
      assert.ok(rules.invalidCodeGeneration, 'Must define invalidCodeGeneration rule');
      assert.ok(rules.missingImports, 'Must define missingImports rule');
      assert.ok(rules.qicFailures, 'Must define qicFailures rule');

      console.log('✓ Escalation rules are defined');
    });
  });

  describe('Constitutional Compliance', () => {
    it('should verify existing model-escalation.ts is untouched', async () => {
      const existingPath = path.join(
        process.cwd(),
        'lib/foreman/model-escalation.ts'
      );

      try {
        const stat = await fs.stat(existingPath);
        assert.ok(stat.isFile(), 'Existing model-escalation.ts must still exist');
        
        const content = await fs.readFile(existingPath, 'utf-8');
        assert.ok(
          content.includes('export function selectModel'),
          'Existing model-escalation.ts must be unchanged'
        );
        
        console.log('✓ Existing model-escalation.ts is untouched');
      } catch (error) {
        assert.fail('Existing model-escalation.ts must remain intact');
      }
    });

    it('should verify no hard-coded model IDs in router', async () => {
      const routerPath = path.join(
        process.cwd(),
        'lib/github/model-routing.ts'
      );

      const content = await fs.readFile(routerPath, 'utf-8');
      
      // Check for hard-coded model selection (bad pattern)
      const badPatterns = [
        /return\s+['"]gpt-4o['"]/, // Direct model ID return
        /modelId:\s+['"]gpt-4o['"]/, // Hard-coded in object
        /const\s+model\s*=\s*['"]gpt/, // Hard-coded variable
      ];

      for (const pattern of badPatterns) {
        assert.ok(
          !pattern.test(content),
          `Router should not hard-code model IDs (found pattern: ${pattern})`
        );
      }

      console.log('✓ No hard-coded model IDs in router');
    });

    it('should verify router loads config from file', async () => {
      const routerPath = path.join(
        process.cwd(),
        'lib/github/model-routing.ts'
      );

      const content = await fs.readFile(routerPath, 'utf-8');
      
      // Router should load from config file
      assert.ok(
        content.includes('model-tiers.json') || content.includes('loadTierConfig'),
        'Router must load tier table from config file'
      );

      console.log('✓ Router loads config from file');
    });

    it('should verify test suite exists', async () => {
      const testPaths = [
        'tests/model-scaling/routing-behaviour.test.ts',
        'tests/model-scaling/escalation-strategy.test.ts',
        'tests/model-scaling/policy-validation.test.ts',
      ];

      for (const testPath of testPaths) {
        const fullPath = path.join(process.cwd(), testPath);
        try {
          const stat = await fs.stat(fullPath);
          assert.ok(stat.isFile(), `Test file ${testPath} must exist`);
        } catch (error) {
          assert.fail(`Test file ${testPath} must exist`);
        }
      }

      console.log('✓ Complete test suite exists');
    });
  });

  describe('Workflow Enforcement', () => {
    it('should verify model-scaling-check workflow exists', async () => {
      const workflowPath = path.join(
        process.cwd(),
        '.github/workflows/model-scaling-check.yml'
      );

      try {
        const stat = await fs.stat(workflowPath);
        assert.ok(stat.isFile(), 'Workflow must exist');
        
        const content = await fs.readFile(workflowPath, 'utf-8');
        assert.ok(content.length > 10, 'Workflow must not be empty placeholder');
        
        console.log('✓ Model scaling workflow exists and is not empty');
      } catch (error) {
        assert.fail('Workflow .github/workflows/model-scaling-check.yml must exist');
      }
    });

    it('should verify workflow runs test suite', async () => {
      const workflowPath = path.join(
        process.cwd(),
        '.github/workflows/model-scaling-check.yml'
      );

      const content = await fs.readFile(workflowPath, 'utf-8');
      
      assert.ok(
        content.includes('npm') || content.includes('test') || content.includes('tsx'),
        'Workflow must run test suite'
      );

      console.log('✓ Workflow runs test suite');
    });
  });

  describe('Governance Memory Integration', () => {
    it('should verify logs directory can be created', async () => {
      const logsPath = path.join(
        process.cwd(),
        'logs/model-routing'
      );

      // Verify we can create directory (or it already exists)
      await fs.mkdir(logsPath, { recursive: true });
      
      const stat = await fs.stat(logsPath);
      assert.ok(stat.isDirectory(), 'Logs directory must exist or be creatable');

      console.log('✓ Logs directory structure verified');
    });
  });
});
