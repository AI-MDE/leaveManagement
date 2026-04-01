# Physical Data Model — Leave Management System

> **Source:** `ba/data-model/logical-data-model.json`, `design/entities/ent-*.json`

```mermaid
erDiagram
    employee {
        uuid id PK
        varchar name
        varchar email UK
        uuid manager_id FK
        enum role "EMPLOYEE|MANAGER|HR_ADMIN"
        timestamp created_at
        timestamp updated_at
    }
    leave_type {
        uuid id PK
        varchar code UK
        varchar name
        integer advance_notice_days
        boolean requires_balance
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    leave_balance {
        uuid id PK
        uuid employee_id FK
        uuid leave_type_id FK
        decimal total_days
        decimal used_days
        decimal pending_days
        integer period_year
        timestamp updated_at
    }
    leave_request {
        uuid id PK
        uuid employee_id FK
        uuid leave_type_id FK
        date start_date
        date end_date
        decimal total_days
        text reason
        enum status "PENDING|APPROVED|REJECTED|CANCELLED"
        timestamp submitted_at
        timestamp reviewed_at
        uuid reviewed_by FK
        text manager_comment
        integer version
        timestamp created_at
        timestamp updated_at
    }
    leave_audit_entry {
        uuid id PK
        uuid leave_request_id FK
        uuid actor_id FK
        enum action "SUBMITTED|APPROVED|REJECTED|CANCELLED|MODIFIED|BALANCE_RESTORED"
        varchar from_status
        varchar to_status
        text comment
        jsonb snapshot
        timestamp occurred_at
    }
    notification {
        uuid id PK
        uuid leave_request_id FK
        uuid recipient_id FK
        enum event "SUBMITTED|APPROVED|REJECTED|CANCELLED|MODIFIED_PENDING|MODIFIED_APPROVED"
        enum channel "EMAIL"
        enum status "PENDING|SENT|FAILED"
        timestamp sent_at
        timestamp created_at
    }

    employee ||--o{ employee : "manager_id"
    employee ||--o{ leave_request : "employee_id"
    employee ||--o{ leave_request : "reviewed_by"
    employee ||--o{ leave_balance : "employee_id"
    employee ||--o{ leave_audit_entry : "actor_id"
    employee ||--o{ notification : "recipient_id"
    leave_type ||--o{ leave_request : "leave_type_id"
    leave_type ||--o{ leave_balance : "leave_type_id"
    leave_request ||--o{ leave_audit_entry : "leave_request_id"
    leave_request ||--o{ notification : "leave_request_id"
```
