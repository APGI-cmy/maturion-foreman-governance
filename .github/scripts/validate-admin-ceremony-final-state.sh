#!/usr/bin/env bash
set -u

normalize() {
  sed 's/\*\*//g; s/`//g' "$1"
}

proof_pr() {
  local proof="$1"
  local lines
  lines="$(normalize "${proof}" | grep -iE '^[[:space:]]*pr[[:space:]]*:' || true)"
  [ -n "${lines}" ] || return 1
  [ "$(printf '%s\n' "${lines}" | wc -l)" -eq 1 ] || return 1
  printf '%s\n' "${lines}" \
    | sed -nE 's/^[[:space:]]*[Pp][Rr][[:space:]]*:[[:space:]]*#?([0-9]+)[[:space:]]*$/\1/p' \
    | grep -E '^[0-9]+$'
}

token_prs() {
  normalize "$1" \
    | grep -iE '^[[:space:]]*PR[[:space:]]*:|^\|[[:space:]]*PR Number[[:space:]]*\|' \
    | while IFS= read -r line; do
        printf '%s\n' "${line}" | grep -oE '#?[0-9]+' | tail -1 | tr -d '#'
      done \
    | sort -u
}

resolve_token() {
  local proof="$1"
  local assurance_dir="$2"
  local pr
  pr="$(proof_pr "${proof}")" || return 1

  local matches=()
  local candidate refs
  while IFS= read -r candidate; do
    [ -f "${candidate}" ] || continue
    grep -qiE 'ASSURANCE[- ]TOKEN' "${candidate}" || continue
    grep -qiE 'MERGE PERMITTED' "${candidate}" || continue
    refs="$(token_prs "${candidate}" || true)"
    [ -n "${refs}" ] || continue
    [ "$(printf '%s\n' "${refs}" | wc -l)" -eq 1 ] || continue
    [ "${refs}" = "${pr}" ] || continue
    matches+=("${candidate}")
  done < <(find "${assurance_dir}" -maxdepth 1 -type f \
    -name 'iaa-token-session-*.md' -print 2>/dev/null | sort)

  [ "${#matches[@]}" -eq 1 ] || return 1
  printf '%s\n' "${matches[0]}"
}

scan_repo() {
  local root="$1"
  local assurance_dir="${root}/.agent-admin/assurance"
  local violations=0
  local checked=0
  local proof final_state iaa_token iaa_session token_file

  while IFS= read -r proof; do
    [ -f "${proof}" ] || continue
    final_state="$(normalize "${proof}" | grep -i 'final_state' | head -1 || true)"
    if ! printf '%s\n' "${final_state}" \
      | grep -qiE '^[[:space:]]*final_state[[:space:]]*:[[:space:]]*COMPLETE[[:space:]]*$'; then
      continue
    fi

    checked=$((checked + 1))
    iaa_token="$(normalize "${proof}" | grep -i 'iaa_audit_token' | head -1 || true)"
    iaa_session="$(normalize "${proof}" | grep -i 'iaa_session_reference' | head -1 || true)"
    token_file=""

    if printf '%s\n' "${iaa_token}" \
         | grep -qiE '(PENDING|placeholder|TBD|TODO|\[to be filled\]|<token|<fill|REQUIRED —)' ||
       printf '%s\n' "${iaa_session}" \
         | grep -qiE '(PENDING|placeholder|TBD|TODO|\[to be filled\]|<session|<fill)'; then
      if ! token_file="$(resolve_token "${proof}" "${assurance_dir}")"; then
        echo "FAIL: unresolved proof-specific IAA token: ${proof}"
        violations=$((violations + 1))
        continue
      fi
      echo "PASS: ${proof} -> ${token_file}"
    fi
  done < <(find "${root}/.agent-admin/prehandover" -maxdepth 2 \
    \( -name 'proof-*.md' -o -name 'prehandover_proof*.md' -o -name 'PREHANDOVER_PROOF*.md' \) \
    -type f -print 2>/dev/null | sort)

  echo "Checked COMPLETE proofs: ${checked}; violations: ${violations}"
  [ "${violations}" -eq 0 ]
}

if [ "${1:-}" = "--resolve-token" ]; then
  [ "$#" -eq 3 ] || exit 2
  resolve_token "$2" "$3"
  exit $?
fi

scan_repo "${1:-$(pwd)}"
