# LeaveAuditEntry

- **ID:** ENT-005
- **Description:** Immutable audit record for every state change on a LeaveRequest. Satisfies FR-016 / NFR-002.

## Attributes

| Name | Type | Constraints | Notes |
|---|---|---|---|
| id | uuid | PK, NOT NULL |  |
| leave_request_id | uuid | FK -> LeaveRequest.id, NOT NULL |  |
| actor_id | uuid | FK -> Employee.id, NOT NULL | Who performed the action |
| action | enum | NOT NULL | Event type — append-only log · values: SUBMITTED, APPROVED, REJECTED, CANCELLED, MODIFIED, BALANCE_RESTORED |
| from_status | string | NULLABLE |  |
| to_status | string | NULLABLE |  |
| comment | string | NULLABLE |  |
| snapshot | jsonb | NULLABLE | Optional JSON snapshot of LeaveRequest at the time of the event |
| occurred_at | datetime | NOT NULL |  |

## Relationships

| Type | Target | Cardinality | Description |
|---|---|---|---|
| belongs_to | LeaveRequest | many-to-one |  |
| belongs_to | Employee | many-to-one | Actor who triggered the event |

## Source Refs

`FR-015`, `FR-016`, `NFR-002`
