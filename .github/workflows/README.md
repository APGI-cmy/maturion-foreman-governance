# QIEL Workflow Template

This directory contains the GitHub Actions workflow template for QIEL (Quality Integrity Enforcement Layer).

## ⚠️ Important Note

The file `qiel-template.yml.example` is a **template** and should NOT be used directly in this repository.

## Why is this a template?

The QIEL workflow is designed for **projects that use the Foreman system**, not for the Foreman system itself. Running QIEL on the Foreman codebase would create circular dependencies and permission issues.

## How to use this template

To enable QIEL in a project that uses Foreman:

1. Copy `qiel-template.yml.example` to your project's `.github/workflows/qiel.yml`
2. Update the permissions section to include necessary GitHub permissions
3. Customize the workflow triggers and parameters as needed
4. Ensure your project has the required log files (`/tmp/build.log`, `/tmp/lint.log`, `/tmp/test.log`)

## Required Permissions

When using this template, ensure your workflow has these permissions:

```yaml
permissions:
  contents: read
  issues: write      # Required for creating QI Incident issues
  pull-requests: write  # Required for PR comments
```

## Integration with Foreman

This workflow integrates with:
- QIW (Quality Integrity Watchdog) - for log monitoring
- QIEL (Quality Integrity Enforcement Layer) - for comprehensive QA
- Governance Memory - for incident tracking
- Dashboard - for real-time status

## More Information

- See `docs/QIEL_README.md` for full QIEL documentation
- See `lib/foreman/watchdog/README.md` for QIW documentation
- See `lib/foreman/qa/qiel-runner.ts` for implementation details
