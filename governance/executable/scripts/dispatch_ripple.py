#!/usr/bin/env python3
"""Dispatch governance ripple events to consumer repositories."""

import argparse
import json
import os
import time
import uuid
from datetime import datetime
from pathlib import Path
from urllib import request
from urllib.error import HTTPError, URLError


def load_registry(path: Path) -> dict:
    with path.open() as handle:
        return json.load(handle)


def send_dispatch(owner: str, repo: str, token: str, event_type: str, payload: dict) -> int:
    url = f"https://api.github.com/repos/{owner}/{repo}/dispatches"
    data = json.dumps({"event_type": event_type, "client_payload": payload}).encode("utf-8")
    req = request.Request(url, data=data, method="POST")
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("Authorization", f"token {token}")
    req.add_header("User-Agent", "maturion-bot-ripple")

    with request.urlopen(req, timeout=10) as resp:
        return resp.status


def main() -> int:
    parser = argparse.ArgumentParser(description="Dispatch governance ripple events.")
    parser.add_argument("--registry", default="governance/CONSUMER_REPO_REGISTRY.json")
    parser.add_argument("--event-type", default="governance_ripple")
    parser.add_argument("--canonical-commit", required=True)
    parser.add_argument("--inventory-version", required=True)
    parser.add_argument("--changed-paths", default="")
    parser.add_argument("--output", default=".agent-admin/governance/ripple-dispatch-log.json")
    parser.add_argument("--token-env", default="RIPPLE_DISPATCH_TOKEN")
    parser.add_argument("--max-attempts", type=int, default=3)
    parser.add_argument("--backoff-seconds", type=int, default=30)
    parser.add_argument("--rate-limit-seconds", type=int, default=1)
    args = parser.parse_args()

    token = os.getenv(args.token_env)
    if not token:
        print(f"ERROR: Missing token in env {args.token_env}")
        return 2

    registry_path = Path(args.registry)
    if not registry_path.exists():
        print(f"ERROR: Registry not found: {registry_path}")
        return 2

    registry = load_registry(registry_path)
    consumers = [c for c in registry.get("consumers", []) if c.get("enabled")]
    if not consumers:
        print("ERROR: No enabled consumers in registry.")
        return 2

    dispatch_id = str(uuid.uuid4())
    payload = {
        "event_type": args.event_type,
        "canonical_commit": args.canonical_commit,
        "inventory_version": args.inventory_version,
        "changed_paths": [p for p in args.changed_paths.split(",") if p],
        "sender": "APGI-cmy/maturion-foreman-governance",
        "dispatch_id": dispatch_id,
        "timestamp": datetime.utcnow().isoformat(timespec="seconds") + "Z"
    }

    outcomes = []
    failures = []

    for consumer in consumers:
        owner = consumer.get("owner")
        repo = consumer.get("repo")
        status = "FAILED"
        error = None
        for attempt in range(1, args.max_attempts + 1):
            try:
                response_status = send_dispatch(owner, repo, token, args.event_type, payload)
                if response_status in {200, 201, 204}:
                    status = "SUCCESS"
                    error = None
                    break
                error = f"HTTP {response_status}"
            except (HTTPError, URLError, TimeoutError, OSError) as exc:
                error = str(exc)
            time.sleep(args.backoff_seconds * attempt)
        outcomes.append({
            "owner": owner,
            "repo": repo,
            "status": status,
            "error": error,
            "attempts": args.max_attempts
        })
        if status != "SUCCESS":
            failures.append(f"{owner}/{repo}")
        time.sleep(args.rate_limit_seconds)

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps({
        "dispatch_id": dispatch_id,
        "payload": payload,
        "outcomes": outcomes
    }, indent=2))

    if failures:
        print("ERROR: Ripple dispatch failed for: " + ", ".join(failures))
        return 1

    print("PASS: Ripple dispatch completed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
