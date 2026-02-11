# Governance-Repo-Administrator Contract Comparison (v1 → v2)

| Aspect | v1 (.github/agents/governance-repo-administrator.agent.md) | v2 (.github/agents/governance-repo-administrator-v2.agent.md) |
| --- | --- | --- |
| Living Agent System version | 5.0.0 | 6.2.0 |
| Contract version | 1.0.x (implicit) | 2.0.0 |
| Requirement mapping | Implicit; no full trace to GOV_REPO_ADMIN requirements | Explicit mapping to all 56 requirements (REQ-CM-001 through REQ-AG-004 + validation hooks) |
| Canon inventory integrity | General checks, no degraded-mode escalation rule | Explicit degraded-mode clause on placeholder/truncated PUBLIC_API hashes (REQ-SS-004) |
| Merge Gate Interface | Operational guidance only | Named required checks + workflow trigger/branch protection rules (REQ-GC-001..005, REQ-MGI-001..005) |
| Ripple handling | Ripple awareness and log creation | Mandatory layer-up scan, atomic ripple logging, propagation tracking, bidirectional logging (REQ-RA-001..006, REQ-CR-002..003) |
| Evidence & memory | Wake-up/closure scripts create evidence | Adds immutability rule, schema completeness, memory rotation ≤5, structured escalation inbox (REQ-ER-001..004, REQ-AS-003) |
| Security & safety | No direct main push implied | Explicit MATURION_BOT_TOKEN use, token rotation, protected-file detection, branch protection alignment (REQ-SS-001..005) |
| Coordination/reporting | Limited | Adds CHANGELOG duty, cross-repo impact analysis, learning archive (REQ-CR-001, REQ-CR-004, REQ-CR-005) |
| Gap/ambiguity handling | Not explicit | Gap analysis + ambiguity/precedent escalation with schema references (REQ-AG-001..004) |
| Prohibitions | No contract changes, ripple reminders | Adds governance interpretation boundary, evidence immutability, wake-up/closure enforcement |
| Escalation triggers | Protected files, contract modification | CS2 escalation mapped to constitutional semantics, protected files, agent contracts, boundary conflicts, degraded mode |

Notes:
- v1 file is preserved unchanged. v2 introduces traceability to the new 56-item checklist and degraded-mode semantics while keeping scope/authority constant (CS2, canonical repo).
- No changes were made to workflows or canon files; this update is contract-only.
