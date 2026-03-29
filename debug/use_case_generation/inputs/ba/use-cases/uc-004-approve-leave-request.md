# UC-004 — Approve Leave Request

**Business Function:** BF-004
**Phase:** Business Analysis
**Last updated:** 2026-03-27

---

## Description
A Manager reviews a PENDING leave request from a direct report and approves it. The system deducts the approved days from the Employee's balance and notifies the Employee.

## Actors
- **Primary:** Manager
- **Secondary:** Employee (notified on approval)

## Preconditions
- Manager is authenticated.
- The target leave request is in PENDING status.
- The requesting Employee is a direct report of the Manager.

## Main Flow
1. Manager views the list of pending leave requests for their direct reports.
2. Manager selects a leave request and optionally adds a comment.
3. Manager confirms approval.
4. System sets the request status to APPROVED and records the reviewing Manager and timestamp.
5. System deducts the approved days from the Employee's leave balance.
6. System sends an email notification to the Employee.
7. System appends an audit entry (APPROVED).

## Alternative Flows
- **3a. Request was modified after routing (version mismatch):** System warns the Manager of the updated version before confirming.

## Postconditions
- Request status is APPROVED.
- Employee's leave balance reflects the deduction.
- Employee has been notified by email.
- Audit trail reflects the approval event.

## Business Rules
- FR-008: Balance deduction occurs on approval, not on submission.
- FR-009: Approval is single-level — only the direct Manager may approve.

## Traceability
FR-006, FR-007, FR-008, FR-009, FR-013b
