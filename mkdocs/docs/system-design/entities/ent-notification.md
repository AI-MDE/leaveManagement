# Notification

- **ID:** ENT-006
- **Description:** An email notification record tracking what was sent, to whom, and for which event. Provides delivery traceability.

## Attributes

| Name | Type | Constraints | Notes |
|---|---|---|---|
| id | uuid | PK, NOT NULL |  |
| leave_request_id | uuid | FK -> LeaveRequest.id, NOT NULL |  |
| recipient_id | uuid | FK -> Employee.id, NOT NULL |  |
| event | enum | NOT NULL | values: SUBMITTED, APPROVED, REJECTED, CANCELLED, MODIFIED_PENDING, MODIFIED_APPROVED |
| channel | enum | NOT NULL | Email only per Q-005 · values: EMAIL |
| sent_at | datetime | NULLABLE | NULL if not yet dispatched |
| status | enum | NOT NULL | values: PENDING, SENT, FAILED |
| created_at | datetime | NOT NULL |  |

## Relationships

| Type | Target | Cardinality | Description |
|---|---|---|---|
| belongs_to | LeaveRequest | many-to-one |  |
| belongs_to | Employee | many-to-one | Recipient |

## Source Refs

`FR-013`, `FR-013a`, `FR-013b`, `FR-013c`, `FR-013d`, `FR-013e`
