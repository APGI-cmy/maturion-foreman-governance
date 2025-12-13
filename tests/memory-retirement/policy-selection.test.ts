/**
 * Knowledge Retirement System - Policy Selection Tests
 * 
 * Tests all retirement policy detection functions:
 * - Staleness retirement (time-based)
 * - Supersession retirement (consolidation-based)
 * - Obsolescence retirement (pattern-based)
 * - Contradiction retirement (drift-based)
 * 
 * These tests MUST BE RED before implementation enhancements.
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { MemoryEntry } from '@/types/memory'
import { RetirementConfig, RetirementCandidate } from '@/types/retirement'
import { KnowledgeBlock } from '@/types/consolidation'
import { DriftReport } from '@/types/drift'
import {
  detectStalenessRetirement,
  detectSupersessionRetirement,
  detectObsolescenceRetirement,
  detectContradictionRetirement
} from '@/lib/foreman/memory/retirement-engine'

// Test fixtures
const createTestEntry = (overrides: Partial<MemoryEntry> = {}): MemoryEntry => ({
  id: `test-entry-${Date.now()}`,
  scope: 'global',
  key: 'test-key',
  value: { description: 'Test entry' },
  metadata: {
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year old
    updatedAt: new Date().toISOString(),
    createdBy: 'test',
    version: 1
  },
  tags: [],
  ...overrides
})

const createConfig = (overrides: Partial<RetirementConfig> = {}): RetirementConfig => ({
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
  resolveConflictsOnRetirement: true,
  ...overrides
})

describe('Policy Selection - Staleness Retirement', () => {
  test('should detect stale entries exceeding threshold', () => {
    const config = createConfig()
    
    // Create entry that is 200 days old (exceeds 180 day threshold)
    const staleEntry = createTestEntry({
      metadata: {
        createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'test',
        version: 1
      }
    })
    
    const candidates = detectStalenessRetirement([staleEntry], config)
    
    assert.ok(candidates.length > 0, 'Should detect stale entry')
    assert.equal(candidates[0].reason, 'staleness')
    assert.ok(candidates[0].score > 50, 'Confidence score should be > 50')
  })
  
  test('should use correct threshold for reasoning patterns', () => {
    const config = createConfig()
    
    // Create reasoning pattern entry that is 190 days old
    const reasoningEntry = createTestEntry({
      tags: ['reasoning_pattern'],
      metadata: {
        createdAt: new Date(Date.now() - 190 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'test',
        version: 1
      }
    })
    
    const candidates = detectStalenessRetirement([reasoningEntry], config)
    
    assert.ok(candidates.length > 0, 'Should detect stale reasoning pattern')
    assert.equal(candidates[0].metadata.ageInDays, 190)
  })
  
  test('should assign critical severity for governance-tagged entries', () => {
    const config = createConfig()
    
    // Create critical entry that is stale
    const criticalEntry = createTestEntry({
      tags: ['governance', 'critical'],
      metadata: {
        createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'test',
        version: 1
      }
    })
    
    const candidates = detectStalenessRetirement([criticalEntry], config)
    
    assert.ok(candidates.length > 0)
    assert.equal(candidates[0].severity, 'critical')
  })
  
  test('should assign high severity for architecture decisions', () => {
    const config = createConfig()
    
    // Create architecture decision entry
    const archEntry = createTestEntry({
      tags: ['architecture_decision'],
      metadata: {
        createdAt: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'test',
        version: 1
      }
    })
    
    const candidates = detectStalenessRetirement([archEntry], config)
    
    assert.ok(candidates.length > 0)
    assert.equal(candidates[0].severity, 'high')
  })
  
  test('should not detect entries below threshold', () => {
    const config = createConfig()
    
    // Create fresh entry (50 days old)
    const freshEntry = createTestEntry({
      metadata: {
        createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'test',
        version: 1
      }
    })
    
    const candidates = detectStalenessRetirement([freshEntry], config)
    
    assert.equal(candidates.length, 0, 'Should not detect fresh entry')
  })
  
  test('should calculate correct score for staleness', () => {
    const config = createConfig()
    
    // Entry exceeding threshold by 50%
    const entry = createTestEntry({
      metadata: {
        createdAt: new Date(Date.now() - 270 * 24 * 60 * 60 * 1000).toISOString(), // 270 days (180 * 1.5)
        updatedAt: new Date().toISOString(),
        createdBy: 'test',
        version: 1
      }
    })
    
    const candidates = detectStalenessRetirement([entry], config)
    
    assert.ok(candidates.length > 0)
    assert.ok(candidates[0].score >= 75, 'Score should reflect 50% excess age')
  })
})

describe('Policy Selection - Supersession Retirement', () => {
  test('should detect entries superseded by consolidated knowledge', () => {
    const config = createConfig()
    
    const entry = createTestEntry({ id: 'entry-001' })
    
    const consolidatedBlock: KnowledgeBlock = {
      id: 'kb-001',
      category: 'architecture_patterns',
      title: 'Consolidated Pattern',
      content: 'Pattern content',
      originEntries: ['entry-001'],
      confidence: 0.9,
      importance: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      tags: []
    }
    
    const candidates = detectSupersessionRetirement([entry], [consolidatedBlock], config)
    
    assert.ok(candidates.length > 0, 'Should detect superseded entry')
    assert.equal(candidates[0].reason, 'supersession')
    assert.equal(candidates[0].severity, 'low')
  })
  
  test('should respect minimum consolidation confidence', () => {
    const config = createConfig({ minConsolidationConfidence: 0.8 })
    
    const entry = createTestEntry({ id: 'entry-002' })
    
    // Low confidence block
    const lowConfidenceBlock: KnowledgeBlock = {
      id: 'kb-002',
      category: 'patterns',
      title: 'Low Confidence Block',
      content: 'Content',
      originEntries: ['entry-002'],
      confidence: 0.6, // Below threshold
      importance: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      tags: []
    }
    
    const candidates = detectSupersessionRetirement([entry], [lowConfidenceBlock], config)
    
    assert.equal(candidates.length, 0, 'Should not detect with low confidence')
  })
  
  test('should calculate score based on consolidation confidence', () => {
    const config = createConfig()
    
    const entry = createTestEntry({ id: 'entry-003' })
    
    const block: KnowledgeBlock = {
      id: 'kb-003',
      category: 'patterns',
      title: 'High Confidence Block',
      content: 'Content',
      originEntries: ['entry-003'],
      confidence: 0.95,
      importance: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      tags: []
    }
    
    const candidates = detectSupersessionRetirement([entry], [block], config)
    
    assert.ok(candidates.length > 0)
    assert.equal(candidates[0].score, 95) // Should be confidence * 100
  })
})

describe('Policy Selection - Obsolescence Retirement', () => {
  test('should detect entries with obsolete description patterns', () => {
    const entries = [
      createTestEntry({
        value: { description: 'This module was removed in v2.0' }
      }),
      createTestEntry({
        value: { description: 'Feature deprecated and deleted' }
      }),
      createTestEntry({
        value: { description: 'Legacy implementation archived' }
      })
    ]
    
    const candidates = detectObsolescenceRetirement(entries)
    
    assert.equal(candidates.length, 3, 'Should detect all obsolete patterns')
    assert.ok(candidates.every(c => c.reason === 'obsolescence'))
  })
  
  test('should detect entries with obsolete keys', () => {
    const entries = [
      createTestEntry({ key: 'deprecated-feature' }),
      createTestEntry({ key: 'legacy-module' }),
      createTestEntry({ key: 'removed-component' })
    ]
    
    const candidates = detectObsolescenceRetirement(entries)
    
    assert.ok(candidates.length > 0, 'Should detect obsolete keys')
  })
  
  test('should detect entries with obsolete tags', () => {
    const entries = [
      createTestEntry({ tags: ['deprecated', 'module'] }),
      createTestEntry({ tags: ['legacy', 'old'] }),
      createTestEntry({ tags: ['obsolete'] })
    ]
    
    const candidates = detectObsolescenceRetirement(entries)
    
    assert.ok(candidates.length > 0, 'Should detect obsolete tags')
  })
  
  test('should assign higher severity for obsolete architecture', () => {
    const entry = createTestEntry({
      tags: ['architecture_decision', 'deprecated'],
      value: { description: 'Old architecture removed' }
    })
    
    const candidates = detectObsolescenceRetirement([entry])
    
    assert.ok(candidates.length > 0)
    assert.equal(candidates[0].severity, 'high')
  })
  
  test('should not detect entries without obsolete indicators', () => {
    const entry = createTestEntry({
      value: { description: 'Current implementation of feature X' },
      key: 'active-feature',
      tags: ['current', 'production']
    })
    
    const candidates = detectObsolescenceRetirement([entry])
    
    assert.equal(candidates.length, 0, 'Should not detect active entries')
  })
})

describe('Policy Selection - Contradiction Retirement', () => {
  test('should detect entries from drift report contradictions', () => {
    const entries = [
      createTestEntry({
        id: 'entry-old',
        metadata: {
          createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        }
      }),
      createTestEntry({
        id: 'entry-new',
        metadata: {
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        }
      })
    ]
    
    const driftReport: DriftReport = {
      timestamp: new Date().toISOString(),
      overallStatus: 'drift_detected',
      totalIssues: 1,
      criticalIssues: 0,
      highPriorityIssues: 1,
      checks: [
        {
          type: 'contradiction_drift',
          status: 'failed',
          category: 'contradiction_drift',
          issues: [
            {
              severity: 'high',
              type: 'contradiction_drift',
              description: 'Contradicting memory entries detected',
              affectedEntries: ['entry-old', 'entry-new'],
              recommendation: 'Retire oldest entry'
            }
          ],
          metadata: {},
          timestamp: new Date().toISOString()
        }
      ]
    }
    
    const candidates = detectContradictionRetirement(entries, driftReport)
    
    assert.ok(candidates.length > 0, 'Should detect contradiction candidate')
    assert.equal(candidates[0].reason, 'contradiction')
    assert.equal(candidates[0].entry.id, 'entry-old', 'Should retire oldest entry')
  })
  
  test('should map drift severity to retirement severity', () => {
    const entries = [
      createTestEntry({ id: 'entry-1' }),
      createTestEntry({ id: 'entry-2' })
    ]
    
    const driftReport: DriftReport = {
      timestamp: new Date().toISOString(),
      overallStatus: 'drift_detected',
      totalIssues: 1,
      criticalIssues: 1,
      highPriorityIssues: 0,
      checks: [
        {
          type: 'contradiction_drift',
          status: 'failed',
          category: 'contradiction_drift',
          issues: [
            {
              severity: 'critical',
              type: 'contradiction_drift',
              description: 'Critical contradiction',
              affectedEntries: ['entry-1', 'entry-2'],
              recommendation: 'Immediate resolution required'
            }
          ],
          metadata: {},
          timestamp: new Date().toISOString()
        }
      ]
    }
    
    const candidates = detectContradictionRetirement(entries, driftReport)
    
    assert.ok(candidates.length > 0)
    assert.equal(candidates[0].severity, 'high', 'Critical drift should map to high severity')
  })
  
  test('should return empty array if no drift report', () => {
    const entries = [createTestEntry()]
    
    const candidates = detectContradictionRetirement(entries, undefined)
    
    assert.equal(candidates.length, 0)
  })
  
  test('should require at least 2 entries for contradiction', () => {
    const entries = [createTestEntry({ id: 'single-entry' })]
    
    const driftReport: DriftReport = {
      timestamp: new Date().toISOString(),
      overallStatus: 'drift_detected',
      totalIssues: 1,
      criticalIssues: 0,
      highPriorityIssues: 1,
      checks: [
        {
          type: 'contradiction_drift',
          status: 'failed',
          category: 'contradiction_drift',
          issues: [
            {
              severity: 'high',
              type: 'contradiction_drift',
              description: 'Invalid contradiction (single entry)',
              affectedEntries: ['single-entry'],
              recommendation: 'Should require at least 2 entries'
            }
          ],
          metadata: {},
          timestamp: new Date().toISOString()
        }
      ]
    }
    
    const candidates = detectContradictionRetirement(entries, driftReport)
    
    assert.equal(candidates.length, 0, 'Should not detect with single entry')
  })
})

describe('Policy Selection - Integration', () => {
  test('should handle multiple policies simultaneously', () => {
    const config = createConfig()
    
    const entries = [
      // Stale entry
      createTestEntry({
        id: 'stale-001',
        metadata: {
          createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        }
      }),
      // Obsolete entry
      createTestEntry({
        id: 'obsolete-001',
        value: { description: 'Deprecated module removed' }
      }),
      // Superseded entry
      createTestEntry({
        id: 'superseded-001'
      })
    ]
    
    const consolidatedBlocks: KnowledgeBlock[] = [
      {
        id: 'kb-001',
        category: 'patterns',
        title: 'Block',
        content: 'Content',
        originEntries: ['superseded-001'],
        confidence: 0.9,
        importance: 'high',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
        tags: []
      }
    ]
    
    const staleCandidates = detectStalenessRetirement(entries, config)
    const obsoleteCandidates = detectObsolescenceRetirement(entries)
    const supersessionCandidates = detectSupersessionRetirement(entries, consolidatedBlocks, config)
    
    const totalCandidates = staleCandidates.length + obsoleteCandidates.length + supersessionCandidates.length
    
    assert.ok(totalCandidates >= 3, 'Should detect candidates from multiple policies')
  })
  
  test('should not duplicate candidates across policies', () => {
    const config = createConfig()
    
    // Entry that is both stale AND obsolete
    const entry = createTestEntry({
      id: 'duplicate-candidate',
      value: { description: 'Deprecated and old' },
      metadata: {
        createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'test',
        version: 1
      }
    })
    
    const staleCandidates = detectStalenessRetirement([entry], config)
    const obsoleteCandidates = detectObsolescenceRetirement([entry])
    
    // Both policies should detect, but retirement controller should deduplicate
    assert.ok(staleCandidates.length > 0)
    assert.ok(obsoleteCandidates.length > 0)
    
    // Each policy returns different reason
    assert.equal(staleCandidates[0].reason, 'staleness')
    assert.equal(obsoleteCandidates[0].reason, 'obsolescence')
  })
})
