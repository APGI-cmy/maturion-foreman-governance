/**
 * Knowledge Retirement System - Drift Impact Analyzer Tests
 * 
 * Tests drift impact analysis before retirement:
 * - Expected improvements calculation
 * - Risk assessment
 * - Recommendation logic
 * - Cross-embodiment sync impact
 * - Knowledge loss scoring
 * 
 * These tests MUST BE RED before drift-impact analyzer is implemented.
 */

import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { MemoryEntry } from '@/types/memory'
import { RetirementCandidate } from '@/types/retirement'
import { DriftReport } from '@/types/drift'

// These functions don't exist yet - tests will fail (RED)
import {
  analyzeDriftImpact,
  calculateSyncImpact,
  scoreContradictionResolution,
  recommendAction
} from '@/lib/foreman/memory/drift-impact-analyzer'

// Test fixtures
const createTestEntry = (overrides: Partial<MemoryEntry> = {}): MemoryEntry => ({
  id: `test-entry-${Date.now()}-${Math.random()}`,
  scope: 'global',
  key: 'test-key',
  value: { description: 'Test entry' },
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'test',
    version: 1
  },
  tags: [],
  ...overrides
})

const createCandidate = (entry: MemoryEntry, overrides: Partial<RetirementCandidate> = {}): RetirementCandidate => ({
  entry,
  reason: 'staleness',
  severity: 'low',
  score: 75,
  explanation: 'Test candidate',
  recommendedAction: 'retire',
  metadata: {
    ageInDays: 200
  },
  ...overrides
})

describe('Drift Impact Analyzer - Expected Improvements', () => {
  test('should calculate contradictions resolved', () => {
    const entries = [
      createTestEntry({ id: 'entry-1' }),
      createTestEntry({ id: 'entry-2' }),
      createTestEntry({ id: 'entry-3' })
    ]
    
    const candidates = [
      createCandidate(entries[0], { reason: 'contradiction' }),
      createCandidate(entries[1], { reason: 'contradiction' })
    ]
    
    const driftReport: DriftReport = {
      timestamp: new Date().toISOString(),
      overallStatus: 'drift_detected',
      totalIssues: 2,
      criticalIssues: 0,
      highPriorityIssues: 2,
      checks: [
        {
          type: 'contradiction_drift',
          status: 'failed',
          category: 'contradiction_drift',
          issues: [
            {
              severity: 'high',
              type: 'contradiction_drift',
              description: 'Contradiction 1',
              affectedEntries: ['entry-1', 'entry-3']
            },
            {
              severity: 'high',
              type: 'contradiction_drift',
              description: 'Contradiction 2',
              affectedEntries: ['entry-2', 'entry-3']
            }
          ],
          metadata: {},
          timestamp: new Date().toISOString()
        }
      ]
    }
    
    const impact = analyzeDriftImpact(candidates, driftReport, entries)
    
    assert.equal(impact.expectedImprovements.contradictionsResolved, 2, 
      'Should calculate 2 contradictions resolved')
  })
  
  test('should calculate staleness reduced', () => {
    const entries = Array.from({ length: 100 }, (_, i) => 
      createTestEntry({ id: `entry-${i}` })
    )
    
    // 20 stale entries to retire
    const candidates = entries.slice(0, 20).map(entry => 
      createCandidate(entry, { reason: 'staleness' })
    )
    
    const driftReport: DriftReport = {
      timestamp: new Date().toISOString(),
      overallStatus: 'pass',
      totalIssues: 0,
      criticalIssues: 0,
      highPriorityIssues: 0,
      checks: []
    }
    
    const impact = analyzeDriftImpact(candidates, driftReport, entries)
    
    assert.equal(impact.expectedImprovements.stalenessReduced, 20, 
      'Should reduce staleness by 20%')
  })
  
  test('should calculate redundancy eliminated', () => {
    const entries = [
      createTestEntry({ id: 'entry-1' }),
      createTestEntry({ id: 'entry-2' }),
      createTestEntry({ id: 'entry-3' })
    ]
    
    const candidates = [
      createCandidate(entries[0], { reason: 'supersession' }),
      createCandidate(entries[1], { reason: 'supersession' })
    ]
    
    const driftReport: DriftReport = {
      timestamp: new Date().toISOString(),
      overallStatus: 'pass',
      totalIssues: 0,
      criticalIssues: 0,
      highPriorityIssues: 0,
      checks: []
    }
    
    const impact = analyzeDriftImpact(candidates, driftReport, entries)
    
    assert.equal(impact.expectedImprovements.redundancyEliminated, 2,
      'Should eliminate 2 redundant entries')
  })
})

describe('Drift Impact Analyzer - Risk Assessment', () => {
  test('should score knowledge loss risk', () => {
    const importantEntry = createTestEntry({
      tags: ['architecture_decision', 'critical']
    })
    
    const candidates = [
      createCandidate(importantEntry, { severity: 'high' })
    ]
    
    const driftReport: DriftReport = {
      timestamp: new Date().toISOString(),
      overallStatus: 'pass',
      totalIssues: 0,
      criticalIssues: 0,
      highPriorityIssues: 0,
      checks: []
    }
    
    const impact = analyzeDriftImpact(candidates, driftReport, [importantEntry])
    
    // High severity + critical tag should result in high knowledge loss risk
    assert.ok(impact.risks.knowledgeLoss > 50, 
      'Knowledge loss risk should be high for critical entries')
  })
  
  test('should score cross-embodiment desync risk', () => {
    const sharedEntry = createTestEntry({
      scope: 'global',
      tags: ['shared', 'foreman', 'builder']
    })
    
    const candidates = [
      createCandidate(sharedEntry)
    ]
    
    const driftReport: DriftReport = {
      timestamp: new Date().toISOString(),
      overallStatus: 'pass',
      totalIssues: 0,
      criticalIssues: 0,
      highPriorityIssues: 0,
      checks: []
    }
    
    const impact = analyzeDriftImpact(candidates, driftReport, [sharedEntry])
    
    // Global scope + shared tags should result in desync risk
    assert.ok(impact.risks.crossEmbodimentDesync > 0,
      'Should identify cross-embodiment desync risk')
  })
  
  test('should score runtime state impact risk', () => {
    const runtimeEntry = createTestEntry({
      tags: ['runtime', 'active', 'task']
    })
    
    const candidates = [
      createCandidate(runtimeEntry)
    ]
    
    const driftReport: DriftReport = {
      timestamp: new Date().toISOString(),
      overallStatus: 'pass',
      totalIssues: 0,
      criticalIssues: 0,
      highPriorityIssues: 0,
      checks: []
    }
    
    const impact = analyzeDriftImpact(candidates, driftReport, [runtimeEntry])
    
    // Runtime active tags should result in high runtime impact risk
    assert.ok(impact.risks.runtimeStateImpact > 50,
      'Should identify high runtime state impact risk')
  })
  
  test('should have low risk for safe retirements', () => {
    const safeEntry = createTestEntry({
      tags: ['project', 'completed']
    })
    
    const candidates = [
      createCandidate(safeEntry, { severity: 'low' })
    ]
    
    const driftReport: DriftReport = {
      timestamp: new Date().toISOString(),
      overallStatus: 'pass',
      totalIssues: 0,
      criticalIssues: 0,
      highPriorityIssues: 0,
      checks: []
    }
    
    const impact = analyzeDriftImpact(candidates, driftReport, [safeEntry])
    
    // All risks should be low
    assert.ok(impact.risks.knowledgeLoss < 30, 'Knowledge loss risk should be low')
    assert.ok(impact.risks.crossEmbodimentDesync < 30, 'Desync risk should be low')
    assert.ok(impact.risks.runtimeStateImpact < 30, 'Runtime impact risk should be low')
  })
})

describe('Drift Impact Analyzer - Recommendation Logic', () => {
  test('should recommend proceed for low-risk retirements', () => {
    const impact = {
      expectedImprovements: {
        contradictionsResolved: 5,
        stalenessReduced: 20,
        redundancyEliminated: 10
      },
      risks: {
        knowledgeLoss: 10,
        crossEmbodimentDesync: 15,
        runtimeStateImpact: 5
      },
      recommendation: 'proceed' as const,
      explanation: 'Low risk, high benefit'
    }
    
    const recommendation = recommendAction(impact)
    
    assert.equal(recommendation, 'proceed', 'Should recommend proceed for low-risk')
  })
  
  test('should recommend review for medium-risk retirements', () => {
    const impact = {
      expectedImprovements: {
        contradictionsResolved: 2,
        stalenessReduced: 10,
        redundancyEliminated: 3
      },
      risks: {
        knowledgeLoss: 45,
        crossEmbodimentDesync: 40,
        runtimeStateImpact: 20
      },
      recommendation: 'review' as const,
      explanation: 'Medium risk, requires review'
    }
    
    const recommendation = recommendAction(impact)
    
    assert.equal(recommendation, 'review', 'Should recommend review for medium-risk')
  })
  
  test('should recommend abort for high-risk retirements', () => {
    const impact = {
      expectedImprovements: {
        contradictionsResolved: 1,
        stalenessReduced: 5,
        redundancyEliminated: 1
      },
      risks: {
        knowledgeLoss: 75,
        crossEmbodimentDesync: 80,
        runtimeStateImpact: 65
      },
      recommendation: 'abort' as const,
      explanation: 'High risk, abort retirement'
    }
    
    const recommendation = recommendAction(impact)
    
    assert.equal(recommendation, 'abort', 'Should recommend abort for high-risk')
  })
  
  test('should recommend abort when runtime impact is critical', () => {
    const impact = {
      expectedImprovements: {
        contradictionsResolved: 10,
        stalenessReduced: 30,
        redundancyEliminated: 15
      },
      risks: {
        knowledgeLoss: 20,
        crossEmbodimentDesync: 25,
        runtimeStateImpact: 90 // Critical runtime impact
      },
      recommendation: 'abort' as const,
      explanation: 'Critical runtime impact, abort'
    }
    
    const recommendation = recommendAction(impact)
    
    assert.equal(recommendation, 'abort', 'Should abort for critical runtime impact')
  })
})

describe('Drift Impact Analyzer - Cross-Embodiment Sync', () => {
  test('should calculate sync impact for retired entries', () => {
    const entries = [
      createTestEntry({ scope: 'global', tags: ['shared'] }),
      createTestEntry({ scope: 'foreman', tags: ['orchestration'] }),
      createTestEntry({ scope: 'project', tags: ['tenant-1'] })
    ]
    
    const syncImpact = calculateSyncImpact(entries)
    
    assert.ok(syncImpact.affectedEmbodiments.length > 0, 
      'Should identify affected embodiments')
    assert.ok(typeof syncImpact.syncRequired === 'boolean',
      'Should determine if sync is required')
    assert.ok(typeof syncImpact.estimatedSyncTime === 'number',
      'Should estimate sync time')
  })
  
  test('should identify all affected embodiments', () => {
    const globalEntry = createTestEntry({
      scope: 'global',
      tags: ['foreman', 'builder', 'isms']
    })
    
    const syncImpact = calculateSyncImpact([globalEntry])
    
    // Global entry with multiple embodiment tags should affect all
    assert.ok(syncImpact.affectedEmbodiments.includes('foreman'),
      'Should identify foreman as affected')
    assert.ok(syncImpact.affectedEmbodiments.includes('builder'),
      'Should identify builder as affected')
    assert.ok(syncImpact.affectedEmbodiments.includes('isms'),
      'Should identify isms as affected')
  })
  
  test('should estimate sync time based on entry count', () => {
    const entries = Array.from({ length: 100 }, (_, i) => 
      createTestEntry({ scope: 'global', id: `entry-${i}` })
    )
    
    const syncImpact = calculateSyncImpact(entries)
    
    // More entries = longer sync time
    assert.ok(syncImpact.estimatedSyncTime > 0,
      'Should estimate positive sync time')
    
    // Rough heuristic: ~100ms per entry
    assert.ok(syncImpact.estimatedSyncTime >= 10000,
      'Should estimate reasonable sync time for 100 entries')
  })
})

describe('Drift Impact Analyzer - Contradiction Resolution Scoring', () => {
  test('should score contradiction resolution effectiveness', () => {
    const entries = [
      createTestEntry({ id: 'entry-1' }),
      createTestEntry({ id: 'entry-2' }),
      createTestEntry({ id: 'entry-3' })
    ]
    
    const contradictions = [
      {
        severity: 'high' as const,
        type: 'contradiction_drift' as const,
        description: 'Contradiction 1',
        affectedEntries: ['entry-1', 'entry-2']
      },
      {
        severity: 'medium' as const,
        type: 'contradiction_drift' as const,
        description: 'Contradiction 2',
        affectedEntries: ['entry-2', 'entry-3']
      }
    ]
    
    const retiredEntries = [entries[0], entries[1]]
    
    const score = scoreContradictionResolution(contradictions, retiredEntries)
    
    // Should score based on resolved contradictions
    assert.ok(score > 0, 'Should have positive score')
    assert.ok(score <= 100, 'Score should not exceed 100')
  })
  
  test('should give higher score for resolving more contradictions', () => {
    const entries = Array.from({ length: 10 }, (_, i) => 
      createTestEntry({ id: `entry-${i}` })
    )
    
    const manyContradictions = Array.from({ length: 5 }, (_, i) => ({
      severity: 'high' as const,
      type: 'contradiction_drift' as const,
      description: `Contradiction ${i}`,
      affectedEntries: [`entry-${i}`, `entry-${i + 1}`]
    }))
    
    const fewContradictions = [{
      severity: 'high' as const,
      type: 'contradiction_drift' as const,
      description: 'Single contradiction',
      affectedEntries: ['entry-0', 'entry-1']
    }]
    
    const retiredEntries = entries.slice(0, 5)
    
    const highScore = scoreContradictionResolution(manyContradictions, retiredEntries)
    const lowScore = scoreContradictionResolution(fewContradictions, retiredEntries.slice(0, 2))
    
    assert.ok(highScore > lowScore, 
      'Should score higher for resolving more contradictions')
  })
  
  test('should weight by contradiction severity', () => {
    const entries = [
      createTestEntry({ id: 'entry-1' }),
      createTestEntry({ id: 'entry-2' })
    ]
    
    const criticalContradiction = [{
      severity: 'critical' as const,
      type: 'contradiction_drift' as const,
      description: 'Critical contradiction',
      affectedEntries: ['entry-1', 'entry-2']
    }]
    
    const lowContradiction = [{
      severity: 'low' as const,
      type: 'contradiction_drift' as const,
      description: 'Low severity contradiction',
      affectedEntries: ['entry-1', 'entry-2']
    }]
    
    const criticalScore = scoreContradictionResolution(criticalContradiction, [entries[0]])
    const lowScore = scoreContradictionResolution(lowContradiction, [entries[0]])
    
    assert.ok(criticalScore > lowScore,
      'Should score higher for resolving critical contradictions')
  })
})

describe('Drift Impact Analyzer - Integration', () => {
  test('should provide complete impact analysis', () => {
    const entries = Array.from({ length: 50 }, (_, i) => 
      createTestEntry({ id: `entry-${i}` })
    )
    
    const candidates = entries.slice(0, 10).map(entry => 
      createCandidate(entry, { reason: 'staleness' })
    )
    
    const driftReport: DriftReport = {
      timestamp: new Date().toISOString(),
      overallStatus: 'drift_detected',
      totalIssues: 3,
      criticalIssues: 0,
      highPriorityIssues: 3,
      checks: [
        {
          type: 'contradiction_drift',
          status: 'failed',
          category: 'contradiction_drift',
          issues: [
            {
              severity: 'high',
              type: 'contradiction_drift',
              description: 'Test contradiction',
              affectedEntries: ['entry-0', 'entry-1']
            }
          ],
          metadata: {},
          timestamp: new Date().toISOString()
        }
      ]
    }
    
    const impact = analyzeDriftImpact(candidates, driftReport, entries)
    
    // Should have all required fields
    assert.ok(impact.expectedImprovements, 'Should have expected improvements')
    assert.ok(impact.risks, 'Should have risk assessment')
    assert.ok(impact.recommendation, 'Should have recommendation')
    assert.ok(impact.explanation, 'Should have explanation')
    
    // Validate structure
    assert.ok(typeof impact.expectedImprovements.contradictionsResolved === 'number')
    assert.ok(typeof impact.expectedImprovements.stalenessReduced === 'number')
    assert.ok(typeof impact.expectedImprovements.redundancyEliminated === 'number')
    
    assert.ok(typeof impact.risks.knowledgeLoss === 'number')
    assert.ok(typeof impact.risks.crossEmbodimentDesync === 'number')
    assert.ok(typeof impact.risks.runtimeStateImpact === 'number')
    
    assert.ok(['proceed', 'review', 'abort'].includes(impact.recommendation))
  })
})
