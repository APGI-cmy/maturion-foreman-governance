# Configure Branch Protection (Merge Gate Interface)

**Version**: 1.0.0  
**Effective Date**: 2026-02-10  
**Authority**: CS2 (Johan Ras)

## Purpose

This runbook provides click-by-click instructions to configure branch protection so it requires **only** the standard Merge Gate Interface checks.

---

## Step-by-Step (GitHub UI)

1. Open the repository in GitHub.
2. Click **Settings** → **Branches**.
3. Under **Branch protection rules**, click **Add rule**.
4. **Branch name pattern**: enter `main`.
5. Enable the following toggles:
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
6. Under **Status checks**, select **only** these contexts:
   - `Merge Gate Interface / merge-gate/verdict`
   - `Merge Gate Interface / governance/alignment`
   - `Merge Gate Interface / stop-and-fix/enforcement`
7. (Policy choice) Set **Required approvals** to **0** unless CS2 mandates otherwise.
8. Click **Create** or **Save changes**.

---

## Enable Auto-Merge

1. Open **Settings** → **General**.
2. Scroll to **Pull Requests**.
3. Enable **Allow auto-merge**.
4. Save changes.

---

## Verification Checklist

- [ ] Open a test PR targeting `main`.
- [ ] Confirm the 3 standard checks appear with exact names.
- [ ] Confirm branch protection lists only the 3 standard checks.
- [ ] Confirm auto-merge is available when checks pass.
