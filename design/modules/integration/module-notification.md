# Module: Notification (integration)

**ID:** MOD-005 | **Table:** `notifications` | **Entity:** ENT-006
**Optimistic Locking:** no | **Audit Required:** no

---

## Responsibilities
- Listen to domain events from leave-request module
- Resolve correct recipients per event type using notification matrix
- Compose and dispatch email via IEmailAdapter
- Record delivery status (PENDING / SENT / FAILED)

## Exclusions
| Concern | Delegated To |
|---|---|
| Leave request state | MOD-001 leave-request |
| Employee email storage | MOD-002 employee |
| Retry logic | Out of scope |

---

## Dependencies
| Module | Reason |
|---|---|
| MOD-002 employee | Resolve recipient email addresses |

---

## Notification Matrix

| Event | Recipients |
|---|---|
| SUBMITTED | Manager |
| APPROVED | Employee |
| REJECTED | Employee |
| CANCELLED | Manager |
| MODIFIED_PENDING | Manager |
| MODIFIED_APPROVED | Manager, HR Admin |

---

## Business Rules

| ID | Rule | Layer | Artifact |
|---|---|---|---|
| RULE-NOT-01 | Email failures must not propagate to caller | service | NotificationService |

---

## Service Interface

| Method | Command | Description |
|---|---|---|
| `dispatch` | DispatchNotificationCommand | Dispatch email(s) for a leave event |

---

## API
None — event-driven only.
