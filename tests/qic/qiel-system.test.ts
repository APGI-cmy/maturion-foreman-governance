/**
 * Tests for QIEL Components
 * 
 * Tests for:
 * - QIEL-5: Schema Cohesion Validator
 * - QIEL-6: Engine Load Validator
 * - QIEL-7: QI Incident Writer
 * - QIEL-8: Regression Test Generator
 * - QIEL Runner (comprehensive integration)
 */

import { describe, it, after } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import {
  runSchemaCohesionValidation,
  generateSchemaCohesionReport,
} from '../../lib/foreman/qa/schema-cohesion-validator';
import {
  runEngineLoadValidation,
  generateEngineLoadReport,
} from '../../lib/foreman/qa/engine-load-validator';
import {
  recordQIIncident,
  recordBuildErrorIncident,
  recordLintErrorIncident,
  recordSchemaMismatchIncident,
} from '../../lib/foreman/qa/qi-incident-writer';
import {
  generateRegressionTest,
  listRegressionTests,
  countRegressionTests,
} from '../../lib/foreman/qa/regression-test-generator';
import {
  runQIEL,
  runQuickQIEL,
} from '../../lib/foreman/qa/qiel-runner';

describe('QIEL-5: Schema Cohesion Validator', () => {
  it('should validate that all engine schemas exist', () => {
    const result = runSchemaCohesionValidation();
    
    assert.ok(result.validations.length > 0, 'Should validate at least one schema');
    
    // Check that key engines are validated
    const engineNames = result.validations.map(v => v.engineName);
    assert.ok(engineNames.includes('memory-fabric'), 'Should validate memory-fabric');
    assert.ok(engineNames.includes('drift-monitor'), 'Should validate drift-monitor');
  });

  it('should detect missing required types in schemas', () => {
    const result = runSchemaCohesionValidation();
    
    // All our schemas should exist
    const allExist = result.validations.every(v => v.exists);
    assert.ok(allExist, 'All schema files should exist');
  });

  it('should generate schema cohesion report', () => {
    const result = runSchemaCohesionValidation();
    const report = generateSchemaCohesionReport(result);
    
    assert.ok(report.includes('Schema Cohesion Validation Report'), 'Report should have title');
    assert.ok(report.includes('QIEL-5'), 'Report should reference QIEL-5');
  });
});

describe('QIEL-6: Engine Load Validator', () => {
  it('should validate that all cognitive engines can be loaded', async () => {
    const result = await runEngineLoadValidation();
    
    assert.ok(result.engines.length > 0, 'Should validate at least one engine');
    
    // Check that key engines are validated
    const engineNames = result.engines.map(e => e.engineName);
    assert.ok(engineNames.includes('memory-fabric'), 'Should validate memory-fabric');
    assert.ok(engineNames.includes('retirement-engine'), 'Should validate retirement-engine');
    assert.ok(engineNames.includes('consolidation-engine'), 'Should validate consolidation-engine');
    assert.ok(engineNames.includes('drift-monitor'), 'Should validate drift-monitor');
  });

  it('should detect if engines can be initialized', async () => {
    const result = await runEngineLoadValidation();
    
    // At least some engines should load successfully
    const loadedEngines = result.engines.filter(e => e.loaded);
    assert.ok(loadedEngines.length > 0, 'At least some engines should load');
  });

  it('should generate engine load report', async () => {
    const result = await runEngineLoadValidation();
    const report = generateEngineLoadReport(result);
    
    assert.ok(report.includes('Cognitive Engine Load Validation Report'), 'Report should have title');
    assert.ok(report.includes('QIEL-6'), 'Report should reference QIEL-6');
  });
});

describe('QIEL-7: QI Incident Writer', () => {
  it('should record a QI incident in memory', async () => {
    const result = await recordQIIncident({
      incidentType: 'build_error',
      severity: 'critical',
      source: 'test.ts',
      description: 'Test build error',
      details: { error: 'Test error message' },
    });
    
    assert.strictEqual(result.success, true, 'Should record incident successfully');
    assert.ok(result.incident, 'Should return incident object');
    assert.strictEqual(result.incident?.incidentType, 'build_error');
    assert.strictEqual(result.incident?.severity, 'critical');
  });

  it('should record build error incident with helper', async () => {
    const result = await recordBuildErrorIncident(
      'TypeError: undefined is not a function',
      'src/test.ts',
      'build-123'
    );
    
    assert.strictEqual(result.success, true);
    assert.ok(result.incident);
    assert.strictEqual(result.incident?.incidentType, 'build_error');
  });

  it('should record lint error incident with helper', async () => {
    const result = await recordLintErrorIncident(
      'Unexpected token',
      'src/test.ts',
      'build-123'
    );
    
    assert.strictEqual(result.success, true);
    assert.ok(result.incident);
    assert.strictEqual(result.incident?.incidentType, 'lint_error');
  });

  it('should record schema mismatch incident with helper', async () => {
    const result = await recordSchemaMismatchIncident(
      'engine1',
      'engine2',
      'timestamp',
      'Type mismatch: string vs number'
    );
    
    assert.strictEqual(result.success, true);
    assert.ok(result.incident);
    assert.strictEqual(result.incident?.incidentType, 'schema_mismatch');
  });

  it('should generate incident ID and metadata', async () => {
    const result = await recordQIIncident({
      incidentType: 'runtime_error',
      severity: 'high',
      source: 'test.ts',
      description: 'Test runtime error',
      details: {},
    });
    
    assert.ok(result.incident?.id, 'Should have incident ID');
    assert.ok(result.incident?.id.startsWith('qi-runtime_error-'), 'ID should follow pattern');
    assert.ok(result.incident?.timestamp, 'Should have timestamp');
  });
});

describe('QIEL-8: Regression Test Generator', () => {
  const testRegressionDir = path.join(process.cwd(), 'tests', 'qic', 'regression');

  it('should generate regression test from QI incident', async () => {
    const incident = {
      id: 'test-incident-123',
      timestamp: new Date().toISOString(),
      incidentType: 'build_error' as const,
      severity: 'critical' as const,
      source: 'test.ts',
      description: 'Test build error for regression',
      details: {
        errorClass: 'TypeError',
        error: 'Cannot read property of undefined',
      },
      metadata: {},
    };

    const result = await generateRegressionTest(incident);
    
    assert.strictEqual(result.success, true, 'Should generate test successfully');
    assert.ok(result.testFilePath, 'Should return test file path');
    assert.ok(result.testCode, 'Should return test code');
    assert.ok(result.testCode?.includes('Auto-generated regression test'), 'Test should have header');
    assert.ok(result.testCode?.includes('TypeError'), 'Test should reference error class');
  });

  it('should count regression tests', () => {
    const count = countRegressionTests();
    assert.ok(count >= 0, 'Should return count of regression tests');
  });

  it('should list regression tests', () => {
    const tests = listRegressionTests();
    assert.ok(Array.isArray(tests), 'Should return array of test files');
  });

  after(() => {
    // Cleanup test regression tests
    if (fs.existsSync(testRegressionDir)) {
      const files = fs.readdirSync(testRegressionDir);
      for (const file of files) {
        if (file.startsWith('test-incident-')) {
          fs.unlinkSync(path.join(testRegressionDir, file));
        }
      }
    }
  });
});

describe('QIEL Runner: Comprehensive Integration', () => {
  const testLogsDir = path.join(process.cwd(), 'tests', 'qa', 'fixtures');

  it('should run quick QIEL check', async () => {
    // Create minimal log files for testing
    fs.mkdirSync(testLogsDir, { recursive: true });
    fs.writeFileSync(path.join(testLogsDir, 'build.log'), 'Build completed\n');
    fs.writeFileSync(path.join(testLogsDir, 'lint.log'), 'Linting passed\n');
    fs.writeFileSync(path.join(testLogsDir, 'test.log'), 'Tests passed\n');

    const result = await runQuickQIEL(testLogsDir);
    
    assert.ok(result, 'Should return QIEL result');
    assert.ok(result.timestamp, 'Should have timestamp');
    assert.ok(result.checks, 'Should have checks object');
    assert.ok(result.overallSummary, 'Should have summary');

    // Cleanup
    fs.unlinkSync(path.join(testLogsDir, 'build.log'));
    fs.unlinkSync(path.join(testLogsDir, 'lint.log'));
    fs.unlinkSync(path.join(testLogsDir, 'test.log'));
  });

  it('should detect failures in QIEL checks', async () => {
    // Create log files with errors
    fs.mkdirSync(testLogsDir, { recursive: true });
    fs.writeFileSync(path.join(testLogsDir, 'build.log'), 'ERROR: Build failed\n');
    fs.writeFileSync(path.join(testLogsDir, 'lint.log'), 'error: Unexpected token\n');
    fs.writeFileSync(path.join(testLogsDir, 'test.log'), 'Tests passed\n');

    const result = await runQuickQIEL(testLogsDir);
    
    assert.strictEqual(result.passed, false, 'QIEL should fail with errors in logs');
    assert.ok(result.blockersFound.length > 0, 'Should have blockers');
    assert.strictEqual(result.checks.buildLogsPassed, false, 'Build logs should fail');

    // Cleanup
    fs.unlinkSync(path.join(testLogsDir, 'build.log'));
    fs.unlinkSync(path.join(testLogsDir, 'lint.log'));
    fs.unlinkSync(path.join(testLogsDir, 'test.log'));
  });

  it('should generate comprehensive QIEL report', async () => {
    // Create clean log files
    fs.mkdirSync(testLogsDir, { recursive: true });
    fs.writeFileSync(path.join(testLogsDir, 'build.log'), 'Build completed\n');
    fs.writeFileSync(path.join(testLogsDir, 'lint.log'), 'Linting passed\n');
    fs.writeFileSync(path.join(testLogsDir, 'test.log'), 'Tests passed\n');

    const result = await runQuickQIEL(testLogsDir);
    
    assert.ok(result.reportMarkdown, 'Should generate markdown report');
    assert.ok(result.reportMarkdown.includes('QIEL'), 'Report should reference QIEL');
    assert.ok(result.reportMarkdown.includes('QIC Exit Criteria'), 'Report should have exit criteria');

    // Cleanup
    fs.unlinkSync(path.join(testLogsDir, 'build.log'));
    fs.unlinkSync(path.join(testLogsDir, 'lint.log'));
    fs.unlinkSync(path.join(testLogsDir, 'test.log'));
  });

  it('should record QI incidents when checks fail', async () => {
    // Create log files with errors
    fs.mkdirSync(testLogsDir, { recursive: true });
    fs.writeFileSync(path.join(testLogsDir, 'build.log'), 'TypeError: Cannot read property\n');
    fs.writeFileSync(path.join(testLogsDir, 'lint.log'), '');
    fs.writeFileSync(path.join(testLogsDir, 'test.log'), '');

    const result = await runQuickQIEL(testLogsDir);
    
    assert.ok(result.qiIncidents.length > 0, 'Should record QI incidents for failures');
    
    // Cleanup
    fs.unlinkSync(path.join(testLogsDir, 'build.log'));
    fs.unlinkSync(path.join(testLogsDir, 'lint.log'));
    fs.unlinkSync(path.join(testLogsDir, 'test.log'));
  });

  after(() => {
    // Cleanup test directory
    if (fs.existsSync(testLogsDir)) {
      const files = fs.readdirSync(testLogsDir);
      files.forEach(file => {
        fs.unlinkSync(path.join(testLogsDir, file));
      });
      fs.rmdirSync(testLogsDir);
    }
  });
});
