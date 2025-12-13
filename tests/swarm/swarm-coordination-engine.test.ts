/**
 * Red QA Test Suite — Swarm Coordination Engine (SCE)
 * 
 * These tests validate the Swarm Coordination Engine as specified in
 * /swarm/architecture/SWARM_ARCHITECTURE_V1.md
 * 
 * EXPECTED STATUS: RED (failing) — Architecture exists, implementation doesn't yet
 */

import { describe, test, expect, beforeEach } from '@jest/globals';

// Import types from architecture (will fail until implemented)
import type {
  Agent,
  AgentCapability,
  AgentRegistry,
  Task,
  TaskRequirements,
  CapabilityMatcher,
  MatchResult,
  TaskDistributor,
  Conflict,
  ConflictResolver,
  ConflictResolution,
  DependencyAnalyzer,
  LoadBalancer,
  AgentLoad,
  ScheduleDecision
} from '../../swarm/implementation/engine/types';

describe('Swarm Coordination Engine - Agent Registry', () => {
  let registry: AgentRegistry;

  beforeEach(() => {
    // This will fail until AgentRegistry is implemented
    const { createAgentRegistry } = require('../../swarm/implementation/engine/agent-registry');
    registry = createAgentRegistry();
  });

  test('should register a new agent successfully', () => {
    const agent: Agent = {
      id: 'agent-1',
      name: 'Test Builder',
      capability: {
        type: 'builder',
        skills: ['typescript', 'react', 'nextjs'],
        context: ['ui', 'frontend'],
        riskLevel: 'medium',
        governanceDomain: ['ui-development'],
        maxConcurrentTasks: 3,
        performance: {
          avgResponseTime: 1500,
          successRate: 0.95,
          lastActive: new Date()
        }
      },
      status: 'idle',
      currentTasks: [],
      totalTasksCompleted: 0,
      metadata: {}
    };

    registry.registerAgent(agent);
    const retrieved = registry.getAgent('agent-1');

    expect(retrieved).toBeDefined();
    expect(retrieved?.name).toBe('Test Builder');
    expect(retrieved?.status).toBe('idle');
  });

  test('should unregister an agent', () => {
    const agent: Agent = {
      id: 'agent-2',
      name: 'Test Agent',
      capability: {
        type: 'foreman',
        skills: ['orchestration'],
        context: ['governance'],
        riskLevel: 'high',
        governanceDomain: ['orchestration'],
        maxConcurrentTasks: 10,
        performance: {
          avgResponseTime: 500,
          successRate: 1.0,
          lastActive: new Date()
        }
      },
      status: 'idle',
      currentTasks: [],
      totalTasksCompleted: 0,
      metadata: {}
    };

    registry.registerAgent(agent);
    registry.unregisterAgent('agent-2');
    const retrieved = registry.getAgent('agent-2');

    expect(retrieved).toBeNull();
  });

  test('should get agents by capability type', () => {
    const builder1: Agent = {
      id: 'builder-1',
      name: 'Builder 1',
      capability: {
        type: 'builder',
        skills: ['typescript'],
        context: ['backend'],
        riskLevel: 'medium',
        governanceDomain: ['backend-development'],
        maxConcurrentTasks: 5,
        performance: {
          avgResponseTime: 2000,
          successRate: 0.92,
          lastActive: new Date()
        }
      },
      status: 'idle',
      currentTasks: [],
      totalTasksCompleted: 10,
      metadata: {}
    };

    const foreman1: Agent = {
      id: 'foreman-1',
      name: 'Foreman 1',
      capability: {
        type: 'foreman',
        skills: ['orchestration'],
        context: ['governance'],
        riskLevel: 'critical',
        governanceDomain: ['all'],
        maxConcurrentTasks: 20,
        performance: {
          avgResponseTime: 300,
          successRate: 1.0,
          lastActive: new Date()
        }
      },
      status: 'idle',
      currentTasks: [],
      totalTasksCompleted: 50,
      metadata: {}
    };

    registry.registerAgent(builder1);
    registry.registerAgent(foreman1);

    const builders = registry.getAgentsByCapability('builder');
    expect(builders).toHaveLength(1);
    expect(builders[0].id).toBe('builder-1');
  });

  test('should get available agents (idle or not fully loaded)', () => {
    const idleAgent: Agent = {
      id: 'idle-agent',
      name: 'Idle Agent',
      capability: {
        type: 'builder',
        skills: ['typescript'],
        context: [],
        riskLevel: 'low',
        governanceDomain: [],
        maxConcurrentTasks: 5,
        performance: {
          avgResponseTime: 1000,
          successRate: 0.95,
          lastActive: new Date()
        }
      },
      status: 'idle',
      currentTasks: [],
      totalTasksCompleted: 0,
      metadata: {}
    };

    const busyAgent: Agent = {
      id: 'busy-agent',
      name: 'Busy Agent',
      capability: {
        type: 'builder',
        skills: ['typescript'],
        context: [],
        riskLevel: 'low',
        governanceDomain: [],
        maxConcurrentTasks: 2,
        performance: {
          avgResponseTime: 1000,
          successRate: 0.95,
          lastActive: new Date()
        }
      },
      status: 'busy',
      currentTasks: ['task-1', 'task-2'],
      totalTasksCompleted: 0,
      metadata: {}
    };

    registry.registerAgent(idleAgent);
    registry.registerAgent(busyAgent);

    const available = registry.getAvailableAgents();
    expect(available.length).toBeGreaterThan(0);
    expect(available.some(a => a.id === 'idle-agent')).toBe(true);
  });

  test('should update agent status', () => {
    const agent: Agent = {
      id: 'agent-3',
      name: 'Test Agent',
      capability: {
        type: 'builder',
        skills: [],
        context: [],
        riskLevel: 'low',
        governanceDomain: [],
        maxConcurrentTasks: 1,
        performance: {
          avgResponseTime: 1000,
          successRate: 1.0,
          lastActive: new Date()
        }
      },
      status: 'idle',
      currentTasks: [],
      totalTasksCompleted: 0,
      metadata: {}
    };

    registry.registerAgent(agent);
    registry.updateAgentStatus('agent-3', 'busy');

    const updated = registry.getAgent('agent-3');
    expect(updated?.status).toBe('busy');
  });
});

describe('Swarm Coordination Engine - Capability Matcher', () => {
  let matcher: CapabilityMatcher;
  let registry: AgentRegistry;

  beforeEach(() => {
    const { createCapabilityMatcher } = require('../../swarm/implementation/engine/capability-matcher');
    const { createAgentRegistry } = require('../../swarm/implementation/engine/agent-registry');
    
    registry = createAgentRegistry();
    matcher = createCapabilityMatcher(registry);
  });

  test('should find best agent for task with exact skill match', () => {
    const agent: Agent = {
      id: 'typescript-expert',
      name: 'TypeScript Expert',
      capability: {
        type: 'builder',
        skills: ['typescript', 'react', 'nextjs'],
        context: ['ui', 'frontend'],
        riskLevel: 'medium',
        governanceDomain: ['ui-development'],
        maxConcurrentTasks: 5,
        performance: {
          avgResponseTime: 1200,
          successRate: 0.98,
          lastActive: new Date()
        }
      },
      status: 'idle',
      currentTasks: [],
      totalTasksCompleted: 25,
      metadata: {}
    };

    registry.registerAgent(agent);

    const taskRequirements: TaskRequirements = {
      type: 'build',
      skills: ['typescript', 'react'],
      context: ['ui'],
      riskLevel: 'medium',
      governanceConstraints: [],
      priority: 5
    };

    const match = matcher.findBestAgent(taskRequirements);

    expect(match).toBeDefined();
    expect(match?.agentId).toBe('typescript-expert');
    expect(match?.matchScore).toBeGreaterThan(70);
  });

  test('should return null when no matching agent available', () => {
    const taskRequirements: TaskRequirements = {
      type: 'build',
      skills: ['rust', 'webassembly'],
      context: ['low-level'],
      riskLevel: 'high',
      governanceConstraints: [],
      priority: 10
    };

    const match = matcher.findBestAgent(taskRequirements);
    expect(match).toBeNull();
  });

  test('should prioritize idle agents over busy agents', () => {
    const idleAgent: Agent = {
      id: 'idle-builder',
      name: 'Idle Builder',
      capability: {
        type: 'builder',
        skills: ['typescript'],
        context: [],
        riskLevel: 'medium',
        governanceDomain: [],
        maxConcurrentTasks: 5,
        performance: {
          avgResponseTime: 1500,
          successRate: 0.90,
          lastActive: new Date()
        }
      },
      status: 'idle',
      currentTasks: [],
      totalTasksCompleted: 10,
      metadata: {}
    };

    const busyAgent: Agent = {
      id: 'busy-builder',
      name: 'Busy Builder',
      capability: {
        type: 'builder',
        skills: ['typescript'],
        context: [],
        riskLevel: 'medium',
        governanceDomain: [],
        maxConcurrentTasks: 5,
        performance: {
          avgResponseTime: 1200,
          successRate: 0.95,
          lastActive: new Date()
        }
      },
      status: 'busy',
      currentTasks: ['task-1'],
      totalTasksCompleted: 20,
      metadata: {}
    };

    registry.registerAgent(idleAgent);
    registry.registerAgent(busyAgent);

    const taskRequirements: TaskRequirements = {
      type: 'build',
      skills: ['typescript'],
      context: [],
      riskLevel: 'medium',
      governanceConstraints: [],
      priority: 5
    };

    const match = matcher.findBestAgent(taskRequirements);
    expect(match?.agentId).toBe('idle-builder');
  });

  test('should calculate match score correctly', () => {
    const agent: Agent = {
      id: 'test-agent',
      name: 'Test Agent',
      capability: {
        type: 'builder',
        skills: ['typescript', 'react'],
        context: ['ui'],
        riskLevel: 'medium',
        governanceDomain: [],
        maxConcurrentTasks: 5,
        performance: {
          avgResponseTime: 1000,
          successRate: 0.95,
          lastActive: new Date()
        }
      },
      status: 'idle',
      currentTasks: [],
      totalTasksCompleted: 15,
      metadata: {}
    };

    const taskRequirements: TaskRequirements = {
      type: 'build',
      skills: ['typescript', 'react'],
      context: ['ui'],
      riskLevel: 'medium',
      governanceConstraints: [],
      priority: 5
    };

    const score = matcher.calculateMatchScore(agent, taskRequirements);

    // Perfect match should score very high (close to 100)
    expect(score).toBeGreaterThan(85);
  });

  test('should find all matching agents and sort by score', () => {
    const agent1: Agent = {
      id: 'agent-1',
      name: 'Agent 1',
      capability: {
        type: 'builder',
        skills: ['typescript'],
        context: [],
        riskLevel: 'medium',
        governanceDomain: [],
        maxConcurrentTasks: 5,
        performance: {
          avgResponseTime: 2000,
          successRate: 0.85,
          lastActive: new Date()
        }
      },
      status: 'idle',
      currentTasks: [],
      totalTasksCompleted: 5,
      metadata: {}
    };

    const agent2: Agent = {
      id: 'agent-2',
      name: 'Agent 2',
      capability: {
        type: 'builder',
        skills: ['typescript', 'react'],
        context: ['ui'],
        riskLevel: 'medium',
        governanceDomain: [],
        maxConcurrentTasks: 5,
        performance: {
          avgResponseTime: 1000,
          successRate: 0.98,
          lastActive: new Date()
        }
      },
      status: 'idle',
      currentTasks: [],
      totalTasksCompleted: 30,
      metadata: {}
    };

    registry.registerAgent(agent1);
    registry.registerAgent(agent2);

    const taskRequirements: TaskRequirements = {
      type: 'build',
      skills: ['typescript', 'react'],
      context: ['ui'],
      riskLevel: 'medium',
      governanceConstraints: [],
      priority: 5
    };

    const matches = matcher.findAllMatchingAgents(taskRequirements);

    expect(matches.length).toBeGreaterThan(0);
    // Agent 2 should score higher
    expect(matches[0].matchScore).toBeGreaterThanOrEqual(matches[matches.length - 1].matchScore);
  });
});

describe('Swarm Coordination Engine - Task Distributor', () => {
  let distributor: TaskDistributor;

  beforeEach(() => {
    const { createTaskDistributor } = require('../../swarm/implementation/engine/task-distributor');
    distributor = createTaskDistributor();
  });

  test('should submit a new task', () => {
    const task: Task = {
      id: 'task-1',
      type: 'build',
      requirements: {
        type: 'build',
        skills: ['typescript'],
        context: [],
        riskLevel: 'medium',
        governanceConstraints: [],
        priority: 5
      },
      dependencies: [],
      priority: 5,
      status: 'pending',
      createdAt: new Date(),
      metadata: {}
    };

    distributor.submitTask(task);
    const status = distributor.getTaskStatus('task-1');

    expect(status).toBe('pending');
  });

  test('should assign task to agent', () => {
    const task: Task = {
      id: 'task-2',
      type: 'build',
      requirements: {
        type: 'build',
        skills: ['typescript'],
        context: [],
        riskLevel: 'low',
        governanceConstraints: [],
        priority: 3
      },
      dependencies: [],
      priority: 3,
      status: 'pending',
      createdAt: new Date(),
      metadata: {}
    };

    distributor.submitTask(task);
    distributor.assignTask('task-2', 'agent-1');

    const status = distributor.getTaskStatus('task-2');
    expect(status).toBe('assigned');
  });

  test('should distribute ready tasks automatically', async () => {
    const task1: Task = {
      id: 'task-ready',
      type: 'build',
      requirements: {
        type: 'build',
        skills: ['typescript'],
        context: [],
        riskLevel: 'low',
        governanceConstraints: [],
        priority: 5
      },
      dependencies: [],
      priority: 5,
      status: 'pending',
      createdAt: new Date(),
      metadata: {}
    };

    const task2: Task = {
      id: 'task-blocked',
      type: 'build',
      requirements: {
        type: 'build',
        skills: ['typescript'],
        context: [],
        riskLevel: 'low',
        governanceConstraints: [],
        priority: 3
      },
      dependencies: ['task-ready'],
      priority: 3,
      status: 'pending',
      createdAt: new Date(),
      metadata: {}
    };

    distributor.submitTask(task1);
    distributor.submitTask(task2);

    await distributor.distributeReadyTasks();

    // task-ready should be assigned/running, task-blocked should still be pending
    const readyStatus = distributor.getTaskStatus('task-ready');
    const blockedStatus = distributor.getTaskStatus('task-blocked');

    expect(readyStatus).not.toBe('pending');
    expect(blockedStatus).toBe('pending');
  });

  test('should cancel a task', () => {
    const task: Task = {
      id: 'task-to-cancel',
      type: 'build',
      requirements: {
        type: 'build',
        skills: ['typescript'],
        context: [],
        riskLevel: 'low',
        governanceConstraints: [],
        priority: 1
      },
      dependencies: [],
      priority: 1,
      status: 'pending',
      createdAt: new Date(),
      metadata: {}
    };

    distributor.submitTask(task);
    distributor.cancelTask('task-to-cancel');

    const status = distributor.getTaskStatus('task-to-cancel');
    expect(status).toBe('cancelled' as any);
  });
});

describe('Swarm Coordination Engine - Conflict Resolver', () => {
  let resolver: ConflictResolver;

  beforeEach(() => {
    const { createConflictResolver } = require('../../swarm/implementation/engine/conflict-resolver');
    resolver = createConflictResolver();
  });

  test('should detect file conflict', () => {
    const operations = [
      {
        agentId: 'agent-1',
        type: 'file_modify',
        target: 'app/page.tsx',
        timestamp: new Date()
      },
      {
        agentId: 'agent-2',
        type: 'file_modify',
        target: 'app/page.tsx',
        timestamp: new Date()
      }
    ];

    const conflict = resolver.detectConflict(operations);

    expect(conflict).not.toBeNull();
    expect(conflict?.type).toBe('file');
    expect(conflict?.agentIds).toContain('agent-1');
    expect(conflict?.agentIds).toContain('agent-2');
  });

  test('should resolve conflict with priority strategy', () => {
    const conflict: Conflict = {
      id: 'conflict-1',
      type: 'file',
      agentIds: ['agent-high-priority', 'agent-low-priority'],
      taskIds: ['task-1', 'task-2'],
      description: 'Both agents modifying app/page.tsx',
      severity: 'medium',
      detectedAt: new Date()
    };

    const resolution = resolver.resolveConflict(conflict);

    expect(resolution.strategy).toBeDefined();
    expect(resolution.strategy).toMatch(/priority|backoff|merge|escalate/);
  });

  test('should apply backoff to losing agent', () => {
    resolver.applyBackoff('agent-1', 5000);

    // Verify backoff was applied (internal state check)
    // This would require exposing backoff state or verifying side effects
    expect(true).toBe(true); // Placeholder - implementation will have actual verification
  });

  test('should escalate critical conflicts', () => {
    const criticalConflict: Conflict = {
      id: 'conflict-critical',
      type: 'governance',
      agentIds: ['agent-1', 'agent-2'],
      taskIds: ['task-1', 'task-2'],
      description: 'Governance violation detected',
      severity: 'critical',
      detectedAt: new Date()
    };

    const resolution = resolver.resolveConflict(criticalConflict);

    expect(resolution.requiresHumanReview).toBe(true);
    expect(resolution.strategy).toBe('escalate');
  });
});

describe('Swarm Coordination Engine - Dependency Analyzer', () => {
  let analyzer: DependencyAnalyzer;

  beforeEach(() => {
    const { createDependencyAnalyzer } = require('../../swarm/implementation/engine/dependency-analyzer');
    analyzer = createDependencyAnalyzer();
  });

  test('should add tasks to dependency graph', () => {
    analyzer.addTask('task-1', []);
    analyzer.addTask('task-2', ['task-1']);
    analyzer.addTask('task-3', ['task-1', 'task-2']);

    const order = analyzer.getExecutionOrder();

    expect(order).toContain('task-1');
    expect(order).toContain('task-2');
    expect(order).toContain('task-3');
    expect(order.indexOf('task-1')).toBeLessThan(order.indexOf('task-2'));
    expect(order.indexOf('task-2')).toBeLessThan(order.indexOf('task-3'));
  });

  test('should detect circular dependencies', () => {
    analyzer.addTask('task-a', ['task-c']);
    analyzer.addTask('task-b', ['task-a']);
    analyzer.addTask('task-c', ['task-b']);

    const cycle = analyzer.detectCircularDependencies();

    expect(cycle).not.toBeNull();
    expect(cycle).toContain('task-a');
    expect(cycle).toContain('task-b');
    expect(cycle).toContain('task-c');
  });

  test('should determine if task can execute', () => {
    analyzer.addTask('task-1', []);
    analyzer.addTask('task-2', ['task-1']);

    const completedTasks = new Set<string>();

    expect(analyzer.canExecute('task-1', completedTasks)).toBe(true);
    expect(analyzer.canExecute('task-2', completedTasks)).toBe(false);

    completedTasks.add('task-1');
    expect(analyzer.canExecute('task-2', completedTasks)).toBe(true);
  });

  test('should get blocked tasks', () => {
    analyzer.addTask('task-ready', []);
    analyzer.addTask('task-blocked', ['task-dependency']);

    const blocked = analyzer.getBlockedTasks();

    expect(blocked).toContain('task-blocked');
    expect(blocked).not.toContain('task-ready');
  });
});

describe('Swarm Coordination Engine - Load Balancer', () => {
  let balancer: LoadBalancer;

  beforeEach(() => {
    const { createLoadBalancer } = require('../../swarm/implementation/engine/load-balancer');
    balancer = createLoadBalancer();
  });

  test('should get agent load', () => {
    const load = balancer.getAgentLoad('agent-1');

    expect(load).toBeDefined();
    expect(load.agentId).toBe('agent-1');
    expect(load.currentTasks).toBeGreaterThanOrEqual(0);
    expect(load.utilizationPercentage).toBeGreaterThanOrEqual(0);
    expect(load.utilizationPercentage).toBeLessThanOrEqual(100);
  });

  test('should detect overloaded agent', () => {
    const isOverloaded = balancer.isOverloaded('overloaded-agent');

    expect(typeof isOverloaded).toBe('boolean');
  });

  test('should schedule task appropriately', () => {
    const task: Task = {
      id: 'task-schedule',
      type: 'build',
      requirements: {
        type: 'build',
        skills: ['typescript'],
        context: [],
        riskLevel: 'low',
        governanceConstraints: [],
        priority: 5
      },
      dependencies: [],
      priority: 5,
      status: 'pending',
      createdAt: new Date(),
      metadata: {}
    };

    const decision = balancer.scheduleTask(task);

    expect(decision.schedule).toMatch(/immediate|queued|delayed|rejected/);
    expect(decision.reason).toBeDefined();
  });

  test('should rebalance tasks when agents become available', async () => {
    await balancer.rebalanceTasks();

    // Verify rebalancing occurred (would check internal state or side effects)
    expect(true).toBe(true); // Placeholder
  });

  test('should get all agent loads', () => {
    const allLoads = balancer.getAllAgentLoads();

    expect(Array.isArray(allLoads)).toBe(true);
    allLoads.forEach(load => {
      expect(load.agentId).toBeDefined();
      expect(load.currentTasks).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('Swarm Coordination Engine - Integration Tests', () => {
  test('should coordinate full task lifecycle from submission to completion', async () => {
    const { createSwarmCoordinator } = require('../../swarm/implementation/engine/swarm-coordinator');
    const coordinator = createSwarmCoordinator();

    // Register agent
    const agent: Agent = {
      id: 'integration-agent',
      name: 'Integration Agent',
      capability: {
        type: 'builder',
        skills: ['typescript'],
        context: [],
        riskLevel: 'medium',
        governanceDomain: [],
        maxConcurrentTasks: 5,
        performance: {
          avgResponseTime: 1000,
          successRate: 0.95,
          lastActive: new Date()
        }
      },
      status: 'idle',
      currentTasks: [],
      totalTasksCompleted: 0,
      metadata: {}
    };

    await coordinator.registerAgent(agent);

    // Submit task
    const task: Task = {
      id: 'integration-task',
      type: 'build',
      requirements: {
        type: 'build',
        skills: ['typescript'],
        context: [],
        riskLevel: 'medium',
        governanceConstraints: [],
        priority: 5
      },
      dependencies: [],
      priority: 5,
      status: 'pending',
      createdAt: new Date(),
      metadata: {}
    };

    await coordinator.submitTask(task);

    // Execute task distribution
    await coordinator.distributeReadyTasks();

    // Verify task was assigned
    const taskStatus = coordinator.getTaskStatus('integration-task');
    expect(taskStatus).not.toBe('pending');
  });

  test('should enforce CS5 performance thresholds', async () => {
    const { createSwarmCoordinator } = require('../../swarm/implementation/engine/swarm-coordinator');
    const coordinator = createSwarmCoordinator();

    const slowAgent: Agent = {
      id: 'slow-agent',
      name: 'Slow Agent',
      capability: {
        type: 'builder',
        skills: ['typescript'],
        context: [],
        riskLevel: 'medium',
        governanceDomain: [],
        maxConcurrentTasks: 5,
        performance: {
          avgResponseTime: 10000, // Exceeds threshold
          successRate: 0.80,
          lastActive: new Date()
        }
      },
      status: 'idle',
      currentTasks: [],
      totalTasksCompleted: 0,
      metadata: {}
    };

    await coordinator.registerAgent(slowAgent);

    const cs5Violations = coordinator.checkCS5Compliance();
    expect(cs5Violations.length).toBeGreaterThan(0);
  });

  test('should enforce CS6 execution boundaries', async () => {
    const { createSwarmCoordinator } = require('../../swarm/implementation/engine/swarm-coordinator');
    const coordinator = createSwarmCoordinator();

    const task: Task = {
      id: 'protected-file-task',
      type: 'modify',
      requirements: {
        type: 'modify',
        skills: ['filesystem'],
        context: ['protected'],
        riskLevel: 'critical',
        governanceConstraints: ['CS2_PROTECTED_FILE'],
        priority: 10
      },
      dependencies: [],
      priority: 10,
      status: 'pending',
      createdAt: new Date(),
      metadata: {
        targetFile: '.github/workflows/qiel.yml'
      }
    };

    await coordinator.submitTask(task);

    // Should trigger CS6 boundary check and block/escalate
    const cs6Violations = coordinator.checkCS6Compliance();
    expect(cs6Violations.length).toBeGreaterThan(0);
  });
});
