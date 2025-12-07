/**
 * Quality Integrity Watchdog (QIW) Tests
 * 
 * Tests for the Quality Integrity Watchdog system
 */

import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import * as fs from 'fs'
import * as path from 'path'
import {
  monitorChannel,
  runQIWMonitoring,
  generateQIWReportMarkdown
} from '../../lib/foreman/watchdog/quality-integrity-watchdog'

describe('Quality Integrity Watchdog', () => {
  const testLogsDir = '/tmp/qiw-test-logs'

  // Setup test logs directory
  function setupTestLogs() {
    if (!fs.existsSync(testLogsDir)) {
      fs.mkdirSync(testLogsDir, { recursive: true })
    }
  }

  // Cleanup test logs
  function cleanupTestLogs() {
    if (fs.existsSync(testLogsDir)) {
      const files = fs.readdirSync(testLogsDir)
      for (const file of files) {
        fs.unlinkSync(path.join(testLogsDir, file))
      }
      fs.rmdirSync(testLogsDir)
    }
  }

  describe('monitorChannel', () => {
    it('should detect missing log file', () => {
      setupTestLogs()
      const result = monitorChannel('build', path.join(testLogsDir, 'nonexistent.log'))
      
      assert.strictEqual(result.passed, false)
      assert.strictEqual(result.logExists, false)
      assert.strictEqual(result.anomalies.length, 1)
      assert.strictEqual(result.anomalies[0].severity, 'critical')
      assert.strictEqual(result.anomalies[0].pattern, 'missing_log_file')
      
      cleanupTestLogs()
    })

    it('should pass for clean build log', () => {
      setupTestLogs()
      const logPath = path.join(testLogsDir, 'build.log')
      fs.writeFileSync(logPath, 'Build started\nCompiling...\nBuild completed successfully\n', 'utf-8')
      
      const result = monitorChannel('build', logPath)
      
      assert.strictEqual(result.passed, true)
      assert.strictEqual(result.logExists, true)
      assert.strictEqual(result.errorCount, 0)
      assert.strictEqual(result.warningCount, 0)
      
      cleanupTestLogs()
    })

    it('should detect build errors', () => {
      setupTestLogs()
      const logPath = path.join(testLogsDir, 'build.log')
      fs.writeFileSync(logPath, 'Build started\nERROR: Failed to compile\nTypeError: Cannot read property\n', 'utf-8')
      
      const result = monitorChannel('build', logPath)
      
      assert.strictEqual(result.passed, false)
      assert.strictEqual(result.errorCount, 2)
      assert.strictEqual(result.anomalies.length, 2)
      assert.strictEqual(result.anomalies[0].severity, 'error')
      
      cleanupTestLogs()
    })

    it('should detect build warnings', () => {
      setupTestLogs()
      const logPath = path.join(testLogsDir, 'build.log')
      fs.writeFileSync(logPath, 'Build started\nWARNING: Deprecated API usage\nwarning TS1234: Type inference warning\n', 'utf-8')
      
      const result = monitorChannel('build', logPath)
      
      assert.strictEqual(result.warningCount, 2)
      assert.strictEqual(result.anomalies.length, 2)
      assert.strictEqual(result.anomalies[0].severity, 'warning')
      
      cleanupTestLogs()
    })

    it('should detect lint errors', () => {
      setupTestLogs()
      const logPath = path.join(testLogsDir, 'lint.log')
      fs.writeFileSync(logPath, 'Linting...\n✖ 1:1 error Missing semicolon\n', 'utf-8')
      
      const result = monitorChannel('lint', logPath)
      
      assert.strictEqual(result.passed, false)
      assert.strictEqual(result.errorCount, 1)
      
      cleanupTestLogs()
    })

    it('should detect test failures', () => {
      setupTestLogs()
      const logPath = path.join(testLogsDir, 'test.log')
      fs.writeFileSync(logPath, 'Running tests...\nFAIL src/test.ts\n  AssertionError: expected true to be false\n', 'utf-8')
      
      const result = monitorChannel('test', logPath)
      
      assert.strictEqual(result.passed, false)
      assert.strictEqual(result.errorCount, 2) // FAIL + AssertionError
      
      cleanupTestLogs()
    })
  })

  describe('runQIWMonitoring', () => {
    it('should monitor all channels and pass with clean logs', () => {
      setupTestLogs()
      
      // Create clean log files
      fs.writeFileSync(path.join(testLogsDir, 'build.log'), 'Build successful\n', 'utf-8')
      fs.writeFileSync(path.join(testLogsDir, 'lint.log'), 'No issues found\n', 'utf-8')
      fs.writeFileSync(path.join(testLogsDir, 'test.log'), 'All tests passed\n', 'utf-8')
      
      const report = runQIWMonitoring({
        logsDir: testLogsDir,
        enabledChannels: ['build', 'lint', 'test'],
        writeGovernanceMemory: false
      })
      
      assert.strictEqual(report.passed, true)
      assert.strictEqual(report.qaBlocked, false)
      assert.strictEqual(report.channels.length, 3)
      assert.strictEqual(report.criticalCount, 0)
      assert.strictEqual(report.errorCount, 0)
      
      cleanupTestLogs()
    })

    it('should block QA when errors are detected', () => {
      setupTestLogs()
      
      // Create logs with errors
      fs.writeFileSync(path.join(testLogsDir, 'build.log'), 'ERROR: Build failed\n', 'utf-8')
      fs.writeFileSync(path.join(testLogsDir, 'lint.log'), 'No issues found\n', 'utf-8')
      fs.writeFileSync(path.join(testLogsDir, 'test.log'), 'All tests passed\n', 'utf-8')
      
      const report = runQIWMonitoring({
        logsDir: testLogsDir,
        enabledChannels: ['build', 'lint', 'test'],
        blockOnErrors: true,
        writeGovernanceMemory: false
      })
      
      assert.strictEqual(report.passed, false)
      assert.strictEqual(report.qaBlocked, true)
      assert.strictEqual(report.errorCount, 1)
      assert.ok(report.recommendations.length > 0)
      
      cleanupTestLogs()
    })

    it('should generate recommendations for anomalies', () => {
      setupTestLogs()
      
      // Create logs with multiple issues
      fs.writeFileSync(path.join(testLogsDir, 'build.log'), 'ERROR: Module not found\nWARNING: deprecated API\n', 'utf-8')
      fs.writeFileSync(path.join(testLogsDir, 'lint.log'), 'No issues found\n', 'utf-8')
      fs.writeFileSync(path.join(testLogsDir, 'test.log'), 'FAIL: test failed\n', 'utf-8')
      
      const report = runQIWMonitoring({
        logsDir: testLogsDir,
        enabledChannels: ['build', 'lint', 'test'],
        writeGovernanceMemory: false
      })
      
      assert.strictEqual(report.passed, false)
      assert.ok(report.recommendations.length > 0)
      // Check for any relevant recommendation
      assert.ok(report.recommendations.some(r => 
        r.includes('Install missing dependency') || 
        r.includes('Fix failing test') ||
        r.includes('deprecated')
      ))
      
      cleanupTestLogs()
    })

    it('should handle missing log files gracefully', () => {
      setupTestLogs()
      
      // Only create build.log, leave lint and test missing
      fs.writeFileSync(path.join(testLogsDir, 'build.log'), 'Build successful\n', 'utf-8')
      
      const report = runQIWMonitoring({
        logsDir: testLogsDir,
        enabledChannels: ['build', 'lint', 'test'],
        writeGovernanceMemory: false
      })
      
      assert.strictEqual(report.passed, false)
      assert.strictEqual(report.qaBlocked, true)
      assert.strictEqual(report.criticalCount, 2) // 2 missing log files
      
      cleanupTestLogs()
    })
  })

  describe('generateQIWReportMarkdown', () => {
    it('should generate markdown report', () => {
      setupTestLogs()
      
      // Create logs with some issues
      fs.writeFileSync(path.join(testLogsDir, 'build.log'), 'ERROR: Build failed\n', 'utf-8')
      fs.writeFileSync(path.join(testLogsDir, 'lint.log'), 'No issues\n', 'utf-8')
      fs.writeFileSync(path.join(testLogsDir, 'test.log'), 'All passed\n', 'utf-8')
      
      const report = runQIWMonitoring({
        logsDir: testLogsDir,
        enabledChannels: ['build', 'lint', 'test'],
        writeGovernanceMemory: false
      })
      
      const markdown = generateQIWReportMarkdown(report)
      
      assert.ok(markdown.includes('# Quality Integrity Watchdog'))
      assert.ok(markdown.includes('Overall Status'))
      assert.ok(markdown.includes('QA Blocked'))
      assert.ok(markdown.includes('Anomaly Summary'))
      assert.ok(markdown.includes('Channel Results'))
      
      cleanupTestLogs()
    })
  })

  describe('Governance Memory Integration', () => {
    it('should write to governance memory when enabled', () => {
      setupTestLogs()
      
      // Create logs with errors
      fs.writeFileSync(path.join(testLogsDir, 'build.log'), 'ERROR: Build failed\n', 'utf-8')
      fs.writeFileSync(path.join(testLogsDir, 'lint.log'), 'No issues\n', 'utf-8')
      fs.writeFileSync(path.join(testLogsDir, 'test.log'), 'All passed\n', 'utf-8')
      
      const report = runQIWMonitoring({
        logsDir: testLogsDir,
        enabledChannels: ['build', 'lint', 'test'],
        writeGovernanceMemory: true
      })
      
      // Check that governance memory file was created
      const memoryFile = path.join(process.cwd(), 'memory', 'global', 'qiw-events.json')
      const memoryExists = fs.existsSync(memoryFile)
      
      assert.strictEqual(report.passed, false)
      assert.strictEqual(memoryExists, true)
      
      if (memoryExists) {
        const events = JSON.parse(fs.readFileSync(memoryFile, 'utf-8'))
        assert.ok(Array.isArray(events))
        assert.ok(events.length > 0)
        assert.ok(events[0].whatFailed)
        assert.ok(events[0].where)
        assert.ok(events[0].why)
        assert.ok(events[0].recommendedFix)
      }
      
      cleanupTestLogs()
    })
  })
})
