# Governance Safety Rails for High-Cost Model Usage (GSR-Model)

## Overview

This document defines the Governance Safety Rails (GSR) for high-cost model usage within the Maturion Foreman system. These rails ensure that expensive AI models (GPT-5.1, GPT-4-turbo) are used judiciously while maintaining development velocity and quality.

## Philosophy

**Governance First, Speed Second**: While Foreman operates autonomously at high speed, fiscal responsibility and resource optimization are paramount. High-cost models should be reserved for tasks that genuinely require advanced capabilities.

## High-Cost Model Definition

The following models are classified as "high-cost":
- `gpt-5.1` - Advanced reasoning and complex architecture
- `gpt-4-turbo` - High-performance general-purpose model

Standard models:
- `gpt-4` - Default model for most tasks
- `local-builder` - Zero-cost local execution

## Quota Limits

### Daily Limits
- **Maximum escalated operations per 24h window**: 50
- **Maximum concurrent escalations**: 5
- **Grace period for critical tasks**: 10 additional escalations (requires governance approval)

### Hourly Limits
- **Maximum escalations per hour**: 10
- **Burst allowance**: 15 (for 5-minute windows during critical deployments)

## Justification Requirements

All high-cost model escalations must include one of these justification tags:

### Automatic Approval (No Review Required)
1. **`architecture_update`** - System architecture changes or major refactoring
2. **`memory_evolution`** - Memory fabric or governance memory updates
3. **`governance_fix`** - Fixing governance violations or rule updates
4. **`multi_agent_coordination`** - Complex multi-builder orchestration
5. **`project_milestone`** - Critical milestone nearing completion

### Review Required (Throttled After 3/day)
6. **`complex_reasoning`** - Complex business logic or algorithms
7. **`heavy_refactor`** - Large-scale code refactoring (10+ files)
8. **`integration_complexity`** - Complex third-party integrations

### Requires Explicit Approval
9. **`experimental`** - Testing new approaches or techniques
10. **`optimization`** - Performance optimization tasks

## Throttling Rules

### Automatic Throttling Triggers
Throttling activates when:
1. Daily quota reaches 80% (40 escalations)
2. Hourly quota reaches 80% (8 escalations)
3. 3+ failed escalations in 1 hour
4. Average escalation cost exceeds $2.00 per task

### Throttling Behavior
When throttled:
- New escalation requests require governance review
- Fallback to `gpt-4` or `local-builder` automatically
- Alert sent to governance memory
- Daily report generated with escalation usage

### Throttling Exemptions
The following tasks bypass throttling:
1. **Critical system failures** - System down or degraded
2. **Security vulnerabilities** - CVE fixes or security patches
3. **Data integrity issues** - Memory corruption or data loss
4. **Governance violations** - Immediate compliance fixes
5. **Explicit admin override** - Manual approval from admin

## Escalation Decision Tree

```
┌─────────────────────────┐
│ Task Received           │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ Is task in exempt list? │──Yes──► Use high-cost model
└───────────┬─────────────┘
            │ No
            ▼
┌─────────────────────────┐
│ Quota remaining?        │──No───► Use fallback model
└───────────┬─────────────┘
            │ Yes
            ▼
┌─────────────────────────┐
│ Justification provided? │──No───► Reject escalation
└───────────┬─────────────┘
            │ Yes
            ▼
┌─────────────────────────┐
│ Justification in        │
│ auto-approve list?      │──Yes──► Use high-cost model
└───────────┬─────────────┘
            │ No
            ▼
┌─────────────────────────┐
│ Request governance      │
│ review                  │──Approved──► Use high-cost model
└───────────┬─────────────┘
            │ Denied
            ▼
┌─────────────────────────┐
│ Use fallback model      │
└─────────────────────────┘
```

## Governance Memory Integration

All escalation events are logged to Governance Memory with:

```typescript
{
  id: string
  timestamp: string
  eventType: 'escalation_request' | 'escalation_approved' | 'escalation_denied' | 'escalation_failed'
  taskId: string
  fromModel: 'gpt-4' | 'local-builder'
  toModel: 'gpt-5.1' | 'gpt-4-turbo'
  reason: EscalationReason
  justification?: string
  quotaRemaining: number
  throttled: boolean
  approved: boolean
  fallbackUsed: boolean
  actualModel: string
  cost?: number
  duration?: number
  errorMessage?: string
}
```

## Monitoring and Reporting

### Real-Time Metrics
- Current escalation count (hourly/daily)
- Quota utilization percentage
- Average cost per escalation
- Throttling events count
- Fallback usage rate

### Daily Reports
Generated at 00:00 UTC and sent to governance memory:
- Total escalations executed
- Cost breakdown by justification type
- Throttling events summary
- Failed escalation summary
- Recommendations for quota adjustments

### Alerts
Immediate alerts triggered on:
- Quota exceeds 90% in any window
- 5+ consecutive escalation failures
- Throttling activated
- Governance review queue exceeds 10 items
- Daily cost exceeds budget threshold

## Review and Adjustment Process

### Weekly Review
Every Monday, governance team reviews:
1. Previous week's escalation usage
2. Throttling events and impact
3. Justification distribution
4. Cost vs. value analysis
5. Quota limit adjustments (if needed)

### Monthly Review
Every 1st of month:
1. Comprehensive cost analysis
2. Model performance comparison
3. Fallback effectiveness evaluation
4. GSR rule effectiveness
5. Budget planning for next month

## Fallback Strategy

When high-cost model is unavailable or denied:

1. **Primary Fallback**: `gpt-4` (standard model)
2. **Secondary Fallback**: `local-builder` (zero-cost)
3. **Tertiary Fallback**: Task queued for manual review

Fallback success criteria:
- Task completes successfully
- QA validation passes
- No governance violations
- Output quality acceptable

## Emergency Override

Admins can override GSR restrictions using:

```typescript
{
  overrideGSR: true,
  overrideReason: "Critical production incident",
  adminId: "admin_user_id",
  validUntil: "2024-12-08T00:00:00Z"
}
```

Emergency overrides are:
- Logged to governance memory
- Time-limited (max 24 hours)
- Require justification
- Reviewed in next governance meeting

## Compliance

All GSR rules are **mandatory** and cannot be bypassed without explicit admin override. Violations are treated as governance incidents and logged to memory.

### Violation Handling
1. **First violation**: Warning logged
2. **Second violation**: Task rejected + admin alert
3. **Third violation**: System paused + governance review required

## Version History

- **v1.0** (2024-12-07): Initial GSR-Model specification
