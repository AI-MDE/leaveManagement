# Team Approvals

| | |
|---|---|
| **ID** | UI-M02 |
| **Route** | `/team-approvals` |
| **Entry** | `/team-approvals/pending` |
| **Users** | Manager |
| **Backend Modules** | MOD-004, MOD-003, MOD-001 |

Enables a Manager to review, approve, or reject leave requests from direct reports and monitor team leave history.

## Pages

### Pending Requests

| | |
|---|---|
| **Route** | `/team-approvals/pending` |
| **Pattern** | list |
| **Menu** | menu |
| **Roles** | Manager |
| **Business Function** | BF-004 |
| **Requirements** | FR-006, FR-007, FR-009 |

Shows the Manager the full list of PENDING leave requests from their direct reports, filterable and drill-through to individual decisions.

**Actions:**
- Review (`navigate`) → `/team-approvals/pending/:id`

**Filters:**
- leaveType (select)
- dateRange (date-range)

> **Empty state:** No pending requests. All leave requests from your team have been reviewed.

---
### Review Request

| | |
|---|---|
| **Route** | `/team-approvals/pending/:id` |
| **Pattern** | detail |
| **Menu** | menu |
| **Roles** | Manager |
| **Business Function** | BF-004 |
| **Requirements** | FR-007, FR-008, FR-009, FR-013b |

Displays all details of a single pending leave request and allows the Manager to approve or reject it with an optional comment.

**Actions:**
- Approve (`submit`) → `/team-approvals/pending`
- Reject (`modal`) → `/team-approvals/pending`
- Back to Pending (`navigate`) → `/team-approvals/pending`

---
### Team Leave History

| | |
|---|---|
| **Route** | `/team-approvals/history` |
| **Pattern** | list |
| **Menu** | menu |
| **Roles** | Manager |
| **Business Function** | BF-010 |
| **Requirements** | FR-015 |

Shows the Manager a filterable history of all leave requests from their direct reports across all statuses.

**Actions:**
- View Detail (`navigate`) → `/team-approvals/history/:id`

**Filters:**
- employee (select)
- status (select)
- leaveType (select)
- dateRange (date-range)

> **Empty state:** No leave history found for your team with the selected filters.

---
### Request History Detail

| | |
|---|---|
| **Route** | `/team-approvals/history/:id` |
| **Pattern** | detail |
| **Menu** | menu |
| **Roles** | Manager |
| **Business Function** | BF-011 |
| **Requirements** | FR-015, FR-016 |

Shows the Manager the complete detail and audit trail of a historical leave request from their direct report.

**Actions:**
- Back to Team History (`navigate`) → `/team-approvals/history`

---

## Navigation Flows

- `/team-approvals/pending` → `/team-approvals/pending/:id` via _Review_
- `/team-approvals/pending/:id` → `/team-approvals/pending` via _Approve_
- `/team-approvals/pending/:id` → `/team-approvals/pending` via _Reject_
- `/team-approvals/pending/:id` → `/team-approvals/pending` via _Back to Pending_
- `/team-approvals/history` → `/team-approvals/history/:id` via _View Detail_
- `/team-approvals/history/:id` → `/team-approvals/history` via _Back to Team History_
