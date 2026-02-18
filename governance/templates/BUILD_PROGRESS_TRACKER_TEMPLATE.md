# BUILD PROGRESS TRACKER

**Module**: [Module Name]  
**Module Slug**: [module-slug]  
**Last Updated**: [YYYY-MM-DD]  
**Updated By**: [Agent/Person Name]

---

## Module Lifecycle Progress

Track the progression through the canonical module lifecycle stages.

### Stage 0: App Description
**Status**: [ ] NOT_STARTED | [ ] IN_PROGRESS | [x] COMPLETE  
**Location**: `modules/[module-slug]/00-app-description/`  
**Key Artifacts**:
- [ ] `app-description.md` - Authoritative intent, scope, users, outputs, constraints
- [ ] App Description approved by designated authority

**Completion Date**: [YYYY-MM-DD or N/A]  
**Notes**: [Any relevant notes about this stage]

---

### Stage 1: Functional Requirements Specification (FRS)
**Status**: [ ] NOT_STARTED | [ ] IN_PROGRESS | [ ] COMPLETE  
**Location**: `modules/[module-slug]/01-frs/`  
**Key Artifacts**:
- [ ] `functional-requirements.md` - Verifiable requirements derived from App Description
- [ ] Derivation statement from App Description included
- [ ] FRS approved by designated authority

**Completion Date**: [YYYY-MM-DD or N/A]  
**Notes**: [Any relevant notes about this stage]

---

### Stage 1.5: Technical Requirements Specification (TRS)
**Status**: [ ] NOT_STARTED | [ ] IN_PROGRESS | [ ] COMPLETE  
**Location**: `modules/[module-slug]/01.5-trs/`  
**Key Artifacts**:
- [ ] `technical-requirements-specification.md` - Technical constraints, performance requirements, integration requirements
- [ ] `frs-to-trs-traceability.md` - Traceability matrix linking FRS to TRS
- [ ] Tool validation and quality gate definitions
- [ ] TRS approved by designated authority

**Completion Date**: [YYYY-MM-DD or N/A]  
**Notes**: [Any relevant notes about this stage]

---

### Stage 2: Architecture
**Status**: [ ] NOT_STARTED | [ ] IN_PROGRESS | [ ] COMPLETE  
**Location**: `modules/[module-slug]/02-architecture/`  
**Key Artifacts**:
- [ ] `architecture.md` - Structures and decisions that satisfy FRS and TRS
- [ ] QA strategy included
- [ ] True North derived from App Description
- [ ] References to TRS technical constraints
- [ ] Architecture approved by designated authority

**Completion Date**: [YYYY-MM-DD or N/A]  
**Notes**: [Any relevant notes about this stage]

---

### Stage 3: Implementation Plan
**Status**: [ ] NOT_STARTED | [ ] IN_PROGRESS | [ ] COMPLETE  
**Location**: `modules/[module-slug]/03-implementation-plan/`  
**Key Artifacts**:
- [ ] `implementation-plan.md` - Phased plan, acceptance criteria, evidence plan
- [ ] Dependencies identified and documented
- [ ] Risks and mitigation strategies documented

**Completion Date**: [YYYY-MM-DD or N/A]  
**Notes**: [Any relevant notes about this stage]

---

### Stage 4: Builder Appointment
**Status**: [ ] NOT_STARTED | [ ] IN_PROGRESS | [ ] COMPLETE  
**Location**: `modules/[module-slug]/04-builder-appointment/`  
**Key Artifacts**:
- [ ] `builder-contract.md` - Explicit builder agent contract
- [ ] Responsibilities, constraints, and deliverables defined
- [ ] Builder appointed by FM

**Completion Date**: [YYYY-MM-DD or N/A]  
**Notes**: [Any relevant notes about this stage]

---

### Stage 5: Build Execution & Evidence
**Status**: [ ] NOT_STARTED | [ ] IN_PROGRESS | [ ] COMPLETE  
**Location**: `modules/[module-slug]/05-build-evidence/`  
**Key Artifacts**:
- [ ] Implementation code in `apps/` or `packages/`
- [ ] Test evidence
- [ ] QA validation results
- [ ] Build completion evidence
- [ ] Handover documentation

#### 5.1 Critical Deliverable Validation (Waves 5-7 Lessons)

**Frontend Application Deliverables** (if UI required):
- [ ] React app (or framework) exists at documented path
- [ ] App launches successfully in development mode
- [ ] Production build succeeds without errors
- [ ] App deployed to staging/production environment
- [ ] Deployment URL accessible and functional
- [ ] UI components render correctly
- [ ] Routing works (if multi-page app)

**Backend Application Deliverables** (if backend required):
- [ ] API server code exists at documented path
- [ ] API server starts successfully
- [ ] Database schema deployed
- [ ] Database seeded with test data
- [ ] API endpoints respond correctly
- [ ] API deployed to staging/production
- [ ] API URL accessible and functional

**UI-to-Backend Wiring Validation** (MANDATORY if both exist):
- [ ] Frontend can successfully call backend API
- [ ] Authentication/authorization flow works
- [ ] Data flows from UI → API → Database → API → UI
- [ ] Error handling works (backend errors shown in UI)
- [ ] CORS configured correctly (no browser errors)
- [ ] E2E tests covering full workflows PASSING

**Infrastructure Deployment Evidence** (REQUIRED):
- [ ] Frontend deployment URL documented and accessible
- [ ] Backend deployment URL documented and accessible
- [ ] Database connection string configured (secrets secured)
- [ ] Environment variables configured in deployment platforms
- [ ] Health check endpoints verified
- [ ] At least ONE complete workflow demonstrated with screenshots/video

**Prohibition - Wave Closure WITHOUT**:
- ❌ Frontend deployment (if UI specified in requirements)
- ❌ Backend deployment (if API specified in requirements)
- ❌ Database deployment (if data persistence required)
- ❌ Working E2E workflow demonstration
- ❌ UI wiring tests (if both UI and backend exist)

**Completion Date**: [YYYY-MM-DD or N/A]  
**Notes**: [Any relevant notes about this stage]

---

## Current Stage Summary

**Current Stage**: [Stage Number and Name]  
**Overall Progress**: [X]% complete  
**Blockers**: [List any blockers or dependencies]  
**Next Steps**: [What needs to happen next]

---

## Governance Compliance

- [ ] All stages proceeding in order (no skipped stages)
- [ ] Traceability maintained (App Description → FRS → TRS → Architecture)
- [ ] All required approvals obtained
- [ ] Evidence artifacts created for each stage
- [ ] Module manifest up to date

---

## Notes and Observations

[Any additional notes, lessons learned, or observations about this module's progress through the lifecycle]

---

**Template Version**: 1.0.0 (includes TRS stage)  
**Template Authority**: MODULE_LIFECYCLE_AND_REPO_STRUCTURE_STRATEGY.md  
**Last Template Update**: 2026-02-13
