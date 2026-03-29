-- ============================================================
-- Leave Management System — Database Schema
-- Generated:  2026-03-27
-- Dialect:    PostgreSQL 14+
-- ============================================================

-- ============================================================
-- ENT-001: Employee
-- ============================================================
CREATE TABLE employees (
    id          UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255)    NOT NULL,
    email       VARCHAR(255)    NOT NULL,
    manager_id  UUID            REFERENCES employees(id) ON DELETE SET NULL,
    role        VARCHAR(20)     NOT NULL,
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ     NOT NULL DEFAULT now(),
    CONSTRAINT uq_employees_email UNIQUE (email),
    CONSTRAINT chk_employees_role CHECK (role IN ('EMPLOYEE', 'MANAGER', 'HR_ADMIN'))
);

CREATE INDEX idx_employees_manager ON employees(manager_id);

-- ============================================================
-- ENT-002: LeaveType
-- ============================================================
CREATE TABLE leave_types (
    id                   UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    code                 VARCHAR(50)  NOT NULL,
    name                 VARCHAR(100) NOT NULL,
    advance_notice_days  INTEGER      NOT NULL DEFAULT 0,
    requires_balance     BOOLEAN      NOT NULL DEFAULT TRUE,
    is_active            BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at           TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at           TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT uq_leave_types_code         UNIQUE (code),
    CONSTRAINT chk_leave_types_notice_days CHECK (advance_notice_days >= 0)
);

-- ============================================================
-- ENT-003: LeaveBalance
-- ============================================================
CREATE TABLE leave_balances (
    id             UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id    UUID          NOT NULL REFERENCES employees(id)  ON DELETE CASCADE,
    leave_type_id  UUID          NOT NULL REFERENCES leave_types(id) ON DELETE CASCADE,
    total_days     NUMERIC(5,1)  NOT NULL,
    used_days      NUMERIC(5,1)  NOT NULL DEFAULT 0,
    pending_days   NUMERIC(5,1)  NOT NULL DEFAULT 0,
    period_year    SMALLINT      NOT NULL,
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT now(),
    CONSTRAINT uq_leave_balances_emp_type_year UNIQUE (employee_id, leave_type_id, period_year),
    CONSTRAINT chk_leave_balances_total   CHECK (total_days   >= 0),
    CONSTRAINT chk_leave_balances_used    CHECK (used_days    >= 0),
    CONSTRAINT chk_leave_balances_pending CHECK (pending_days >= 0)
);

CREATE INDEX idx_leave_balances_employee ON leave_balances(employee_id, period_year);

-- ============================================================
-- ENT-004: LeaveRequest
-- ============================================================
CREATE TABLE leave_requests (
    id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id     UUID          NOT NULL REFERENCES employees(id)  ON DELETE CASCADE,
    leave_type_id   UUID          NOT NULL REFERENCES leave_types(id),
    start_date      DATE          NOT NULL,
    end_date        DATE          NOT NULL,
    total_days      NUMERIC(5,1)  NOT NULL,
    reason          TEXT,
    status          VARCHAR(20)   NOT NULL DEFAULT 'PENDING',
    submitted_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    reviewed_at     TIMESTAMPTZ,
    reviewed_by     UUID          REFERENCES employees(id) ON DELETE SET NULL,
    manager_comment TEXT,
    version         INTEGER       NOT NULL DEFAULT 1,
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
    CONSTRAINT chk_leave_requests_end_date   CHECK (end_date >= start_date),
    CONSTRAINT chk_leave_requests_total_days CHECK (total_days > 0),
    CONSTRAINT chk_leave_requests_status     CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'))
);

CREATE INDEX idx_leave_requests_employee_status ON leave_requests(employee_id, status);
CREATE INDEX idx_leave_requests_reviewed_by     ON leave_requests(reviewed_by);
CREATE INDEX idx_leave_requests_dates           ON leave_requests(employee_id, start_date, end_date);
-- Partial index to accelerate overlap checks (FR-005 / BR-003)
CREATE INDEX idx_leave_requests_active          ON leave_requests(employee_id, start_date, end_date)
    WHERE status IN ('PENDING', 'APPROVED');

-- ============================================================
-- ENT-005: LeaveAuditEntry  (append-only — no UPDATE or DELETE)
-- ============================================================
CREATE TABLE leave_audit_entries (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    leave_request_id UUID        NOT NULL REFERENCES leave_requests(id) ON DELETE CASCADE,
    actor_id         UUID        NOT NULL REFERENCES employees(id)      ON DELETE RESTRICT,
    action           VARCHAR(30) NOT NULL,
    from_status      VARCHAR(20),
    to_status        VARCHAR(20),
    comment          TEXT,
    snapshot         JSONB,
    occurred_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_audit_action CHECK (
        action IN ('SUBMITTED','APPROVED','REJECTED','CANCELLED','MODIFIED','BALANCE_RESTORED')
    )
);

CREATE INDEX idx_audit_leave_request ON leave_audit_entries(leave_request_id, occurred_at);
CREATE INDEX idx_audit_actor         ON leave_audit_entries(actor_id);

-- ============================================================
-- ENT-006: Notification
-- ============================================================
CREATE TABLE notifications (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    leave_request_id UUID        NOT NULL REFERENCES leave_requests(id) ON DELETE CASCADE,
    recipient_id     UUID        NOT NULL REFERENCES employees(id)      ON DELETE CASCADE,
    event            VARCHAR(30) NOT NULL,
    channel          VARCHAR(10) NOT NULL DEFAULT 'EMAIL',
    status           VARCHAR(10) NOT NULL DEFAULT 'PENDING',
    sent_at          TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_notifications_event   CHECK (event   IN ('SUBMITTED','APPROVED','REJECTED','CANCELLED','MODIFIED_PENDING','MODIFIED_APPROVED')),
    CONSTRAINT chk_notifications_channel CHECK (channel IN ('EMAIL')),
    CONSTRAINT chk_notifications_status  CHECK (status  IN ('PENDING','SENT','FAILED'))
);

CREATE INDEX idx_notifications_request   ON notifications(leave_request_id);
CREATE INDEX idx_notifications_recipient ON notifications(recipient_id);
CREATE INDEX idx_notifications_pending   ON notifications(status) WHERE status = 'PENDING';
