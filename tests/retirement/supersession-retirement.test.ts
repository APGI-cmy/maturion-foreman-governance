/**
 * Supersession Retirement Tests
 * Tests for supersession-based retirement logic
 */

import { describe, it } from 'node:test'
import assert from 'node:assert'
import { detectSupersessionRetirement } from '@/lib/foreman/memory/retirement-engine'
import { MemoryEntry } from '@/types/memory'
import { KnowledgeBlock } from '@/types/consolidation'

describe('Supersession Retirement', () => {
  it('should detect entries superseded by consolidated knowledge', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'entry_1',
        scope: 'global',
        key: 'old_pattern',
        value: { description: 'Old pattern' },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['architecture']
      }
    ]
    
    const consolidatedBlocks: KnowledgeBlock[] = [
      {
        id: 'kb_001',
        category: 'architecture_principle',
        summary: 'Consolidated pattern',
        lesson: 'Always use this pattern',
        appliesTo: ['GlobalUI'],
        originEntries: ['entry_1'], // References the entry
        governanceLinks: [],
        confidence: 0.9,
        importance: 'high',
        timestamp: new Date().toISOString()
      }
    ]
    
    const candidates = detectSupersessionRetirement(entries, consolidatedBlocks)
    
    assert.strictEqual(candidates.length, 1, 'Should detect superseded entry')
    assert.strictEqual(candidates[0].reason, 'supersession')
    assert.strictEqual(candidates[0].entry.id, 'entry_1')
    assert.strictEqual(candidates[0].severity, 'low', 'Supersession should be low severity')
  })
  
  it('should not detect entries without consolidated knowledge', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'entry_1',
        scope: 'global',
        key: 'pattern',
        value: { description: 'Pattern' },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['architecture']
      }
    ]
    
    const consolidatedBlocks: KnowledgeBlock[] = []
    
    const candidates = detectSupersessionRetirement(entries, consolidatedBlocks)
    
    assert.strictEqual(candidates.length, 0, 'Should not detect without consolidated knowledge')
  })
  
  it('should respect minimum consolidation confidence', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'entry_1',
        scope: 'global',
        key: 'pattern',
        value: { description: 'Pattern' },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['architecture']
      }
    ]
    
    const consolidatedBlocks: KnowledgeBlock[] = [
      {
        id: 'kb_001',
        category: 'architecture_principle',
        summary: 'Low confidence block',
        lesson: 'Pattern',
        appliesTo: ['GlobalUI'],
        originEntries: ['entry_1'],
        governanceLinks: [],
        confidence: 0.5, // Below threshold
        importance: 'medium',
        timestamp: new Date().toISOString()
      }
    ]
    
    const config = {
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
      minConsolidationConfidence: 0.8, // Higher than block confidence
      resolveConflictsOnRetirement: true
    }
    
    const candidates = detectSupersessionRetirement(entries, consolidatedBlocks, config)
    
    assert.strictEqual(candidates.length, 0, 'Should not detect with low confidence blocks')
  })
  
  it('should use confidence score from knowledge block', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'entry_1',
        scope: 'global',
        key: 'pattern',
        value: { description: 'Pattern' },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['architecture']
      }
    ]
    
    const consolidatedBlocks: KnowledgeBlock[] = [
      {
        id: 'kb_001',
        category: 'architecture_principle',
        summary: 'High confidence block',
        lesson: 'Pattern',
        appliesTo: ['GlobalUI'],
        originEntries: ['entry_1'],
        governanceLinks: [],
        confidence: 0.95,
        importance: 'high',
        timestamp: new Date().toISOString()
      }
    ]
    
    const candidates = detectSupersessionRetirement(entries, consolidatedBlocks)
    
    assert.strictEqual(candidates.length, 1)
    assert.strictEqual(candidates[0].score, 95, 'Score should match knowledge block confidence')
  })
})
