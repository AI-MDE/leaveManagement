# UC-005 — Reject Leave Request

**Business Function:** BF-005
**Phase:** Business Analysis
**Last updated:** 2026-03-27

---

## Description
A Manager reviews a PENDING leave request from a direct report and rejects it. No balance change occurs. The Employee is notified with the optional rejection comment.

## Actors
- **Primary:** Manager
- **Secondary:** Employee (notified on rejection)

## Preconditions
- Manager is authenticated.
- The target leave request is in PENDING status.
- The requesting Employee is a direct report of the Manager.

## Main Flow
1. Manager views the list of pending leave requests for their direct reports.
2. Manager selects a leave request and optionally adds a rejection comment.
3. Manager confirms rejection.
4. System sets the request status to REJECTED and records the reviewing Manager, comment, and timestamp.
5. System sends an email notification to the Employee.
6. System appends an audit entry (REJECTED).

## Alternative Flows
- None.

## Postconditions
- Request status is REJECTED.
- Employee's leave balance is unchanged.
- Employee has been notified by email with the optional comment.
- Audit trail reflects the rejection event.

## Business Rules
- FR-009: Rejection is single-level — only the direct Manager may reject.

## Traceability
FR-007, FR-009, FR-013b
