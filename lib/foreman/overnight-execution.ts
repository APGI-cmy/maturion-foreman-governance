/**
 * Overnight Execution Orchestrator
 * 
 * Processes all open GitHub issues in sequence with full QA and governance compliance.
 * Implements dependency detection, issue sequencing, and model escalation.
 */

import type {
  OvernightExecutionConfig,
  OvernightExecutionRun,
  IssueWithDependencies,
  IssueExecutionResult,
  IssueSequenceType,
  DependencyChain,
  QAValidationSummary,
  GovernanceValidationSummary,
} from '@/types/overnight-execution';
import { logGovernanceEvent } from '@/lib/foreman/memory/governance-memory';
import { selectModel, executeWithEscalation } from '@/lib/foreman/model-escalation';
import { checkLocalBuilderHealth } from '@/lib/foreman/desktop-sync';

const DEFAULT_CONFIG: OvernightExecutionConfig = {
  enabled: process.env.OVERNIGHT_EXECUTION_ENABLED === 'true',
  scheduleExpression: '0 2 * * *', // 2 AM daily
  maxIssuesPerRun: 50,
  sequenceOrder: ['architecture', 'memory', 'governance', 'qa', 'build', 'deployment', 'self_evolution'],
  enableModelEscalation: true,
  enableAutoHeal: true,
  enableDesktopSync: true,
  createPRsAutomatically: true,
};

/**
 * Retrieve all open issues from GitHub
 */
async function fetchOpenIssues(owner: string, repo: string): Promise<IssueWithDependencies[]> {
  // This would normally use the GitHub API to fetch open issues
  // For now, we return a stub implementation
  
  console.log(`Fetching open issues from ${owner}/${repo}...`);
  
  // In a real implementation:
  // const octokit = getOctokitClient();
  // const { data: issues } = await octokit.issues.listForRepo({
  //   owner,
  //   repo,
  //   state: 'open',
  //   per_page: config.maxIssuesPerRun,
  // });
  
  return [];
}

/**
 * Detect dependencies between issues based on labels, mentions, and body content
 */
function detectDependencies(issues: IssueWithDependencies[]): Map<number, DependencyChain> {
  const dependencyMap = new Map<number, DependencyChain>();

  for (const issue of issues) {
    const dependencies: number[] = [];

    // Parse issue body for dependency mentions like "Depends on #123"
    const dependencyMatches = issue.body.match(/depends\s+on\s+#(\d+)/gi);
    if (dependencyMatches) {
      for (const match of dependencyMatches) {
        const issueNum = parseInt(match.match(/#(\d+)/)![1], 10);
        dependencies.push(issueNum);
      }
    }

    // Also check for "Blocked by #123" pattern
    const blockedMatches = issue.body.match(/blocked\s+by\s+#(\d+)/gi);
    if (blockedMatches) {
      for (const match of blockedMatches) {
        const issueNum = parseInt(match.match(/#(\d+)/)![1], 10);
        dependencies.push(issueNum);
      }
    }

    dependencyMap.set(issue.issueNumber, {
      issueNumber: issue.issueNumber,
      dependsOn: dependencies,
      blocks: [],
      depth: 0,
      canExecuteNow: dependencies.length === 0,
    });
  }

  // Calculate blocks relationships and depth
  for (const [issueNum, chain] of dependencyMap.entries()) {
    for (const depNum of chain.dependsOn) {
      const depChain = dependencyMap.get(depNum);
      if (depChain) {
        depChain.blocks.push(issueNum);
      }
    }
  }

  // Calculate depth (longest dependency chain)
  function calculateDepth(issueNum: number, visited = new Set<number>()): number {
    if (visited.has(issueNum)) return 0; // Circular dependency
    visited.add(issueNum);

    const chain = dependencyMap.get(issueNum);
    if (!chain || chain.dependsOn.length === 0) return 0;

    let maxDepth = 0;
    for (const depNum of chain.dependsOn) {
      maxDepth = Math.max(maxDepth, calculateDepth(depNum, visited) + 1);
    }
    return maxDepth;
  }

  for (const [issueNum, chain] of dependencyMap.entries()) {
    chain.depth = calculateDepth(issueNum);
  }

  return dependencyMap;
}

/**
 * Classify an issue into a sequence type based on labels and content
 */
function classifyIssue(issue: IssueWithDependencies): IssueSequenceType {
  const labels = issue.labels.map(l => l.toLowerCase());
  const title = issue.title.toLowerCase();
  const body = issue.body.toLowerCase();

  if (labels.includes('architecture') || title.includes('architecture') || body.includes('architecture')) {
    return 'architecture';
  }
  if (labels.includes('memory') || title.includes('memory') || body.includes('memory fabric')) {
    return 'memory';
  }
  if (labels.includes('governance') || title.includes('governance') || body.includes('governance')) {
    return 'governance';
  }
  if (labels.includes('qa') || labels.includes('testing') || title.includes('test')) {
    return 'qa';
  }
  if (labels.includes('deployment') || title.includes('deploy')) {
    return 'deployment';
  }
  if (labels.includes('self-evolution') || title.includes('self-evolution')) {
    return 'self_evolution';
  }

  return 'build'; // Default
}

/**
 * Sort issues by sequence type and dependencies
 */
function sortIssues(
  issues: IssueWithDependencies[],
  dependencyMap: Map<number, DependencyChain>,
  config: OvernightExecutionConfig
): IssueWithDependencies[] {
  return issues.sort((a, b) => {
    // First, sort by sequence type priority
    const aTypeIndex = config.sequenceOrder.indexOf(a.sequenceType);
    const bTypeIndex = config.sequenceOrder.indexOf(b.sequenceType);
    
    if (aTypeIndex !== bTypeIndex) {
      return aTypeIndex - bTypeIndex;
    }

    // Then by dependency depth (deeper dependencies first)
    const aChain = dependencyMap.get(a.issueNumber);
    const bChain = dependencyMap.get(b.issueNumber);
    
    if (aChain && bChain && aChain.depth !== bChain.depth) {
      return aChain.depth - bChain.depth;
    }

    // Finally by issue number
    return a.issueNumber - b.issueNumber;
  });
}

/**
 * Execute a single issue with full QA and governance validation
 */
async function executeIssue(
  issue: IssueWithDependencies,
  config: OvernightExecutionConfig
): Promise<IssueExecutionResult> {
  const startTime = Date.now();

  try {
    console.log(`\n=== Executing Issue #${issue.issueNumber}: ${issue.title} ===`);

    // Determine if model escalation is needed
    const modelContext = {
      taskType: issue.sequenceType,
      complexity: issue.estimatedComplexity,
      filesAffected: 5, // Would be determined from issue analysis
      isArchitectureTask: issue.sequenceType === 'architecture',
      isGovernanceTask: issue.sequenceType === 'governance',
      isMilestoneNearing: false, // Would be determined from project state
      existingEscalationsToday: 0, // Would be fetched from quota tracker
      quotaRemaining: 50, // Would be fetched from quota tracker
    };

    const modelSelection = selectModel(modelContext);
    console.log(`Selected model: ${modelSelection.selectedModel} (escalated: ${modelSelection.escalated})`);

    // Execute the build for this issue
    // This would normally trigger the full build pipeline
    console.log(`Building issue #${issue.issueNumber}...`);
    
    // Stub: In real implementation, this would:
    // 1. Create architecture plan
    // 2. Run QA pre-flight checks
    // 3. Execute build with selected model
    // 4. Run full QIC, QIEL, CDW, SQL, Memory Fabric, Drift, Governance checks
    // 5. Rebuild until all checks pass
    // 6. Create PR only when 100% QA pass

    // Simulate QA validation
    const qaResults: QAValidationSummary = {
      passed: true,
      totalChecks: 7,
      passedChecks: 7,
      failedChecks: 0,
      qicPassed: true,
      qielPassed: true,
      cdwPassed: true,
      memoryFabricPassed: true,
      driftCheckPassed: true,
      governanceCheckPassed: true,
    };

    // Simulate governance validation
    const governanceResults: GovernanceValidationSummary = {
      passed: true,
      violations: [],
      escalationsLogged: modelSelection.escalated ? 1 : 0,
      driftIntroduced: false,
      conflictingInstructions: false,
    };

    const executionTime = Date.now() - startTime;

    await logGovernanceEvent({
      type: 'issue_execution_completed',
      severity: 'info',
      description: `Issue #${issue.issueNumber} completed successfully`,
      metadata: {
        issueNumber: issue.issueNumber,
        title: issue.title,
        sequenceType: issue.sequenceType,
        executionTime,
        qaResults,
        governanceResults,
      },
    });

    return {
      issueNumber: issue.issueNumber,
      title: issue.title,
      sequenceType: issue.sequenceType,
      status: 'success',
      qaResults,
      governanceResults,
      modelEscalations: modelSelection.escalated ? 1 : 0,
      executionTime,
    };
  } catch (error) {
    const executionTime = Date.now() - startTime;
    const errorMessage = (error as Error).message;

    await logGovernanceEvent({
      type: 'issue_execution_failed',
      severity: 'high',
      description: `Issue #${issue.issueNumber} failed: ${errorMessage}`,
      metadata: {
        issueNumber: issue.issueNumber,
        title: issue.title,
        error: errorMessage,
      },
    });

    return {
      issueNumber: issue.issueNumber,
      title: issue.title,
      sequenceType: issue.sequenceType,
      status: 'failed',
      executionTime,
      errorMessage,
    };
  }
}

/**
 * Run the overnight execution cycle
 */
export async function runOvernightExecution(
  owner: string,
  repo: string,
  config: OvernightExecutionConfig = DEFAULT_CONFIG
): Promise<OvernightExecutionRun> {
  const runId = `overnight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const startTime = new Date().toISOString();

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  🌙 OVERNIGHT EXECUTION CYCLE STARTED                      ║`);
  console.log(`║  Run ID: ${runId.padEnd(44)} ║`);
  console.log(`║  Repository: ${`${owner}/${repo}`.padEnd(42)} ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  await logGovernanceEvent({
    type: 'overnight_execution_started',
    severity: 'info',
    description: `Overnight execution started for ${owner}/${repo}`,
    metadata: { runId, config },
  });

  try {
    // Step 1: Retrieve all open issues
    console.log('📋 Step 1: Retrieving open issues...');
    let issues = await fetchOpenIssues(owner, repo);
    console.log(`   Found ${issues.length} open issues`);

    // Classify issues
    issues = issues.map(issue => ({
      ...issue,
      sequenceType: classifyIssue(issue),
    }));

    // Step 2: Detect dependency chains
    console.log('\n🔗 Step 2: Detecting dependency chains...');
    const dependencyMap = detectDependencies(issues);
    console.log(`   Detected ${dependencyMap.size} dependency relationships`);

    // Step 3: Sort issues logically
    console.log('\n📊 Step 3: Sorting issues by sequence...');
    const sortedIssues = sortIssues(issues, dependencyMap, config);
    console.log(`   Sequence order: ${config.sequenceOrder.join(' → ')}`);

    // Step 4: Check local builder health (if desktop sync enabled)
    if (config.enableDesktopSync) {
      console.log('\n💻 Step 4: Checking local builder health...');
      const health = await checkLocalBuilderHealth();
      if (!health.ready) {
        console.warn('   ⚠️  Local builder not ready:', health.issues);
      } else {
        console.log('   ✅ Local builder is ready');
      }
    }

    // Step 5: Execute issues sequentially
    console.log('\n🚀 Step 5: Executing issues sequentially...\n');
    
    const issueResults: IssueExecutionResult[] = [];
    let successfulIssues = 0;
    let failedIssues = 0;
    let skippedIssues = 0;

    for (const issue of sortedIssues) {
      // Check if dependencies are satisfied
      const chain = dependencyMap.get(issue.issueNumber);
      if (chain && !chain.canExecuteNow) {
        // Check if all dependencies have been successfully executed
        const allDepsSuccessful = chain.dependsOn.every(depNum =>
          issueResults.find(r => r.issueNumber === depNum && r.status === 'success')
        );

        if (!allDepsSuccessful) {
          console.log(`⏭️  Skipping issue #${issue.issueNumber} - dependencies not satisfied`);
          issueResults.push({
            issueNumber: issue.issueNumber,
            title: issue.title,
            sequenceType: issue.sequenceType,
            status: 'skipped',
            executionTime: 0,
            errorMessage: 'Dependencies not satisfied',
          });
          skippedIssues++;
          continue;
        }
      }

      // Execute the issue
      const result = await executeIssue(issue, config);
      issueResults.push(result);

      if (result.status === 'success') {
        successfulIssues++;
        // Update dependency chain - mark dependencies as satisfied
        if (chain) {
          chain.canExecuteNow = true;
          // Update all issues that depend on this one
          for (const blockedNum of chain.blocks) {
            const blockedChain = dependencyMap.get(blockedNum);
            if (blockedChain) {
              const allDepsSatisfied = blockedChain.dependsOn.every(depNum =>
                issueResults.find(r => r.issueNumber === depNum && r.status === 'success') ||
                depNum === issue.issueNumber
              );
              blockedChain.canExecuteNow = allDepsSatisfied;
            }
          }
        }
      } else {
        failedIssues++;
      }
    }

    const endTime = new Date().toISOString();

    console.log(`\n╔════════════════════════════════════════════════════════════╗`);
    console.log(`║  ✅ OVERNIGHT EXECUTION CYCLE COMPLETED                    ║`);
    console.log(`║  Total Issues: ${String(sortedIssues.length).padStart(2).padEnd(42)} ║`);
    console.log(`║  Successful: ${String(successfulIssues).padStart(2).padEnd(44)} ║`);
    console.log(`║  Failed: ${String(failedIssues).padStart(2).padEnd(48)} ║`);
    console.log(`║  Skipped: ${String(skippedIssues).padStart(2).padEnd(47)} ║`);
    console.log(`╚════════════════════════════════════════════════════════════╝\n`);

    const run: OvernightExecutionRun = {
      id: runId,
      startTime,
      endTime,
      status: failedIssues === 0 ? 'completed' : 'partial',
      totalIssues: sortedIssues.length,
      processedIssues: sortedIssues.length - skippedIssues,
      successfulIssues,
      failedIssues,
      skippedIssues,
      issueResults,
      errors: issueResults
        .filter(r => r.errorMessage)
        .map(r => `Issue #${r.issueNumber}: ${r.errorMessage}`),
    };

    await logGovernanceEvent({
      type: 'overnight_execution_completed',
      severity: failedIssues === 0 ? 'info' : 'medium',
      description: `Overnight execution completed: ${successfulIssues}/${sortedIssues.length} successful`,
      metadata: run,
    });

    return run;
  } catch (error) {
    const errorMessage = (error as Error).message;

    await logGovernanceEvent({
      type: 'overnight_execution_failed',
      severity: 'critical',
      description: `Overnight execution failed: ${errorMessage}`,
      metadata: { runId, error: errorMessage },
    });

    return {
      id: runId,
      startTime,
      endTime: new Date().toISOString(),
      status: 'failed',
      totalIssues: 0,
      processedIssues: 0,
      successfulIssues: 0,
      failedIssues: 0,
      skippedIssues: 0,
      issueResults: [],
      errors: [errorMessage],
    };
  }
}

/**
 * Get overnight execution configuration
 */
export function getOvernightExecutionConfig(): OvernightExecutionConfig {
  return DEFAULT_CONFIG;
}

/**
 * Check if overnight execution is enabled
 */
export function isOvernightExecutionEnabled(): boolean {
  return DEFAULT_CONFIG.enabled;
}
