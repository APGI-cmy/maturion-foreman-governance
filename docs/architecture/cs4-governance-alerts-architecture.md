# CS4: Critical Governance Ping Notification System Architecture

**Status:** ACTIVE  
**Version:** 1.0  
**Last Updated:** 2025-12-10  
**Architect:** Foreman  
**Priority:** 🔥 BLOCKER — REQUIRED BEFORE AUTONOMY MODE

---

## Purpose

CS4 creates a bi-directional, constitutional-grade alerting system that provides real-time, high-severity notifications for critical governance events. This system ensures that governance failures cannot occur silently and that all violations are immediately surfaced to the user with complete diagnostic information.

This architecture implements the management principle:  
**"I need a central point with proper performance dashboards and a proper feedback loop. I get notified when something breaks — not the other way around."**

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                   CS4 Alert System Architecture                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Alert Sources (Triggers)                     │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │  QIEL │ Drift │ CS1 │ CS2 │ CS3 │ QIC │ Builder │ PR    │   │
│  └─────┬───────────────────────────────────────────────┬────┘   │
│        │                                                │         │
│        ▼                                                ▼         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │             Alert Engine (Core)                          │    │
│  │  - raiseAlert()                                          │    │
│  │  - raiseCriticalAlert()                                  │    │
│  │  - attachAlertToIncident()                               │    │
│  │  - logAlertToGovernanceMemory()                          │    │
│  └─────┬──────────────────────────────────────────┬────────┘    │
│        │                                           │              │
│        ▼                                           ▼              │
│  ┌──────────────────────┐              ┌──────────────────────┐ │
│  │   Alert Storage      │              │   Notification       │ │
│  │   (memory/alerts/)   │              │   Channels           │ │
│  │   - JSON persistence │              │   - UI Bell          │ │
│  │   - Query/filter     │              │   - Desktop Push     │ │
│  │                      │              │   - Mobile Push      │ │
│  │                      │              │   - Sound Ping       │ │
│  └──────────────────────┘              └──────────────────────┘ │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │               Alert UI Dashboard                          │   │
│  │   /foreman/governance-alerts                              │   │
│  │   - List view                                             │   │
│  │   - Detail view                                           │   │
│  │   - Acknowledge/Dismiss                                   │   │
│  │   - Convert to Incident (CS3)                             │   │
│  │   - Historical timeline                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. Alert Data Model

**Location:** `lib/foreman/alerts/alert-model.ts`

**Type Definitions:**

```typescript
export type AlertSeverity = 1 | 2 | 3 | 4 | 5;

export type AlertCategory =
  | 'qiel'
  | 'drift'
  | 'guardrail'
  | 'pr'
  | 'qa'
  | 'builder'
  | 'deployment'
  | 'architecture'
  | 'suppression'
  | 'unauthorized';

export type AlertType = 'high' | 'medium' | 'low';

export type AlertState = 'active' | 'acknowledged' | 'dismissed' | 'escalated';

export interface Alert {
  id: string;                          // Unique identifier (alert_{timestamp}_{random})
  type: AlertType;                     // Priority level
  category: AlertCategory;             // Alert category
  message: string;                     // Human-readable message
  details: string;                     // Detailed diagnostic information
  timestamp: string;                   // ISO 8601 timestamp
  requires_ack: boolean;               // Must be acknowledged before dismissal
  acknowledged_by?: string;            // User ID who acknowledged
  acknowledged_at?: string;            // When acknowledged
  incident_id?: string;                // Linked incident ID (CS3)
  severity: AlertSeverity;             // 1-5 scale (5 = most critical)
  sound: boolean;                      // Play sound notification
  metadata?: Record<string, any>;      // Additional context
  state: AlertState;                   // Current state
  dismissed_at?: string;               // When dismissed
  dismissed_by?: string;               // Who dismissed
}

export interface AlertFilter {
  category?: AlertCategory;
  type?: AlertType;
  state?: AlertState;
  since?: Date;
  until?: Date;
  limit?: number;
}
```

**Functions:**

```typescript
/**
 * Create a new alert with auto-generated ID and timestamp
 */
export function createAlert(params: {
  type: AlertType;
  category: AlertCategory;
  message: string;
  details: string;
  severity: AlertSeverity;
  requires_ack?: boolean;
  sound?: boolean;
  metadata?: Record<string, any>;
}): Alert;

/**
 * Acknowledge an alert
 */
export function acknowledgeAlert(
  alert: Alert,
  userId: string
): Alert;

/**
 * Dismiss an alert (only if acknowledged or not requiring acknowledgment)
 */
export function dismissAlert(
  alert: Alert,
  userId: string
): Alert | Error;

/**
 * Escalate alert to incident (CS3 integration)
 */
export function escalateToIncident(
  alert: Alert,
  incidentId: string
): Alert;
```

---

### 2. Alert Engine

**Location:** `lib/foreman/alerts/alert-engine.ts`

**Purpose:** Central alert management and routing system

**Core Functions:**

```typescript
/**
 * Raise a standard alert
 * - Creates alert
 * - Saves to storage
 * - Logs to governance memory
 * - Triggers notifications
 */
export async function raiseAlert(params: {
  type: AlertType;
  category: AlertCategory;
  message: string;
  details: string;
  severity: AlertSeverity;
  metadata?: Record<string, any>;
}): Promise<Alert>;

/**
 * Raise a critical alert (automatic high priority)
 * - Sets type='high', severity=5, requires_ack=true, sound=true
 * - Blocks execution if appropriate
 * - Forces immediate notification
 */
export async function raiseCriticalAlert(params: {
  category: AlertCategory;
  message: string;
  details: string;
  metadata?: Record<string, any>;
}): Promise<Alert>;

/**
 * Attach alert to existing incident (CS3)
 */
export async function attachAlertToIncident(
  alertId: string,
  incidentId: string
): Promise<Alert>;

/**
 * Log alert to governance memory
 */
async function logAlertToGovernanceMemory(alert: Alert): Promise<void>;

/**
 * Trigger notification channels
 */
async function notifyChannels(alert: Alert): Promise<void>;

/**
 * Send desktop notification
 */
async function notifyUserDesktop(alert: Alert): Promise<void>;

/**
 * Send mobile push notification (API call)
 */
async function notifyUserMobile(alert: Alert): Promise<void>;

/**
 * Get active alerts
 */
export async function getActiveAlerts(
  filter?: AlertFilter
): Promise<Alert[]>;

/**
 * Get alert by ID
 */
export async function getAlert(alertId: string): Promise<Alert | null>;

/**
 * Acknowledge alert by ID
 */
export async function acknowledgeAlertById(
  alertId: string,
  userId: string
): Promise<Alert>;

/**
 * Dismiss alert by ID
 */
export async function dismissAlertById(
  alertId: string,
  userId: string
): Promise<Alert>;
```

---

### 3. Alert Storage

**Location:** `lib/foreman/alerts/storage.ts`

**Storage Location:** `memory/alerts/*.json`

**Functions:**

```typescript
/**
 * Save alert to persistent storage
 */
export async function saveAlert(alert: Alert): Promise<void>;

/**
 * Load alert by ID
 */
export async function loadAlert(alertId: string): Promise<Alert | null>;

/**
 * List all alerts with optional filtering
 */
export async function listAlerts(filter?: AlertFilter): Promise<Alert[]>;

/**
 * Get active alerts (not dismissed)
 */
export async function getActiveAlerts(): Promise<Alert[]>;

/**
 * Get acknowledged alerts
 */
export async function getAcknowledgedAlerts(): Promise<Alert[]>;

/**
 * Get dismissed alerts
 */
export async function getDismissedAlerts(): Promise<Alert[]>;

/**
 * Get alerts by category
 */
export async function getAlertsByCategory(
  category: AlertCategory
): Promise<Alert[]>;

/**
 * Get high-severity alerts
 */
export async function getCriticalAlerts(): Promise<Alert[]>;

/**
 * Update alert in storage
 */
export async function updateAlert(alert: Alert): Promise<void>;

/**
 * Delete alert from storage
 */
export async function deleteAlert(alertId: string): Promise<void>;
```

**Storage Schema:**
- Each alert stored as: `memory/alerts/{alert_id}.json`
- Index file: `memory/alerts/index.json` (for quick queries)

---

### 4. Alert Source Integrations

All core subsystems must raise alerts for critical governance events:

#### 4.1 QIEL Integration

**Location:** `lib/foreman/qa/qiel-runner.ts` (modify existing)

**Alert Triggers:**
- QIEL failure → `raiseAlert({ type: 'high', category: 'qiel', ... })`
- Missing logs → `raiseAlert({ type: 'medium', category: 'qiel', ... })`
- Schema mismatch → `raiseAlert({ type: 'high', category: 'qiel', ... })`
- Missing workflows → `raiseCriticalAlert({ category: 'qiel', ... })`
- Drift in env-diff → `raiseAlert({ type: 'medium', category: 'drift', ... })`

#### 4.2 Guardrails (CS1) Integration

**Location:** `lib/foreman/guardrails/validator.ts` (modify existing)

**Alert Triggers:**
- Unauthorized modification → `raiseCriticalAlert({ category: 'guardrail', ... })`
- Hash mismatch → `raiseCriticalAlert({ category: 'guardrail', ... })`
- Suppression attempts → `raiseCriticalAlert({ category: 'suppression', ... })`

#### 4.3 Architecture Approval (CS2) Integration

**Location:** `lib/foreman/architecture/approval.ts` (modify existing)

**Alert Triggers:**
- Architecture change without ACR → `raiseCriticalAlert({ category: 'architecture', ... })`
- Agent contract mismatch → `raiseCriticalAlert({ category: 'architecture', ... })`

#### 4.4 Incident Workflow (CS3) Integration

**Location:** `lib/foreman/incidents/incident-engine.ts` (modify existing)

**Alert Triggers:**
- Fix loop failing after 3+ attempts → `raiseAlert({ type: 'high', category: 'qa', ... })`
- Incident requires ACR → `raiseAlert({ type: 'medium', category: 'architecture', ... })`

#### 4.5 Drift Detector Integration

**Location:** `lib/foreman/governance/drift-detector.ts` (modify existing)

**Alert Triggers:**
- Any drift type (23 total) → `raiseAlert({ type: 'medium', category: 'drift', ... })`
- Critical drift → `raiseCriticalAlert({ category: 'drift', ... })`

#### 4.6 Builder Violations

**Location:** `lib/foreman/dispatch.ts` (modify existing)

**Alert Triggers:**
- Builder attempts forbidden action → `raiseCriticalAlert({ category: 'builder', ... })`
- Builder privilege escalation → `raiseCriticalAlert({ category: 'unauthorized', ... })`

#### 4.7 PR Validation

**Location:** `lib/foreman/pr-gatekeeper.ts` (modify existing)

**Alert Triggers:**
- Deployment check skipped → `raiseCriticalAlert({ category: 'deployment', ... })`
- Zero-warning policy violation → `raiseAlert({ type: 'high', category: 'qa', ... })`
- Missing tests → `raiseAlert({ type: 'high', category: 'qa', ... })`
- New deprecated warnings → `raiseAlert({ type: 'medium', category: 'qa', ... })`

---

### 5. API Endpoints

**Base Path:** `/api/foreman/alerts/`

#### POST `/api/foreman/alerts/create`

**Purpose:** Create new alert (typically called by subsystems)

**Request:**
```typescript
{
  type: AlertType;
  category: AlertCategory;
  message: string;
  details: string;
  severity: AlertSeverity;
  metadata?: Record<string, any>;
}
```

**Response:**
```typescript
{
  success: boolean;
  alert: Alert;
  message: string;
}
```

**Authentication:** Required (internal API key or session)

**Authorization:** System-level only

---

#### GET `/api/foreman/alerts`

**Purpose:** List alerts or get specific alert

**Query Params:**
- `id` (optional): Get specific alert by ID
- `category` (optional): Filter by category
- `type` (optional): Filter by type
- `state` (optional): Filter by state
- `limit` (optional): Limit results (default: 50)

**Response:**
```typescript
{
  success: boolean;
  alerts: Alert[];
  total: number;
}
```

**Authentication:** Required

**Authorization:** User must have foreman access

---

#### POST `/api/foreman/alerts/:id/acknowledge`

**Purpose:** Acknowledge an alert

**Request Body:**
```typescript
{
  userId: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  alert: Alert;
  message: string;
}
```

**Authentication:** Required

**Authorization:** User must have foreman access

---

#### POST `/api/foreman/alerts/:id/dismiss`

**Purpose:** Dismiss an alert (only if acknowledged or not requiring ack)

**Request Body:**
```typescript
{
  userId: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  alert: Alert;
  message: string;
}
```

**Authentication:** Required

**Authorization:** User must have foreman access

---

#### POST `/api/foreman/alerts/:id/escalate`

**Purpose:** Convert alert to incident (CS3 integration)

**Request Body:**
```typescript
{
  component: string;
  description: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  alert: Alert;
  incident: Incident; // from CS3
  message: string;
}
```

**Authentication:** Required

**Authorization:** User must have foreman access

---

#### POST `/api/foreman/alerts/push`

**Purpose:** Send mobile push notification

**Request Body:**
```typescript
{
  alertId: string;
  userId: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

**Authentication:** Required

**Authorization:** User must own the alert or have admin access

---

### 6. UI Components

#### 6.1 Alerts Dashboard Page

**Location:** `app/foreman/governance-alerts/page.tsx`

**Purpose:** Main dashboard for viewing and managing alerts

**Features:**
- Alert list with severity badges
- Filter by category, type, state
- Sort by timestamp, severity
- Click alert to view details
- Acknowledge button (if not yet acknowledged)
- Dismiss button (if acknowledged or not requiring ack)
- Convert-to-incident button
- Historical timeline view

**Layout:**
```
┌───────────────────────────────────────────────┐
│  Governance Alerts                             │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐         │
│  │ All  │ │Active│ │ High │ │Acked │         │
│  └──────┘ └──────┘ └──────┘ └──────┘         │
│                                                │
│  ┌────────────────────────────────────────┐  │
│  │ 🔴 [CRITICAL] QIEL Failure             │  │
│  │ Timestamp: 2025-12-10 15:30:00         │  │
│  │ [Acknowledge] [Details]                │  │
│  └────────────────────────────────────────┘  │
│                                                │
│  ┌────────────────────────────────────────┐  │
│  │ 🟡 [MEDIUM] Drift Detected             │  │
│  │ Timestamp: 2025-12-10 15:25:00         │  │
│  │ [Acknowledge] [Details]                │  │
│  └────────────────────────────────────────┘  │
│                                                │
└───────────────────────────────────────────────┘
```

**State Management:**
- Use React Query for data fetching
- Automatic refetch every 10 seconds for active alerts
- Optimistic updates for acknowledge/dismiss

**Accessibility:**
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader announcements for new alerts

---

#### 6.2 Alert Detail Modal

**Component:** `components/foreman/alerts/AlertDetailModal.tsx`

**Purpose:** Show full alert details

**Content:**
- Alert ID
- Timestamp (formatted)
- Category badge
- Severity indicator
- Full message
- Full details (formatted)
- Metadata (JSON viewer)
- State history
- Linked incident (if any)
- Action buttons (acknowledge, dismiss, escalate)

---

#### 6.3 Notification Bell Component

**Location:** `components/foreman/notifications/NotificationBell.tsx`

**Purpose:** Display unacknowledged alert count in header

**Features:**
- Bell icon with badge showing count
- Red color for high-severity alerts
- Click to open alerts dropdown
- Dropdown shows recent 5 alerts
- "View All" link to alerts dashboard

**Position:** Top-right corner of Foreman app header

---

#### 6.4 Alert List Item Component

**Location:** `components/foreman/alerts/AlertListItem.tsx`

**Purpose:** Reusable alert card component

**Props:**
```typescript
{
  alert: Alert;
  onAcknowledge: (alertId: string) => void;
  onDismiss: (alertId: string) => void;
  onEscalate: (alertId: string) => void;
  onViewDetails: (alertId: string) => void;
}
```

---

### 7. Notification System

#### 7.1 Desktop Notifications

**Implementation:** Browser Notification API

**Location:** `lib/foreman/alerts/desktop-notifications.ts`

**Functions:**
```typescript
/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<boolean>;

/**
 * Show desktop notification
 */
export async function showDesktopNotification(alert: Alert): Promise<void>;
```

**Behavior:**
- Request permission on first app load
- Show notification for high and critical alerts
- Click notification opens alert detail

---

#### 7.2 Mobile Push Notifications

**Implementation:** Web Push API + Service Worker

**Service Worker:** `public/sw.js`

**Functions:**
```typescript
// In lib/foreman/alerts/push-notifications.ts
export async function subscribeToPush(userId: string): Promise<void>;
export async function sendPushNotification(alert: Alert, userId: string): Promise<void>;
```

**Requirements:**
- User must grant push permission
- Subscription stored in `memory/push-subscriptions/{userId}.json`

---

#### 7.3 Sound Notifications

**Sound File:** `public/sounds/governance_ping.mp3`

**Implementation:** `lib/foreman/alerts/sound-notifications.ts`

```typescript
/**
 * Play alert sound
 */
export function playAlertSound(): void;
```

**Behavior:**
- Play sound only for high-severity alerts (severity >= 4)
- Respect user's sound preferences (stored in localStorage)
- Short, distinctive ping sound (~1 second)

---

### 8. Governance Integration

#### 8.1 Governance Memory Logging

**All alerts MUST log to governance memory:**

```typescript
// Event types
const GOVERNANCE_EVENT_TYPES = {
  ALERT_CREATED: 'governance_ping_high' | 'governance_ping_medium' | 'governance_ping_low',
  ALERT_ACKNOWLEDGED: 'alert_acknowledged',
  ALERT_DISMISSED: 'alert_dismissed',
  ALERT_ESCALATED: 'alert_escalated_to_incident',
};

// Example
await logGovernanceEvent({
  type: 'governance_ping_high',
  severity: 'critical',
  description: `Critical alert raised: ${alert.message}`,
  metadata: {
    alertId: alert.id,
    category: alert.category,
    details: alert.details,
  },
});
```

#### 8.2 Alert Persistence

**Location:** `memory/alerts/`

**Structure:**
```
memory/
  alerts/
    index.json              # Alert index for quick lookup
    alert_{id}.json         # Individual alert files
    2025-12/                # Monthly archives
      alert_{id}.json
```

---

### 9. Error Handling

#### Error Scenarios

1. **Alert Creation Fails**
   - Fallback: Log to console and governance memory
   - Recovery: Retry alert creation
   - User messaging: "Failed to create alert. Retrying..."

2. **Storage Write Fails**
   - Fallback: Keep alert in memory
   - Recovery: Retry write after 5 seconds
   - User messaging: "Alert saved to memory (pending persistence)"

3. **Notification Send Fails**
   - Fallback: Alert still created and stored
   - Recovery: Retry notification
   - User messaging: "Alert created (notification pending)"

4. **API Endpoint Errors**
   - 400: Invalid request → Return validation errors
   - 401: Unauthorized → Redirect to login
   - 404: Alert not found → Return error message
   - 500: Server error → Log and return generic error

5. **Sound Play Fails**
   - Fallback: Silent notification
   - No retry (non-critical)

---

### 10. Security Architecture

#### Authentication
- All API endpoints require authentication
- Session-based authentication via Next.js
- Internal alerts use system API key

#### Authorization
- Only Foreman users can view alerts
- Only Foreman users can acknowledge/dismiss alerts
- System subsystems can create alerts (via API key)

#### Data Protection
- Alerts may contain sensitive diagnostic information
- Redact secrets and tokens in alert details
- Alerts are user-scoped (future: multi-tenant support)

#### Input Validation
- Validate all alert fields before creation
- Sanitize message and details to prevent XSS
- Validate alertId format in API requests

---

### 11. Performance Architecture

#### Performance Requirements
- Alert creation: < 100ms
- Alert listing: < 200ms
- Notification delivery: < 500ms
- Sound playback: < 100ms

#### Optimization Strategies
- **Caching:** Cache active alerts in memory
- **Indexing:** Maintain index.json for quick queries
- **Lazy Loading:** Load alert details on demand
- **Pagination:** Limit list queries to 50 alerts
- **Archiving:** Move old alerts to monthly archives

#### Performance Monitoring
- Track alert creation time
- Monitor notification delivery success rate
- Alert on notification failures

---

### 12. Testing Architecture

#### Test Coverage Strategy

**Unit Tests:**
- Alert model functions (create, acknowledge, dismiss)
- Alert engine functions (raise, escalate, notify)
- Storage functions (save, load, query)

**Integration Tests:**
- QIEL raises alerts correctly
- Drift detector raises alerts correctly
- CS1 guardrails raise alerts correctly
- Alerts logged to governance memory

**QIC/QIEL Tests:**
- `tests/qic/governance-alerts.test.ts` - Enforce alert functionality
- `tests/qiel/alert-diff.test.ts` - Verify alert schema consistency

**E2E Tests:**
- Create alert → appears in UI
- Acknowledge alert → state updates
- Dismiss alert → removed from active list
- Escalate to incident → CS3 integration works

#### Test Scenarios

**Happy Path:**
1. QIEL fails → Alert created → Notification sent → User acknowledges → Alert dismissed
2. Drift detected → Alert raised → User escalates → Incident created (CS3)

**Error Path:**
1. Alert creation fails → Fallback to console log → Retry succeeds
2. Notification permission denied → Alert still created
3. Sound file missing → Silent notification

**Edge Cases:**
1. Attempt to dismiss without acknowledge (requires_ack=true) → Error
2. Escalate already-escalated alert → Error
3. Acknowledge already-acknowledged alert → Idempotent success
4. Create alert with invalid severity → Validation error

---

### 13. Deployment Architecture

#### Build Configuration
- No special build steps required
- Sound file included in public assets
- Service worker registered for push notifications

#### Environment Variables
```
# Optional: External push notification service
PUSH_NOTIFICATION_API_KEY=...
PUSH_NOTIFICATION_SERVICE_URL=...

# Optional: Alert retention period (days)
ALERT_RETENTION_DAYS=90
```

#### Deployment Strategy
- Deploy with normal Vercel deployment
- No database migrations required (JSON storage)
- Test alert system after deployment

#### Post-Deployment
- Health check: Create test alert and verify it appears
- Smoke test: Verify notification bell displays
- Monitor: Check governance memory for alert events

---

### 14. Documentation

#### Code Documentation
- JSDoc comments for all public functions
- Type definitions documented with examples
- Complex alert logic explained with comments

#### User Documentation
- Add "Governance Alerts" section to Foreman docs
- Explain alert severity levels
- Document how to acknowledge/dismiss/escalate

#### Developer Documentation
- Integration guide for adding new alert sources
- Alert schema documentation
- API endpoint reference

---

## Alert Severity Guidelines

| Severity | Type     | Description | Examples | Sound | Requires Ack |
|----------|----------|-------------|----------|-------|--------------|
| 5        | high     | Critical governance violation | QIEL failure, guardrail violation, unauthorized modification | Yes | Yes |
| 4        | high     | High-priority issue | Architecture violation, deployment check skipped | Yes | Yes |
| 3        | medium   | Moderate concern | Drift detected, missing tests | No | Yes |
| 2        | medium   | Low-priority issue | Deprecated warning | No | No |
| 1        | low      | Informational | Fix loop retry | No | No |

---

## Alert Categories

| Category | Description | Example Triggers |
|----------|-------------|------------------|
| `qiel` | QIEL system failures | QIEL run failed, schema mismatch |
| `drift` | Drift detector alerts | Environment drift, config drift |
| `guardrail` | CS1 guardrail violations | Hash mismatch, unauthorized file change |
| `pr` | PR validation issues | Missing tests, zero-warning violation |
| `qa` | QA/QIC failures | Test failures, lint errors |
| `builder` | Builder violations | Forbidden action attempt |
| `deployment` | Deployment issues | Check skipped, build failed |
| `architecture` | Architecture violations | Change without ACR |
| `suppression` | Suppression attempts | Error suppression, warning suppression |
| `unauthorized` | Unauthorized actions | Privilege escalation |

---

## Governance Memory Event Types

All alerts log to governance memory with these event types:

- `governance_ping_high` - High-severity alert
- `governance_ping_medium` - Medium-severity alert
- `governance_ping_low` - Low-severity alert
- `alert_acknowledged` - Alert acknowledged by user
- `alert_dismissed` - Alert dismissed by user
- `alert_escalated_to_incident` - Alert escalated to CS3 incident

---

## Success Criteria

✅ **Alert System Operational**
- Alerts created instantly when governance events occur
- All alert categories functional
- Storage persistence working

✅ **Notifications Working**
- UI bell shows unacknowledged count
- Desktop notifications appear (with permission)
- Sound plays for high-severity alerts
- Mobile push notifications sent (future)

✅ **UI Dashboard Functional**
- Alerts list displays correctly
- Filter and sort work
- Acknowledge/dismiss/escalate actions work
- Alert details view functional

✅ **Governance Integration Complete**
- All subsystems raise appropriate alerts
- All alerts logged to governance memory
- CS3 escalation works

✅ **Quality Gates Pass**
- All QIC tests pass
- All QIEL tests pass
- Zero lint errors
- Zero type errors
- 100% test coverage on alert core

✅ **Constitutional Compliance**
- No silent failures possible
- Foreman cannot suppress alerts
- All governance violations surfaced
- Complete audit trail maintained

---

## Integration Points

### CS1 (Guardrails)
- Raise critical alert on any guardrail violation
- Alert details include file path, hash mismatch info

### CS2 (Architecture Approval)
- Raise critical alert on architecture change without ACR
- Alert details include attempted change description

### CS3 (Incident Feedback)
- Allow escalating alerts to incidents
- Link alerts to related incidents
- Incident resolution can auto-dismiss related alerts

### QIEL
- Raise alert on QIEL failure
- Alert details include failed checks, environment diff

### Drift Detector
- Raise alert for each drift type detected
- Alert details include drift type, affected resources

### PR Gatekeeper
- Raise alert when deployment checks skipped
- Alert details include PR URL, skipped checks

---

## Future Enhancements (Not in CS4 Scope)

- Email notifications
- Slack/Teams integration
- Alert analytics dashboard
- Alert templates for common scenarios
- Alert routing rules
- Alert auto-resolution for transient issues
- Multi-user alert assignment
- Alert SLA tracking

---

## Dependencies

- `lib/foreman/memory/governance-memory.ts` - For logging
- `lib/foreman/incidents/` - For CS3 escalation
- `lib/foreman/guardrails/` - For CS1 integration
- `lib/foreman/governance/drift-detector.ts` - For drift integration
- `lib/foreman/pr-gatekeeper.ts` - For PR integration
- `lib/foreman/qa/qiel-runner.ts` - For QIEL integration

---

*This architecture is complete and ready for QA creation and implementation.*

**Next Steps:**
1. Validate against Architecture Design Checklist
2. Create Red QA test suite
3. Build to Green
