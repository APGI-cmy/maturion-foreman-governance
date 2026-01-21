# Agent Self-Governance Check Workflow

**Purpose**: Visual representation of the universal self-governance check that ALL agents MUST perform before every job.  
**Authority**: AGENT_SELF_GOVERNANCE_PROTOCOL.md Section 4.2  
**Maintained By**: governance-repo-administrator  
**Last Updated**: 2026-01-21

---

## Universal Self-Governance Check Workflow

```
═══════════════════════════════════════════════════════════════════════════
                        BEFORE EVERY JOB (MANDATORY)
═══════════════════════════════════════════════════════════════════════════

     ┌────────────────────────────────────────────────────────────────┐
     │ Step 1: Read Own Agent File                                    │
     │ ────────────────────────────────                               │
     │ • Agent reads its own .agent file (read-only)                  │
     │ • Parse frontmatter (version, authority, governance_binding)   │
     │ • Extract canonical governance references                      │
     │                                                                │
     │ Location:                                                      │
     │   • governance-repo-admin: <governance-repo>/.github/agents/   │
     │   • governance-liaison: <consumer-repo>/.github/agents/        │
     │   • FM Agent: <consumer-repo>/.github/agents/                  │
     │   • Builders: <consumer-repo>/.github/agents/                  │
     │                                                                │
     │ Prohibited: Modifying own contract, caching, inferring intent  │
     └────────────────────┬───────────────────────────────────────────┘
                          ↓
     ┌────────────────────────────────────────────────────────────────┐
     │ Step 2: Identify Canonical Governance Source(s)                │
     │ ────────────────────────────────────────────                   │
     │ Determine which canonical governance repository and version    │
     │ the agent should align with:                                   │
     │                                                                │
     │ Canonical Source by Agent Type:                                │
     │   • governance-repo-administrator:                             │
     │     → THIS repo (maturion-foreman-governance), main branch     │
     │   • governance-liaison:                                        │
     │     → maturion-foreman-governance/governance/canon/* (latest)  │
     │   • FM Agent:                                                  │
     │     → Local repo governance/ (seeded from canonical)           │
     │   • Builder Agents:                                            │
     │     → Local repo governance/ (seeded from canonical)           │
     │                                                                │
     │ Version Checking:                                              │
     │   • Read GOVERNANCE_ARTIFACT_INVENTORY.md                      │
     │   • Compare local vs canonical version                         │
     │   • Check last-updated timestamps                              │
     │                                                                │
     │ Escalate if canonical source cannot be determined              │
     └────────────────────┬───────────────────────────────────────────┘
                          ↓
     ┌────────────────────────────────────────────────────────────────┐
     │ Step 3: Perform Gap Analysis                                   │
     │ ────────────────────────────────                               │
     │ Compare own contract against canonical governance              │
     │                                                                │
     │ Check 1: Own Contract Alignment                                │
     │   • Compare agent contract version vs expected version         │
     │   • Verify governance_binding points to correct source         │
     │   • Check for contract structural changes (schema version)     │
     │                                                                │
     │ Check 2: Local Repository Governance Alignment                 │
     │   (governance-liaison and governance-repo-admin only)          │
     │   • Compare local governance/canon/* vs canonical              │
     │   • Check GOVERNANCE_ARTIFACT_INVENTORY.md for versions        │
     │   • Verify workflow automation scripts match canonical         │
     │   • Check for missing/outdated governance artifacts            │
     │                                                                │
     │ Gap Classification:                                            │
     │   • ALIGNED: Contract current AND repo governance current      │
     │   • MISALIGNED (Self): Own contract not current                │
     │   • MISALIGNED (Repo): Local repo governance not current       │
     └────────────────────┬───────────────────────────────────────────┘
                          ↓
                ┌─────────┴─────────┐
                │                   │
             ALIGNED          MISALIGNED
                │                   │
                ↓                   ↓
     ┌────────────────┐   ┌───────────────────────────────────────────┐
     │ Step 4:        │   │ Step 4: Check Self-Align Authority        │
     │ Proceed with   │   │ ────────────────────────────────────      │
     │ work           │   │ Determine if agent is authorized to       │
     │                │   │ self-align or must escalate               │
     │ Requirements:  │   │                                           │
     │ • Attestation  │   │ Self-Align Authority Matrix:              │
     │   prepared     │   │                                           │
     │ • Evidence     │   │ governance-liaison:                       │
     │   recorded     │   │   Check 1 (Own Contract) → ESCALATE       │
     └────────────────┘   │   Check 2 (Repo Governance) → SELF-ALIGN  │
                          │                                           │
                          │ FM Agent:                                 │
                          │   Check 1 (Own Contract) → ESCALATE       │
                          │   Check 2 (Repo) → ESCALATE (no authority)│
                          │                                           │
                          │ Builder Agents:                           │
                          │   Check 1 (Own Contract) → ESCALATE       │
                          │   Check 2: N/A (no authority to check)    │
                          │                                           │
                          │ governance-repo-administrator:            │
                          │   Check 1 (Own Contract) → ESCALATE       │
                          │   Check 2 (Canon) → SELF-ALIGN            │
                          └─────────┬─────────────────────────────────┘
                                    │
                      ┌─────────────┴─────────────┐
                      │                           │
              AUTHORIZED TO                  NOT AUTHORIZED
              SELF-ALIGN                     TO SELF-ALIGN
                      │                           │
                      ↓                           ↓
     ┌────────────────────────────────┐  ┌──────────────────────────────┐
     │ Step 5A: Self-Align            │  │ Step 5B: Escalate            │
     │ ──────────────────────         │  │ ─────────────────            │
     │ Layer down canonical artifacts │  │ 1. HALT work immediately     │
     │                                │  │                              │
     │ governance-liaison procedure:  │  │ 2. Close PR/job with message:│
     │   1. Identify outdated/missing │  │    "Cannot proceed - agent   │
     │      governance artifacts      │  │    file not current"         │
     │   2. Copy latest canon files   │  │    OR                        │
     │   3. Copy workflow automation  │  │    "Cannot proceed - repo    │
     │      (scripts, CI YAML)        │  │    governance misaligned"    │
     │   4. Update INVENTORY.md       │  │                              │
     │   5. Update ALIGNMENT.md       │  │ 3. Escalate to authority:    │
     │   6. Commit changes            │  │    • Builder → FM/CS2        │
     │   7. Return to Step 1 (verify) │  │    • FM → CS2                │
     │                                │  │    • g-liaison → CS2         │
     │ governance-repo-admin procedure:  │    • g-repo-admin → CS2       │
     │   1. Update INVENTORY.md       │  │                              │
     │   2. Create ripple plan        │  │ 4. WAIT for CS2 to update    │
     │   3. Document requirements     │  │    contract/governance       │
     │   4. Create downstream issues  │  │                              │
     │   5. Return to Step 1 (verify) │  │ 5. Job restarts after        │
     │                                │  │    alignment restored        │
     │ Requirements:                  │  │                              │
     │   • Layer down ALL artifacts   │  │ Message Template:            │
     │   • Update all version markers │  │   SELF-GOVERNANCE CHECK FAILED│
     │   • Preserve audit trail       │  │   Agent: <name>              │
     │   • Re-verify after completion │  │   Check Failed: <1|2>        │
     │                                │  │   Reason: <specific gap>     │
     │ Prohibited:                    │  │   Escalated to: <authority>  │
     │   • Selective layer-down       │  │                              │
     │   • Modifying canonical files  │  └──────────────────────────────┘
     │   • Skipping workflow files    │
     │   • Proceeding without verify  │
     └────────────┬───────────────────┘
                  ↓
     ┌────────────────────────────────┐
     │ Step 6: Return to Step 1       │
     │ ──────────────────────────     │
     │ Re-verify alignment after      │
     │ self-align action              │
     │                                │
     │ • Perform gap analysis again   │
     │ • Confirm ALIGNED status       │
     │ • Proceed only if verified     │
     └────────────┬───────────────────┘
                  ↓
     ┌────────────────────────────────┐
     │ Proceed with Work              │
     │ ─────────────────              │
     │ After alignment verified:      │
     │                                │
     │ Requirements:                  │
     │   ✅ Self-governance check     │
     │      PASSED                    │
     │   ✅ Attestation prepared      │
     │   ✅ Evidence recorded         │
     │                                │
     │ Mandatory: Include attestation │
     │ in all progress reports/PRs    │
     └────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════
                             END OF WORKFLOW
═══════════════════════════════════════════════════════════════════════════
```

---

## Key Decision Points

### Decision Point 1: Aligned vs Misaligned
- **Input**: Gap analysis results (Check 1 and Check 2)
- **Output**: ALIGNED → Proceed | MISALIGNED → Check authority
- **Critical**: No work proceeds if misaligned without proper handling

### Decision Point 2: Authorized vs Not Authorized
- **Input**: Agent type + misalignment type (Check 1 vs Check 2)
- **Output**: AUTHORIZED → Self-align | NOT AUTHORIZED → Escalate
- **Critical**: Unauthorized self-alignment is prohibited

---

## Attestation Checkpoints

1. **Before Work**: Self-governance check MUST be performed
2. **After Self-Align**: Alignment MUST be re-verified
3. **In Progress Reports**: Attestation MUST be included
4. **In PREHANDOVER_PROOF**: Full attestation MUST be documented

---

## Escalation Paths

| Agent Type | Check 1 Failed | Check 2 Failed |
|------------|----------------|----------------|
| governance-liaison | → CS2 | → SELF-ALIGN |
| FM Agent | → CS2 | → CS2 |
| Builder Agents | → FM/CS2 | N/A |
| governance-repo-administrator | → CS2 | → SELF-ALIGN |

---

**Maintained By**: governance-repo-administrator  
**Authority**: AGENT_SELF_GOVERNANCE_PROTOCOL.md v1.0.0  
**Last Updated**: 2026-01-21
