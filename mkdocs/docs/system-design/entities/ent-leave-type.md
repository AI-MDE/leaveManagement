# LeaveType

- **ID:** ENT-002
- **Description:** A category of leave with its own rules (advance notice, balance tracking). Managed by HR Admin.

## Attributes

| Name | Type | Constraints | Notes |
|---|---|---|---|
| id | uuid | PK, NOT NULL |  |
| code | string | NOT NULL, UNIQUE | e.g. ANNUAL, SICK, UNPAID, MATERNITY_PATERNITY |
| name | string | NOT NULL |  |
| advance_notice_days | integer | NOT NULL | 0 = no advance notice required (e.g. Sick Leave) |
| requires_balance | boolean | NOT NULL | false = Unpaid leave does not deduct from a balance pool |
| is_active | boolean | NOT NULL, DEFAULT true |  |
| created_at | datetime | NOT NULL |  |
| updated_at | datetime | NOT NULL |  |

## Relationships

| Type | Target | Cardinality | Description |
|---|---|---|---|
| has_many | LeaveRequest | one-to-many | A LeaveType appears on many LeaveRequests |
| has_many | LeaveBalance | one-to-many | A LeaveType has one LeaveBalance per Employee |

## Source Refs

`LT-001`, `LT-002`, `LT-003`, `LT-004`, `BR-002`, `FR-004`
