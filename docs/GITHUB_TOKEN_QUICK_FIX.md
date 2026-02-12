# Quick Fix: GitHub Token Access Issue

**Date**: 2025-12-10  
**Issue**: Fine-grained token with "All repositories" selected but still getting 404 errors

---

## The Problem

You have a fine-grained GitHub personal access token configured with:
- ✅ "All repositories" selected
- ✅ All required permissions (Contents: Read & Write, etc.)
- ✅ Token regenerated and added to `.env.local` and Vercel
- ❌ Still getting 404 errors when Foreman tries to access repositories

---

## The Root Cause

**Fine-grained tokens need ORGANIZATION APPROVAL**, even when "All repositories" is selected.

This is a GitHub security feature - organization-owned repositories require explicit admin approval for fine-grained tokens, separate from the repository access setting.

**UPDATE**: If you see "There aren't any personal access token requests" at the organization settings, it means your token is either already approved OR you're the organization owner (no approval needed). **The issue is something else** - see below.

---

## The Quick Fix (2 minutes)

### Scenario A: You See Pending Approval Requests

If at https://github.com/organizations/MaturionISMS/settings/personal-access-tokens/pending_requests you see pending requests:

### Step 1: Check Organization Approval Status

1. Go to: https://github.com/settings/tokens?type=beta
2. Click on your "Maturion Foreman" token
3. Scroll to "**Access on the MaturionISMS organization**"
4. Check the status:
   - ✅ "Update" button with "Cancel" = Already approved (skip to Scenario B)
   - ⏳ "Pending approval" = Needs approval (continue to Step 2)
   - ❌ "Request access" button = Not requested (continue to Step 2)

### Step 2: Request and Approve Organization Access

**Request Access**:
1. On the token page, click "Request access" or "Update" for MaturionISMS
2. This sends a request to the organization admins (you)

**Approve the Request** (you are the admin):
1. Go to: https://github.com/organizations/MaturionISMS/settings/personal-access-tokens/pending_requests
2. Find your token request in the list
3. Click "Review" or "Approve"
4. Confirm the approval

**Wait**: Give it 1-2 minutes for the approval to propagate

### Step 3: Verify Access

Run the validation script:

```bash
npm run validate:github-token
```

Or:

```bash
npx tsx scripts/validate-github-token.ts
```

Expected output:
```
✅ Authenticated as: YourUsername
✅ Can access MaturionISMS organization
✅ Can access maturion-isms repository
✅ Can read maturion-isms repository contents
✅ All critical tests passed!
```

---

### Scenario B: No Pending Approval Requests ("There aren't any personal access token requests")

If you see "There aren't any personal access token requests for this organization", your token is likely already approved OR you're the org owner. The 404 error is caused by something else.

**Most Common Causes**:

#### Fix 1: Regenerate Token and Update .env.local

Your token value might be outdated:

1. Go to: https://github.com/settings/tokens?type=beta
2. Click your "Maturion Foreman" token
3. Verify:
   - Repository access: "All repositories" ✅
   - Organization: MaturionISMS (Active) ✅
   - Contents permission: "Read and write" ✅
4. Click "**Regenerate token**" at the bottom
5. **Copy the new token immediately**
6. Update `.env.local`:
   ```env
   GITHUB_TOKEN=github_pat_NEW_TOKEN_VALUE_HERE
   ```
7. Verify:
   ```bash
   npm run validate:github-token
   ```

#### Fix 2: Verify Repository Exists

The repository `maturion-isms` might not exist:

1. Visit: https://github.com/MaturionISMS/maturion-isms
2. **If 404**: Repository doesn't exist or has a different name
3. **If you see the repo**: Token should work after regenerating

#### Fix 3: Check Token Scope

Even with "All repositories" selected, the token might not include all repos:

1. Go to token settings
2. Look for exact text: "This applies to all current and future repositories that you can access in this organization"
3. **If it says "Only select repositories"**: Change to "All repositories"

#### Fix 4: Use Classic Token Instead

If fine-grained token continues to fail:

1. Go to: https://github.com/settings/tokens/new
2. Select scopes: `repo`, `workflow`
3. Generate and copy token
4. Update `.env.local`:
   ```env
   GITHUB_TOKEN=ghp_your_classic_token_here
   ```
5. Verify:
   ```bash
   npm run validate:github-token
   ```

**See detailed troubleshooting**: [docs/GITHUB_TOKEN_NO_PENDING_APPROVALS.md](./GITHUB_TOKEN_NO_PENDING_APPROVALS.md)

### Step 4: Update Environment Variables (if token was regenerated)

**Local (`.env.local`)**:
```env
GITHUB_TOKEN=github_pat_your_token_here
```

**Vercel**:
1. Go to your Vercel project → Settings → Environment Variables
2. Update `GITHUB_TOKEN` for all environments (Production, Preview, Development)
3. **Redeploy** the application

---

## Alternative: Use Classic Token (If Fine-Grained Has Issues)

If organization approval continues to be problematic, switch to a classic PAT:

### Create Classic Token

1. Go to: https://github.com/settings/tokens/new
2. Set scopes:
   - ✅ `repo` (full control)
   - ✅ `workflow` (if modifying GitHub Actions)
3. Generate and copy token
4. Update `.env.local`:
   ```env
   GITHUB_TOKEN=ghp_your_classic_token_here
   ```
5. Verify:
   ```bash
   npm run validate:github-token
   ```

**Classic tokens don't need organization approval** - they work immediately.

---

## Manual Verification (Alternative to Script)

Test token manually with curl:

```bash
# Test 1: Basic auth
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user

# Test 2: Organization access
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/orgs/MaturionISMS

# Test 3: Repository access (the critical one)
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/repos/MaturionISMS/maturion-isms
```

If Test 3 returns 404:
- **Fine-grained token**: Organization approval missing
- **Classic token**: Token doesn't have `repo` scope

If Test 3 returns repository details (JSON): ✅ Token works!

---

## Expected Result After Fix

Once the token is properly configured and approved:

1. ✅ Foreman can load behavior files from governance repository
2. ✅ Foreman can access maturion-isms repository
3. ✅ Foreman can read/write to all MaturionISMS repositories
4. ✅ No more 404 errors in logs
5. ✅ Full autonomous operation enabled

---

## Still Having Issues?

See detailed troubleshooting guide: [docs/GITHUB_TOKEN_TROUBLESHOOTING.md](./GITHUB_TOKEN_TROUBLESHOOTING.md)

---

## Summary

**Most common issue**: Fine-grained token needs organization approval.

**Quick fix**:
1. Request organization access on token page
2. Approve request at organization settings
3. Run `npm run validate:github-token`
4. Done!

**Alternative**: Use classic token (no approval needed).

---

**Still stuck?** Open an issue or ask in Foreman chat.
