# Business Glossary — Leave Management System

> **Status:** Generated
> **Last updated:** 2026-03-27
> **Source:** ba/requirements.md, application/application.json

---

| ID      | Term                        | Definition                                                                                                                          | Aliases                          | Source Refs                  |
|---------|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------|----------------------------------|------------------------------|
| GLO-001 | Advance Notice Period       | The minimum number of calendar days an employee must submit a leave request before the intended start date, as required by leave type. |                                  | FR-004, BR-002               |
| GLO-002 | Annual Leave                | A paid leave type allocated annually to each employee, requiring at least 14 days advance notice before the intended start date.     | Vacation Leave                   | FR-004, BR-002, LT-001       |
| GLO-003 | Approval                    | The act by which a Manager formally accepts a submitted leave request, triggering a balance deduction and employee notification.      |                                  | FR-007, FR-008               |
| GLO-004 | Audit Trail                 | A complete, immutable record of all state changes to leave requests, capturing who performed each action and when.                   | Audit Log                        | FR-016, NFR-002              |
| GLO-005 | Balance Override            | An exceptional permission granted by HR Admin that allows a leave request to be submitted even when the employee's balance is insufficient. |                           | FR-003, BR-001               |
| GLO-006 | Cancellation                | The withdrawal of a leave request by an employee. For approved requests, the deducted balance is restored and the manager is notified. |                                 | FR-011, FR-012, BR-004       |
| GLO-007 | Direct Manager              | The Manager to whom an employee directly reports, and who is the designated approver for that employee's leave requests.             | Line Manager                     | FR-006, BR-003               |
| GLO-008 | Employee                    | A person who is entitled to submit, modify, and cancel their own leave requests, and to view their own leave balance and history.     |                                  | ACT-001, application.json    |
| GLO-009 | HR Admin                    | A user with administrative authority over the leave system, responsible for managing leave types, balances, and system configuration. Can intervene in or override the approval workflow. | Human Resources Administrator | ACT-003, application.json |
| GLO-010 | Leave Balance               | The number of days of a specific leave type that an employee is entitled to take within a defined period (typically a calendar year). | Entitlement Balance              | FR-002, FR-008, BR-001       |
| GLO-011 | Leave History               | The complete record of all leave requests submitted by an employee, regardless of their current status.                              |                                  | FR-015                       |
| GLO-012 | Leave Request               | A formal request submitted by an employee to take time off, specifying leave type, start date, end date, and an optional reason.     | Time-off Request                 | FR-001, application.json     |
| GLO-013 | Leave Type                  | A category of leave (e.g. Annual, Sick, Unpaid, Maternity/Paternity) that defines applicable rules such as advance notice and balance requirements. |                     | FR-004, Section 5            |
| GLO-014 | Manager                     | A user who reviews and approves or rejects leave requests submitted by their direct reports.                                         | Approver                         | ACT-002, application.json    |
| GLO-015 | Maternity/Paternity Leave   | A leave type granted for the birth or adoption of a child, requiring at least 30 days advance notice.                               | Parental Leave                   | FR-004, BR-002, LT-004       |
| GLO-016 | Modification                | A change made by an employee to an existing leave request (dates, type, or reason). Pending requests may be modified freely; approved requests require re-approval. | Amendment  | FR-010, BR-005               |
| GLO-017 | Notification                | An automated email sent by the system to relevant parties when a leave request changes state (submitted, approved, rejected, modified, or cancelled). |              | FR-013, FR-013a–FR-013e      |
| GLO-018 | Overlap                     | A condition where an employee has two leave requests whose date ranges coincide. The system prevents overlapping pending or approved requests per employee. |          | FR-005, BR-003               |
| GLO-019 | Pending Request             | A leave request that has been submitted but not yet approved or rejected by the Manager.                                             | Open Request                     | FR-010, FR-011               |
| GLO-020 | Re-approval                 | The process by which a modified approved leave request is returned to Pending status and must be approved again by the Manager.      |                                  | FR-010, BR-005               |
| GLO-021 | Rejection                   | The act by which a Manager declines a submitted leave request, with an optional comment explaining the decision.                     |                                  | FR-007                       |
| GLO-022 | Sick Leave                  | A leave type used when an employee is unwell, with no advance notice requirement.                                                    | Medical Leave                    | FR-004, BR-002, LT-002       |
| GLO-023 | Unpaid Leave                | A leave type where no salary is paid for the duration of the absence, requiring at least 30 days advance notice.                     | Leave Without Pay                | FR-004, BR-002, LT-003       |
