# Memory Fabric Integration Guide

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: 2024-12-06

## Overview

This guide explains how to integrate the Unified Memory Fabric into different parts of the Foreman system. The memory system enables persistent, version-controlled context across sessions, projects, and years.

## Quick Start

```typescript
import {
  loadMemoryBeforeAction,
  writeMemoryAfterAction,
  recordWaveCompletion,
  recordArchitectureDecision,
  recordMilestoneCompletion
} from '@/lib/foreman/memory'

// Memory Before Action
const memory = await loadMemoryBeforeAction('foreman', {
  tags: ['wave_completion']
})

// Memory After Action
await writeMemoryAfterAction({
  type: 'wave_completion',
  scope: 'foreman',
  description: 'Completed Wave 6',
  data: { tasksCompleted: 15 },
  timestamp: new Date().toISOString(),
  createdBy: 'foreman'
})
```

## Integration Points

### 1. Chat Executor Integration

**File**: `lib/foreman/chat-executor.ts`

**When**: Before processing chat commands

**Purpose**: Load relevant context to inform Foreman's responses

**Implementation**:

```typescript
export async function executeChatAction(
  message: string,
  organisationId: string
) {
  // Load Foreman memory before action
  const foremanMemory = await loadMemoryBeforeAction('foreman', {
    tags: ['wave_completion', 'qa_failure', 'orchestration']
  })
  
  console.log(`Loaded ${foremanMemory.total} memory entries for context`)
  
  // Use memory to inform GPT-4 context
  const systemPrompt = `
    You are Foreman. Here is your recent context:
    - Recent waves completed: ${foremanMemory.entries.filter(e => e.tags?.includes('wave_completion')).length}
    - Recent QA failures: ${foremanMemory.entries.filter(e => e.tags?.includes('qa_failure')).length}
    
    ${message}
  `
  
  // ... rest of chat execution
  
  // After significant chat actions, write memory
  if (actionWasSignificant) {
    await writeMemoryAfterAction({
      type: 'builder_task_completion',
      scope: 'foreman',
      description: 'Processed chat command',
      data: { command: message, outcome: 'success' },
      timestamp: new Date().toISOString(),
      createdBy: 'foreman'
    })
  }
}
```

### 2. Build Wave Integration

**File**: `lib/foreman/run-build-wave.ts`

**When**: Before and after build wave execution

**Purpose**: Learn from previous waves, record outcomes

**Implementation**:

```typescript
export async function runBuildWave(params: BuildWaveParams) {
  // Load memory before starting wave
  const previousWaves = await loadMemoryBeforeAction('foreman', {
    tags: ['wave_completion']
  })
  
  console.log(`Learning from ${previousWaves.total} previous waves`)
  
  // Analyze patterns from previous waves
  const avgDuration = calculateAvgDuration(previousWaves.entries)
  const commonBuilders = findCommonBuilders(previousWaves.entries)
  
  // Execute wave with learned patterns
  const waveResult = await executeWave(params, {
    avgDuration,
    commonBuilders
  })
  
  // Record wave completion
  await recordWaveCompletion(params.waveName, {
    tasksCompleted: waveResult.tasksCompleted,
    duration: waveResult.duration,
    buildersUsed: waveResult.buildersUsed,
    qaOutcome: waveResult.qaOutcome,
    prUrl: waveResult.prUrl
  })
  
  return waveResult
}
```

### 3. Architecture Analysis Integration

**File**: `lib/foreman/analyze-architecture.ts` (or wherever architecture analysis happens)

**When**: After identifying architecture decisions

**Purpose**: Record decisions for future reference and consistency

**Implementation**:

```typescript
export async function analyzeArchitecture(
  repoContext: RepoContext
) {
  // Load previous architecture decisions
  const previousDecisions = await loadMemoryBeforeAction('global', {
    tags: ['architecture', 'decision']
  })
  
  console.log(`Loaded ${previousDecisions.total} previous architecture decisions`)
  
  // Analyze architecture
  const analysis = await performAnalysis(repoContext)
  
  // If new decisions are made
  if (analysis.newDecisions && analysis.newDecisions.length > 0) {
    for (const decision of analysis.newDecisions) {
      await recordArchitectureDecision(
        decision.description,
        {
          pattern: decision.pattern,
          rationale: decision.rationale,
          tradeoffs: decision.tradeoffs
        },
        { projectId: repoContext.projectId }
      )
    }
  }
  
  return analysis
}
```

### 4. Deployment Integration

**File**: `lib/foreman/deploy.ts` (or deployment orchestration)

**When**: After successful deployments

**Purpose**: Track deployment history

**Implementation**:

```typescript
export async function deployToEnvironment(
  environment: string,
  version: string,
  projectId: string
) {
  // Load deployment history
  const deploymentHistory = await loadMemoryBeforeAction('project', {
    tags: ['deployment'],
    projectId
  })
  
  console.log(`Previous deployments: ${deploymentHistory.total}`)
  
  // Perform deployment
  const result = await performDeployment(environment, version)
  
  // Record deployment
  await recordDeployment(
    environment,
    {
      version,
      commitSha: result.commitSha,
      status: result.status,
      deployedAt: new Date().toISOString()
    },
    { projectId }
  )
  
  return result
}
```

### 5. QA Integration

**File**: `lib/foreman/qa.ts` (or QA builder)

**When**: After QA failures

**Purpose**: Learn from failures to prevent recurrence

**Implementation**:

```typescript
export async function runQAValidation(
  module: string,
  builderOutput: any
) {
  // Load previous QA failures for this module
  const previousFailures = await loadMemoryBeforeAction('foreman', {
    tags: ['qa_failure', module]
  })
  
  console.log(`Previous QA failures for ${module}: ${previousFailures.total}`)
  
  // Run QA with awareness of past failures
  const qaResult = await performQA(module, builderOutput, {
    knownPatterns: extractPatterns(previousFailures.entries)
  })
  
  // If QA failed, record it
  if (qaResult.status === 'failed') {
    await recordQAFailure(
      `QA validation failed for ${module}`,
      {
        module,
        error: qaResult.error,
        builder: qaResult.builder,
        resolution: qaResult.resolution,
        prevention: qaResult.prevention
      }
    )
  }
  
  return qaResult
}
```

### 6. Project Lifecycle Integration

**File**: `lib/foreman/projects/lifecycle.ts` (or project management)

**When**: On milestone completions and phase transitions

**Purpose**: Track project progress

**Implementation**:

```typescript
export async function completeMilestone(
  projectId: string,
  milestone: string,
  deliverables: string[]
) {
  // Load project memory
  const projectMemory = await loadMemoryBeforeAction('project', {
    projectId,
    tags: ['milestone']
  })
  
  console.log(`Project ${projectId}: ${projectMemory.total} milestones completed`)
  
  // Record milestone completion
  await recordMilestoneCompletion(
    milestone,
    {
      completedAt: new Date().toISOString(),
      deliverables,
      prUrl: prUrl
    },
    { projectId }
  )
}

export async function transitionProjectPhase(
  projectId: string,
  fromPhase: string,
  toPhase: string
) {
  // Record state transition
  await writeMemoryEntry('project', `state_transition_${fromPhase}_${toPhase}`, {
    type: 'project_state_transition',
    fromPhase,
    toPhase,
    transitionDate: new Date().toISOString()
  }, {
    createdBy: 'foreman',
    projectId,
    tags: ['state_transition', fromPhase, toPhase]
  })
}
```

### 7. Error Handling Integration

**File**: `lib/foreman/error-recovery.ts`

**When**: On error escalation

**Purpose**: Learn from errors for better recovery

**Implementation**:

```typescript
export async function handleError(
  error: Error,
  context: ErrorContext
) {
  // Load previous error patterns
  const errorPatterns = await loadMemoryBeforeAction('foreman', {
    tags: ['error_escalation']
  })
  
  // Analyze if this is a recurring error
  const isRecurring = checkRecurrence(error, errorPatterns.entries)
  
  // Attempt recovery
  const recovery = await attemptRecovery(error, {
    patterns: errorPatterns.entries,
    isRecurring
  })
  
  // Record error for learning
  await writeMemoryEntry('foreman', `error_${Date.now()}`, {
    type: 'error_escalation',
    error: error.message,
    context,
    recovery: recovery.strategy,
    successful: recovery.successful
  }, {
    createdBy: 'error-recovery',
    tags: ['error_escalation', context.module]
  })
  
  return recovery
}
```

### 8. Dashboard Integration

**File**: `lib/foreman/projects/dashboard.ts`

**When**: When generating project dashboard

**Purpose**: Include relevant memory snapshots

**Implementation**:

```typescript
export async function getProjectMemorySnapshot(
  projectId: string
): Promise<MemorySnapshot[]> {
  // Load recent project memory
  const projectMemory = await loadMemoryBeforeAction('project', {
    projectId,
    tags: ['milestone', 'deployment', 'state_transition']
  })
  
  // Transform to snapshot format
  const snapshots: MemorySnapshot[] = projectMemory.entries
    .slice(-10) // Last 10 entries
    .map(entry => ({
      timestamp: entry.metadata.createdAt,
      scope: entry.scope,
      key: entry.key,
      summary: generateSummary(entry),
      relevance: calculateRelevance(entry)
    }))
  
  return snapshots
}

export async function generateDashboardResponse(
  project: Project
): Promise<DashboardResponse> {
  // ... existing dashboard logic ...
  
  // Add memory snapshots
  const memorySnapshots = await getProjectMemorySnapshot(project.projectId)
  
  return {
    // ... existing fields ...
    memorySnapshots
  }
}
```

## Best Practices

### 1. Always Load Memory Before Major Actions

```typescript
// ✅ Good
const memory = await loadMemoryBeforeAction('foreman', { tags: ['relevant'] })
await performAction(memory)

// ❌ Bad
await performAction() // No context from memory
```

### 2. Always Write Memory After Significant Events

```typescript
// ✅ Good
const result = await performWave()
await recordWaveCompletion('Wave 6', result.data)

// ❌ Bad
const result = await performWave() // No memory written
```

### 3. Use Appropriate Scope

```typescript
// ✅ Good
await recordArchitectureDecision(...) // Uses 'global' scope
await recordWaveCompletion(...) // Uses 'foreman' scope
await recordMilestoneCompletion(..., { projectId }) // Uses 'project' scope

// ❌ Bad
await writeMemoryEntry('global', 'wave_completion', ...) // Wrong scope
```

### 4. Tag Consistently

```typescript
// ✅ Good
tags: ['wave_completion', 'wave6', 'isms_platform']

// ❌ Bad
tags: ['Wave Completion', 'WAVE6', 'isms-platform'] // Inconsistent casing/format
```

### 5. Include Enough Context

```typescript
// ✅ Good
await recordWaveCompletion('Wave 6', {
  tasksCompleted: 15,
  duration: '90 minutes',
  buildersUsed: ['ui', 'api', 'qa'],
  qaOutcome: 'passed'
})

// ❌ Bad
await recordWaveCompletion('Wave 6', {}) // Minimal context
```

## Error Handling

### Read Failures

Memory read failures should not block operations:

```typescript
let memory
try {
  memory = await loadMemoryBeforeAction('foreman', { tags: ['wave'] })
} catch (error) {
  console.error('Failed to load memory:', error)
  memory = { entries: [], total: 0, scope: 'foreman' }
}

// Continue with operation using empty memory if needed
await performAction(memory)
```

### Write Failures

Memory write failures should be logged but not block completion:

```typescript
try {
  await recordWaveCompletion('Wave 6', data)
} catch (error) {
  console.error('Failed to write memory:', error)
  // Log to monitoring/alerting
  // Continue with operation - memory write is supplemental
}
```

## Testing Memory Integration

### Unit Testing

```typescript
import { writeMemoryEntry, readMemoryEntry } from '@/lib/foreman/memory'

test('should write and read memory', async () => {
  const entry = await writeMemoryEntry('foreman', 'test_key', {
    message: 'test'
  }, {
    createdBy: 'test',
    tags: ['test']
  })
  
  const readEntry = await readMemoryEntry('foreman', 'test_key')
  
  expect(readEntry?.value.message).toBe('test')
})
```

### Integration Testing

Use the provided test script:

```bash
npx tsx scripts/test-memory-system.ts
```

## Performance Considerations

### Memory Read Performance

- Typical read: < 10ms for 100-1000 entries
- Use tags to filter: Reduces data transfer
- Cache if needed: Store in-memory for session

```typescript
// Cache for session
let cachedMemory: MemoryQueryResult | null = null

export async function getMemoryWithCache(scope: MemoryScope, tags: string[]) {
  if (!cachedMemory) {
    cachedMemory = await loadMemoryBeforeAction(scope, { tags })
  }
  return cachedMemory
}
```

### Memory Write Performance

- Typical write: < 50ms including file I/O
- Batch writes if possible: Reduce I/O operations
- Use background writes: Don't block main flow

```typescript
// Background write (non-blocking)
recordWaveCompletion('Wave 6', data).catch(error => {
  console.error('Background memory write failed:', error)
})

// Continue with operation immediately
```

## Migration Path

### Phase 1: Add Memory to New Code ✅

All new features should integrate memory from day one.

### Phase 2: Retrofit Existing Code (Recommended)

Gradually add memory to existing integration points:

1. Chat executor (highest impact)
2. Build wave execution
3. Architecture analysis
4. Deployment orchestration
5. QA validation
6. Error handling

### Phase 3: Analytics and Insights (Future)

Once memory is populated, build analytics:
- Wave velocity trends
- QA pass rate over time
- Common error patterns
- Builder performance metrics

## Monitoring

### Health Checks

```typescript
import { getAllMemory } from '@/lib/foreman/memory'

export async function checkMemoryHealth() {
  const memory = await getAllMemory()
  
  const globalCount = memory.global.length
  const foremanCount = memory.foreman.length
  const projectCount = Object.keys(memory.projects).length
  
  console.log('Memory Health:')
  console.log(`  Global entries: ${globalCount}`)
  console.log(`  Foreman entries: ${foremanCount}`)
  console.log(`  Projects tracked: ${projectCount}`)
  
  return {
    healthy: globalCount > 0 || foremanCount > 0,
    globalCount,
    foremanCount,
    projectCount
  }
}
```

### File Size Monitoring

```bash
# Check memory file sizes
du -sh memory/*/memory.json

# If files grow too large, consider archiving old entries
```

## Troubleshooting

### Memory Not Persisting

**Symptom**: Memory entries written but not found on subsequent reads

**Causes**:
1. File permissions issue
2. Incorrect projectId
3. .gitignore blocking files

**Solution**:
```bash
# Check file exists
ls -la memory/foreman/memory.json

# Check permissions
chmod 644 memory/foreman/memory.json

# Check .gitignore
git check-ignore memory/foreman/memory.json
```

### Memory Files Growing Too Large

**Symptom**: memory.json files > 1MB

**Solution**: Archive old entries

```typescript
// TODO: Implement memory archiving
// Move entries older than 90 days to archive files
```

### Memory Query Too Slow

**Symptom**: Memory queries taking > 100ms

**Solution**: Optimize queries

```typescript
// Use specific tags
const memory = await loadMemoryBeforeAction('foreman', {
  tags: ['wave_completion'] // Specific tags filter early
})

// Limit results
const recentMemory = memory.entries.slice(-10) // Last 10 entries
```

## Future Enhancements

Planned improvements:

1. **Supabase Migration**: Move from JSON to Supabase for production scale
2. **Memory Search**: Full-text search across all memory
3. **Memory Analytics**: Dashboard for memory insights
4. **Memory Compression**: Archive old entries automatically
5. **Real-time Sync**: Sync across distributed Foreman instances

## Support

For questions or issues:
- Review: `memory/README.md`
- Check implementation: `lib/foreman/memory/`
- Run tests: `npx tsx scripts/test-memory-system.ts`
- Ask Foreman: `/foreman` chat interface

---

**Version**: 1.0.0  
**Last Updated**: 2024-12-06  
**Status**: ✅ Ready for Integration
