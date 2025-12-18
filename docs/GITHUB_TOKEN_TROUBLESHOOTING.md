# GitHub Token Troubleshooting Guide

**Last Updated**: 2025-12-10  
**Issue Reference**: GITHUB_TOKEN access for MaturionISMS repositories

---

## Executive Summary

This guide helps diagnose and resolve GitHub fine-grained personal access token (PAT) issues when Foreman cannot access repositories in the MaturionISMS organization.

---

## Common Issue: "All Repositories" Token Still Gets 404

### The Problem

You have configured a fine-grained PAT with:
- ✅ "All repositories" selected
- ✅ All required permissions (Contents: Read & Write, etc.)
- ✅ Token regenerated and added to `.env.local` and Vercel
- ❌ Still getting 404 errors when accessing `maturion-isms` or other repos

### Why This Happens

Fine-grained tokens have **two separate access controls**:

1. **Repository Access Scope** (what you selected: "All repositories")
2. **Organization Approval** (what you may be missing)

Even with "All repositories" selected, **organization-owned repositories require explicit organization approval** for fine-grained tokens.

---

## Solution: Verify Organization Approval

### Step 1: Check if Token Has Organization Approval

1. Go to your fine-grained token settings: [GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens](https://github.com/settings/tokens?type=beta)
2. Click on your "Maturion Foreman" token
3. Look for "**Access on the MaturionISMS organization**" section
4. Check the status:
   - ✅ **Update** button with "Cancel" option = Approved
   - ⏳ **Pending approval** status = Waiting for admin
   - ❌ **Request access** button = Not requested yet

### Step 2: Request Organization Access (If Not Approved)

If your token shows "Request access" or "Pending approval":

1. Click the **"Update"** button next to "MaturionISMS organization"
2. The organization admin (you or another admin) will receive a notification
3. Go to: [Organization Settings → Personal access tokens](https://github.com/organizations/MaturionISMS/settings/personal-access-tokens/pending_requests)
4. **Approve** the token request

### Step 3: Verify Token After Approval

After approval, the token settings should show:
- **Status**: Active (green checkmark)
- **Organization**: MaturionISMS
- **Repositories**: All current and future repositories
- **Access**: Active (not pending)

---

## Alternative Solution: Use Classic Personal Access Token

If fine-grained tokens continue to have issues, use a **classic PAT** instead:

### Create Classic PAT

1. Go to: [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token" → "Generate new token (classic)"
3. Set the following scopes:
   - ✅ `repo` (full control of private repositories)
   - ✅ `workflow` (update GitHub Action workflows)
   - ✅ `read:org` (read organization data)
4. Set expiration (recommended: 90 days, then set up rotation reminder)
5. Generate token and **copy it immediately** (you won't see it again)

### Add Classic Token to Environment

Update `.env.local`:
```env
GITHUB_TOKEN=ghp_your_classic_token_here
```

Update Vercel environment variables:
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Update `GITHUB_TOKEN` with the new classic token
4. Redeploy the application

### Advantages of Classic Tokens

- ✅ **No organization approval required** - Works immediately
- ✅ **Simpler permission model** - Scope-based instead of resource-based
- ✅ **Wider compatibility** - Works with all GitHub features
- ❌ **Less granular** - Cannot limit to specific repositories
- ❌ **Higher privilege** - Access to all repos in all organizations

---

## Verify Token Access

Use the validation script to test your token:

```bash
npx tsx scripts/validate-github-token.ts
```

This script will:
1. Test basic GitHub API access
2. Attempt to read from `MaturionISMS/maturion-isms`
3. Check token permissions
4. Verify organization access
5. Report any issues

Expected output:
```
✅ GitHub API connection successful
✅ Can access MaturionISMS organization
✅ Can read maturion-isms repository
✅ Token has required permissions
✅ All checks passed - token is correctly configured
```

---

## Manual Token Verification

### Test 1: Basic API Access

```bash
curl -H "Authorization: token YOUR_TOKEN_HERE" \
     https://api.github.com/user
```

Expected: Your user profile JSON (not a 401 or 403 error)

### Test 2: Organization Access

```bash
curl -H "Authorization: token YOUR_TOKEN_HERE" \
     https://api.github.com/orgs/MaturionISMS
```

Expected: Organization details JSON (not a 404 error)

### Test 3: Repository Access

```bash
curl -H "Authorization: token YOUR_TOKEN_HERE" \
     https://api.github.com/repos/MaturionISMS/maturion-isms
```

Expected: Repository details JSON

**If you get 404**: Token doesn't have access to this repository
**If you get 403**: Token has access but lacks permissions
**If you get 401**: Token is invalid or expired

### Test 4: Read Repository Contents

```bash
curl -H "Authorization: token YOUR_TOKEN_HERE" \
     https://api.github.com/repos/MaturionISMS/maturion-isms/contents
```

Expected: Array of files/directories in the repository root

---

## Common Issues and Solutions

### Issue 1: Token Works Locally But Not on Vercel

**Cause**: Environment variable not updated on Vercel

**Solution**:
1. Go to Vercel project → Settings → Environment Variables
2. Update `GITHUB_TOKEN` for all environments (Production, Preview, Development)
3. **Redeploy** the application (environment variables only apply to new deployments)

### Issue 2: Token Shows "Pending Approval"

**Cause**: Organization admin hasn't approved the fine-grained token

**Solution**:
1. As organization admin, go to: https://github.com/organizations/MaturionISMS/settings/personal-access-tokens/pending_requests
2. Review and approve the pending token request
3. Wait a few minutes for approval to propagate
4. Regenerate token if approval doesn't take effect

### Issue 3: Token Expired

**Cause**: Token has passed its expiration date

**Solution**:
1. Go to token settings
2. Click "Regenerate token"
3. Copy the new token
4. Update `.env.local` and Vercel environment variables
5. Redeploy

### Issue 4: Wrong Token Permissions

**Cause**: Token is missing required permissions

**Solution**:
1. Edit the token
2. Ensure these permissions are set to "Read and write":
   - Contents
   - Pull requests
   - Issues
   - Workflows (if modifying GitHub Actions)
3. Metadata should be "Read-only" (automatically required)
4. Save changes
5. Regenerate token if permissions don't take effect

### Issue 5: Repository Not Included in "All Repositories"

**Cause**: Repository was added after token creation, or token scope is incorrect

**Solution**:
1. Edit the token
2. Verify "All repositories" is still selected (not "Public repositories" or "Only select repositories")
3. Check that "This applies to all current and future repositories..." message is shown
4. Save and regenerate token

---

## Recommended Token Configuration

### For Foreman (Fine-Grained Token)

**Repository Access**:
- ✅ All repositories (current and future)

**Organization**:
- ✅ MaturionISMS (must be approved)

**Repository Permissions**:
- Contents: **Read and write**
- Deployments: **Read and write**
- Discussions: **Read and write**
- Environments: **Read and write**
- Issues: **Read and write**
- Merge queues: **Read and write**
- Metadata: **Read-only** (mandatory)
- Pull requests: **Read and write**
- Variables: **Read and write**
- Workflows: **Read and write**

**Organization Permissions**:
- Members: **Read-only** (optional, for team awareness)

**Account Permissions**:
- None required

**Expiration**:
- 90 days (recommended, with calendar reminder to regenerate)

---

## Security Best Practices

### 1. Never Commit Tokens to Git

✅ **Good**:
```env
# .env.local (gitignored)
GITHUB_TOKEN=ghp_abc123...
```

❌ **Bad**:
```typescript
// config.ts (committed to git)
const GITHUB_TOKEN = "ghp_abc123..."
```

### 2. Use Different Tokens for Different Environments

- **Local Development**: Your personal fine-grained token
- **Production (Vercel)**: Organization-owned token with narrower scope
- **CI/CD**: GitHub Actions built-in `GITHUB_TOKEN` when possible

### 3. Rotate Tokens Regularly

- Set 90-day expiration
- Add calendar reminder 1 week before expiration
- Regenerate and update all environments
- Test after rotation

### 4. Use Fine-Grained Tokens When Possible

Fine-grained tokens are more secure than classic tokens because:
- Scope is limited to specific repositories
- Permissions are more granular
- Audit trail is clearer

Only use classic tokens if fine-grained tokens have approval issues.

### 5. Monitor Token Usage

GitHub provides usage information for tokens:
1. Go to token settings
2. Check "Last used" timestamp
3. Review "Recent activity" logs
4. Revoke any tokens that haven't been used in 30+ days

---

## Quick Reference: Token Types

| Feature | Fine-Grained PAT | Classic PAT |
|---------|------------------|-------------|
| Organization approval | Required | Not required |
| Repository scope | Specific repos or all | All repos in all orgs |
| Permission granularity | Very granular | Scope-based |
| Expiration | Max 1 year | No limit (not recommended) |
| Setup complexity | Medium | Low |
| Security | Higher | Lower |
| **Recommended for Foreman** | ✅ Yes (if approved) | Use if fine-grained has issues |

---

## When to Escalate

Escalate to GitHub support if:

1. **Organization approval stuck**: Admin approved but token still shows "pending" after 24 hours
2. **Consistent 404s**: Token has all permissions and org approval but still can't access repositories
3. **Mysterious 403s**: Token should have permission but GitHub denies access
4. **Token not appearing**: Created token but doesn't show in token list

GitHub support link: https://support.github.com/

---

## Next Steps

After resolving token issues:

1. ✅ Run `npx tsx scripts/validate-github-token.ts` to confirm access
2. ✅ Test Foreman by accessing `/api/foreman/status` endpoint
3. ✅ Verify behavior file loading from governance repository
4. ✅ Check Foreman logs for any remaining access errors
5. ✅ Enable autonomous mode if all checks pass

---

## Helpful Links

- [GitHub Fine-Grained PAT Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token)
- [GitHub Classic PAT Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic)
- [Organization PAT Management](https://docs.github.com/en/organizations/managing-programmatic-access-to-your-organization/managing-requests-for-personal-access-tokens-in-your-organization)
- [GitHub API Authentication](https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api)

---

## Summary

**The most common issue**: Fine-grained token needs organization approval.

**Quick fix**:
1. Check if token is approved for MaturionISMS organization
2. If not, request/approve organization access
3. Verify with `npx tsx scripts/validate-github-token.ts`
4. Update Vercel environment variables and redeploy

**Alternative**: Use classic PAT (works immediately, no org approval needed)

---

**Questions?** Ask in the Foreman chat interface or open an issue.
