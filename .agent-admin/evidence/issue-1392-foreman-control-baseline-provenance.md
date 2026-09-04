# Issue #1392 Foreman Control Baseline Provenance

**Date**: 2026-09-03  
**Issue**: [#1392](https://github.com/APGI-cmy/maturion-foreman-governance/issues/1392)  
**Branch**: `apgi-cmy-restore-foreman-baseline`  
**Base**: `apgi-cmy-iaa-tier-2-recovery`  
**Authorization**: CS2 authorization in Issue #1392.

## Recovery Boundary

This recovery restores the Foreman Tier 2/control artifacts named in Issue #1392 and the four corresponding Foreman knowledge-index entries. It does not modify a Tier 1 agent contract, activate ECAP or runtime behavior, invoke or imitate IAA, create an assurance artifact, layer down to ISMS, begin MMM work, or merge.

## Authoritative Source Selection

The declared paths are absent from the canonical branch and no recoverable canonical path history is available in the checked canonical refs. The source is the verified `APGI-cmy/maturion-isms` `main` tree pinned at commit `13c41f2545ceb0a0cd5507ebf4224f26e6d0ff43`. Its Foreman Tier 2 index names the four restored knowledge files, and its Wave 5 relocation map names the related Wave 2–6 control artifacts and transition-limitations register. This establishes the donor as the authoritative recovery source for the declared baseline.

| Restored path | Verified source blob |
|---|---|
| `.agent-workspace/foreman-v2/knowledge/foreman-tier2-operating-protocol.md` | `caa44d6b0b535536a9f837baa519b69c90107f85` |
| `.agent-workspace/foreman-v2/knowledge/foreman-control-relocation-map.md` | `8766ed5f087403561e1f01dfeb731ec214d91619` |
| `.agent-workspace/foreman-v2/knowledge/domain-flag-index.md` | `0e5a6d37df746adb95a9e97a1ab6382c4ee117a5` |
| `.agent-workspace/foreman-v2/knowledge/specialist-registry.md` | `5fc142ee8381eea077bc1984b807ed5c8f0fdab7` |
| `.agent-admin/control/merge-gate-required-checks.json` | `b05fb646ce941fac3b30080c5b06ed5d6a43ff88` |
| `.agent-admin/control/overlays/WAVE2_PREHANDOVER_LANE_GATE.md` | `aad0fcce7f625005d6aece10b6672e03a92ff960` |
| `.agent-admin/control/overlays/WAVE3_DELEGATION_ORDER_GATE.md` | `a0faea8ac5bb1df1b08c9e30fe617fde20d0a1d6` |
| `.agent-admin/control/overlays/WAVE4_ECAP_ADMIN_BOUNDARY.md` | `e0428bbede7088d8c26ddeb6910872fd30d4ca21` |
| `.agent-admin/control/overlays/WAVE5_FOREMAN_TIER1_SIMPLIFICATION.md` | `a154e6b9d4ada040e6534733891e8f3015d6ed46` |
| `.agent-admin/control/overlays/WAVE6_MERGE_GATE_REQUIRED_CHECKS_ALIGNMENT.md` | `baddba04b2c4807098994239b846931f9a338330` |
| `.agent-admin/control/wave-reviews/outstanding-transition-limitations.md` | `0a4838104a7473b69114741e67d7dbc8855241dc` |

The local restored blobs must equal these Git blob identifiers. The index update is deliberately narrow and records the four restored Tier 2 requirements without changing Tier 1 authority or declaring additional donor-only prerequisites.
