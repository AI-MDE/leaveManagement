# LeaveBalance

- **ID:** ENT-003
- **Description:** The current leave balance for a specific Employee and LeaveType. Updated on approval and restored on cancellation.

## Attributes

| Name | Type | Constraints | Notes |
|---|---|---|---|
| id | uuid | PK, NOT NULL |  |
| employee_id | uuid | FK -> Employee.id, NOT NULL |  |
| leave_type_id | uuid | FK -> LeaveType.id, NOT NULL |  |
| total_days | decimal | NOT NULL | Allocated entitlement for the period |
| used_days | decimal | NOT NULL, DEFAULT 0 |  |
| pending_days | decimal | NOT NULL, DEFAULT 0 | Days reserved by pending/approved-but-not-yet-started requests |
| period_year | integer | NOT NULL | Balances are tracked per calendar year |
| updated_at | datetime | NOT NULL |  |

## Relationships

| Type | Target | Cardinality | Description |
|---|---|---|---|
| belongs_to | Employee | many-to-one |  |
| belongs_to | LeaveType | many-to-one |  |

## Source Refs

`FR-002`, `FR-003`, `FR-008`, `BR-001`, `BR-004`
