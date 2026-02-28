#!/usr/bin/env python3
"""Fill layer-down issue template with environment variable substitutions."""
import os
import sys

template_path = os.environ.get('ISSUE_TEMPLATE')
if not template_path:
    print('ERROR: ISSUE_TEMPLATE environment variable is not set', file=sys.stderr)
    sys.exit(1)
replacements = {
    '{{COMMIT_SHA}}':     os.environ.get('COMMIT_SHA', ''),
    '{{SHORT_SHA}}':      os.environ.get('SHORT_SHA', ''),
    '{{TIMESTAMP}}':      os.environ.get('TIMESTAMP', ''),
    '{{COMMIT_MESSAGE}}': os.environ.get('COMMIT_MESSAGE', ''),
    '{{FILES_LIST}}':     os.environ.get('FILES_LIST', ''),
    '{{AGENT_SECTION}}':  os.environ.get('AGENT_SECTION', ''),
}
with open(template_path, 'r') as f:
    body = f.read()
for k, v in replacements.items():
    body = body.replace(k, v)
print(body, end='')
