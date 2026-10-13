# PR1420 authenticated source-publisher correction

Date: 2026-10-13
Publisher: original Codex implementation proxy
Prior source: abb6ebf5ba4492c6d2414745de428374bebd0463
Actual independent finding: PR comment6143948027
Parent: job-CS2-AUTOMATION-W1-W2-20261008 (unchanged alias/history/counters)

The earlier evaluator incorrectly used self-asserted Git author/committer
metadata as contribution provenance. The new evaluator ignores those fields.
For every actual submitted commit it requires GitHub API push-triggered workflow
run metadata binding the repository, source branch and exact commit SHA, with a
nonempty original authenticated actor. Rerun triggering_actor is not treated as
source publication. Missing, truncated, invalid or unavailable metadata fails
closed; it is never assumed zero contribution. The Actions API is read-only.

The root authenticated publisher set includes PR creation identity and actual
push actors. An allowed issuer who published implementation cannot self-assure.
The evidence-only exception now recognizes only named canonical IAA markdown
records and IAA session memories. Executable files or arbitrary files inside an
assurance directory are not exempt. Canonical record bytes/hash and independent
exact-head authenticated review validation remain mandatory.

Validation: 38/38 new adversarial tests passed, zero failures/skips. Tests include
forged Git authors hiding an issuer's authenticated push, missing provenance,
legitimate IAA record publication and executable-code disguise. The original
25/25 suite is unchanged and remains verified in run38384296662. Final-source CI
is still required and its actual results are reported after publication.

Actual API example at the prior source: push run38384298142 reports head SHA
abb6ebf5ba4492c6d2414745de428374bebd0463, branch
copilot/fix-merge-gate-interface, repository APGI-cmy/maturion-foreman-governance
and actor APGI-cmy. Its existence is authenticated publication provenance,
not a successful test or assurance verdict. GitHub event streams are delayed and
bounded, so public activity-event absence is not used as proof of independence.

The trusted workflow adds actions: read for this metadata. It grants no Actions
write permission and still uses a separately protected MATURION_BOT_TOKEN solely
for status publication. The earlier immutable evidence/installation packet is
retained; this addendum supersedes only its commit-metadata provenance method
and corresponding current source hashes/test count. The administrator still
needs to configure the protected App/independent issuer and expected main check;
no installed gate, IAA token, merge, activation or W1/W2 outcome is claimed.
QP/ECAP producer inputs remain with their actual owners; they are not asserted
complete by this source correction. The prior independent rejection remains
attributed history and source ownership continues until actual acceptance.

| Corrected source file | SHA256 of staged Git bytes |
|---|---|
| `.github/scripts/trusted-iaa-assurance.js` | `25315e2e3953ec8a91b5550e25ed8b69167bee2240a92641aa7f5703b8f6167f` |
| `.github/scripts/tests/test-trusted-iaa-assurance.js` | `3e239ccc27058b957141eedb07a545e6ef08760ca6ad342067a6c761a9bbb2b2` |
| `.github/workflows/trusted-iaa-assurance.yml` | `f50831759ae0e6055443f19ad9d50e2c28ec7b429861802267e51680da823176` |
