# Wake-Up Protocol Naming Delta — CS2 Escalation (3rd+ Occurrence)

**Escalation Type**: OVF-003 (3+ occurrence — CS2 escalation required)
**First Observed**: session-005-20260302
**This Occurrence**: session-011-20260303
**Occurrence Count**: 3+ (sessions 005, and recurring in subsequent sessions)

---

## Issue

The wake-up protocol script `.github/scripts/wake-up-protocol.sh` expects the IAA contract
file at `.github/agents/independent-assurance-agent.agent.md` (with `.agent.` infix).

The IAA contract file is actually at `.github/agents/independent-assurance-agent.md`
(without the `.agent.` infix — different naming convention from other agents).

This means the wake-up protocol script always fails for the IAA agent, producing:
```
[✗] Agent contract not found: .../independent-assurance-agent.agent.md
```

The IAA handles this by falling back to its BOOTSTRAP DIRECTIVE (direct contract read as
first session action), so this is NOT a governance blocker. However it is a persistent
and recurring script error.

---

## CS2 Decision Required

Option A: Update `.github/scripts/wake-up-protocol.sh` to handle IAA's naming convention
(check both `.md` and `.agent.md` patterns)

Option B: Document IAA as formally exempt from the wake-up protocol script, given that
IAA's BOOTSTRAP DIRECTIVE already mandates direct contract file read as the first action
of every session (which is functionally equivalent to the wake-up protocol's purpose).

Either option resolves the recurring error. No new FAIL-ONLY-ONCE rule is needed
(the IAA bootstrap already handles this correctly). A documentation or script fix
will prevent the recurring session log noise.

---

*Session: IAA-20260303-PR1294 | Authority: CS2 (Johan Ras / @APGI-cmy)*
