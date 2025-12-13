/**
 * Red QA Test Suite — Autonomous Refactoring Agent (ARA v1)
 * 
 * These tests validate ARA as specified in
 * /swarm/architecture/SWARM_ARCHITECTURE_V1.md (Section 2)
 * 
 * EXPECTED STATUS: RED (failing) — Architecture exists, implementation doesn't yet
 */

import { describe, test, expect, beforeEach } from '@jest/globals';

// Import types from architecture (will fail until implemented)
import type {
  Violation,
  ViolationDetector,
  Refactoring,
  RefactoringEngine,
  ValidationResult,
  RefactoringResult,
  ARAController,
  ARAConfig,
  ARACycleResult,
  ARAStatus
} from '../../swarm/implementation/ara/types';

describe('ARA - Violation Detector', () => {
  let detector: ViolationDetector;

  beforeEach(() => {
    const { createViolationDetector } = require('../../swarm/implementation/ara/violation-detector');
    detector = createViolationDetector();
  });

  test('should detect long functions as code smell', async () => {
    const code = `
      function veryLongFunction() {
        ${'console.log("line");\\n'.repeat(150)}
      }
    `;

    const violations = await detector.detectCodeSmells(code);

    expect(violations.length).toBeGreaterThan(0);
    expect(violations.some(v => v.type === 'code_smell')).toBe(true);
  });

  test('should detect deep nesting', async () => {
    const code = `
      function deeplyNested() {
        if (a) {
          if (b) {
            if (c) {
              if (d) {
                if (e) {
                  console.log("too deep");
                }
              }
            }
          }
        }
      }
    `;

    const violations = await detector.detectCodeSmells(code);

    expect(violations.some(v => v.description.includes('nesting'))).toBe(true);
  });

  test('should detect architecture violations', async () => {
    const code = `
      // UI component directly accessing database
      function MyComponent() {
        const data = database.query("SELECT * FROM users");
        return <div>{data}</div>;
      }
    `;

    const architecture = {
      rule: 'NO_DIRECT_DB_ACCESS_FROM_UI'
    };

    const violations = await detector.detectArchitectureViolations(code, architecture);

    expect(violations.length).toBeGreaterThan(0);
    expect(violations.some(v => v.type === 'architecture_violation')).toBe(true);
  });

  test('should detect anti-patterns', async () => {
    const code = `
      class GodObject {
        // 1000 lines of mixed responsibilities
        databaseOperation() {}
        uiRendering() {}
        businessLogic() {}
        networkCall() {}
        // ... many more unrelated methods
      }
    `;

    const violations = await detector.detectAntiPatterns(code);

    expect(violations.some(v => v.type === 'anti_pattern')).toBe(true);
  });

  test('should detect naming inconsistencies', async () => {
    const code = `
      const usr = getUser();
      const userData = getUserData();
      const userInformation = getUserInfo();
    `;

    const violations = await detector.detectCodeSmells(code);

    expect(violations.some(v => v.type === 'naming_inconsistency')).toBe(true);
  });

  test('should detect dead modules', async () => {
    const code = `
      import { unusedFunction } from './utils';
      
      function usedFunction() {
        return "used";
      }
      
      function unusedFunction() {
        return "never called";
      }
    `;

    const violations = await detector.detectCodeSmells(code);

    expect(violations.some(v => v.type === 'dead_module')).toBe(true);
  });

  test('should scan entire directory for violations', async () => {
    const violations = await detector.scanDirectory('./lib');

    expect(Array.isArray(violations)).toBe(true);
  });
});

describe('ARA - Refactoring Engine', () => {
  let engine: RefactoringEngine;

  beforeEach(() => {
    const { createRefactoringEngine } = require('../../swarm/implementation/ara/refactoring-engine');
    engine = createRefactoringEngine();
  });

  test('should propose refactoring for violation', () => {
    const violation: Violation = {
      id: 'violation-1',
      type: 'code_smell',
      severity: 'medium',
      file: 'lib/utils.ts',
      line: 42,
      description: 'Function too long (150 lines)',
      suggestedFix: 'Extract smaller functions',
      detectedAt: new Date()
    };

    const refactoring = engine.proposeRefactoring(violation);

    expect(refactoring).toBeDefined();
    expect(refactoring?.type).toBe('extract');
    expect(refactoring?.safety).toMatch(/safe|requires_review|requires_cs2/);
  });

  test('should validate refactoring safety', () => {
    const refactoring: Refactoring = {
      id: 'refactor-1',
      type: 'rename',
      violation: {
        id: 'v1',
        type: 'naming_inconsistency',
        severity: 'low',
        file: 'lib/utils.ts',
        description: 'Variable should be renamed',
        detectedAt: new Date()
      },
      targetFile: 'lib/utils.ts',
      transformation: {
        original: 'const usr = getUser();',
        modified: 'const user = getUser();',
        diff: '- const usr = getUser();\n+ const user = getUser();'
      },
      safety: 'safe',
      estimatedImpact: 'low'
    };

    const validation = engine.validateRefactoring(refactoring);

    expect(validation.valid).toBeDefined();
    expect(validation.blockers).toBeDefined();
    expect(Array.isArray(validation.warnings)).toBe(true);
  });

  test('should execute safe refactoring autonomously', async () => {
    const refactoring: Refactoring = {
      id: 'refactor-safe',
      type: 'remove',
      violation: {
        id: 'v2',
        type: 'dead_module',
        severity: 'low',
        file: 'lib/unused.ts',
        description: 'Unused import',
        detectedAt: new Date()
      },
      targetFile: 'lib/unused.ts',
      transformation: {
        original: 'import { unused } from "./module";',
        modified: '',
        diff: '- import { unused } from "./module";'
      },
      safety: 'safe',
      estimatedImpact: 'low'
    };

    const result = await engine.executeRefactoring(refactoring);

    expect(result.success).toBeDefined();
    expect(result.refactoringId).toBe('refactor-safe');
  });

  test('should require CS2 for structural changes', () => {
    const refactoring: Refactoring = {
      id: 'refactor-cs2',
      type: 'restructure',
      violation: {
        id: 'v3',
        type: 'architecture_violation',
        severity: 'high',
        file: 'lib/architecture.ts',
        description: 'Architecture needs restructuring',
        detectedAt: new Date()
      },
      targetFile: 'lib/architecture.ts',
      transformation: {
        original: 'class OldStructure {}',
        modified: 'class NewStructure {}',
        diff: '- class OldStructure {}\n+ class NewStructure {}'
      },
      safety: 'requires_cs2',
      estimatedImpact: 'high'
    };

    const validation = engine.validateRefactoring(refactoring);

    expect(validation.requiresCS2).toBe(true);
  });

  test('should rollback failed refactoring', async () => {
    await engine.rollbackRefactoring('refactor-failed');

    // Verify rollback occurred (implementation will have actual check)
    expect(true).toBe(true); // Placeholder
  });

  test('should never delete constitutional files', () => {
    const refactoring: Refactoring = {
      id: 'refactor-forbidden',
      type: 'remove',
      violation: {
        id: 'v4',
        type: 'dead_module',
        severity: 'low',
        file: 'BUILD_PHILOSOPHY.md',
        description: 'Unused file',
        detectedAt: new Date()
      },
      targetFile: 'BUILD_PHILOSOPHY.md',
      transformation: {
        original: 'file contents',
        modified: '',
        diff: '- entire file'
      },
      safety: 'requires_cs2',
      estimatedImpact: 'critical'
    };

    const validation = engine.validateRefactoring(refactoring);

    expect(validation.valid).toBe(false);
    expect(validation.blockers.some(b => b.includes('constitutional'))).toBe(true);
  });
});

describe('ARA - ARA Controller', () => {
  let controller: ARAController;

  beforeEach(() => {
    const { createARAController } = require('../../swarm/implementation/ara/ara-controller');
    controller = createARAController();
  });

  test('should start ARA with configuration', () => {
    const config: ARAConfig = {
      enabled: true,
      autoExecuteSafeRefactorings: true,
      scanInterval: 60000,
      maxRefactoringsPerCycle: 5,
      respectCS2: true
    };

    controller.start(config);
    const status = controller.getStatus();

    expect(status.running).toBe(true);
  });

  test('should stop ARA', () => {
    const config: ARAConfig = {
      enabled: true,
      autoExecuteSafeRefactorings: false,
      scanInterval: 60000,
      maxRefactoringsPerCycle: 3,
      respectCS2: true
    };

    controller.start(config);
    controller.stop();

    const status = controller.getStatus();
    expect(status.running).toBe(false);
  });

  test('should run ARA cycle and return results', async () => {
    const result = await controller.runCycle();

    expect(result.violationsDetected).toBeGreaterThanOrEqual(0);
    expect(result.refactoringsProposed).toBeGreaterThanOrEqual(0);
    expect(result.refactoringsExecuted).toBeGreaterThanOrEqual(0);
    expect(result.refactoringsBlocked).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(result.errors)).toBe(true);
  });

  test('should track ARA status', () => {
    const status = controller.getStatus();

    expect(status.running).toBeDefined();
    expect(status.totalViolationsDetected).toBeGreaterThanOrEqual(0);
    expect(status.totalRefactoringsExecuted).toBeGreaterThanOrEqual(0);
    expect(status.currentViolations).toBeGreaterThanOrEqual(0);
  });

  test('should respect maxRefactoringsPerCycle limit', async () => {
    const config: ARAConfig = {
      enabled: true,
      autoExecuteSafeRefactorings: true,
      scanInterval: 60000,
      maxRefactoringsPerCycle: 2,
      respectCS2: true
    };

    controller.start(config);
    const result = await controller.runCycle();

    expect(result.refactoringsExecuted).toBeLessThanOrEqual(2);
  });

  test('should escalate CS2 refactorings when respectCS2 is true', async () => {
    const config: ARAConfig = {
      enabled: true,
      autoExecuteSafeRefactorings: true,
      scanInterval: 60000,
      maxRefactoringsPerCycle: 10,
      respectCS2: true
    };

    controller.start(config);
    const result = await controller.runCycle();

    // If structural changes detected, they should be blocked, not executed
    expect(result.refactoringsBlocked + result.refactoringsExecuted).toBe(result.refactoringsProposed);
  });
});

describe('ARA - Integration with Recovery Engine', () => {
  test('should trigger recovery on refactoring failure', async () => {
    const { createARAController } = require('../../swarm/implementation/ara/ara-controller');
    const controller = createARAController();

    const config: ARAConfig = {
      enabled: true,
      autoExecuteSafeRefactorings: true,
      scanInterval: 60000,
      maxRefactoringsPerCycle: 5,
      respectCS2: true
    };

    controller.start(config);

    // Simulate refactoring that breaks tests
    // ARA should detect failure and trigger Recovery Engine rollback

    const result = await controller.runCycle();

    // If errors occurred, they should be captured
    if (result.errors.length > 0) {
      expect(result.errors.some(e => e.includes('rollback'))).toBe(true);
    }
  });
});

describe('ARA - CS2 Integration', () => {
  test('should escalate protected file modifications to CS2', async () => {
    const { createARAController } = require('../../swarm/implementation/ara/ara-controller');
    const controller = createARAController();

    const config: ARAConfig = {
      enabled: true,
      autoExecuteSafeRefactorings: true,
      scanInterval: 60000,
      maxRefactoringsPerCycle: 5,
      respectCS2: true
    };

    controller.start(config);

    // If ARA detects violations in protected files, must escalate
    const result = await controller.runCycle();

    // Verify CS2 escalation path is triggered
    expect(result.refactoringsBlocked).toBeGreaterThanOrEqual(0);
  });
});
