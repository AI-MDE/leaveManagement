# Entity Relationship Diagram

> Derived from `ba/data-model/logical-data-model.json` v1.0

```mermaid
erDiagram
    Employee {
        uuid id PK
        string name
        string email UK
        uuid manager_id FK
        enum role "EMPLOYEE | MANAGER | HR_ADMIN"
        datetime created_at
        datetime updated_at
    }

    LeaveType {
        uuid id PK
        string code UK "ANNUAL | SICK | UNPAID | MATERNITY_PATERNITY"
        string name
        integer advance_notice_days
        boolean requires_balance
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    LeaveBalance {
        uuid id PK
        uuid employee_id FK
        uuid leave_type_id FK
        decimal total_days
        decimal used_days
        decimal pending_days
        integer period_year
        datetime updated_at
    }

    LeaveRequest {
        uuid id PK
        uuid employee_id FK
        uuid leave_type_id FK
        date start_date
        date end_date
        decimal total_days
        string reason
        enum status "PENDING | APPROVED | REJECTED | CANCELLED"
        datetime submitted_at
        datetime reviewed_at
        uuid reviewed_by FK
        string manager_comment
        integer version
        datetime created_at
        datetime updated_at
    }

    LeaveAuditEntry {
        uuid id PK
        uuid leave_request_id FK
        uuid actor_id FK
        enum action "SUBMITTED | APPROVED | REJECTED | CANCELLED | MODIFIED | BALANCE_RESTORED"
        string from_status
        string to_status
        string comment
        json snapshot
        datetime occurred_at
    }

    Notification {
        uuid id PK
        uuid leave_request_id FK
        uuid recipient_id FK
        enum event "SUBMITTED | APPROVED | REJECTED | CANCELLED | MODIFIED_PENDING | MODIFIED_APPROVED"
        enum channel "EMAIL"
        datetime sent_at
        enum status "PENDING | SENT | FAILED"
        datetime created_at
    }

    Employee ||--o{ Employee : "manages (manager_id)"
    Employee ||--o{ LeaveRequest : "submits (employee_id)"
    Employee ||--o{ LeaveBalance : "holds (employee_id)"
    Employee ||--o{ LeaveRequest : "reviews (reviewed_by)"
    Employee ||--o{ LeaveAuditEntry : "actor (actor_id)"
    Employee ||--o{ Notification : "recipient (recipient_id)"

    LeaveType ||--o{ LeaveRequest : "categorises (leave_type_id)"
    LeaveType ||--o{ LeaveBalance : "defines pool (leave_type_id)"

    LeaveRequest ||--o{ LeaveAuditEntry : "audited by (leave_request_id)"
    LeaveRequest ||--o{ Notification : "triggers (leave_request_id)"
```

## Module Ownership

| Entity | Module |
|---|---|
| Employee | employee |
| LeaveType | leave-type |
| LeaveBalance | leave-balance |
| LeaveRequest | leave-request |
| LeaveAuditEntry | audit |
| Notification | notification |

## Key Constraints

- `LeaveBalance` has a composite unique constraint on `(employee_id, leave_type_id, period_year)`
- `LeaveAuditEntry` is append-only — rows are never updated or deleted
- `Employee.manager_id` is NULL for top-level employees and HR Admins
