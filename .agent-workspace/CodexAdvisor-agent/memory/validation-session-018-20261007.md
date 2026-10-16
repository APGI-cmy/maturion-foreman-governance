# Immutable contract-authoring validation — Session 018

**Date:** 2026-10-07
**Author:** CodexAdvisor-agent, overseer; sole authorized contract author
**Issue / PR:** #1414 / #1415
**Task:** TASK-cs2-controller-builder-20261007-001
**Wave:** cs2-controller-builder-20261007
**State:** Bounded field repair verified; broader validation BLOCKED; Foreman QP PENDING.

Once committed, this artifact is read-only. Corrections require a new artifact.
This is submitter evidence, not an independent verdict, accepted QA, activation,
prerequisite disposition, final-source assurance or consumer layer-down.

## Authority, design and source binding

CS2's explicit remediation instruction authorizes CodexAdvisor to correct the
PRE-BRIEF session-046 field finding, synchronize the atomic proposed integrity
reference, and supply new task-specific validation evidence. Issue #1414 is the
bounded design reference: the exact five controller patterns, Foreman appointment,
accepted RED, fail-closed operation, focused regressions and independent review.
The existing contract and five Tier 2 files implement that inactive design.
No controller implementation architecture, runtime appointment or new task is
invented by this repair.

Inputs reviewed:

- `.agent-admin/assurance/iaa-wave-record-cs2-controller-builder-20261007-20261007.md`,
  PRE-BRIEF session-046, PB-01–PB-17, especially PB-07/PB-09/PB-11.
- `.agent-workspace/independent-assurance-agent/escalation-inbox/prebrief-follow-up-1415-20261007.md`.
- `.agent-admin/quality-professor/qp-verdict-1415-20261007-060336.md`.
- `.agent-admin/waves/wave-cs2-controller-builder-20261007-current-tasks.md`.
- Immutable session-017 PREHANDOVER and session memory.

**Input commit:** `730a3081046537fa76c7df7594928df7b3b7392c`.
**Branch:** `copilot/establish-canonical-automation-control-builder`.
**Validation source:** input commit plus the exact three-file repair below;
the commit containing this artifact binds those bytes. No remote PR-head
synchronization or final-review source certification is asserted.

| Artifact | Before | After |
|---|---|---|
| Contract characters / UTF-8 bytes | 20,468 / 20,506 | 20,476 / 20,514 |
| Contract and reference SHA256 | `fc8f0c68bfd176b6bee1ae67cc400397e991a7576a5b1e17924c966ac549d128` | `21313df4f45725b6f65467f89c68072a20f7c3970c516e65d817870805e255ac` |
| Agent / contract / metadata versions | 6.2.0 / 1.0.0 / 1.0.0 | Unchanged; unpublished inactive draft repair |
| Proposed integrity state | INACTIVE_UNASSURED | Unchanged; not an approved active baseline |

Design decision: replace only root `execution_identity.secret` with
`execution_identity.secret_env_var`, preserving `MATURION_BOT_TOKEN` as the
environment-variable **name**, never its value. The governance declaration
already uses the safe field. Deleting the reference would lose policy meaning;
retaining the prohibited spelling would fail CORE-022/A-024. No workaround,
scope expansion, policy weakening or contract body edit is needed.

The same one-line correction is in the reference copy. Only the proposed
cs2-controller row's hash/author note changes in INTEGRITY_INDEX; all four
existing baseline rows are preserved.

## Acceptance and applicability — do not substitute author checks for QP

**Accepted task-specific QA-to-RED reference:** NOT SUPPLIED. The existing
Foreman QP/checklist record says it is absent; neither PRE-BRIEF nor this user
instruction constitutes Foreman's acceptance of a failing validation run.
**Explicit CS2 applicability substitution accepted by Foreman:** NOT SUPPLIED.
**Independent Foreman QP result:** PENDING; the checklist is not changed/ticked.

The RED below is an actual author-observed baseline failure recorded before the
repair. Its corresponding GREEN verifies this field correction only. Foreman
must decide whether to accept this non-runtime authoring validation, obtain a
proper applicability disposition, or require additional evidence. It is not
retroactively called accepted RED, and the broader run is not 100% GREEN.

No runtime tests are authored or run: CodexAdvisor's boundary prohibits product
implementation/tests/CI work. Contract clauses require future accepted controller
unit and mocked workflow regressions; verifying those clauses is not executing
the unbuilt controller. Runtime lint/type-check/build/workflow tests are NOT RUN
for this Markdown-only repair, not certified non-applicable on Foreman's behalf.

## Clause-to-evidence mapping

Line numbers refer to the corrected contract; the rename does not shift lines.

| PRE-BRIEF / authoring requirement | Contract clauses | Actual evidence and limitation |
|---|---|---|
| PB-01 authority and separation | identity 49–62; own_contract 182–187; §§1.1, 2.1, 2.4 | C02 proves all other contract bytes unchanged; C09/C11 verify the authority/lock/independent route. CS2 instruction authorizes only this authoring repair. |
| PB-02 exact five-pattern authority | scope 113–132; EXACT-SCOPE/NO-GENERAL-GITHUB; §2.4 | C05 exact equality of both YAML grants. C06: five allowed/eight denied declared-path fixtures; mandatory traversal, escaping-symlink and indirect-write denial clauses checked. This is a static contract validator, not executable controller enforcement or an actual symlink/tool-output runtime test. |
| PB-03 appointment/design/RED before implementation | capabilities 134–142; supervision 153–163; §§2.1, 2.3 | C07 verifies frozen architecture/source binding, explicit appointment and accepted reproducible RED obligations, including rejection of GREEN-only evidence. No appointment or accepted authoring RED is fabricated. |
| PB-04 fail-closed envelope | §3.1, lines 379–390; §3.2 | C08 verifies mandatory missing, invalid, stale, contradictory, unavailable, error/ambiguity/dependency-denial and no-side-effect/no-allow/reset/resume clauses. C02 and unchanged build method establish preservation, not runtime behavior. |
| PB-05 reserved operations | release 146–151; prohibitions 216–256; §§2.4, 3.1, 4.3 | C09, C02 and unchanged Tier 2: activation, live dispatch, merge/main push, deployment, successor release, automatic reset, spend telemetry and protected CANON self-amendment remain prohibited. |
| PB-06 regression ownership and independent route | §§2.3, 2.4, 3.2, 4.1–4.3; iaa_oversight | C10/C11 verify accepted RED-to-100%-GREEN, focused unit/mocked workflow regressions, denial/error/no-live-side-effect coverage, zero skipped/disabled/weakened assertions, applicable static gates, Foreman acceptance of exceptions, QP/pre-brief/IAA ownership and immutable token/proof rules. These remain future appointed-builder obligations. |
| PB-07 safe field / structure | execution_identity 165–169 and governance 42–47; all four phases | Baseline RED → corrected GREEN command below; C01–C04; strict yamllint 2/2, exit 0. No prohibited field anywhere in target; both safe references agree. |
| PB-08 knowledge/evidence containment | tier2_knowledge 258–264; capabilities.evidence; §§1.2, 1.4, 3.3 | C12 verifies all five substantive, versioned/indexed files, unchanged bytes, inactive/unregistered states and controller evidence root. Target Tier 2 is not edited. |
| PB-09 atomic proposed integrity / prior baselines | proposed reference/index; metadata.status | C13 PASS: corrected live/reference bytes and proposed hash agree. C14 FAIL: pre-existing CodexAdvisor reference mismatch. Supplemental preservation confirms no induced drift and all existing index rows unchanged. |
| PB-10 canonical governance | §§1.3, 2.2 | Current CANON-HASH-001: all 217 PASS, exit 0; nine required canon hashes verified at preflight. Local success does NOT dispose #1380/#1379. |
| PB-11 task-specific QP inputs | §§2.3, 3.2–3.3, 4.1 | This design/mapping plus raw commands/results is new reproducible input. Acceptance is absent, broader validation has a failure, and independent QP remains PENDING. |
| PB-12–PB-17 remaining handover/finality | §§2.2, 3.3, 4.1–4.3 | Existing checklist, pre-brief, QP, IAA artifacts and proofs preserved. No final admission, all-ticked status, resubmission, full parity/OPOJD, assurance, active registration, prerequisite disposition or propagation claimed. |

## V1 — actual RED-to-GREEN field validation

The following identical command ran before and after the patch. At both runs HEAD
was the input commit; the SHA256 identifies the actual working-tree contract.

```bash
python - <<'PY'
from pathlib import Path
import subprocess,hashlib,yaml,re
head=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
p=Path('.github/agents/cs2-controller-agent.md'); b=p.read_bytes(); t=b.decode(); d=yaml.safe_load(t.split('---',2)[1])
print('Source:',head)
print('Contract:',p,'characters:',len(t),'bytes:',len(b),'sha256:',hashlib.sha256(b).hexdigest())
print('CORE-022/PB-07 occurrences:',len(re.findall(r'\bsecret\s*:',t)))
assert 'secret' not in d['execution_identity'], 'RED: prohibited execution_identity.secret; require secret_env_var'
assert d['execution_identity']['secret_env_var']==d['governance']['execution_identity']['secret_env_var']=='MATURION_BOT_TOKEN'
assert not re.search(r'\bsecret\s*:',t)
print('PASS: both environment-variable references agree; no prohibited field')
PY
```

Before patch, **exit 1**:

```text
Source: 730a3081046537fa76c7df7594928df7b3b7392c
Contract: .github/agents/cs2-controller-agent.md characters: 20468 bytes: 20506 sha256: fc8f0c68bfd176b6bee1ae67cc400397e991a7576a5b1e17924c966ac549d128
CORE-022/PB-07 occurrences: 1
Traceback (most recent call last):
  File "<stdin>", line 8, in <module>
AssertionError: RED: prohibited execution_identity.secret; require secret_env_var
```

After patch, **exit 0**:

```text
Source: 730a3081046537fa76c7df7594928df7b3b7392c
Contract: .github/agents/cs2-controller-agent.md characters: 20476 bytes: 20514 sha256: 21313df4f45725b6f65467f89c68072a20f7c3970c516e65d817870805e255ac
CORE-022/PB-07 occurrences: 0
PASS: both environment-variable references agree; no prohibited field
```

## V2 — reproducible structural / focused preservation validation

This exact inline validation ran after the atomic reference/index patch. It
is evidence-only validation, not a new production test/tool file. The run has
**13 passing groups, then a failure in the four-baseline consistency group,
exit 1**. No group is skipped or weakened to make the result GREEN.

```bash
python - <<'PY'
from pathlib import Path,PurePosixPath
import subprocess,hashlib,re,yaml
BASE='730a3081046537fa76c7df7594928df7b3b7392c'
p=Path('.github/agents/cs2-controller-agent.md'); t=p.read_text(); b=p.read_bytes()
old=subprocess.check_output(['git','show',BASE+':'+str(p)]).decode()
class Unique(yaml.SafeLoader): pass
def unique(loader,node,deep=False):
 result={}
 for k,v in node.value:
  key=loader.construct_object(k,deep=deep)
  if key in result: raise ValueError('duplicate YAML key: '+str(key))
  result[key]=loader.construct_object(v,deep=deep)
 return result
Unique.add_constructor(yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG,unique)
d=yaml.load(t.split('---',2)[1],Loader=Unique)
checks=[]
def check(label,condition):
 assert condition,label
 checks.append(label); print('PASS',label)
check('C01 credential field',not re.search(r'\bsecret\s*:',t) and d['execution_identity']['secret_env_var']==d['governance']['execution_identity']['secret_env_var']=='MATURION_BOT_TOKEN')
check('C02 entire remaining contract unchanged',old.count('  secret: MATURION_BOT_TOKEN\n')==1 and t==old.replace('  secret: MATURION_BOT_TOKEN\n','  secret_env_var: MATURION_BOT_TOKEN\n'))
required='name id description agent governance identity iaa_oversight merge_gate_interface scope capabilities can_invoke cannot_invoke own_contract escalation prohibitions tier2_knowledge metadata'.split()
check('C03 strict YAML and required structure',all(d.get(k) for k in required) and d['name']==d['id']==d['agent']['id']==p.stem and d['agent']['class']=='builder' and d['agent']['contract_pattern']=='four_phase_canonical' and d['agent']['version']=='6.2.0' and d['agent']['contract_version']==d['metadata']['contract_version']=='1.0.0' and len(d['metadata'])<=10)
body=t.split('---',2)[2]; phases=re.findall(r'^## PHASE ([1-4]) —',body,re.M)
check('C04 four phases, evidence, size and no placeholders',phases==['1','2','3','4'] and len(re.findall(r'^### [1-4]\.\d',body,re.M))==14 and len(re.findall(r'^> Output:',body,re.M))==14 and len(re.findall(r'^> ⛔',body,re.M))==14 and len(t)<25000 and not re.search(r'\bTODO\b|\bTBD\b|<<<<<<<|>>>>>>>|<placeholder>',t) and not re.search(r'\bv?\d+\.\d+\.\d+\b',body))
allowed=['.github/scripts/pit-cs2-controller.js','.github/scripts/pit-cs2-controller.test.js','.github/scripts/pit-cs2-controller-workflow.test.js','.github/workflows/pit-cs2-controller.yml','.github/cs2-controller/**']
check('C05 exact bounded YAML authority',d['scope']['write_paths']==d['scope']['write_access']==allowed and d['scope']['protected_paths']==['.github/agents/**','governance/**','.agent-workspace/**','.agent-admin/**'] and d['scope']['enforcement']=='exact_allowlist_no_workspace_or_evidence_exception')
def admitted(s):
 parts=PurePosixPath(s).parts
 return not s.startswith('/') and '..' not in parts and (s in allowed[:4] or s.startswith('.github/cs2-controller/') and len(parts)>2)
positive=allowed[:4]+['.github/cs2-controller/evidence/cs2-controller-agent/memory/session-001.md']
negative=['.github/scripts/other.js','.github/workflows/other.yml','.github/agents/cs2-controller-agent.md','governance/CANON_INVENTORY.json','.agent-admin/log.md','.agent-workspace/cs2-controller-agent/log.md','.github/cs2-controller/../../agents/other.md','/tmp/log.md']
check('C06 declared-path fixtures 5 allowed / 8 denied',all(admitted(s) for s in positive) and not any(admitted(s) for s in negative) and all(s in body for s in ['Reject path traversal','symlinks escaping that boundary','indirect tool writes']))
check('C07 Foreman appointment, architecture, accepted RED',d['capabilities']['implementation']['requires']=='explicit_Foreman_appointment_and_accepted_QA_to_RED' and d['supervision']['appointment_required'] and all(s in body for s in ['frozen architecture','branch/source head','Require Foreman\'s explicit acceptance of reproducible failing tests','Missing evidence or GREEN-only claims are not accepted RED','Any new regression must be demonstrated RED and accepted before its fix']))
check('C08 fail-closed states and absence of side effects',d['capabilities']['implementation']['failure_policy']=='fail_closed' and all(s in body for s in ['missing,','invalid, stale, contradictory or unavailable authorization/evidence','reject the\naction without side effects','Errors, ambiguity or unavailable dependencies','not fall back to allow, dispatch, reset or resume']))
check('C09 reserved operations and self-modification lock',all(v=='PROHIBITED' for v in d['capabilities']['release'].values()) and d['identity']['self_modification']=='PROHIBITED' and d['identity']['lock_id']=='SELF-MOD-001' and d['identity']['authority']=='FOREMAN_APPOINTMENT_UNDER_CS2' and d['own_contract']['write']==d['own_contract']['review_or_assure']=='PROHIBITED' and all(s in t for s in ['No automatic reset, spend telemetry','No protected CANON self-amendment','No general .github/workflows/** or .github/scripts/** authority','My name confers no CS2 authority']))
check('C10 focused regression / zero-debt obligations',d['capabilities']['implementation']['zero_test_debt'] and d['capabilities']['implementation']['regression_scope']=='focused_unit_and_mocked_workflow_integration' and all(s in body for s in ['denied/malformed/missing authority','100% GREEN with zero skipped/disabled tests','no weakened assertions','zero warnings/errors','Foreman-accepted reason','Do not claim runtime tests exist']))
check('C11 independent route / immutable token and proof',d['iaa_oversight']['required'] and d['iaa_oversight']['invoker']=='Foreman_or_CS2_only' and d['iaa_oversight']['artifact_immutability']['token_file_pattern']=='.agent-admin/assurance/iaa-token-session-NNN-waveY-YYYYMMDD.md' and all(s in body for s in ['Once committed, PREHANDOVER is read-only','Foreman or CS2, not this builder, invokes','The builder never writes a token','No final independent IAA PASS and committed dedicated token','Any required PR stays draft']))
k=Path('.agent-workspace/cs2-controller-agent/knowledge'); files=sorted(k.glob('*.md')); index=(k/'index.md').read_text()
check('C12 substantive versioned indexed Tier 2 unchanged',len(files)==5 and all((k/n).is_file() and n in index for n in d['tier2_knowledge']['required_files']) and all('1.0.0' in q.read_text() and '2026-10-07' in q.read_text() and q.stat().st_size>500 and q.read_bytes()==subprocess.check_output(['git','show',BASE+':'+str(q)]) for q in files) and d['capabilities']['evidence']['repository_write_root']=='.github/cs2-controller/evidence/cs2-controller-agent/' and 'NOT_REGISTERED' in (k/'specialist-registry.md').read_text() and 'INACTIVE_UNASSURED' in index)
ref=Path('governance/quality/agent-integrity/cs2-controller-agent.md'); ix=Path('governance/quality/agent-integrity/INTEGRITY_INDEX.md').read_text(); h=hashlib.sha256(b).hexdigest()
check('C13 atomic proposed integrity',b==ref.read_bytes() and h in ix and 'not an approved active baseline' in ix and d['metadata']['status']=='INACTIVE_UNASSURED')
for n in ['CodexAdvisor-agent.md','foreman-v2.agent.md','governance-repo-administrator-v2.agent.md','independent-assurance-agent.md']:
 q=Path('.github/agents')/n; copy=Path('governance/quality/agent-integrity')/n
 assert q.read_bytes()==subprocess.check_output(['git','show',BASE+':'+str(q)])==copy.read_bytes(),n
 assert hashlib.sha256(q.read_bytes()).hexdigest() in ix,n
check('C14 other contracts and approved baselines preserved',True)
print('RESULT:',len(checks),'validation groups passed; 0 failures; 0 skipped; 0 weakened assertions; no runtime tests or independent acceptance asserted')
print('SHA256:',h,'characters:',len(t),'bytes:',len(b))
PY
```

Actual output (the final success-print lines above are unreachable):

```text
PASS C01 credential field
PASS C02 entire remaining contract unchanged
PASS C03 strict YAML and required structure
PASS C04 four phases, evidence, size and no placeholders
PASS C05 exact bounded YAML authority
PASS C06 declared-path fixtures 5 allowed / 8 denied
PASS C07 Foreman appointment, architecture, accepted RED
PASS C08 fail-closed states and absence of side effects
PASS C09 reserved operations and self-modification lock
PASS C10 focused regression / zero-debt obligations
PASS C11 independent route / immutable token and proof
PASS C12 substantive versioned indexed Tier 2 unchanged
PASS C13 atomic proposed integrity
Traceback (most recent call last):
  File "<stdin>", line 45, in <module>
AssertionError: CodexAdvisor-agent.md
```

### C14 diagnostic / escalation

Read-only diagnosis confirmed this mismatch already exists at the input commit:

| Existing agent | Live SHA256 | Reference SHA256 | Indexed SHA256 | Result |
|---|---|---|---|---|
| CodexAdvisor-agent | `bcc12cb03e1a67d8bf0d14a9dca53042d7a07e285d3b929d350454c02fa1ae6f` | `628850b3cafa24041564c660958f9da288c73c5b4677c5d4d4c692a375ff7aa6` | `bcc12cb03e1a67d8bf0d14a9dca53042d7a07e285d3b929d350454c02fa1ae6f` | FAIL, pre-existing |
| foreman-v2.agent | `675b63482e2bdc44eca10bf13cdb3e5d739d6bbad7acd4b17531c452461934ae` | Same | Same | PASS |
| governance-repo-administrator-v2.agent | `55b87adf5794ceba832051caa3113fb01de0ea6ad8e21f8e4d12368ee585b961` | Same | Same | PASS |
| independent-assurance-agent | `ed4b301bcdcafc015bd2e61be25920ed7e4eb64d516cadd537e29337bb710642` | Same | Same | PASS |

Supplemental preservation output:

```text
PASS preservation: CodexAdvisor-agent.md live / copy / index row unchanged
FAIL baseline consistency: CodexAdvisor-agent.md (pre-existing, no repair authorized)
PASS preservation: foreman-v2.agent.md live / copy / index row unchanged
PASS baseline consistency: foreman-v2.agent.md
PASS preservation: governance-repo-administrator-v2.agent.md live / copy / index row unchanged
PASS baseline consistency: governance-repo-administrator-v2.agent.md
PASS preservation: independent-assurance-agent.md live / copy / index row unchanged
PASS baseline consistency: independent-assurance-agent.md
PASS all 421 existing admin/IAA/Foreman/target-knowledge/author-memory artifacts unchanged
RESULT: four agent preservation checks PASS; approved-baseline consistency 3 PASS / 1 FAIL; final handover BLOCKED
```

The supplemental Python intentionally exits 1; the initial enclosing shell also
ran `git diff --check`, whose exit 0 became the shell aggregate. That aggregate
does not turn Python's failed integrity check into PASS. V2 independently exits 1.
The existing artifacts are compared byte-for-byte against `git show INPUT:path`,
not assumed intact from a selective diff. No CodexAdvisor self-contract/reference
repair or other agent-contract edit is authorized or performed. Escalate this
existing mismatch to CS2/authorized integrity stewardship; PB-09/full handover
remain blocked.

## V3 — required structural and governance checks

```bash
bash .github/scripts/validate-yaml-frontmatter.sh .github/agents/cs2-controller-agent.md governance/quality/agent-integrity/cs2-controller-agent.md
bash .github/scripts/validate-canon-hashes.sh
git diff --check
```

Actual YAML output:

```text
Validating: .github/agents/cs2-controller-agent.md
  PASS
Validating: governance/quality/agent-integrity/cs2-controller-agent.md
  PASS
Files validated: 2
Files skipped: 0
Files failed: 0
ALL PASS: Exit code 0
BL-028 Compliant: No warnings, no errors.
```

Actual canonical output, **exit 0**, complete history:

```text
[CANON-HASH-001] Validating file_hash integrity in governance/CANON_INVENTORY.json...
[CANON-HASH-001] PASSED — all 217 entries have valid hashes, current bytes, versions, and path-specific canonical commit provenance
```

Whitespace check produced no output, **exit 0**. These results do not prove
independent prerequisite disposition or controller runtime behavior.

## V4 — author QP interrupt and local parity limitations

| Author-contract gate | Result / basis |
|---|---|
| S1 valid YAML | PASS, strict validator and duplicate-rejecting parse |
| S2 four phases | PASS, C04: 14 steps/output blocks/advance guards |
| S3 character limit | PASS, 20,476 < 25,000 warning and 30,000 hard limit |
| S4 no placeholders | PASS, C04 and full read |
| S5 no embedded Tier 2 bulk | PASS, full read; procedures remain in unchanged Tier 2 |
| S6 required top-level sections | PASS, C03; coherent versions, 8 metadata entries |
| S7 immutable handover rules | PASS, C11 and §4.1 |
| S8 dedicated IAA token pattern | PASS, C11 |
| S9 authority and self-modification | PASS, C09; human CS2 authority not granted to builder |
| S10 no merge-ready without final IAA | PASS, C11 and §§4.2–4.3 |
| S11 no operative own-file write path | PASS, C05/C09/C11 |

**Author structural interrupt:** 11/11 PASS, not independent Foreman QP.
**Overall evaluation readiness:** BLOCKED/PENDING, not a blanket checklist PASS:
accepted authoring RED/applicability is absent and C14 fails.

Local commands actually run:

```bash
bash .github/scripts/validate-gates-locally.sh
python - <<'PY'
from pathlib import Path
import os,subprocess,yaml
p=Path('.github/workflows/governance-ceremony-gate.yml')
w=yaml.safe_load(p.read_text())
for job,step in [('draft-check','Check PR draft state'),('verdict','Verify governance ceremony evidence')]:
 s=next(s for s in w['jobs'][job]['steps'] if s.get('name')==step)
 print('COMMAND: exact workflow run block:',p,job,flush=True)
 e=dict(os.environ,IS_DRAFT='true',PR_NUMBER='1415')
 r=subprocess.run(['bash','-e','-c',s['run']],env=e)
 print('EXIT:',r.returncode,flush=True)
 if r.returncode: raise SystemExit(r.returncode)
print('LIMIT: draft input is explicit local simulation; pre-existing proof presence is not task-specific final parity or IAA.')
PY
```

| Required check | Actual local result | Limitation |
|---|---|---|
| Merge Gate Interface / merge-gate/verdict | Script exit 0; governance classification and pre-existing proof present | Not task-specific final evidence admission |
| Merge Gate Interface / governance/alignment | Script exit 0; existing sync_state governance_version 1.0.0 parsed | Does not resolve the recorded reference mismatch or prerequisites |
| Merge Gate Interface / stop-and-fix/enforcement | Script exit 0; no scanned markers/halt files | Does not supersede this failed validation |
| Governance Ceremony Gate / governance-ceremony/draft-check | Exact workflow block exit 0 with explicit local IS_DRAFT=true | Local simulation only, no remote state/CI claim |
| Governance Ceremony Gate / governance-ceremony/verdict | Exact workflow block exit 0 | Selected old `.agent-admin/prehandover/prehandover_proof_iaa_upgrades_20260321.md`; presence is not this task's handover/IAA |

Output excerpts:

```text
PR classified as: governance
All required evidence artifacts present
Governance version: 1.0.0
Governance alignment validated
No stop-and-fix conditions detected
merge-gate/verdict: WILL PASS
governance/alignment: WILL PASS
stop-and-fix/enforcement: WILL PASS
Draft state: true
governance-ceremony/draft-check: PASS
EXIT: 0
Found PR-specific prehandover proof: .agent-admin/prehandover/prehandover_proof_iaa_upgrades_20260321.md
No ## or ### Governance block detected — proof accepted without governance block
governance-ceremony/verdict: PASS
EXIT: 0
```

**Local five-check execution:** exit 0 for each block/script.
**Task-specific final merge-gate parity:** NOT COMPLETE. No `Merge gate parity:
PASS` final-handover assertion, CI execution claim or OPOJD PASS is made.
No POLC/runtime/other tests are run to manufacture missing final proof.

Required supplementary parallel validation was attempted. The wrapper reported
success, but its review backend was unavailable:
`model claude-sonnet-4.6 not found in registry` / configured
`capi-prod-claude-sonnet-4.6`. Therefore automated review is **UNAVAILABLE**, not a
completed PASS. CodeQL skipped the Markdown-only changes as trivial.

## V5 — replay, exact scope and precommit safety

The two validation Python blocks above were extracted from this artifact and
replayed without changing any assertions: V1 actual exit 0; V2 actual exit 1.
This confirms the committed evidence is reproducible, not a GREEN-only summary.

The union of `git diff --name-only INPUT` and
`git ls-files --others --exclude-standard` is exactly:

```text
.agent-workspace/CodexAdvisor-agent/memory/PREHANDOVER-session-018-20261007.md
.agent-workspace/CodexAdvisor-agent/memory/session-018-20261007.md
.agent-workspace/CodexAdvisor-agent/memory/validation-session-018-20261007.md
.agent-workspace/CodexAdvisor-agent/parking-station/suggestions-log.md
.github/agents/cs2-controller-agent.md
governance/quality/agent-integrity/INTEGRITY_INDEX.md
governance/quality/agent-integrity/cs2-controller-agent.md
```

Actual scope/preservation output, exit 0:

```text
PASS: exact seven-path authoring delta; no unauthorized files
PASS: every other input-tracked file byte-identical
Whitespace exit: 0
```

Every other input-tracked file was compared against `git show INPUT:path`,
including other contracts, existing proofs, PRE-BRIEF, Foreman checklist and all
IAA artifacts. No existing artifact is overwritten as a correction.
The required secret-scanning tool scanned all seven paths and returned
`No secrets detected in the scanned files. Safe to proceed with commit.`
This is commit safety, not assurance or permission to release.

The first staged whitespace check exposed 19 Markdown hard-break/trailing-space
lines in the three new evidence/memory files; the earlier unstaged check did not
include then-untracked files. Those spaces were removed before initial commit.
The staged whitespace check is rerun on the complete seven-file bundle; this
formatting correction does not affect contract clauses or V1/V2 outcomes.

## Foreman handback

The specific PB-07 field defect is corrected, with matching atomic proposed
reference/hash. Author-observed RED-to-GREEN, safeguard-clause checks, raw failure,
design reference and immutable mapping are now supplied.

Foreman should keep QP **PENDING**, not tick the task based on this evidence:
accepted task-specific RED/applicability remains absent; the full validation is
not 100% GREEN due to the existing CodexAdvisor reference mismatch. Obtain
authorized disposition without author self-modification, then conduct independent
QP on newly bound evidence. Final checklist admission, prerequisite disposition,
full parity/OPOJD, fresh independent final-source IAA and governed layer-down
remain separate, unperformed holds. No assurance token is issued or anticipated
as an actual result; CS2 alone retains merge authority.
