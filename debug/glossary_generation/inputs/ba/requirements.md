# Requirements Baseline — Leave Management System

> **Status:** Baselined — all clarification questions resolved
> **Source:** ba/discovery/leave_management.md
> **Last updated:** 2026-03-27

---

## 1. Business Context

The Leave Management System enables employees to submit time-off requests, managers to approve or reject them, and HR Admins to oversee leave types, balances, and history. The system must maintain a full audit trail and respond within 2 seconds.

---

## 2. Actors

| ID      | Actor     | Role |
|---------|-----------|------|
| ACT-001 | Employee  | Submits, modifies, and cancels own leave requests; views own balance and history |
| ACT-002 | Manager   | Reviews and approves or rejects leave requests for direct reports |
| ACT-003 | HR Admin  | Manages leave types, balances, and system-wide configuration; oversees all requests |

---

## 3. Functional Requirements

### 3.1 Leave Request Submission

| ID     | Requirement | Status |
|--------|-------------|--------|
| FR-001 | An Employee shall be able to submit a leave request specifying leave type, start date, end date, and an optional reason. | Explicit |
| FR-002 | The system shall validate the Employee's available leave balance before submission. | Explicit |
| FR-003 | If balance is insufficient, the system shall block submission unless an override is permitted. | Explicit |
| FR-004 | The system shall enforce a minimum advance notice period per leave type: Annual Leave requires 14 days notice; Unpaid Leave requires 30 days notice; Maternity/Paternity Leave requires 30 days notice; Sick Leave has no advance notice requirement. | Resolved — Q-001 |
| FR-005 | The system shall prevent overlapping leave requests for the same employee. Team capacity is visible to managers but the system does not enforce team-level overlap. | Resolved — Q-002 |

### 3.2 Approval Workflow

| ID     | Requirement | Status |
|--------|-------------|--------|
| FR-006 | A submitted leave request shall be routed to the Employee's direct Manager for approval. | Explicit |
| FR-007 | A Manager shall be able to approve or reject a leave request with an optional comment. | Explicit |
| FR-008 | On approval, the system shall deduct the approved days from the Employee's leave balance. | Explicit |
| FR-009 | The approval chain is single-level: Employee submits to direct Manager. HR Admin can override or intervene but is not part of the standard approval chain. | Resolved — Q-003 |

### 3.3 Modify and Cancel

| ID     | Requirement | Status |
|--------|-------------|--------|
| FR-010 | An Employee shall be able to modify a pending (not yet approved) leave request. Modification of an approved request requires re-approval. | Resolved — Q-004 |
| FR-011 | An Employee shall be able to cancel a pending leave request. | Explicit |
| FR-012 | An Employee shall be able to cancel an approved leave request. On cancellation, the system shall restore the balance and notify the Manager. | Resolved — Q-004 |

### 3.4 Notifications

| ID     | Requirement | Status |
|--------|-------------|--------|
| FR-013 | The system shall send email notifications on the following events: | Resolved — Q-005 |
| FR-013a | On submission: notify Manager. | Resolved |
| FR-013b | On approval or rejection: notify Employee. | Resolved |
| FR-013c | On cancellation of any request: notify Manager. | Resolved |
| FR-013d | On modification of a pending request: notify Manager. | Resolved |
| FR-013e | On modification of an approved request: notify Manager and HR Admin. | Resolved |

### 3.5 Leave History and Audit

| ID     | Requirement | Status |
|--------|-------------|--------|
| FR-015 | The system shall maintain a full history of all leave requests per employee. | Explicit |
| FR-016 | The system shall maintain a full audit trail of all state changes. | Explicit |

---

## 4. Business Rules

| ID     | Rule | Status |
|--------|------|--------|
| BR-001 | An employee cannot submit a leave request that exceeds their available balance, unless explicitly overridden by HR Admin. | Baselined |
| BR-002 | Advance notice rules by leave type: Annual Leave — 14 days; Unpaid Leave — 30 days; Maternity/Paternity Leave — 30 days; Sick Leave — none. | Resolved — Q-001 |
| BR-003 | No employee may have two overlapping approved or pending leave requests. Overlap checking is per-employee only; team capacity is informational, not enforced. | Resolved — Q-002 |
| BR-004 | Cancellation of an approved leave request restores the deducted balance and triggers a notification to the Manager. | Resolved — Q-004 |
| BR-005 | Modification of an approved leave request requires re-approval and notifies Manager and HR Admin. | Resolved — Q-004 |

---

## 5. Leave Types

| ID   | Name                    | Advance Notice | Notes |
|------|-------------------------|----------------|-------|
| LT-001 | Annual Leave          | 14 days        |       |
| LT-002 | Sick Leave            | None           |       |
| LT-003 | Unpaid Leave          | 30 days        |       |
| LT-004 | Maternity/Paternity Leave | 30 days    |       |

---

## 6. Non-Functional Requirements

| ID      | Requirement | Status |
|---------|-------------|--------|
| NFR-001 | The system shall respond to user actions within 2 seconds under normal load. | Explicit |
| NFR-002 | The system shall maintain a full audit trail of all data changes. | Explicit |

---

## 7. Out of Scope (Assumed)

- Payroll system integration
- External calendar synchronisation
- Leave accrual engine / automatic balance top-up
- Team-level capacity enforcement (visible but not enforced)

---

## 8. Open Items

None. All clarification questions resolved. See `project/completed-Questions.json` for the accepted answers.
