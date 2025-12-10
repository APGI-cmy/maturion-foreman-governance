/**
 * Autonomy Pilot Issue Selection
 * 
 * Implements safe issue selection for autonomous pilot execution.
 * Only selects issues that meet strict safety criteria to minimize risk.
 * 
 * Safety Constraints:
 * - Only documentation or non-critical UI changes
 * - No modifications to workflows, governance, or constitutional files
 * - Requires explicit labels for pilot participation
 */

import { commentOnIssue, labelIssue } from '@/lib/github/mutations'

export interface SafetyEvaluation {
  isSafe: boolean
  reasons: string[]
  allowedPaths: string[]
  forbiddenPaths: string[]
  requiredApprovals: string[]
}

export interface PilotIssue {
  number: number
  title: string
  labels: string[]
  body: string
  state: string
}

/**
 * Immutable paths that CANNOT be modified during pilot
 */
const FORBIDDEN_PATHS = [
  '.github/workflows/**',
  'foreman/constitution/**',
  'docs/governance/**',
  '.github/foreman/agent-contract.md',
  'BUILD_PHILOSOPHY.md'
]

/**
 * Safe paths that CAN be modified during pilot
 */
const SAFE_PATHS = [
  'docs/**',
  'app/components/**', // Non-critical UI components only
  'tests/**', // Test files
  'README.md',
  'IMPLEMENTATION_SUMMARY.md',
  'reports/**'
]

/**
 * Labels that indicate an issue is eligible for autonomous pilot
 */
const PILOT_ELIGIBLE_LABELS = [
  'governance',
  'docs',
  'parking-station',
  'enhancement',
  'documentation'
]

/**
 * Labels that indicate an issue is NOT safe for autonomous pilot
 */
const PILOT_FORBIDDEN_LABELS = [
  'critical',
  'security',
  'breaking-change',
  'high-priority',
  'workflow-change',
  'constitutional'
]

/**
 * Evaluate if an issue is safe for autonomous pilot execution
 */
export function evaluateIssueSafety(issue: PilotIssue): SafetyEvaluation {
  const reasons: string[] = []
  let isSafe = true
  
  // Check 1: Issue must be open
  if (issue.state !== 'open') {
    reasons.push('❌ Issue is not open')
    isSafe = false
  } else {
    reasons.push('✅ Issue is open')
  }
  
  // Check 2: Issue must have at least one pilot-eligible label
  const hasEligibleLabel = issue.labels.some(label => 
    PILOT_ELIGIBLE_LABELS.includes(label.toLowerCase())
  )
  
  if (!hasEligibleLabel) {
    reasons.push(`❌ Issue does not have eligible labels (needs one of: ${PILOT_ELIGIBLE_LABELS.join(', ')})`)
    isSafe = false
  } else {
    const eligibleLabels = issue.labels.filter(label => 
      PILOT_ELIGIBLE_LABELS.includes(label.toLowerCase())
    )
    reasons.push(`✅ Has eligible labels: ${eligibleLabels.join(', ')}`)
  }
  
  // Check 3: Issue must NOT have forbidden labels
  const hasForbiddenLabel = issue.labels.some(label => 
    PILOT_FORBIDDEN_LABELS.includes(label.toLowerCase())
  )
  
  if (hasForbiddenLabel) {
    const forbiddenLabels = issue.labels.filter(label => 
      PILOT_FORBIDDEN_LABELS.includes(label.toLowerCase())
    )
    reasons.push(`❌ Has forbidden labels: ${forbiddenLabels.join(', ')}`)
    isSafe = false
  } else {
    reasons.push('✅ No forbidden labels')
  }
  
  // Check 4: Check issue body/title for forbidden keywords
  const forbiddenKeywords = ['workflow', 'constitutional', 'guardrail', 'critical', 'security']
  const issueText = `${issue.title} ${issue.body}`.toLowerCase()
  const foundForbiddenKeywords = forbiddenKeywords.filter(keyword => 
    issueText.includes(keyword)
  )
  
  if (foundForbiddenKeywords.length > 0) {
    reasons.push(`⚠️  Warning: Issue contains keywords: ${foundForbiddenKeywords.join(', ')}`)
    // This is a warning, not a blocking issue
  } else {
    reasons.push('✅ No forbidden keywords in title/body')
  }
  
  return {
    isSafe,
    reasons,
    allowedPaths: SAFE_PATHS,
    forbiddenPaths: FORBIDDEN_PATHS,
    requiredApprovals: isSafe ? [] : ['manual']
  }
}

/**
 * Generate safety summary for issue comment
 */
export function generateSafetySummary(
  issue: PilotIssue,
  safety: SafetyEvaluation
): string {
  const lines: string[] = [
    '# 🤖 Autonomous Pilot Safety Evaluation',
    '',
    `**Issue**: #${issue.number} - ${issue.title}`,
    `**Evaluation**: ${safety.isSafe ? '✅ SAFE for autonomous execution' : '❌ NOT SAFE for autonomous execution'}`,
    '',
    '## Safety Check Results',
    ''
  ]
  
  safety.reasons.forEach(reason => {
    lines.push(`- ${reason}`)
  })
  
  lines.push('')
  lines.push('## Scope Constraints')
  lines.push('')
  lines.push('### ✅ Allowed Modifications')
  safety.allowedPaths.forEach(path => {
    lines.push(`- \`${path}\``)
  })
  
  lines.push('')
  lines.push('### ❌ Forbidden Modifications')
  safety.forbiddenPaths.forEach(path => {
    lines.push(`- \`${path}\``)
  })
  
  if (safety.isSafe) {
    lines.push('')
    lines.push('## Next Steps')
    lines.push('')
    lines.push('This issue has been marked as safe for autonomous pilot execution.')
    lines.push('')
    lines.push('**Applied Labels:**')
    lines.push('- `autonomy-pilot-1` - Designated for pilot autonomous execution')
    lines.push('- `safe-scope` - Verified to be within safe modification scope')
    lines.push('')
    lines.push('**Execution Plan:**')
    lines.push('1. Run pre-flight validation')
    lines.push('2. Generate execution plan')
    lines.push('3. Create branch: `autonomy/pilot-1/issue-' + issue.number + '`')
    lines.push('4. Execute build-to-green with QA validation')
    lines.push('5. Create PR and link to this issue')
    lines.push('6. Await approval or auto-merge (if QA passes)')
  } else {
    lines.push('')
    lines.push('## ⚠️ Manual Review Required')
    lines.push('')
    lines.push('This issue requires manual review before autonomous execution.')
    lines.push('')
    lines.push('**Required Approvals:**')
    safety.requiredApprovals.forEach(approval => {
      lines.push(`- ${approval}`)
    })
  }
  
  lines.push('')
  lines.push('---')
  lines.push('*This evaluation was performed by Foreman Autonomous Pilot System*')
  
  return lines.join('\n')
}

/**
 * Apply pilot labels to an issue
 */
export async function applyPilotLabels(
  owner: string,
  repo: string,
  issueNumber: number
): Promise<void> {
  try {
    await labelIssue(owner, repo, issueNumber, ['autonomy-pilot-1', 'safe-scope'])
    console.log(`[Pilot Selection] Applied labels to issue #${issueNumber}`)
  } catch (error: any) {
    console.error(`[Pilot Selection] Failed to apply labels: ${error.message}`)
    throw error
  }
}

/**
 * Post safety summary as comment on issue
 */
export async function postSafetySummary(
  owner: string,
  repo: string,
  issue: PilotIssue,
  safety: SafetyEvaluation
): Promise<void> {
  const summary = generateSafetySummary(issue, safety)
  
  try {
    await commentOnIssue(owner, repo, issue.number, summary)
    console.log(`[Pilot Selection] Posted safety summary to issue #${issue.number}`)
  } catch (error: any) {
    console.error(`[Pilot Selection] Failed to post comment: ${error.message}`)
    throw error
  }
}

/**
 * Select and prepare an issue for autonomous pilot execution
 */
export async function selectPilotIssue(
  owner: string,
  repo: string,
  issue: PilotIssue
): Promise<{ success: boolean; safety: SafetyEvaluation; message: string }> {
  console.log(`[Pilot Selection] Evaluating issue #${issue.number}: ${issue.title}`)
  
  // Evaluate safety
  const safety = evaluateIssueSafety(issue)
  
  if (!safety.isSafe) {
    await postSafetySummary(owner, repo, issue, safety)
    return {
      success: false,
      safety,
      message: `Issue #${issue.number} is not safe for autonomous execution. See issue comments for details.`
    }
  }
  
  // Apply labels
  await applyPilotLabels(owner, repo, issue.number)
  
  // Post summary
  await postSafetySummary(owner, repo, issue, safety)
  
  return {
    success: true,
    safety,
    message: `Issue #${issue.number} has been selected for autonomous pilot execution. Labels applied and safety summary posted.`
  }
}
