/**
 * Immutability Tests
 * Ensures retirement never deletes data - core principle
 */

import { describe, it } from 'node:test'
import assert from 'node:assert'
import { executeRetirement } from '@/lib/foreman/memory/retirement-engine'
import { RetirementCandidate } from '@/types/retirement'
import { MemoryEntry } from '@/types/memory'

describe('Retirement Immutability', () => {
  it('should never delete entries during retirement', async () => {
    const entry: MemoryEntry = {
      id: 'entry_1',
      scope: 'global',
      key: 'test_entry',
      value: { description: 'Test entry' },
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'test',
        version: 1
      },
      tags: ['test']
    }
    
    const candidates: RetirementCandidate[] = [
      {
        entry,
        reason: 'staleness',
        severity: 'low',
        score: 80,
        explanation: 'Test retirement',
        recommendedAction: 'retire',
        metadata: {
          ageInDays: 200
        }
      }
    ]
    
    const report = executeRetirement(candidates)
    
    // Entry should be in retirements list
    assert.strictEqual(report.entriesRetired, 1, 'Entry should be retired')
    
    // Original entry should be preserved in retired entry
    const retired = report.retirements[0]
    assert.deepStrictEqual(
      retired.originalEntry,
      entry,
      'Original entry should be fully preserved'
    )
    
    // Archival info should be present
    assert.ok(retired.archivedAt, 'Should have archival timestamp')
    assert.ok(retired.retirementInfo, 'Should have retirement info')
    assert.ok(retired.archiveVersion, 'Should have archive version')
  })
  
  it('should preserve all entry metadata on retirement', async () => {
    const entry: MemoryEntry = {
      id: 'entry_with_metadata',
      scope: 'global',
      key: 'metadata_test',
      value: { 
        description: 'Entry with metadata',
        data: {
          important: 'information',
          nested: {
            value: 'preserved'
          }
        }
      },
      metadata: {
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-06-01T00:00:00Z',
        createdBy: 'original-creator',
        version: 5
      },
      tags: ['important', 'metadata', 'test']
    }
    
    const candidates: RetirementCandidate[] = [
      {
        entry,
        reason: 'staleness',
        severity: 'low',
        score: 75,
        explanation: 'Test',
        recommendedAction: 'archive',
        metadata: {
          ageInDays: 180
        }
      }
    ]
    
    const report = executeRetirement(candidates)
    const retired = report.retirements[0]
    
    // Verify all metadata is preserved
    assert.strictEqual(retired.originalEntry.id, entry.id)
    assert.strictEqual(retired.originalEntry.scope, entry.scope)
    assert.strictEqual(retired.originalEntry.key, entry.key)
    assert.deepStrictEqual(retired.originalEntry.value, entry.value)
    assert.deepStrictEqual(retired.originalEntry.metadata, entry.metadata)
    assert.deepStrictEqual(retired.originalEntry.tags, entry.tags)
  })
  
  it('should maintain version history in archives', async () => {
    const entry: MemoryEntry = {
      id: 'versioned_entry',
      scope: 'global',
      key: 'version_test',
      value: { description: 'Versioned entry' },
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'test',
        version: 3
      },
      tags: ['version']
    }
    
    const candidates: RetirementCandidate[] = [
      {
        entry,
        reason: 'staleness',
        severity: 'low',
        score: 70,
        explanation: 'Test',
        recommendedAction: 'archive',
        metadata: {
          ageInDays: 190
        }
      }
    ]
    
    const report = executeRetirement(candidates)
    const retired = report.retirements[0]
    
    // Original version should be preserved
    assert.strictEqual(retired.originalEntry.metadata.version, 3)
    
    // Archive should have its own version
    assert.strictEqual(retired.archiveVersion, 1)
  })
  
  it('should make retired entries fully recoverable', async () => {
    const entry: MemoryEntry = {
      id: 'recoverable_entry',
      scope: 'global',
      key: 'recovery_test',
      value: { 
        description: 'Entry to be recovered',
        data: { critical: 'data' }
      },
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'test',
        version: 1
      },
      tags: ['recoverable']
    }
    
    const candidates: RetirementCandidate[] = [
      {
        entry,
        reason: 'staleness',
        severity: 'low',
        score: 85,
        explanation: 'Test recovery',
        recommendedAction: 'archive',
        metadata: {
          ageInDays: 200
        }
      }
    ]
    
    const report = executeRetirement(candidates)
    const retired = report.retirements[0]
    
    // All information needed for recovery should be present
    assert.ok(retired.originalEntry, 'Original entry must be stored')
    assert.ok(retired.retirementInfo, 'Retirement info must be stored')
    assert.ok(retired.archivedAt, 'Archive timestamp must be stored')
    assert.ok(retired.archiveVersion, 'Archive version must be stored')
    
    // Retirement info should include recovery details
    assert.ok(retired.retirementInfo.reason, 'Reason must be documented')
    assert.ok(retired.retirementInfo.explanation, 'Explanation must be documented')
  })
})
