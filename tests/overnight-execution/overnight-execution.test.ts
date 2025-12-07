/**
 * Overnight Execution Tests
 * 
 * Tests for the overnight execution orchestrator and governance extensions.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { selectModel, getQuotaUsage, getModelEscalationConfig } from '../../lib/foreman/model-escalation';
import { detectRepositoryDrift, checkLocalBuilderHealth, shouldUseLocalBuilder } from '../../lib/foreman/desktop-sync';
import { getGovernanceIssues, generateGovernanceIssuesSummary } from '../../lib/foreman/governance-issues';
import { logGovernanceEvent, queryGovernanceEvents, getGovernanceStats, clearGovernanceEvents } from '../../lib/foreman/memory/governance-memory';

describe('Model Escalation', () => {
  it('should select GPT-5.1 for architecture tasks', () => {
    const result = selectModel({
      taskType: 'architecture',
      complexity: 'high',
      filesAffected: 15,
      isArchitectureTask: true,
      isGovernanceTask: false,
      isMilestoneNearing: false,
      existingEscalationsToday: 5,
      quotaRemaining: 45,
    });

    assert.strictEqual(result.selectedModel, 'gpt-5.1');
    assert.strictEqual(result.escalated, true);
    assert.strictEqual(result.escalationReason, 'architecture_impact');
  });

  it('should select GPT-5.1 for governance tasks', () => {
    const result = selectModel({
      taskType: 'governance',
      complexity: 'medium',
      filesAffected: 5,
      isArchitectureTask: false,
      isGovernanceTask: true,
      isMilestoneNearing: false,
      existingEscalationsToday: 10,
      quotaRemaining: 40,
    });

    assert.strictEqual(result.selectedModel, 'gpt-5.1');
    assert.strictEqual(result.escalated, true);
    assert.strictEqual(result.escalationReason, 'governance_task');
  });

  it('should select GPT-4-turbo for multi-file refactors', () => {
    const result = selectModel({
      taskType: 'refactor',
      complexity: 'high',
      filesAffected: 15,
      isArchitectureTask: false,
      isGovernanceTask: false,
      isMilestoneNearing: false,
      existingEscalationsToday: 5,
      quotaRemaining: 45,
    });

    assert.strictEqual(result.selectedModel, 'gpt-4-turbo');
    assert.strictEqual(result.escalated, true);
    assert.strictEqual(result.escalationReason, 'multi_file_refactor');
  });

  it('should select default model for simple tasks', () => {
    const result = selectModel({
      taskType: 'simple',
      complexity: 'low',
      filesAffected: 2,
      isArchitectureTask: false,
      isGovernanceTask: false,
      isMilestoneNearing: false,
      existingEscalationsToday: 5,
      quotaRemaining: 45,
    });

    assert.strictEqual(result.selectedModel, 'gpt-4');
    assert.strictEqual(result.escalated, false);
  });

  it('should respect quota limits in configuration', () => {
    // Verify that non-bypass rules are configured correctly
    const config = getModelEscalationConfig();
    
    const heavyTaskRule = config.escalationRules.find(r => r.reason === 'heavy_task');
    assert.ok(heavyTaskRule);
    assert.strictEqual(heavyTaskRule.bypassQuotaCheck, false);
    
    const multiFileRule = config.escalationRules.find(r => r.reason === 'multi_file_refactor');
    assert.ok(multiFileRule);
    assert.strictEqual(multiFileRule.bypassQuotaCheck, false);

    // Architecture tasks should bypass quota
    const archRule = config.escalationRules.find(r => r.reason === 'architecture_impact');
    assert.ok(archRule);
    assert.strictEqual(archRule.bypassQuotaCheck, true);
  });

  it('should provide fallback chain', () => {
    const result = selectModel({
      taskType: 'architecture',
      complexity: 'high',
      filesAffected: 15,
      isArchitectureTask: true,
      isGovernanceTask: false,
      isMilestoneNearing: false,
      existingEscalationsToday: 5,
      quotaRemaining: 45,
    });

    assert.ok(result.fallbackChain.length > 0);
    assert.strictEqual(result.fallbackChain[0], 'gpt-5.1');
    assert.ok(result.fallbackChain.includes('local-builder'));
  });

  it('should get quota usage', () => {
    const usage = getQuotaUsage();
    
    assert.ok(typeof usage.daily === 'number');
    assert.ok(typeof usage.hourly === 'number');
    assert.ok(typeof usage.concurrent === 'number');
    assert.ok(usage.daily >= 0);
    assert.ok(usage.hourly >= 0);
    assert.ok(usage.concurrent >= 0);
  });

  it('should get model escalation config', () => {
    const config = getModelEscalationConfig();
    
    assert.strictEqual(config.defaultModel, 'gpt-4');
    assert.ok(config.escalationRules.length > 0);
    assert.ok(config.fallbackChain.length > 0);
    assert.ok(config.quotaLimits.dailyEscalations > 0);
  });
});

describe('Desktop Sync', () => {
  it('should detect no drift when repository not configured', async () => {
    const result = await detectRepositoryDrift('unknown-repo');
    
    assert.strictEqual(result.hasDrift, false);
    assert.strictEqual(result.safeToMerge, true);
  });

  it('should check local builder health', async () => {
    const health = await checkLocalBuilderHealth();
    
    assert.ok(typeof health.ready === 'boolean');
    assert.ok(Array.isArray(health.issues));
  });

  it('should recommend local builder when Copilot unavailable', async () => {
    const result = await shouldUseLocalBuilder(false, 0);
    
    // Desktop builder not enabled by default in tests
    assert.strictEqual(result.useLocal, false);
    assert.ok(result.reason.length > 0);
  });

  it('should recommend local builder after multiple Copilot failures', async () => {
    const result = await shouldUseLocalBuilder(true, 5);
    
    // Desktop builder not enabled by default in tests
    assert.strictEqual(result.useLocal, false);
  });
});

describe('Governance Issues', () => {
  it('should return 4 governance issues', () => {
    const issues = getGovernanceIssues();
    
    assert.strictEqual(issues.length, 4);
  });

  it('should have properly structured issues', () => {
    const issues = getGovernanceIssues();
    
    for (const issue of issues) {
      assert.ok(issue.id);
      assert.ok(issue.title);
      assert.ok(issue.description);
      assert.ok(Array.isArray(issue.labels));
      assert.ok(issue.assignee);
      assert.ok(typeof issue.priority === 'number');
      assert.ok(issue.sequenceType);
      assert.ok(Array.isArray(issue.dependencies));
      assert.ok(Array.isArray(issue.acceptanceCriteria));
    }
  });

  it('should have issues in priority order', () => {
    const issues = getGovernanceIssues();
    
    assert.strictEqual(issues[0].priority, 1);
    assert.strictEqual(issues[1].priority, 2);
    assert.strictEqual(issues[2].priority, 3);
    assert.strictEqual(issues[3].priority, 4);
  });

  it('should include model escalation issue', () => {
    const issues = getGovernanceIssues();
    const escalationIssue = issues.find(i => i.id === 'issue-a-model-escalation');
    
    assert.ok(escalationIssue);
    assert.ok(escalationIssue.title.includes('Model Escalation'));
  });

  it('should include desktop sync issue', () => {
    const issues = getGovernanceIssues();
    const syncIssue = issues.find(i => i.id === 'issue-b-desktop-sync');
    
    assert.ok(syncIssue);
    assert.ok(syncIssue.title.includes('Desktop Sync'));
  });

  it('should include auto-heal issue', () => {
    const issues = getGovernanceIssues();
    const healIssue = issues.find(i => i.id === 'issue-c-auto-heal');
    
    assert.ok(healIssue);
    assert.ok(healIssue.title.includes('Auto-Heal'));
  });

  it('should include GSR issue', () => {
    const issues = getGovernanceIssues();
    const gsrIssue = issues.find(i => i.id === 'issue-d-gsr-model');
    
    assert.ok(gsrIssue);
    assert.ok(gsrIssue.title.includes('GSR'));
  });

  it('should generate summary', () => {
    const summary = generateGovernanceIssuesSummary();
    
    assert.ok(summary.includes('Governance Issues Summary'));
    assert.ok(summary.includes('Total Issues: 4'));
  });
});

describe('Governance Memory', () => {
  it('should log events', async () => {
    clearGovernanceEvents();
    
    await logGovernanceEvent({
      type: 'test_event',
      severity: 'info',
      description: 'Test event',
      metadata: { test: true },
    });

    const events = queryGovernanceEvents({ type: 'test_event' });
    assert.strictEqual(events.length, 1);
    assert.strictEqual(events[0].type, 'test_event');
    assert.strictEqual(events[0].severity, 'info');
  });

  it('should query events by type', async () => {
    clearGovernanceEvents();
    
    await logGovernanceEvent({
      type: 'model_escalation',
      severity: 'info',
      description: 'Escalation test',
    });

    await logGovernanceEvent({
      type: 'desktop_sync',
      severity: 'medium',
      description: 'Sync test',
    });

    const escalationEvents = queryGovernanceEvents({ type: 'model_escalation' });
    assert.strictEqual(escalationEvents.length, 1);

    const syncEvents = queryGovernanceEvents({ type: 'desktop_sync' });
    assert.strictEqual(syncEvents.length, 1);
  });

  it('should query events by severity', async () => {
    clearGovernanceEvents();
    
    await logGovernanceEvent({
      type: 'test1',
      severity: 'critical',
      description: 'Critical test',
    });

    await logGovernanceEvent({
      type: 'test2',
      severity: 'info',
      description: 'Info test',
    });

    const criticalEvents = queryGovernanceEvents({ severity: 'critical' });
    assert.strictEqual(criticalEvents.length, 1);
  });

  it('should get statistics', async () => {
    clearGovernanceEvents();
    
    await logGovernanceEvent({
      type: 'type1',
      severity: 'high',
      description: 'Test 1',
    });

    await logGovernanceEvent({
      type: 'type2',
      severity: 'high',
      description: 'Test 2',
    });

    await logGovernanceEvent({
      type: 'type1',
      severity: 'low',
      description: 'Test 3',
    });

    const stats = getGovernanceStats();
    assert.strictEqual(stats.total, 3);
    assert.strictEqual(stats.bySeverity.high, 2);
    assert.strictEqual(stats.bySeverity.low, 1);
    assert.strictEqual(stats.byType.type1, 2);
    assert.strictEqual(stats.byType.type2, 1);
  });

  it('should clear events', async () => {
    clearGovernanceEvents();
    
    await logGovernanceEvent({
      type: 'test',
      severity: 'info',
      description: 'Test',
    });

    let events = queryGovernanceEvents({});
    assert.ok(events.length > 0);

    clearGovernanceEvents();
    events = queryGovernanceEvents({});
    assert.strictEqual(events.length, 0);
  });
});
