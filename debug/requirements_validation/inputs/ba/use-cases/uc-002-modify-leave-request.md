# UC-002 — Modify Leave Request

**Business Function:** BF-002
**Phase:** Business Analysis
**Last updated:** 2026-03-27

---

## Description
An Employee modifies the dates or reason of an existing leave request. If the request is PENDING, it remains PENDING and the Manager is notified. If the request was APPROVED, it reverts to PENDING for re-approval and both the Manager and HR Admin are notified.

## Actors
- **Primary:** Employee
- **Secondary:** Manager (notified on modification); HR Admin (notified if approved request is modified)

## Preconditions
- Employee is authenticated.
- The target leave request exists and belongs to the Employee.
- The request is in PENDING or APPROVED status.

## Main Flow
1. Employee selects an existing PENDING or APPROVED leave request.
2. Employee updates the start date, end date, and/or reason.
3. System recalculates the number of requested days.
4. System re-validates advance notice, balance, and overlap against the new dates.
5. System increments the request version.
6. If the request was APPROVED, system resets status to PENDING.
7. System sends email notification: Manager only (if was PENDING); Manager and HR Admin (if was APPROVED).

## Alternative Flows
- **4a. Re-validation fails:** System blocks the modification and returns the specific validation failure.
- **2a. Request is CANCELLED or REJECTED:** Modification is not permitted; system returns an error.

## Postconditions
- Leave request is updated with new dates/reason and incremented version.
- Status is PENDING (either unchanged or reset from APPROVED).
- Correct stakeholders have been notified.

## Business Rules
- BR-002: Advance notice re-checked against new start date.
- BR-003: Overlap re-checked against new date range.
- BR-005: Modification of an APPROVED request requires re-approval.

## Traceability
FR-010, BR-005, FR-013d, FR-013e
