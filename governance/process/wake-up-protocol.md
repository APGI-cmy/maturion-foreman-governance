# Wake-Up Protocol — Agent Exemptions

**Status**: Process Documentation  
**Authority**: CS2 (Johan Ras)  
**Effective Date**: 2026-04-13

---

## Purpose

Documents agent-specific exemptions from the standard wake-up protocol
(`.github/scripts/wake-up-protocol.sh`) defined in `governance/canon/AGENT_INDUCTION_PROTOCOL.md`.

---

## Agent Exemptions

### Independent Assurance Agent (IAA)

| Field | Value |
|-------|-------|
| **Agent** | `independent-assurance-agent` |
| **Contract** | `.github/agents/independent-assurance-agent.md` |
| **`wake_up_protocol`** | **N/A** |
| **Exemption Granted By** | CS2 (Johan Ras) |

**Rationale**: The IAA agent's bootstrap directive within its contract supersedes the
wake-up protocol script mechanism. The IAA contract mandates that the agent reads its
own contract file as the absolute first action of every session — this is functionally
equivalent to the wake-up protocol's purpose and is self-contained and authoritative.

Additionally, the wake-up protocol script (`wake-up-protocol.sh`) expects the naming
convention `<agent-type>.agent.md`, but the IAA contract uses
`independent-assurance-agent.md` (without the `.agent.` infix). This naming delta causes
false negatives in wake-up checks for the IAA agent. Rather than modifying the script,
CS2 ruled that IAA's own bootstrap sequence is the canonical startup mechanism.

**CS2 Reference**: PR [#1261](https://github.com/APGI-cmy/maturion-foreman-governance/pull/1261),
session-005-20260302 learning suggestion.

---

## Related Documents

- `governance/canon/AGENT_INDUCTION_PROTOCOL.md` — Canonical wake-up protocol definition
- `.github/scripts/wake-up-protocol.sh` — Wake-up protocol script
- `.github/agents/independent-assurance-agent.md` — IAA contract (v2.0.0)
- `.agent-workspace/independent-assurance-agent/escalation-inbox/wake-up-protocol-naming-delta-20260303.md` — Original escalation
