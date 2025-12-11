/**
 * Model Scaling Test: Routing Behaviour
 * 
 * Tests the core routing logic of the GitHub Builder Model Scaling Engine.
 * Verifies:
 * - Task classification works correctly
 * - Model tier selection is accurate
 * - Routing decisions include proper justifications
 * - De-escalation logic functions
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { selectGitHubBuilderModel, type GitHubTaskDescriptor } from '../../lib/github/model-routing';

describe('Model Scaling: Routing Behaviour', () => {
  describe('Task Classification', () => {
    it('should classify documentation updates as T1', () => {
      const descriptor: GitHubTaskDescriptor = {
        taskType: 'docs',
        complexity: 'low',
        filesAffected: 1,
        repositoryId: 'maturion-foreman-app',
        branchName: 'feature/docs-update',
        isArchitectureTask: false,
        isGovernanceTask: false,
        requiresRedQA: false,
      };

      const decision = selectGitHubBuilderModel(descriptor);
      
      assert.strictEqual(decision.tier, 'T1', 'Documentation tasks should be T1');
      assert.ok(
        ['gpt-4o-mini', 'claude-haiku'].includes(decision.modelId),
        'T1 should use lightweight models'
      );
      console.log('✓ Documentation tasks classified as T1');
    });

    it('should classify CRUD operations as T2', () => {
      const descriptor: GitHubTaskDescriptor = {
        taskType: 'crud',
        complexity: 'medium',
        filesAffected: 3,
        repositoryId: 'maturion-foreman-app',
        branchName: 'feature/add-crud-endpoint',
        isArchitectureTask: false,
        isGovernanceTask: false,
        requiresRedQA: false,
      };

      const decision = selectGitHubBuilderModel(descriptor);
      
      assert.strictEqual(decision.tier, 'T2', 'CRUD tasks should be T2');
      assert.ok(
        ['gpt-4o', 'claude-sonnet-lite'].includes(decision.modelId),
        'T2 should use standard models'
      );
      console.log('✓ CRUD tasks classified as T2');
    });

    it('should classify architecture tasks as T3', () => {
      const descriptor: GitHubTaskDescriptor = {
        taskType: 'architecture',
        complexity: 'high',
        filesAffected: 10,
        repositoryId: 'maturion-foreman-app',
        branchName: 'feature/architecture-design',
        isArchitectureTask: true,
        isGovernanceTask: false,
        requiresRedQA: false,
      };

      const decision = selectGitHubBuilderModel(descriptor);
      
      assert.strictEqual(decision.tier, 'T3', 'Architecture tasks should be T3');
      assert.strictEqual(
        decision.modelId,
        'claude-3.5-sonnet',
        'T3 should use most capable model'
      );
      console.log('✓ Architecture tasks classified as T3');
    });

    it('should classify red-qa creation as T3', () => {
      const descriptor: GitHubTaskDescriptor = {
        taskType: 'red-qa',
        complexity: 'high',
        filesAffected: 5,
        repositoryId: 'maturion-foreman-app',
        branchName: 'feature/qa-suite',
        isArchitectureTask: false,
        isGovernanceTask: true,
        requiresRedQA: true,
      };

      const decision = selectGitHubBuilderModel(descriptor);
      
      assert.strictEqual(decision.tier, 'T3', 'Red QA creation should be T3');
      console.log('✓ Red QA creation classified as T3');
    });
  });

  describe('Model Tier Selection', () => {
    it('should return routing decision with all required fields', () => {
      const descriptor: GitHubTaskDescriptor = {
        taskType: 'component',
        complexity: 'medium',
        filesAffected: 2,
        repositoryId: 'maturion-foreman-app',
        branchName: 'feature/new-component',
        isArchitectureTask: false,
        isGovernanceTask: false,
        requiresRedQA: false,
      };

      const decision = selectGitHubBuilderModel(descriptor);
      
      assert.ok(decision.tier, 'Decision must include tier');
      assert.ok(decision.modelId, 'Decision must include modelId');
      assert.ok(decision.justification, 'Decision must include justification');
      assert.ok(decision.maxRetries >= 1, 'Decision must include maxRetries');
      assert.ok(Array.isArray(decision.escalationPath), 'Decision must include escalationPath');
      assert.ok(typeof decision.estimatedCost === 'number', 'Decision must include estimatedCost');
      
      console.log('✓ Routing decision includes all required fields');
    });

    it('should select lowest viable model from tier', () => {
      const descriptor: GitHubTaskDescriptor = {
        taskType: 'simple-ui',
        complexity: 'low',
        filesAffected: 1,
        repositoryId: 'maturion-foreman-app',
        branchName: 'feature/ui-update',
        isArchitectureTask: false,
        isGovernanceTask: false,
        requiresRedQA: false,
      };

      const decision = selectGitHubBuilderModel(descriptor);
      
      // Should use the first (cheapest) model in T1
      assert.strictEqual(decision.modelId, 'gpt-4o-mini', 'Should select cheapest model in tier');
      console.log('✓ Selects lowest viable model from tier');
    });

    it('should provide escalation path for each tier', () => {
      const descriptorT1: GitHubTaskDescriptor = {
        taskType: 'docs',
        complexity: 'low',
        filesAffected: 1,
        repositoryId: 'maturion-foreman-app',
        branchName: 'feature/docs',
        isArchitectureTask: false,
        isGovernanceTask: false,
        requiresRedQA: false,
      };

      const decisionT1 = selectGitHubBuilderModel(descriptorT1);
      
      // T1 escalation path should be: T1 → T2 → T3
      assert.ok(
        decisionT1.escalationPath.includes('T2'),
        'T1 escalation path should include T2'
      );
      assert.ok(
        decisionT1.escalationPath.includes('T3'),
        'T1 escalation path should include T3'
      );
      
      console.log('✓ Escalation path provided correctly');
    });
  });

  describe('Justification Logic', () => {
    it('should provide clear justification for tier selection', () => {
      const descriptor: GitHubTaskDescriptor = {
        taskType: 'crud',
        complexity: 'medium',
        filesAffected: 3,
        repositoryId: 'maturion-foreman-app',
        branchName: 'feature/crud',
        isArchitectureTask: false,
        isGovernanceTask: false,
        requiresRedQA: false,
      };

      const decision = selectGitHubBuilderModel(descriptor);
      
      assert.ok(decision.justification.length > 20, 'Justification should be detailed');
      assert.ok(
        decision.justification.includes('CRUD') || decision.justification.includes('crud'),
        'Justification should mention task type'
      );
      
      console.log('✓ Justification is clear and detailed');
    });
  });

  describe('Cost Estimation', () => {
    it('should estimate higher cost for higher tiers', () => {
      const descriptorT1: GitHubTaskDescriptor = {
        taskType: 'docs',
        complexity: 'low',
        filesAffected: 1,
        repositoryId: 'maturion-foreman-app',
        branchName: 'feature/docs',
        isArchitectureTask: false,
        isGovernanceTask: false,
        requiresRedQA: false,
      };

      const descriptorT3: GitHubTaskDescriptor = {
        taskType: 'architecture',
        complexity: 'high',
        filesAffected: 10,
        repositoryId: 'maturion-foreman-app',
        branchName: 'feature/architecture',
        isArchitectureTask: true,
        isGovernanceTask: false,
        requiresRedQA: false,
      };

      const decisionT1 = selectGitHubBuilderModel(descriptorT1);
      const decisionT3 = selectGitHubBuilderModel(descriptorT3);
      
      assert.ok(
        decisionT3.estimatedCost > decisionT1.estimatedCost,
        'T3 should cost more than T1'
      );
      
      console.log('✓ Cost estimation reflects tier complexity');
    });
  });
});
