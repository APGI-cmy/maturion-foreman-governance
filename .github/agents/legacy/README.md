# Legacy Agent Contracts

**Status**: ARCHIVED | **Date**: 2026-02-04  
**Reason**: Superseded by LIVING_AGENT_SYSTEM.md

---

## Purpose of This Directory

This directory contains archived versions of agent contracts that have been superseded by the Living Agent System (LAS). These files are preserved for historical reference and should **NOT** be used for active agent operations.

## What Changed?

### Old Model (Static Contracts)
- Large, monolithic agent contract files (600+ lines)
- Static procedures that quickly became outdated
- No memory or context between sessions
- Frequent manual updates required
- Direct modification risk

### New Model (Living Agent System)
- Minimal agent identity in contract (YAML frontmatter + mission)
- Dynamic working contracts generated per session
- Rolling memory across last 5 sessions
- Context-aware with lessons learned
- Zero direct contract modifications (escalate to CS2 instead)

## How LAS Works

1. **Wake-Up**: Agent executes `.github/scripts/wake-up-protocol.sh <agent-type>`
   - Loads memory from last 5 sessions
   - Generates dynamic working contract
   - Checks environment health
   - Reviews escalations

2. **Work**: Agent follows working contract (not static file)
   - References canonical governance from TIER_0_CANON_MANIFEST.json
   - Captures learnings during session
   - Records patterns and decisions

3. **Closure**: Agent executes `.github/scripts/session-closure.sh <agent-type>`
   - Creates session memory
   - Archives old sessions (keeps last 5)
   - Updates personal learnings
   - Verifies safe handover state

## Active Agent Contracts

Current agent contracts are minimal identity files:
- `.github/agents/governance-repo-administrator-v2.agent.md` (current, minimal)
- `.github/agents/CodexAdvisor-agent.md` (current, minimal)

Legacy contracts have been archived for reference:
- `.github/agents/governance-repo-administrator-v5.0.0-archive.md`
- `.github/agents/governance-repo-administrator-v1.0.0-archive.md`

## Canonical Protocol

All agents now operate per:
- **`governance/canon/LIVING_AGENT_SYSTEM.md`** - Canonical protocol (one-read entry point)
- **`.github/scripts/wake-up-protocol.sh`** - Session start executable
- **`.github/scripts/session-closure.sh`** - Session end executable
- **`.agent-workspace/<agent-type>/`** - Dynamic workspace with memory

## Migration Timeline

- **2026-02-04**: Living Agent System implemented
- **2026-02-04**: Legacy contracts archived
- **Future**: All new agents use LAS from inception

## For Historical Reference

If you need to understand how agents operated before LAS, these archived contracts provide that context. However, **do not modify or reference these files for current operations**.

## Authority

- **LIVING_AGENT_SYSTEM.md**: CS2 (Johan Ras/Maturion)
- **Archive Date**: 2026-02-04
- **Archive Authority**: governance-repo-administrator

---

*For current agent operations, see `governance/canon/LIVING_AGENT_SYSTEM.md`*
