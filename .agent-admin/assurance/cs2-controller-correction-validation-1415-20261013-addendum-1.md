# Correction Validation Addendum 1 — PR #1415

**Date:** 2026-10-13  
**Issue / PR:** #1414 / #1415  
**Task:** `TASK-cs2-controller-builder-20261007-001`  
**Corrected source:** `7813a5bd88417a3f2f45b4b750f4c8908670ed94`  
**Addendum to:** `.agent-admin/assurance/cs2-controller-correction-validation-1415-20261013.md`

## Purpose and preservation

This append-only producer-evidence addendum supplies the source-comparison
harness, per-category output and exits missing from the original 4/4 summary.
The original evidence, historical Foreman QP/PREHANDOVER, PRE-BRIEF, IAA records,
and controller source are unchanged. This does not create or modify a PRE-BRIEF,
task-level QP, IAA/ECAP result, or release decision.

The earlier CodexAdvisor validation-session-018 RED/GREEN is for the unrelated
`secret_env_var` PB-07 field correction
(`validation-session-018-20261007.md:97–136`). Foreman expressly determined it
is not PB-11 evidence for these four categories. The original 2026-10-13 4/4
summary identified the category omission as its RED basis but did not contain a
recorded four-category RED execution.

## Foreman acceptance and scope

In a direct Foreman-v2 review in this session, Foreman accepted an inline
source-comparison as the applicable PB-11 authoring-conformance method, subject
to recording the actual baseline and corrected runs below. The method checks
the contract's explicit category declaration and the corresponding build-method
requirements. Foreman separately accepted the completed output below as
PB-11 authoring-level RED-to-GREEN evidence.

This acceptance is limited to static source conformance for this
contract-authoring task. No controller runtime or mocked-controller test was
executed. It is not a new task-level QP, PB-06 runtime regression completion,
zero-test-debt runtime finding, PRE-BRIEF amendment, IAA/ECAP outcome, or merge
approval.

The comparison is bound to these immutable sources and exact bytes:

| State | Commit | File | SHA-256 |
|---|---|---|---|
| Pre-correction | `86b294d7e44a25757289c8d55c96274319db3c2a` | `.github/agents/cs2-controller-agent.md` | `600b29f9ce7546bd882d8c10cbe400d255ef0df8c5edd84dd1c9cb9f42fac8e7` |
| Pre-correction | same | `.agent-workspace/cs2-controller-agent/knowledge/controller-build-method.md` | `1ce0c3a8e97558116b05417322c706017fc28a9b461c2d5189b932ab4a5d9c51` |
| Corrected | `7813a5bd88417a3f2f45b4b750f4c8908670ed94` | `.github/agents/cs2-controller-agent.md` | `44a00539e7161ac1357a1032266cda900c0c400f591415c008a4497ba7fab309` |
| Corrected | same | `.agent-workspace/cs2-controller-agent/knowledge/controller-build-method.md` | `56545cf311b3f646359f92deeccf5e38908e8f356ba88fb7049c6b55720e67af` |

## Exact command and harness

Foreman ran the following inline-only command; no test, script, fixture, or
other tool was added to the repository:

```bash
python3 - <<'PY'
import hashlib, re, subprocess, sys
revs=[('PRE','86b294d7e44a25757289c8d55c96274319db3c2a'),('POST','7813a5bd88417a3f2f45b4b750f4c8908670ed94')]
paths={'contract':'.github/agents/cs2-controller-agent.md','method':'.agent-workspace/cs2-controller-agent/knowledge/controller-build-method.md'}
def load(rev,path):
 p=subprocess.run(['git','show',f'{rev}:{path}'],capture_output=True); print(f'GIT_SHOW {rev[:7]} {path} EXIT={p.returncode}')
 if p.returncode: print(p.stderr.decode(errors='replace')); sys.exit(p.returncode)
 return p.stdout,re.sub(r'\s+',' ',p.stdout.decode().lower())
src={}; print('HARNESS=inline-python-static-source-conformance-v3; scope=source text only')
for label,rev in revs:
 print(f'SOURCE {label}={rev}'); src[label]={}
 for kind,path in paths.items():
  raw,text=load(rev,path); src[label][kind]=text; print(f'SHA256 {label}.{kind}={hashlib.sha256(raw).hexdigest()}')
def has_contract_category(text,token):
 m=re.search(r'required_integration_categories:\s*(.*?)\s*zero_test_debt:',text)
 return bool(m and re.search(r'-\s*'+re.escape(token)+r'\b',m.group(1)))
def hit(pattern,text): return re.search(pattern,text,re.I) is not None
cases=[
 ('End-to-end','end_to_end',r'all four integration categories.*?end-to-end',r'end-to-end through the approved controller path'),
 ('Service integration','service_integration',r'all four integration categories.*?service-integration boundaries',r'service-integration boundaries'),
 ('Error handling','error_handling',r'all four integration categories.*?error handling',r'denied/malformed/missing authority.*?failure handling.*?(?:absence of|absent) live side effects'),
 ('Retry/resilience','retry_resilience',r'all four integration categories.*?retry/resilience',r'transient failur\w*.*?exhausted retry/correction allowance.*?duplicate/idempotent(?: failure handling| events?)'),
]
passed=True
for name,token,md,detail in cases:
 print(f'CASE {name}'); green={}
 for label,_ in revs:
  c,m=src[label]['contract'],src[label]['method']; flags=[has_contract_category(c,token),hit(md,m),hit(detail,c),hit(detail,m)]; green[label]=all(flags)
  print(f"  RAW {label}: contract_category={'PASS' if flags[0] else 'FAIL'},method_category={'PASS' if flags[1] else 'FAIL'},contract_details={'PASS' if flags[2] else 'FAIL'},method_details={'PASS' if flags[3] else 'FAIL'}")
 result=not green['PRE'] and green['POST']; passed &= result
 print(f"  RESULT PRE={'GREEN' if green['PRE'] else 'RED'} POST={'GREEN' if green['POST'] else 'RED'} RED_TO_GREEN={'PASS' if result else 'FAIL'}")
pc,pm=src['PRE']['contract'],src['PRE']['method']; qc,qm=src['POST']['contract'],src['POST']['method']
boundaries={
 'offline_mocked_only_PRE': 'inactive_offline_only' in pc and 'static/offline tests' in pm and 'mocked integrations' in pm,
 'offline_mocked_only_POST': 'inactive_offline_only' in qc and 'static/offline tests' in qm and 'mocked integrations' in qm,
 'no_live_service_explicit_PRE': 'service execution' in pm,
 'no_live_service_explicit_POST': 'service execution' in qm and 'never live controller' in qm,
 'no_runtime_claim_PRE': 'do not claim runtime tests exist' in pc,
 'no_runtime_claim_POST': 'do not claim controller implementation or runtime tests exist' in qm,
 'skip_disabled_weakened_policy_PRE': 'never skip, disable, weaken or remove accepted assertions' in pc and 'zero skipped/disabled assertions' in pm,
 'skip_disabled_weakened_policy_POST': 'never skip, disable, weaken or remove accepted assertions' in qc and 'zero skipped/disabled assertions' in qm and 'no weakened tests' in qm,
}
print('BOUNDARIES')
for name,ok in boundaries.items(): print(f'  {name}={"PASS" if ok else "PARTIAL/FAIL"}')
passed &= all(boundaries[k] for k in ['offline_mocked_only_POST','no_live_service_explicit_POST','no_runtime_claim_POST','skip_disabled_weakened_policy_POST'])
print('TEST_EXECUTION=NOT_RUN; skipped/disabled/weakened test counts=N/A')
print('WARNINGS=1: static source comparison cannot establish test execution/results/counts')
print(f'HARNESS_EXIT={0 if passed else 1}')
sys.exit(0 if passed else 1)
PY
rc=$?; printf 'SHELL_EXIT=%s\n' "$rc"; exit "$rc"
```

## Actual output and result

```text
HARNESS=inline-python-static-source-conformance-v3; scope=source text only
SOURCE PRE=86b294d7e44a25757289c8d55c96274319db3c2a
GIT_SHOW 86b294d .github/agents/cs2-controller-agent.md EXIT=0
SHA256 PRE.contract=600b29f9ce7546bd882d8c10cbe400d255ef0df8c5edd84dd1c9cb9f42fac8e7
GIT_SHOW 86b294d .agent-workspace/cs2-controller-agent/knowledge/controller-build-method.md EXIT=0
SHA256 PRE.method=1ce0c3a8e97558116b05417322c706017fc28a9b461c2d5189b932ab4a5d9c51
SOURCE POST=7813a5bd88417a3f2f45b4b750f4c8908670ed94
GIT_SHOW 7813a5b .github/agents/cs2-controller-agent.md EXIT=0
SHA256 POST.contract=44a00539e7161ac1357a1032266cda900c0c400f591415c008a4497ba7fab309
GIT_SHOW 7813a5b .agent-workspace/cs2-controller-agent/knowledge/controller-build-method.md EXIT=0
SHA256 POST.method=56545cf311b3f646359f92deeccf5e38908e8f356ba88fb7049c6b55720e67af
CASE End-to-end
  RAW PRE: contract_category=FAIL,method_category=FAIL,contract_details=FAIL,method_details=FAIL
  RAW POST: contract_category=PASS,method_category=PASS,contract_details=PASS,method_details=PASS
  RESULT PRE=RED POST=GREEN RED_TO_GREEN=PASS
CASE Service integration
  RAW PRE: contract_category=FAIL,method_category=FAIL,contract_details=FAIL,method_details=FAIL
  RAW POST: contract_category=PASS,method_category=PASS,contract_details=PASS,method_details=PASS
  RESULT PRE=RED POST=GREEN RED_TO_GREEN=PASS
CASE Error handling
  RAW PRE: contract_category=FAIL,method_category=FAIL,contract_details=PASS,method_details=FAIL
  RAW POST: contract_category=PASS,method_category=PASS,contract_details=PASS,method_details=PASS
  RESULT PRE=RED POST=GREEN RED_TO_GREEN=PASS
CASE Retry/resilience
  RAW PRE: contract_category=FAIL,method_category=FAIL,contract_details=FAIL,method_details=FAIL
  RAW POST: contract_category=PASS,method_category=PASS,contract_details=PASS,method_details=PASS
  RESULT PRE=RED POST=GREEN RED_TO_GREEN=PASS
BOUNDARIES
  offline_mocked_only_PRE=PASS
  offline_mocked_only_POST=PASS
  no_live_service_explicit_PRE=PARTIAL/FAIL
  no_live_service_explicit_POST=PASS
  no_runtime_claim_PRE=PASS
  no_runtime_claim_POST=PASS
  skip_disabled_weakened_policy_PRE=PASS
  skip_disabled_weakened_policy_POST=PASS
TEST_EXECUTION=NOT_RUN; skipped/disabled/weakened test counts=N/A
WARNINGS=1: static source comparison cannot establish test execution/results/counts
HARNESS_EXIT=0
SHELL_EXIT=0
```

**Outcome:** four of four source-conformance categories transitioned RED to
GREEN; all four named source cases ran and passed, with zero source cases
skipped. The harness has no disabled-test mechanism; weakened/disabled controller
test counts are N/A because no controller tests ran. The predicates were not
weakened between the baseline and corrected-source comparison. The one reported
warning is the explicit limitation that source comparison does not establish
test execution or runtime results.

The final harness exited 0 and the shell exited 0. Foreman noted that exploratory
matcher revisions exited 1 before the final harness; they were corrected and are
not represented as accepted RED executions. The accepted RED is the recorded
pre-correction source-comparison result above, not those exploratory runs and
not the historical PB-07 credential-field RED.

## Limits and current posture

- Static authoring-conformance only; the “cases” are source assertions, not
  mocked or live controller fixtures.
- No controller implementation or runtime test execution, runtime QA acceptance,
  new task-level QP, ECAP, IAA verdict/token, PRE-BRIEF, merge readiness,
  activation, consumer delivery, or CS2 merge decision is asserted. Foreman's
  acceptance is limited to this static authoring-conformance method and result.
- Existing `STOP_AND_FIX`, mandatory IAA/ECAP, and CS2-only merge controls remain
  unchanged.
