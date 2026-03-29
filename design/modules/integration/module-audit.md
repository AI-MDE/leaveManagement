# Module: Audit (integration)

**ID:** MOD-006 | **Table:** `leave_audit_entries` | **Entity:** ENT-005
**Optimistic Locking:** no | **Audit Required:** no
**Note:** Append-only — no update or delete operations permitted on this table.

---

## Responsibilities
- Accept append-only audit entries from leave-request services
- Persist immutable records with actor, action, status transition, and optional snapshot
- Provide read-only audit trail queries for managers and HR Admin

## Exclusions
| Concern | Delegated To |
|---|---|
| Leave request state | MOD-001 leave-request |
| Notifications | MOD-005 notification |
| Update/delete of records | Prohibited — NFR-002 |

---

## Dependencies
| Module | Reason |
|---|---|
| MOD-002 employee | Resolve actor name for read queries |

---

## Business Rules

| ID | Rule | Layer | Artifact |
|---|---|---|---|
| RULE-AUD-01 | Append-only — no update or delete methods on repository | data_access | AuditRepository |

---

## Service Interface

| Method | Command | Description |
|---|---|---|
| `append` | AppendAuditEntryCommand | Insert an immutable audit entry |

---

## Query Service

| Method | Returns | Description |
|---|---|---|
| `getByLeaveRequest` | AuditEntryReadDto[] | Full audit trail for a leave request |
| `getByEmployee` | AuditEntryReadDto[] | All audit entries for an employee |

---

## API

| Method | Path | Description |
|---|---|---|
| GET | /api/leave-requests/:id/audit | Audit trail for a request |
| GET | /api/employees/:id/audit | Audit entries for an employee |
