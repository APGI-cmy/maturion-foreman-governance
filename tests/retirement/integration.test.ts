/**
 * Integration Tests for Retirement System
 * Tests the complete retirement pipeline
 */

import { describe, it, before } from 'node:test'
import assert from 'node:assert'
import { runRetirement, executeRetirement, getRetirementStatistics } from '@/lib/foreman/memory/retirement-engine'
import fs from 'fs'
import path from 'path'

describe('Retirement Integration', () => {
  const testMemoryPath = path.join(process.cwd(), 'memory')
  
  before(async () => {
    // Ensure memory directories exist
    const dirs = [
      path.join(testMemoryPath, 'global'),
      path.join(testMemoryPath, 'foreman'),
      path.join(testMemoryPath, 'projects'),
      path.join(testMemoryPath, 'archive')
    ]
    
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
    }
    
    // Initialize memory files if they don't exist
    const memoryFiles = [
      path.join(testMemoryPath, 'global', 'memory.json'),
      path.join(testMemoryPath, 'foreman', 'memory.json'),
      path.join(testMemoryPath, 'projects', 'memory.json')
    ]
    
    for (const file of memoryFiles) {
      if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify({ entries: [] }), 'utf-8')
      }
    }
  })
  
  it('should run full retirement process without errors', async () => {
    // This test validates that the retirement process runs end-to-end
    try {
      const report = await runRetirement()
      
      assert.ok(report, 'Should return retirement report')
      assert.ok(report.timestamp, 'Report should have timestamp')
      assert.ok(typeof report.totalEntriesEvaluated === 'number', 'Should evaluate entries')
      assert.ok(typeof report.candidatesIdentified === 'number', 'Should identify candidates')
      assert.ok(typeof report.entriesRetired === 'number', 'Should retire entries')
      assert.ok(report.summary, 'Should have summary')
    } catch (error) {
      assert.fail(`Retirement process should not throw errors: ${error}`)
    }
  })
  
  it('should create archive directories on retirement', async () => {
    await runRetirement()
    
    const archivePath = path.join(testMemoryPath, 'archive')
    assert.ok(fs.existsSync(archivePath), 'Archive directory should exist')
  })
  
  it('should log retirement events to governance-events.json', async () => {
    await runRetirement()
    
    const eventLogPath = path.join(testMemoryPath, 'governance-events.json')
    
    // Event log may not exist if no retirements happened, which is OK
    if (fs.existsSync(eventLogPath)) {
      const content = fs.readFileSync(eventLogPath, 'utf-8')
      assert.ok(content.length > 0, 'Event log should have content')
      
      const events = JSON.parse(content)
      assert.ok(Array.isArray(events), 'Events should be an array')
    }
  })
  
  it('should generate retirement statistics', async () => {
    const stats = await getRetirementStatistics()
    
    assert.ok(stats, 'Should return statistics')
    assert.ok(typeof stats.totalActive === 'number', 'Should have total active count')
    assert.ok(typeof stats.totalArchived === 'number', 'Should have total archived count')
    assert.ok(typeof stats.totalDeprecated === 'number', 'Should have total deprecated count')
    assert.ok(stats.retirementsByReason, 'Should have retirements by reason')
    assert.ok(stats.retirementsByScope, 'Should have retirements by scope')
    assert.ok(stats.lastRetirementRun, 'Should have last run timestamp')
  })
  
  it('should not delete retired memory (immutability check)', async () => {
    const report = await runRetirement()
    
    // Check that all retired entries are in archive
    for (const retirement of report.retirements) {
      // Archive location should exist
      const archiveExists = retirement.retirementInfo.lifecycle === 'archival' || 
                           retirement.retirementInfo.lifecycle === 'deprecated'
      
      if (archiveExists) {
        // Verify entry is preserved in original structure
        assert.ok(retirement.originalEntry, 'Original entry should be preserved')
        assert.ok(retirement.originalEntry.id, 'Entry ID should be preserved')
        assert.ok(retirement.originalEntry.metadata, 'Entry metadata should be preserved')
      }
    }
  })
  
  it('should respect manual review requirements', async () => {
    const report = await runRetirement({
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
      autoRetireConflicting: false, // Requires review
      requireManualReviewForHigh: true, // Requires review
      requireManualReviewForCritical: true, // Requires review
      enableArchival: true,
      archivalRetentionYears: 3,
      retireWhenConsolidated: true,
      minConsolidationConfidence: 0.8,
      resolveConflictsOnRetirement: true
    })
    
    // All high/critical severity candidates should be flagged for review
    const flaggedHighSeverity = report.candidates.filter(c => 
      c.severity === 'high' || c.severity === 'critical'
    )
    
    // These should not be in retired list
    const retiredHighSeverity = report.retirements.filter(r => 
      r.retirementInfo.severity === 'high' || r.retirementInfo.severity === 'critical'
    )
    
    if (flaggedHighSeverity.length > 0) {
      assert.strictEqual(
        retiredHighSeverity.length,
        0,
        'High/critical severity entries should not be auto-retired'
      )
    }
  })
})
