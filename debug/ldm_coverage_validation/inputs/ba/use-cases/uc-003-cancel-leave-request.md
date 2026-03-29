# UC-003 — Cancel Leave Request

**Business Function:** BF-003
**Phase:** Business Analysis
**Last updated:** 2026-03-27

---

## Description
An Employee cancels a leave request that is in PENDING or APPROVED status. If the request was APPROVED, the system restores the deducted balance and notifies the Manager.

## Actors
- **Primary:** Employee
- **Secondary:** Manager (notified on cancellation)

## Preconditions
- Employee is authenticated.
- The target leave request exists and belongs to the Employee.
- The request is in PENDING or APPROVED status.

## Main Flow
1. Employee selects a PENDING or APPROVED leave request and requests cancellation.
2. System sets the request status to CANCELLED.
3. If the request was APPROVED, system restores the leave balance for the Employee.
4. System sends an email notification to the Manager.
5. System appends an audit entry (CANCELLED; BALANCE_RESTORED if applicable).

## Alternative Flows
- **1a. Request is already CANCELLED or REJECTED:** Cancellation is not permitted; system returns an error.

## Postconditions
- Request status is CANCELLED.
- If the request was APPROVED, the Employee's balance has been restored.
- Manager has been notified by email.
- Audit trail reflects the cancellation event.

## Business Rules
- BR-004: Cancellation of an APPROVED request restores the deducted balance.

## Traceability
FR-011, FR-012, BR-004, FR-013c
