# Learning File Staleness Detection Script

## Purpose

Enforces learning capture by detecting personal learning files with placeholder-only content that persist across multiple agent sessions.

## Authority

- **AGENT_ENVIRONMENTAL_RESPONSIBILITY_DOCTRINE.md v1.1.0 Section 15**
- **MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md**

## Usage

```bash
.github/scripts/check-learning-file-staleness.sh
```

### Exit Codes

- `0`: All learning files are fresh or have meaningful content (PASS)
- `1`: One or more learning files have stale placeholder content (FAIL)

## What It Checks

### Learning Files Analyzed

For each agent in `.agent-workspace/`:

- `personal/lessons-learned.md` - Mistakes to avoid
- `personal/patterns.md` - Recurring positive patterns  
- `personal/anti-patterns.md` - Things that don't work
- `personal/efficiency-log.md` - Process improvements

### Placeholder Detection

A file is considered a **placeholder** if it contains:

1. Explicit placeholder markers:
   - "No lessons yet - first session"
   - "No patterns yet - first session"
   - "No efficiency notes yet - first session"
   - "No anti-patterns documented yet - first session"

2. Minimal content (< 3 non-header lines)

### Session Count Tracking

Total sessions = Active sessions (`memory/*.md`) + Archived sessions (`memory/.archive/*.md`)

### Staleness Thresholds

| Sessions | Status | Action |
|----------|--------|--------|
| 0-1 | ACCEPTABLE | Placeholder allowed for first/second session |
| 2 | WARNING | Warning displayed (pass with warning) |
| 3+ | STALE | Exit code 1 (CI gate failure) |

## Example Output

### Passing (All Files Fresh)

```
═══════════════════════════════════════════════════════════════
  Learning File Staleness Detection v1.0.0
  Authority: AGENT_ENVIRONMENTAL_RESPONSIBILITY_DOCTRINE.md v1.1.0
═══════════════════════════════════════════════════════════════

[INFO] Staleness threshold: 3 sessions
[INFO] Workspace root: /path/to/.agent-workspace

[INFO] Found 2 agent workspace(s)

[INFO] Analyzing learning files for agent: governance-repo-administrator
[INFO] Total sessions for governance-repo-administrator: 22
[✓] OK: lessons-learned.md has meaningful content
[✓] OK: patterns.md has meaningful content
[✓] OK: anti-patterns.md has meaningful content
[✓] OK: efficiency-log.md has meaningful content

═══════════════════════════════════════════════════════════════
[✓] Learning file staleness check PASSED
✅ All learning files are either fresh or have meaningful content
═══════════════════════════════════════════════════════════════
```

### Failing (Stale Files Detected)

```
═══════════════════════════════════════════════════════════════
  Learning File Staleness Detection v1.0.0
  Authority: AGENT_ENVIRONMENTAL_RESPONSIBILITY_DOCTRINE.md v1.1.0
═══════════════════════════════════════════════════════════════

[INFO] Staleness threshold: 3 sessions
[INFO] Workspace root: /path/to/.agent-workspace

[INFO] Found 1 agent workspace(s)

[INFO] Analyzing learning files for agent: test-agent
[INFO] Total sessions for test-agent: 5
[⚠] Placeholder content detected: lessons-learned.md
[✗] STALE: lessons-learned.md has placeholder content after 5 sessions (threshold: 3)
[✓] OK: patterns.md has meaningful content

[✗] Agent test-agent has 1 STALE learning file(s):
  - lessons-learned.md (5 sessions without updates)

Required Action:
  1. Review the agent's last 5 sessions
  2. Add meaningful learnings, patterns, or anti-patterns
  3. If no learnings exist, document WHY (e.g., 'No failures encountered')
  4. Update the files to remove placeholder content

Authority: AGENT_ENVIRONMENTAL_RESPONSIBILITY_DOCTRINE.md v1.1.0

═══════════════════════════════════════════════════════════════
[✗] Learning file staleness check FAILED
❌ One or more learning files have stale placeholder content

This violates learning capture requirements in:
  - AGENT_ENVIRONMENTAL_RESPONSIBILITY_DOCTRINE.md v1.1.0
  - MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md

Agents MUST capture real learnings, patterns, and anti-patterns.
Placeholder files beyond 3 sessions are not acceptable.
═══════════════════════════════════════════════════════════════
```

## Integration

### CI/CD Workflow

Used by `.github/workflows/learning-file-staleness-gate.yml`:

```yaml
- name: Run Learning File Staleness Check
  run: ./.github/scripts/check-learning-file-staleness.sh
```

### Evidence-Based Bypass

Per BL-027/BL-028, the check is skipped if PREHANDOVER_PROOF documents learning file validation.

## Remediation

If the check fails:

1. **Review Session Memories**: Check last N session files in `memory/`
2. **Extract Learnings**: Identify lessons, patterns, anti-patterns
3. **Update Files**: Replace placeholder content with real insights
4. **Justify Emptiness**: If no real learnings, document WHY

### Acceptable Justification Example

```markdown
# Lessons Learned

## Session Status (Updated: 2026-02-14)

No lessons learned in last 5 sessions. All processes executed without 
failures or unexpected behaviors. Existing patterns (see patterns.md) 
remain sufficient.

---
```

## Configuration

Configuration is at the top of the script:

```bash
STALENESS_THRESHOLD=3  # Sessions before flagging as stale
```

## Related Files

- `.github/workflows/learning-file-staleness-gate.yml` - CI/CD workflow
- `.github/scripts/session-closure.sh` - Enhanced with staleness warnings
- `governance/canon/AGENT_ENVIRONMENTAL_RESPONSIBILITY_DOCTRINE.md` - Authority
- `governance/canon/MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md` - Requirements

## Version

**Script Version**: 1.0.0  
**Doctrine Version**: 1.1.0  
**Effective Date**: 2026-02-14
