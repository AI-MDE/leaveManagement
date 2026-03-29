# Module: LeaveRequest (workflow)

**ID:** MOD-001 | **Table:** `leave_requests` | **Entity:** ENT-004
**Optimistic Locking:** yes | **Audit Required:** yes

---

## Responsibilities
- Own the full leave request lifecycle: submit, approve, reject, modify, cancel
- Enforce state transition rules via `LeaveRequestStateMachine`
- Enforce overlap constraint (BR-003) via `LeaveRequestValidator`
- Trigger domain events on every state change
- Delegate balance, audit, and notification concerns to their respective modules

## Exclusions
| Concern | Delegated To |
|---|---|
| Balance arithmetic | MOD-004 leave-balance |
| Leave type rule storage | MOD-003 leave-type |
| Email dispatch | MOD-005 notification |
| Audit record persistence | MOD-006 audit |
| Employee identity | MOD-002 employee |

---

## Dependencies
| Module | Reason |
|---|---|
| MOD-002 employee | Resolve requesting employee and their direct manager |
| MOD-003 leave-type | Read advance_notice_days and requires_balance |
| MOD-004 leave-balance | Validate, reserve, deduct, restore balance |
| MOD-005 notification | Trigger email notifications |
| MOD-006 audit | Append immutable audit entries |

---

## State Machine

**States:** `PENDING` · `APPROVED` · `REJECTED` · `CANCELLED`
**Initial:** `PENDING`

| From | Event | To | Guard | Actions |
|---|---|---|---|---|
| PENDING | approve | APPROVED | Manager auth | deduct balance, emit Approved |
| PENDING | reject | REJECTED | Manager auth | emit Rejected |
| PENDING | cancel | CANCELLED | Owner/HR | emit Cancelled |
| PENDING | modify | PENDING | Owner | increment version, emit Modified |
| APPROVED | cancel | CANCELLED | Owner/HR | restore balance, emit Cancelled |
| APPROVED | modify | PENDING | Owner | restore+re-reserve balance, increment version, emit Modified |

---

## Business Rules

| ID | Rule | Layer | Artifact |
|---|---|---|---|
| RULE-LR-01 | Advance notice check | service | SubmitLeaveRequestService |
| RULE-LR-02 | Overlap check | domain | LeaveRequestValidator |
| RULE-LR-03 | Balance restore on cancel of APPROVED | service | CancelLeaveRequestService |
| RULE-LR-04 | Re-approval required on modify of APPROVED | domain | LeaveRequestStateMachine |
| RULE-LR-05 | Manager authorization for approve/reject | service | ApproveLeaveRequestService, RejectLeaveRequestService |

---

## Service Interface

| Method | Command | Description |
|---|---|---|
| `submit` | SubmitLeaveRequestCommand | Validate and persist a new leave request |
| `modify` | ModifyLeaveRequestCommand | Update dates/reason; re-approval if was APPROVED |
| `cancel` | CancelLeaveRequestCommand | Cancel PENDING/APPROVED; restore balance if APPROVED |
| `approve` | ApproveLeaveRequestCommand | Approve PENDING; deduct balance |
| `reject` | RejectLeaveRequestCommand | Reject PENDING with optional comment |

---

## Query Service

| Method | Returns | Screen |
|---|---|---|
| `getByEmployee` | LeaveRequestReadDto[] | My Leave Requests (Employee) |
| `getPendingForManager` | LeaveRequestReadDto[] | Pending Approvals (Manager) |
| `getAllForHrAdmin` | LeaveRequestReadDto[] | All Leave Requests (HR Admin) |
| `getById` | LeaveRequestReadDto | Request Detail |

---

## API

| Method | Path | Description |
|---|---|---|
| POST | /api/leave-requests | Submit new request |
| GET | /api/leave-requests | List (scoped by role) |
| GET | /api/leave-requests/:id | Get by ID |
| PUT | /api/leave-requests/:id | Modify |
| POST | /api/leave-requests/:id/approve | Approve |
| POST | /api/leave-requests/:id/reject | Reject |
| POST | /api/leave-requests/:id/cancel | Cancel |

---

## Events Published

| Event | Trigger |
|---|---|
| LeaveRequestSubmittedEvent | submit |
| LeaveRequestApprovedEvent | approve |
| LeaveRequestRejectedEvent | reject |
| LeaveRequestCancelledEvent | cancel |
| LeaveRequestModifiedEvent | modify |
