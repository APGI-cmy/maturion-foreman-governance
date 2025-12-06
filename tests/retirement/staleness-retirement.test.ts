/**
 * Staleness Retirement Tests
 * Tests for staleness-based retirement logic
 */

import { describe, it } from 'node:test'
import assert from 'node:assert'
import { detectStalenessRetirement } from '@/lib/foreman/memory/retirement-engine'
import { MemoryEntry } from '@/types/memory'
import { RetirementConfig } from '@/types/retirement'

describe('Staleness Retirement', () => {
  it('should detect stale reasoning patterns', async () => {
    const now = new Date()
    const oldDate = new Date(now.getTime() - 200 * 24 * 60 * 60 * 1000) // 200 days ago
    
    const entries: MemoryEntry[] = [
      {
        id: 'entry_1',
        scope: 'global',
        key: 'reasoning_pattern_1',
        value: { description: 'Old reasoning pattern' },
        metadata: {
          createdAt: oldDate.toISOString(),
          updatedAt: oldDate.toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['reasoning_pattern']
      }
    ]
    
    const config: RetirementConfig = {
      stalenessThresholds: {
        reasoningPatterns: 180,
        architectureLessons: 365,
        issues: 90,
        projectMemory: 30,
        generalMemory: 180
      },
      autoRetireStale: true,
      autoRetireSuperseded: true,
      autoRetireObsolete: true,
      autoRetireConflicting: false,
      requireManualReviewForHigh: true,
      requireManualReviewForCritical: true,
      enableArchival: true,
      archivalRetentionYears: 3,
      retireWhenConsolidated: true,
      minConsolidationConfidence: 0.8,
      resolveConflictsOnRetirement: true
    }
    
    const candidates = detectStalenessRetirement(entries, config)
    
    assert.strictEqual(candidates.length, 1, 'Should detect one stale entry')
    assert.strictEqual(candidates[0].reason, 'staleness')
    assert.strictEqual(candidates[0].entry.id, 'entry_1')
    assert.ok(candidates[0].score > 50, 'Stale entry should have high score')
  })
  
  it('should not detect fresh entries as stale', async () => {
    const now = new Date()
    
    const entries: MemoryEntry[] = [
      {
        id: 'entry_1',
        scope: 'global',
        key: 'reasoning_pattern_1',
        value: { description: 'Fresh reasoning pattern' },
        metadata: {
          createdAt: now.toISOString(),
          updatedAt: now.toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['reasoning_pattern']
      }
    ]
    
    const candidates = detectStalenessRetirement(entries)
    
    assert.strictEqual(candidates.length, 0, 'Should not detect fresh entries')
  })
  
  it('should apply different thresholds for different entry types', async () => {
    const now = new Date()
    
    const entries: MemoryEntry[] = [
      // Reasoning pattern - 200 days old (threshold: 180)
      {
        id: 'entry_1',
        scope: 'global',
        key: 'reasoning_pattern_1',
        value: { description: 'Old reasoning pattern' },
        metadata: {
          createdAt: new Date(now.getTime() - 200 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - 200 * 24 * 60 * 60 * 1000).toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['reasoning_pattern']
      },
      // Architecture lesson - 200 days old (threshold: 365)
      {
        id: 'entry_2',
        scope: 'global',
        key: 'arch_lesson_1',
        value: { description: 'Architecture lesson' },
        metadata: {
          createdAt: new Date(now.getTime() - 200 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - 200 * 24 * 60 * 60 * 1000).toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['architecture_decision']
      },
      // Issue - 100 days old (threshold: 90)
      {
        id: 'entry_3',
        scope: 'foreman',
        key: 'issue_1',
        value: { description: 'Old issue' },
        metadata: {
          createdAt: new Date(now.getTime() - 100 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - 100 * 24 * 60 * 60 * 1000).toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['qa_failure']
      }
    ]
    
    const candidates = detectStalenessRetirement(entries)
    
    assert.strictEqual(candidates.length, 2, 'Should detect reasoning pattern and issue, but not architecture lesson')
    assert.ok(candidates.some(c => c.entry.id === 'entry_1'), 'Should detect stale reasoning pattern')
    assert.ok(candidates.some(c => c.entry.id === 'entry_3'), 'Should detect stale issue')
    assert.ok(!candidates.some(c => c.entry.id === 'entry_2'), 'Should not detect architecture lesson')
  })
  
  it('should assign higher severity to critical entries', async () => {
    const now = new Date()
    const oldDate = new Date(now.getTime() - 200 * 24 * 60 * 60 * 1000)
    
    const entries: MemoryEntry[] = [
      {
        id: 'entry_1',
        scope: 'global',
        key: 'critical_pattern',
        value: { description: 'Critical pattern' },
        metadata: {
          createdAt: oldDate.toISOString(),
          updatedAt: oldDate.toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['reasoning_pattern', 'critical']
      }
    ]
    
    const candidates = detectStalenessRetirement(entries)
    
    assert.strictEqual(candidates.length, 1)
    assert.strictEqual(candidates[0].severity, 'critical', 'Critical entries should have critical severity')
  })
  
  it('should assign higher severity to governance entries', async () => {
    const now = new Date()
    const oldDate = new Date(now.getTime() - 200 * 24 * 60 * 60 * 1000)
    
    const entries: MemoryEntry[] = [
      {
        id: 'entry_1',
        scope: 'global',
        key: 'governance_rule',
        value: { description: 'Governance rule' },
        metadata: {
          createdAt: oldDate.toISOString(),
          updatedAt: oldDate.toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['governance']
      }
    ]
    
    const candidates = detectStalenessRetirement(entries)
    
    assert.strictEqual(candidates.length, 1)
    assert.strictEqual(candidates[0].severity, 'critical', 'Governance entries should have critical severity')
  })
  
  it('should include age metadata in candidates', async () => {
    const now = new Date()
    const oldDate = new Date(now.getTime() - 200 * 24 * 60 * 60 * 1000)
    
    const entries: MemoryEntry[] = [
      {
        id: 'entry_1',
        scope: 'global',
        key: 'pattern_1',
        value: { description: 'Pattern' },
        metadata: {
          createdAt: oldDate.toISOString(),
          updatedAt: oldDate.toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['reasoning_pattern']
      }
    ]
    
    const candidates = detectStalenessRetirement(entries)
    
    assert.strictEqual(candidates.length, 1)
    assert.ok(candidates[0].metadata.ageInDays >= 199, 'Should include age in metadata')
    assert.ok(candidates[0].metadata.ageInDays <= 201, 'Age should be approximately 200 days')
  })
})
