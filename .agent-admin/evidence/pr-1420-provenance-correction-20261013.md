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

## Additional actual-source defect and correction - 2026-10-13

During preparation for actual installation, the original proxy queried GitHub's
real PR1420 commit and push-run metadata. Initial planning commit
10184fb6e5f6662d1cb033547353c06fd0e033b7 has zero push receipts, zero changed files,
and stats total/additions/deletions all zero. GitHub reports its tree as
6ae3584677a64227e9a49894cee18df0d904de0f, identical to the verified parent
68f3f0525060ec7115414af16b0931e54fae1344. Every content-bearing source commit in
the inspected PR history has matching authenticated original push actors.
The previous all-commit receipt requirement would permanently reject this
verifiable noncontributing planning commit even after authentic final assurance.

The correction admits a receiptless commit only after the GitHub API supplies
its exact immutable SHA, zero diff stats, an empty files array, exactly one valid
parent, a valid tree SHA, and that exact parent's identical tree. It does not
infer emptiness or authorship from a commit message, author/committer fields or
rerun actor. Missing/inconsistent metadata, changed trees, nonempty source,
multiple parents, mismatched identities and invalid original push actors fail
closed. Existing independence, issuer, exact-head/record hash and status controls
remain unchanged. This is a source correction, not a claim of live enforcement.

Validation on the local changed source: node adversarial suite 40/40 PASS,
zero failures/skips/todo; original real-temporary-repository checker suite
25/25 PASS. The positive fixture includes both an empty planning commit and a
normal source commit with authenticated receipt. Negative controls reject nine
false/incomplete empty-commit representations. Current-head CI is checked only
after publication; it is not predicted here.

The actual Foreman QP report published at 6bbcadb remains unchanged and binds
only the previous f3907321 provenance correction. It is not reused as acceptance
of this additional delta or whole-PR readiness. Its file is reconciled in the
same thirteen-path manifest/scope. Required ECAP, final independent IAA, actual
administrator configuration, installed-source checks and human merge remain
pending. Historical producer proofs/evidence and all counters are retained.

GitHub source facts:
https://api.github.com/repos/APGI-cmy/maturion-foreman-governance/commits/10184fb6e5f6662d1cb033547353c06fd0e033b7
https://api.github.com/repos/APGI-cmy/maturion-foreman-governance/commits/68f3f0525060ec7115414af16b0931e54fae1344
https://api.github.com/repos/APGI-cmy/maturion-foreman-governance/actions/runs?event=push&head_sha=10184fb6e5f6662d1cb033547353c06fd0e033b7&per_page=100

### Changed-source Git-byte SHA256

- .github/scripts/trusted-iaa-assurance.js: 50158e7ab89d6b7108554c3baa59cf1680803b97e3e2b0da825a5dfa6e04abeb
- .github/scripts/tests/test-trusted-iaa-assurance.js: f4b4278b983ec5b95e6205696aabff8279bfc5f6532e766c84eb1c0428cd44b3


## Batched-push provenance correction - 2026-10-13

Actual independent Foreman comment 6144985025 accepted d231e9d only for the
receiptless verified empty planning commit and identified the separate batched
push limitation. Those bounded results and earlier immutable QP/proofs remain
history; none is reused as acceptance of this new delta.

Source commit d320bcc585e872035974c3b078e65863519d3eda corrects that concrete
limitation. Exact-SHA original Actions push receipts remain the primary source.
For a nonempty commit without one, the evaluator reads GitHub's documented
repository push activity for the exact source repository/branch and verifies
the authenticated pusher plus the immutable before...after introduced-commit
range. It does not infer identity from Git authorship, commit messages, PR text,
or a rerun actor. The verified empty-commit rule remains unchanged.

Only normal push activities with valid immutable identities and pusher IDs/logins
qualify. The bounded complete cursor query may not switch host/repository/ref,
filter by actor/time, repeat cursors/entries, or truncate history. Comparison
pagination verifies its exact base/merge-base, ahead/behind state, constant
total, unique complete SHA list and final tip. The submitted commit must occur
in that introduced range. API permission/rate denial, malformed/missing activity,
unsupported first/force-push ranges and incomplete comparisons fail closed;
there is no alternate credential or metadata fallback.

Local validation passed original 25/25 plus trusted 49/49, zero failures/skips/todo.
The new controls cover actual batch semantics, independent-issuer implementation
contributions, absent membership, wrong/force/unauthenticated activity, divergent
or incomplete ranges, paginated comparisons/cursors, query substitution,
duplicate/truncated/excess history and API denial. These API fixtures are tests,
not a claim of provider integration or independent assurance.

The changed normal PR CI now includes one read-only integration step for the
real submission history. It uses contents/pull-request/actions read and the
ordinary job token only; there is no protected status writer/secret. It verifies
authenticated actors for actual commits and rechecks the source head. The source
and its truthful evidence are published together as one bounded two-commit push,
so this CI can actually exercise a non-tip content commit lacking its own
exact-SHA push receipt. The source commit is not separately pushed or reviewed
before the coupled evidence. Real GitHub results are reported after publication,
never predicted in this record.

The GitHub connector does not expose /activity (client endpoint coverage);
no provider denial was established from that unsupported connector call.
This implementation uses the documented Contents:read API in the already
authorized read-only CI path. If that real execution denies access, ownership
remains STOP_AND_FIX and the exact restriction is reported without bypass.

Official API definitions:
https://docs.github.com/en/rest/repos/repos#list-repository-activities
https://docs.github.com/en/rest/commits/commits#compare-two-commits

No trusted gate installation, App/IAA identity configuration, accepted ECAP,
independent final IAA/token, human merge, activation, generic dispatch or W1/W2
completion is claimed. The actual 13-path scope/manifest remains unchanged.

### Batched correction source Git-byte SHA256

- .github/scripts/trusted-iaa-assurance.js: 11ac5be529203a76fe5ac6eafaf3a7c57f32e88022368ef1d3dabb0867959552
- .github/scripts/tests/test-trusted-iaa-assurance.js: 246c3fa8d722720c478059a6c4db482f8131b99985be72e3e708d2a9c4416951
- .github/workflows/merge-gate-interface.yml: fb3c2c0f4f325be1a64e266bebb03ff06e3c7531c3378c4d037e427ae4121b96


## Actual provider integration finding and schema correction - 2026-10-13

The first real integration at head1987bb66, run38398184798/job115298695732,
executed original25/25 and trusted49/49 but failed the live activity validation.
No provider-integration PASS or final assurance was claimed. Bounded diagnostic
source corrections e8296afe and299f287d retained failed validation while exposing
the public source metadata; they did not change a role, credential or gate.

The actual GitHub response at API version2026-03-10 differs from the documentation
example: run38398771323/job115300679328 reports activity46344132654 with
activity_type:push, actor.login:APGI-cmy, actor.id:253484265, the exact source
ref, before:e8296afe67d30542350106b166b73ffd2618d8d4 and
after:299f287d5d758c1d792c2919dc948fa5e22157cb. There is no push_type/pusher field.
The request succeeded; this is an observed schema incompatibility, not a
permission denial. No alternate credential or provider-access workaround occurred.

The adapter now requires that actual authenticated actor/activity_type shape
and retains all query, range, completeness, immutable identity and independence
checks. Fixtures now model the observed provider shape and reject the obsolete
pusher/push_type representation, force pushes and invalid actors. Local49/49
passes. This new source's actual live CI remains to be checked after publication.
The earlier failure chronology and source owner STOP_AND_FIX are preserved.
No ECAP acceptance, token, live trusted status, merge or W1/W2 completion follows
from this correction.

Changed source Git-byte SHA256:
- .github/scripts/trusted-iaa-assurance.js: 82c4c04668b2a144ea3022e21193321a096ae95086e4b834de42b975d0c85998
- .github/scripts/tests/test-trusted-iaa-assurance.js: df6c3ec93c452bfa667130bf82a3dc9bc11479913426bfad2dd2aed9ddc3999c
