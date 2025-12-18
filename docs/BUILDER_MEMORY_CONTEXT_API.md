# Builder Memory Context API Documentation

## Overview

This document describes the memory context API that builders (both GitHub Copilot and Local Desktop Builder) receive as part of every task request.

## Memory Context Structure

Every builder task now includes a `memoryContext` field with the following structure:

```typescript
interface BuilderMemoryContext {
  /** Historical issues relevant to this task */
  historicalIssues: HistoricalIssue[]
  
  /** Architecture lessons to follow */
  architectureLessons: ArchitectureLesson[]
  
  /** Reasoning patterns to apply */
  reasoningPatterns: ReasoningPattern[]
  
  /** Governance rules to enforce */
  governanceRules: GovernanceMemory[]
  
  /** Project-specific requirements */
  projectRequirements?: string[]
  
  /** QA insights from past builds */
  qaInsights?: string[]
  
  /** Memory references used */
  memoryReferences: string[]
  
  /** Timestamp when context was compiled */
  compiledAt: string
  
  /** Total memory size in bytes */
  sizeBytes: number
}
```

## Type Definitions

### HistoricalIssue

```typescript
interface HistoricalIssue {
  id: string
  type: string
  description: string
  resolution: string
  timestamp: string
  scope: 'global' | 'foreman' | 'project'
  tags: string[]
}
```

### ArchitectureLesson

```typescript
interface ArchitectureLesson {
  id: string
  pattern: string
  description: string
  rationale: string
  benefits: string[]
  tradeoffs: string[]
  applicability: string[] // Which contexts this applies to
  timestamp: string
  source: string
}
```

### ReasoningPattern

```typescript
interface ReasoningPattern {
  id: string
  name: string
  description: string
  context: string // When to apply this pattern
  approach: string // How to apply this pattern
  examples: string[]
  tags: string[]
  successRate?: number
  usageCount?: number
}
```

### GovernanceMemory

```typescript
interface GovernanceMemory {
  id: string
  rule: string
  description: string
  enforcement: 'strict' | 'advisory' | 'deprecated'
}
```

## Integration Requirements

### For Local Desktop Builder

#### Node.js Agent (`maturion-local-builder/agent.js`)

The builder should accept `memoryContext` in the task payload:

```javascript
async function executeTask(task) {
  const { module, taskDescription, memoryContext } = task
  
  // 1. Check governance rules
  if (memoryContext?.governanceRules) {
    for (const rule of memoryContext.governanceRules) {
      if (rule.enforcement === 'strict') {
        console.log(`[Governance] Enforcing: ${rule.rule}`)
        // Validate task against rule
      }
    }
  }
  
  // 2. Apply architecture lessons
  if (memoryContext?.architectureLessons) {
    console.log(`[Memory] Reviewing ${memoryContext.architectureLessons.length} architecture lessons`)
    // Use lessons to guide implementation
  }
  
  // 3. Learn from historical issues
  if (memoryContext?.historicalIssues) {
    console.log(`[Memory] Reviewing ${memoryContext.historicalIssues.length} past issues`)
    // Avoid repeating past mistakes
  }
  
  // 4. Apply reasoning patterns
  if (memoryContext?.reasoningPatterns) {
    console.log(`[Memory] Applying ${memoryContext.reasoningPatterns.length} reasoning patterns`)
    // Use patterns for decision-making
  }
  
  // 5. Execute task with memory guidance
  const result = await buildWithMemoryGuidance(task, memoryContext)
  
  // 6. Reference memory in output
  result.memoryReferencesUsed = memoryContext?.memoryReferences || []
  
  return result
}
```

#### Python Agent (`maturion-local-builder/python_agent/agent_core.py`)

```python
def execute_task(task):
    module = task['module']
    task_description = task['taskDescription']
    memory_context = task.get('memoryContext', {})
    
    # 1. Check governance rules
    governance_rules = memory_context.get('governanceRules', [])
    for rule in governance_rules:
        if rule['enforcement'] == 'strict':
            print(f"[Governance] Enforcing: {rule['rule']}")
            # Validate task against rule
    
    # 2. Apply architecture lessons
    architecture_lessons = memory_context.get('architectureLessons', [])
    if architecture_lessons:
        print(f"[Memory] Reviewing {len(architecture_lessons)} architecture lessons")
        # Use lessons to guide implementation
    
    # 3. Learn from historical issues
    historical_issues = memory_context.get('historicalIssues', [])
    if historical_issues:
        print(f"[Memory] Reviewing {len(historical_issues)} past issues")
        # Avoid repeating past mistakes
    
    # 4. Apply reasoning patterns
    reasoning_patterns = memory_context.get('reasoningPatterns', [])
    if reasoning_patterns:
        print(f"[Memory] Applying {len(reasoning_patterns)} reasoning patterns")
        # Use patterns for decision-making
    
    # 5. Execute task with memory guidance
    result = build_with_memory_guidance(task, memory_context)
    
    # 6. Reference memory in output
    result['memoryReferencesUsed'] = memory_context.get('memoryReferences', [])
    
    return result
```

## Builder Output Requirements

Builders MUST include memory references in their output:

```typescript
interface BuilderTaskOutput {
  success: boolean
  data?: any
  artifacts?: BuilderArtifact[]
  qaResults?: QAResult[]
  error?: string
  
  // NEW: Memory references used in decision-making
  memoryReferencesUsed?: string[]
  
  // NEW: Governance rules validated
  governanceValidation?: {
    rule: string
    passed: boolean
    message?: string
  }[]
}
```

## PR Description Requirements

When generating PR descriptions, builders MUST include a memory context section:

```markdown
## Memory Context

This implementation was guided by the following memory:

### Governance Rules Applied
- No secrets in code: All API keys moved to environment variables
- Test coverage required: Added unit tests for all new functions

### Architecture Lessons Applied
- Component-Based Architecture: Used functional components with hooks
- Error Handling Pattern: Added try-catch blocks for async operations

### Historical Issues Reviewed
- Issue #123: Missing error handling in API calls (Resolution: Added try-catch)
- Issue #456: Type safety issues (Resolution: Added TypeScript types)

### Memory References
- `global_architecture_001`
- `global_governance_002`
- `foreman_qa_failure_123`
```

## Safety Requirements

### 1. No Over-Injection

Memory context is automatically filtered to only relevant entries based on:
- Builder type (ui, api, schema, integration, qa)
- Module name
- Recent issues (last 30 days)
- Strict governance rules only

### 2. Size Limits

- Maximum context size: **50KB**
- Automatic trimming prioritizes:
  1. Governance rules (most important)
  2. Architecture lessons
  3. Reasoning patterns
  4. Historical issues
  5. QA insights (least important)

### 3. No Hallucination

Builders MUST NOT:
- Invent new memory entries
- Fabricate lessons, rules, or decisions
- Invent dependencies or architecture

All memory context comes from actual memory entries in the system.

### 4. Governance Compliance

Builders MUST decline tasks that violate:
- Module boundaries
- Naming conventions
- Architecture rules
- Privacy guardrails

Error message example:
```
Error: Task violates governance rule "No class components"
Rule enforcement: strict
Description: Use only functional components
Memory reference: global_governance_ui_001
```

## Example Usage

### Minimal Example

```typescript
const task = {
  id: 'task_123',
  builder: 'api',
  module: 'authentication',
  taskDescription: 'Add OAuth support',
  memoryContext: {
    historicalIssues: [],
    architectureLessons: [
      {
        id: 'arch_001',
        pattern: 'API Versioning',
        description: 'Use v1, v2 URL prefixes',
        rationale: 'Backward compatibility',
        benefits: ['No breaking changes'],
        tradeoffs: ['More endpoints'],
        applicability: ['api', 'backend'],
        timestamp: '2024-01-15T10:00:00Z',
        source: 'architecture-team'
      }
    ],
    reasoningPatterns: [],
    governanceRules: [
      {
        id: 'gov_001',
        rule: 'All API endpoints must have authentication',
        description: 'No public endpoints without explicit approval',
        enforcement: 'strict'
      }
    ],
    projectRequirements: [],
    qaInsights: [],
    memoryReferences: ['arch_001', 'gov_001'],
    compiledAt: '2024-01-20T15:30:00Z',
    sizeBytes: 1024
  }
}

// Builder processes task with memory context
const result = await executeTask(task)
```

## Testing

Local builders should test memory context handling with:

1. Empty memory context (no entries)
2. Minimal memory context (1-2 entries)
3. Large memory context (near 50KB limit)
4. Governance rule violations
5. Multiple architecture lessons
6. Historical issues with different severities

## Support

For questions or issues with memory context integration:
1. Check memory context size (`sizeBytes` field)
2. Verify `memoryReferences` are being tracked
3. Ensure governance rules are being enforced
4. Review PR output includes memory context section

## Version

API Version: 1.0.0
Last Updated: 2024-12-06
