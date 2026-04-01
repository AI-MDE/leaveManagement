# LeaveRequest

- **ID:** ENT-004
- **Description:** A request by an Employee for a period of leave. Drives the full approval lifecycle.

## Attributes

| Name | Type | Constraints | Notes |
|---|---|---|---|
| id | uuid | PK, NOT NULL |  |
| employee_id | uuid | FK -> Employee.id, NOT NULL |  |
| leave_type_id | uuid | FK -> LeaveType.id, NOT NULL |  |
| start_date | date | NOT NULL |  |
| end_date | date | NOT NULL |  |
| total_days | decimal | NOT NULL | Calculated at submission; excludes weekends/public holidays if applicable |
| reason | string | NULLABLE |  |
| status | enum | NOT NULL | State machine: PENDING → APPROVED | REJECTED; APPROVED → CANCELLED; PENDING → CANCELLED · values: PENDING, APPROVED, REJECTED, CANCELLED |
| submitted_at | datetime | NOT NULL |  |
| reviewed_at | datetime | NULLABLE |  |
| reviewed_by | uuid | FK -> Employee.id, NULLABLE | Manager who approved/rejected |
| manager_comment | string | NULLABLE |  |
| version | integer | NOT NULL, DEFAULT 1 | Incremented on each modification; re-approval resets status to PENDING |
| created_at | datetime | NOT NULL |  |
| updated_at | datetime | NOT NULL |  |

## Relationships

| Type | Target | Cardinality | Description |
|---|---|---|---|
| belongs_to | Employee | many-to-one | Requesting employee |
| belongs_to | LeaveType | many-to-one |  |
| belongs_to | Employee | many-to-one | Reviewing manager (nullable) |
| has_many | LeaveAuditEntry | one-to-many | Full audit trail of all state changes |

## Business Rules

- FR-002: balance must cover total_days at submission
- FR-004: start_date must be at least advance_notice_days from submitted_at for the given leave type
- FR-005: no overlap with other PENDING or APPROVED requests for same employee
- BR-004: cancellation of APPROVED request restores balance and notifies manager
- BR-005: modification of APPROVED request resets status to PENDING (re-approval required)

## Source Refs

`FR-001`, `FR-002`, `FR-004`, `FR-005`, `FR-007`, `FR-008`, `FR-010`, `FR-011`, `FR-012`, `BR-003`, `BR-004`, `BR-005`
