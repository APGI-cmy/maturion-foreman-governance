# Efficiency Log

This file tracks process improvements discovered across sessions.

## Format

```markdown
### [Date] - [Improvement Title]

**Before**: What was the inefficient approach?

**After**: What is the improved approach?

**Time Saved**: Estimated efficiency gain

**Applicability**: When to use this improvement?

**Notes**: Any caveats or considerations

---
```

## Example

### 2026-02-06 - Parallel File Operations

**Before**: Reading/editing files sequentially in separate tool calls

**After**: Use parallel tool calls for independent file operations (multiple view, grep, edit calls in single response)

**Time Saved**: ~30-50% reduction in I/O latency

**Applicability**: Any time multiple files need to be read, searched, or edited independently

**Notes**: Cannot parallelize dependent operations (e.g., reading output from previous bash command requires sequential execution)

---

## Governance

This file is persistent and must accumulate improvements over time. Never reset or clear without archiving.
