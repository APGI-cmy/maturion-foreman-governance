/**
 * Orphaned QA Watcher System Tests
 * 
 * Tests for the watcher that monitors parked QA and triggers reactivation.
 */

import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import {
  loadParkedQA,
  checkModuleExists,
  checkExportsExist,
  parseTriggerCondition,
  checkTriggerConditions,
  scanParkedQA,
  runWatcherScan,
} from '@/lib/foreman/qa/orphaned-qa-watcher';

describe('Orphaned QA Watcher System', () => {
  describe('loadParkedQA', () => {
    it('should load parked QA metadata', async () => {
      const storage = await loadParkedQA();
      
      assert.ok(storage, 'Storage should be defined');
      assert.strictEqual(storage.version, '1.0.0', 'Version should be 1.0.0');
      assert.strictEqual(typeof storage.totalParked, 'number', 'totalParked should be a number');
      assert.ok(Array.isArray(storage.parkedQA), 'parkedQA should be an array');
    });

    it('should load current parked entries', async () => {
      const storage = await loadParkedQA();
      
      // As of implementation, we have 4 memory tests parked
      assert.ok(storage.totalParked >= 4, 'Should have at least 4 parked entries');
      
      // Verify structure of first entry
      if (storage.parkedQA.length > 0) {
        const entry = storage.parkedQA[0];
        assert.ok(entry.id, 'Entry should have id');
        assert.ok(entry.name, 'Entry should have name');
        assert.ok(entry.filePath, 'Entry should have filePath');
        assert.ok(entry.originSubsystem, 'Entry should have originSubsystem');
        assert.ok(entry.triggerCondition, 'Entry should have triggerCondition');
        assert.strictEqual(entry.owner, 'Foreman', 'Owner should be Foreman');
      }
    });
  });

  describe('parseTriggerCondition', () => {
    it('should parse module path from trigger condition', () => {
      const condition = 'Implementation of @/lib/memory/governance-memory module with functions: writeGovernanceMemory, updateGovernanceMemory';
      const parsed = parseTriggerCondition(condition);
      
      assert.strictEqual(parsed.modulePath, '@/lib/memory/governance-memory', 'Should extract module path');
      assert.ok(Array.isArray(parsed.exportNames), 'exportNames should be array');
      assert.ok(parsed.exportNames.includes('writeGovernanceMemory'), 'Should include writeGovernanceMemory');
      assert.ok(parsed.exportNames.includes('updateGovernanceMemory'), 'Should include updateGovernanceMemory');
    });

    it('should handle condition without functions', () => {
      const condition = 'Implementation of @/lib/test/module';
      const parsed = parseTriggerCondition(condition);
      
      assert.strictEqual(parsed.modulePath, '@/lib/test/module', 'Should extract module path');
      assert.strictEqual(parsed.exportNames.length, 0, 'Should have empty exportNames');
    });
  });

  describe('checkModuleExists', () => {
    it('should detect existing modules', async () => {
      // Check for a module we know exists
      const exists = await checkModuleExists('@/lib/foreman/qa/orphaned-qa-watcher');
      assert.strictEqual(exists, true, 'Should detect existing watcher module');
    });

    it('should detect non-existing modules', async () => {
      const exists = await checkModuleExists('@/lib/does/not/exist');
      assert.strictEqual(exists, false, 'Should not detect non-existing module');
    });
  });

  describe('checkExportsExist', () => {
    it('should detect existing exports', async () => {
      const result = await checkExportsExist('@/lib/foreman/qa/orphaned-qa-watcher', [
        'loadParkedQA',
        'runWatcherScan',
      ]);
      
      assert.strictEqual(result.exists, true, 'Should find exports');
      assert.ok(result.foundExports.includes('loadParkedQA'), 'Should find loadParkedQA');
      assert.ok(result.foundExports.includes('runWatcherScan'), 'Should find runWatcherScan');
    });

    it('should detect missing exports', async () => {
      const result = await checkExportsExist('@/lib/foreman/qa/orphaned-qa-watcher', [
        'loadParkedQA',
        'nonExistentFunction',
      ]);
      
      assert.ok(result.foundExports.includes('loadParkedQA'), 'Should find existing export');
      assert.ok(result.missingExports.includes('nonExistentFunction'), 'Should detect missing export');
    });

    it('should handle non-existing module', async () => {
      const result = await checkExportsExist('@/lib/does/not/exist', ['someFunction']);
      
      assert.strictEqual(result.exists, false, 'Should report module does not exist');
      assert.strictEqual(result.foundExports.length, 0, 'Should have no found exports');
      assert.ok(result.missingExports.includes('someFunction'), 'Should list as missing');
    });
  });

  describe('checkTriggerConditions', () => {
    it('should trigger for implemented modules', async () => {
      // Use governance-memory which actually exists in the codebase
      const entry = {
        id: 'test-001',
        name: 'Test Entry',
        filePath: 'test.ts',
        originSubsystem: 'Test',
        intendedWave: 'Test Wave',
        triggerCondition: 'Implementation of @/lib/memory/governance-memory module with functions: writeGovernanceMemory',
        reasonForParking: 'Test',
        dateParked: '2025-12-14',
        owner: 'Foreman',
      };
      
      const match = await checkTriggerConditions(entry);
      
      // Should match because governance-memory IS implemented
      assert.ok(match !== null, 'Should trigger for implemented module');
      assert.strictEqual(match.entryId, 'test-001', 'Should match entry ID');
      assert.strictEqual(match.matchType, 'export_appears', 'Should detect export');
      assert.ok(['high', 'medium'].includes(match.confidence), 'Should have confidence level');
    });

    it('should not trigger for truly unimplemented modules', async () => {
      const entry = {
        id: 'test-002',
        name: 'Test Entry',
        filePath: 'test.ts',
        originSubsystem: 'Test',
        intendedWave: 'Test Wave',
        triggerCondition: 'Implementation of @/lib/does/not/exist module with functions: someFunction',
        reasonForParking: 'Test',
        dateParked: '2025-12-14',
        owner: 'Foreman',
      };
      
      const match = await checkTriggerConditions(entry);
      
      // Should not match because module does not exist
      assert.strictEqual(match, null, 'Should not trigger for non-existent module');
    });
  });

  describe('scanParkedQA', () => {
    it('should scan all parked QA and detect implemented modules', async () => {
      const matches = await scanParkedQA();
      
      assert.ok(Array.isArray(matches), 'Should return array of matches');
      // Memory modules ARE implemented, so we should have matches
      assert.ok(matches.length >= 4, 'Should detect implemented memory modules');
      
      // Verify match structure
      if (matches.length > 0) {
        const match = matches[0];
        assert.ok(match.entryId, 'Match should have entryId');
        assert.ok(match.entryName, 'Match should have entryName');
        assert.ok(match.matchType, 'Match should have matchType');
        assert.ok(match.confidence, 'Match should have confidence');
      }
    });
  });

  describe('runWatcherScan', () => {
    it('should run full watcher scan', async () => {
      const result = await runWatcherScan();
      
      assert.ok(result, 'Result should be defined');
      assert.ok(result.scanned >= 4, 'Should scan at least 4 entries');
      assert.ok(Array.isArray(result.matches), 'Matches should be array');
      assert.strictEqual(typeof result.incidentsRegistered, 'number', 'incidentsRegistered should be number');
      assert.ok(result.timestamp, 'Should have timestamp');
      assert.ok(result.duration !== undefined, 'Should have duration');
    });

    it('should complete scan in reasonable time', async () => {
      const startTime = Date.now();
      await runWatcherScan();
      const duration = Date.now() - startTime;
      
      // Should complete in less than 5 seconds
      assert.ok(duration < 5000, `Scan should complete quickly (took ${duration}ms)`);
    });
  });

  describe('Integration', () => {
    it('should maintain consistent metadata', async () => {
      const storage = await loadParkedQA();
      
      // Verify totalParked matches array length
      assert.strictEqual(
        storage.totalParked,
        storage.parkedQA.length,
        'totalParked should match parkedQA array length'
      );
      
      // Verify all entries have required fields
      for (const entry of storage.parkedQA) {
        assert.ok(entry.id, `Entry should have id`);
        assert.ok(entry.name, `Entry should have name`);
        assert.ok(entry.triggerCondition, `Entry should have triggerCondition`);
        assert.ok(entry.dateParked, `Entry should have dateParked`);
        assert.strictEqual(entry.owner, 'Foreman', `Entry owner should be Foreman`);
      }
    });
  });
});
