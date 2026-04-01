# Employee

- **ID:** ENT-001
- **Description:** A person who can submit leave requests. May also be a Manager for other employees.
- **Actor Ref:** ACT-001

## Attributes

| Name | Type | Constraints | Notes |
|---|---|---|---|
| id | uuid | PK, NOT NULL |  |
| name | string | NOT NULL |  |
| email | string | NOT NULL, UNIQUE |  |
| manager_id | uuid | FK -> Employee.id, NULLABLE | NULL for top-level employees / HR Admins |
| role | enum | NOT NULL | A Manager is also an Employee; role drives capability, not a separate table · values: EMPLOYEE, MANAGER, HR_ADMIN |
| created_at | datetime | NOT NULL |  |
| updated_at | datetime | NOT NULL |  |

## Relationships

| Type | Target | Cardinality | Description |
|---|---|---|---|
| self | Employee | many-to-one | Employee has one direct Manager |
| has_many | LeaveRequest | one-to-many | Employee has many LeaveRequests |
| has_many | LeaveBalance | one-to-many | Employee has one LeaveBalance per LeaveType |

## Source Refs

`ACT-001`, `ACT-002`, `ACT-003`, `FR-006`, `FR-009`
