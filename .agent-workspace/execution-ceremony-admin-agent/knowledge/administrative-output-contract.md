# Administrative Output Contract

**Version:** 1.0.0
**Role:** execution-ceremony-admin-agent

## Output Types

### ADMIN_CHECK

Required fields: `reviewed_head`, `merge_base`, `subject`, `observed_value`, `source`, and `result`.

### ADMIN_BLOCKED

Required fields: `reviewed_head`, `subject`, `observed_condition`, `source`, and `escalation_target`.

### ADMIN_OBSERVATION

Required fields: `reviewed_head`, `subject`, `observation`, and `source`.

## Boundary

Output records facts from the administrative checks. They do not direct implementation, alter scope, waive gates, or invoke IAA.
