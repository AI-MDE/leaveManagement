# Leave Management System

## CAP-001 — Leave Request Management

> The ability for employees to initiate, modify, and cancel leave requests throughout their lifecycle.

- **BF-001** Submit Leave Request
  - Leave request created in PENDING status
  - Balance and advance notice validated
  - Overlap with existing requests checked
  - Manager notified by email
- **BF-002** Modify Leave Request
  - Request updated and version incremented
  - Status reset to PENDING if previously APPROVED
  - Manager notified (and HR Admin if was APPROVED)
- **BF-003** Cancel Leave Request
  - Request status set to CANCELLED
  - Balance restored if request was APPROVED
  - Manager notified by email
## CAP-002 — Approval Workflow

> The ability for managers to review, approve, or reject leave requests submitted by their direct reports.

- **BF-004** Approve Leave Request
  - Request status set to APPROVED
  - Leave balance deducted for the employee
  - Employee notified by email
- **BF-005** Reject Leave Request
  - Request status set to REJECTED
  - Employee notified by email with optional comment
## CAP-003 — Leave Balance Management

> The ability to track, validate, and update leave entitlements per employee and leave type.

- **BF-006** Validate Leave Balance
  - Submission blocked if balance insufficient (unless HR Admin override)
  - Pending days reserved on successful submission
- **BF-007** Manage Leave Balances
  - Balance record created or updated
  - Correct entitlement available for validation at submission
## CAP-004 — Leave Type Administration

> The ability for HR Admin to define and maintain the catalogue of leave types and their rules.

- **BF-008** Manage Leave Types
  - Leave type catalogue kept current
  - Advance notice rules enforced at submission for correct leave type
## CAP-005 — Notifications

> The ability to automatically email relevant stakeholders when key leave request events occur.

- **BF-009** Send Event Notifications
  - Correct stakeholders notified for each event type
  - Notification delivery status recorded
## CAP-006 — History and Audit

> The ability to maintain a full, immutable record of all leave requests and state changes for compliance and reporting.

- **BF-010** View Leave History
  - Full leave request history available per employee
  - Filterable by date, type, and status
- **BF-011** Maintain Audit Trail
  - Complete audit trail available for all requests
  - Point-in-time state reconstruction possible
