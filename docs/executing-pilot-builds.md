# Executing Pilot Builds — User Guide

## 🎯 Overview

This guide explains how to execute autonomous pilot builds using the Foreman system. Pilot builds are controlled, small-scale build waves designed to validate the Foreman orchestration pipeline.

## 📋 Prerequisites

### Required Environment Variables

```bash
# Required for full functionality
OPENAI_API_KEY=your_openai_key
MATURION_ORG_ID=maturion_isms
GITHUB_APP_ID=your_github_app_id
GITHUB_APP_PRIVATE_KEY=your_private_key
GITHUB_APP_INSTALLATION_ID=your_installation_id

# Autonomous mode configuration
MATURION_AUTONOMOUS_MODE=true
MATURION_AUTONOMOUS_GUARDS=qa,compliance,tests
```

### System Requirements

- Node.js 18+
- Access to GitHub repository
- OpenAI API access (GPT-4)
- Foreman app deployed or running locally

## 🚀 Execution Methods

### Method 1: Chat UI (Recommended)

**Best for**: Interactive testing and manual triggering

1. Navigate to the Foreman Chat UI:
   ```
   http://localhost:3000/foreman (local)
   https://your-app.vercel.app/foreman (production)
   ```

2. **Option A: Use the Quick Action Button**
   - Click the "🚀 Run Pilot Build" button in the header
   - Foreman will initiate the pilot build immediately

3. **Option B: Type a Command**
   - In the chat input, type any of these commands:
     ```
     /foreman run pilot
     Foreman, run Pilot Build Wave.
     run pilot build wave 1
     ```
   - Press Enter or click Send

4. **Monitor Progress**
   - Watch the chat for real-time updates
   - Foreman will report:
     - Architecture analysis progress
     - Builder tasks created
     - QA validation results
     - PR creation (if enabled)
     - Build report location

**Example Chat Interaction:**

```
You: /foreman run pilot

Foreman: 🚀 Triggering Pilot Build Wave...

Foreman: ✅ Pilot Build Wave initiated successfully!

Sequence ID: seq_1701234567_abc123
Status: completed
PR: https://github.com/MaturionISMS/maturion-foreman-app/pull/42
Report: /reports/WAVE_3_3_PILOT_BUILD.md

Build completed in 12.3s with 5 tasks executed.
```

### Method 2: GitHub Issue Comment

**Best for**: GitOps workflows and issue tracking

1. Navigate to any GitHub issue in your repository

2. Post a comment with one of these commands:
   ```
   @foreman run pilot
   /foreman run pilot
   @foreman execute Pilot Build Wave 1
   ```

3. **What Happens Next:**
   - GitHub webhook triggers the Foreman system
   - Foreman detects the pilot build command
   - Build sequence initiates automatically
   - Foreman may comment on the issue with status updates (if configured)
   - PR is created with a reference to the issue

**Example Issue Comment:**

```
@foreman run pilot

Scope: Implement Foreman status dashboard
Expected features:
- Real-time build sequence monitoring
- QA results display
- Audit log preview
```

**Foreman's Response** (if configured to comment back):

```
✅ Pilot Build Wave 1 initiated

Sequence ID: seq_1701234567_abc123
Tasks: 5 builder tasks created
Status: Running autonomously

I'll update this issue when the build completes.
```

### Method 3: Direct API Call

**Best for**: Automation, CI/CD pipelines, and programmatic access

**Endpoint**: `POST /api/foreman/run-build`

**Request:**

```bash
curl -X POST https://your-app.vercel.app/api/foreman/run-build \
  -H "Content-Type: application/json" \
  -d '{
    "pilot": true,
    "organisationId": "maturion_isms",
    "autonomousBuildEnabled": true,
    "createPR": true,
    "generateReport": true,
    "owner": "MaturionISMS",
    "repo": "maturion-foreman-app",
    "branch": "foreman/pilot-wave",
    "baseBranch": "main",
    "pilotWave": true,
    "waveNumber": 1,
    "feature": "foreman-status-dashboard"
  }'
```

**Response:**

```json
{
  "success": true,
  "sequenceId": "seq_1701234567_abc123",
  "status": "completed",
  "prUrl": "https://github.com/MaturionISMS/maturion-foreman-app/pull/42",
  "reportPath": "/reports/WAVE_3_3_PILOT_BUILD.md",
  "message": "Pilot Build Wave 1 completed successfully."
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pilot` | boolean | Yes | Flag to indicate this is a pilot build |
| `organisationId` | string | Yes | Your organization identifier |
| `autonomousBuildEnabled` | boolean | No | Enable autonomous execution (default: from env) |
| `createPR` | boolean | No | Create pull request (default: false) |
| `generateReport` | boolean | No | Generate build report (default: true) |
| `owner` | string | Required if createPR | GitHub repository owner |
| `repo` | string | Required if createPR | GitHub repository name |
| `branch` | string | Required if createPR | Target branch for PR |
| `baseBranch` | string | No | Base branch (default: main) |
| `pilotWave` | boolean | No | Mark as pilot wave build |
| `waveNumber` | number | No | Pilot wave number (default: 1) |
| `feature` | string | No | Feature name/description |

## 📊 Monitoring Execution

### Real-time Monitoring

**Via Chat UI:**
- All execution steps appear in chat in real-time
- Progress indicators show phase completion
- Errors are displayed immediately

**Via Logs:**
- Vercel runtime logs (production)
- Console output (development)
- All autonomous actions are logged with timestamps

**Via API:**
- Poll the status endpoint:
  ```bash
  GET /api/foreman/run-build?sequenceId=seq_1701234567_abc123
  ```

### Build Reports

After execution completes, find the comprehensive build report at:

```
reports/WAVE_3_3_PILOT_BUILD.md
```

The report includes:
- ✅ Executive Summary
- ✅ Build Context (org, trigger, mode)
- ✅ Architecture Analysis
- ✅ Builder Tasks (all tasks with status)
- ✅ Builders Called (summary table)
- ✅ QA Results (detailed findings)
- ✅ Compliance Verification
- ✅ PR Details (if created)
- ✅ Reasoning Summary
- ✅ Architecture Impact
- ✅ Execution Timeline
- ✅ Lessons Learned

## 🛡️ Quality Gates

All pilot builds enforce these gates (cannot be bypassed):

### 1. QA Gate
- All code-writing tasks validated by QA Builder
- Type safety checks
- Code quality standards
- Component rendering validation
- **Fails build if any check fails**

### 2. QA-of-QA Gate
- Meta-review of QA Builder's work
- Ensures QA itself is functioning correctly
- Validates QA comprehensiveness
- **Fails build if QA quality is insufficient**

### 3. Compliance Gate
- Secret detection scan
- Organisation ID validation
- Breaking change detection
- Audit log completeness
- **Fails build if any violation detected**

### 4. Test Gate (when enabled)
- Test artifacts required for code changes
- Coverage thresholds enforced
- **Fails build if tests missing**

## 🔍 Troubleshooting

### Build Failed - QA Gate

**Symptom**: Build fails with "QA validation failed"

**Solution**:
1. Check the build report QA Results section
2. Review specific failing checks
3. Fix the identified issues in code
4. Re-trigger the build

**Example:**
```
QA Results:
- ❌ Type safety: Variable 'data' has implicit any type
- ✅ Code quality: All checks passed
- ✅ Component rendering: Tests pass
```

### Build Failed - Compliance Gate

**Symptom**: Build fails with "Compliance check failed"

**Solution**:
1. Check build report Compliance Verification section
2. Common issues:
   - **Secrets detected**: Remove hardcoded secrets, use env vars
   - **Organisation ID missing**: Ensure `organisationId` in request
   - **Breaking changes**: Revert breaking API changes
3. Fix issues and re-trigger

### Build Stuck - Awaiting Approval

**Symptom**: Build status shows "awaiting_approval"

**Cause**: Autonomous mode is disabled

**Solution**:
1. **Option A**: Enable autonomous mode
   ```bash
   MATURION_AUTONOMOUS_MODE=true
   ```
2. **Option B**: Manually approve tasks
   ```bash
   GET /api/admin/approve?pending=true
   POST /api/admin/approve
   {
     "taskId": "task_123",
     "action": "approve",
     "executeImmediately": true
   }
   ```

### No PR Created

**Symptom**: Build completes but no PR appears

**Cause**: `createPR: false` or missing GitHub credentials

**Solution**:
1. Ensure `createPR: true` in request
2. Verify GitHub App credentials:
   ```bash
   GITHUB_APP_ID=...
   GITHUB_APP_PRIVATE_KEY=...
   GITHUB_APP_INSTALLATION_ID=...
   ```
3. Check Foreman has write permissions to repository

### OpenAI Errors

**Symptom**: "OpenAI API key not configured"

**Solution**:
```bash
OPENAI_API_KEY=your_actual_api_key
```

**Symptom**: "Rate limit exceeded"

**Solution**:
- Wait a few minutes and retry
- Check OpenAI account billing status
- Consider upgrading OpenAI plan for higher limits

## 📈 Best Practices

### 1. Start Small
- First pilot build should be minimal (1-2 components)
- Validate the full pipeline works
- Gradually increase scope in subsequent builds

### 2. Monitor Initially
- Watch first few pilot builds closely
- Review build reports thoroughly
- Verify QA gates are working as expected

### 3. Trust the System
- Once validated, let autonomous mode run without intervention
- QA and compliance gates provide safety
- No need for manual code review (by design)

### 4. Review Reports
- Always read the generated build report
- Check "Lessons Learned" section
- Apply insights to next wave

### 5. Iterate Based on Feedback
- If QA finds issues repeatedly, improve QA rules
- If builds fail compliance, strengthen pre-checks
- Use pilot builds to refine the system

## 🎓 Example Workflows

### Workflow 1: Feature Development

```
1. Create GitHub issue describing feature
2. Comment: "@foreman run pilot"
3. Foreman analyzes architecture gaps
4. Builders create components/APIs/tests
5. QA validates everything
6. PR created automatically
7. Human reviews PR (optional)
8. Merge to main
```

### Workflow 2: Scheduled Builds

```
1. Set up cron job or GitHub Action
2. Trigger via API at scheduled time
3. Foreman executes overnight builds
4. Review build reports in morning
5. Merge successful PRs
```

### Workflow 3: Iterative Refinement

```
1. Run pilot build with small scope
2. Review build report and code quality
3. Adjust QA rules based on findings
4. Run pilot build again (same feature)
5. Compare reports - should improve
6. Repeat until quality is high
```

## 📚 Additional Resources

- [Pilot Wave Specification](./pilot-wave.md) - Detailed technical spec
- [Autonomous Mode README](../README.md#autonomous-mode) - Configuration guide
- [Foreman Identity](../foreman/identity/foreman-identity.md) - Philosophy and principles
- [QA Enforcement](../foreman/qa/qa-enforcement.md) - QA rules and validation

## ⚙️ Advanced Configuration

### Custom Feature Scope

Specify custom feature scope in API call:

```json
{
  "pilot": true,
  "feature": "user-authentication-module",
  "triggerContext": {
    "modules": ["auth", "session"],
    "complexity": "medium"
  }
}
```

### PR Customization

Control PR creation behavior:

```json
{
  "createPR": true,
  "owner": "YourOrg",
  "repo": "your-repo",
  "branch": "feature/custom-branch-name",
  "baseBranch": "develop"
}
```

### Report Generation

Customize report output:

```json
{
  "generateReport": true,
  "pilotWave": true,
  "waveNumber": 2
}
```

Report will be saved as:
```
reports/WAVE_3_3_PILOT_BUILD.md  (if waveNumber = 1)
reports/FOREMAN_PILOT_BUILD_REPORT_${sequenceId}.md  (if waveNumber > 1)
```

## 🔐 Security Considerations

### Secrets Management
- Never include secrets in pilot build requests
- Foreman scans for secrets and fails builds if found
- Use environment variables for sensitive data

### Access Control
- Pilot builds require organisation ID
- GitHub webhook signature verification (when configured)
- API endpoints respect authentication (when configured)

### Audit Trail
- All autonomous actions logged
- Build reports preserved for compliance
- Traceability to trigger source (issue, user, schedule)

---

**Need Help?**

- Review the [FAQ section in README](../README.md)
- Check [Implementation Summary](../IMPLEMENTATION_SUMMARY.md)
- Contact the Maturion team for support

---

*Last Updated: 2025-12-05*  
*Version: 1.0*  
*Foreman App: v0.1.0*
