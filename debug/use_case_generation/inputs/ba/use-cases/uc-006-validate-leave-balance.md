# UC-006 — Validate Leave Balance

**Business Function:** BF-006
**Phase:** Business Analysis
**Last updated:** 2026-03-27

---

## Description
The system automatically validates an Employee's leave balance when a leave request is submitted. This is a system-initiated use case triggered as part of UC-001 (Submit Leave Request).

## Actors
- **Primary:** System (triggered during leave request submission)
- **Secondary:** Employee (receives outcome — blocked or allowed)

## Preconditions
- A leave request submission has been initiated (UC-001 is in progress).
- A leave balance record exists for the Employee, leave type, and current year.

## Main Flow
1. System retrieves the Employee's current balance for the requested leave type and year.
2. System calculates available days: total_days − used_days − pending_days.
3. System compares available days against the requested total_days.
4. If sufficient: submission proceeds.
5. System reserves the requested days as pending_days.

## Alternative Flows
- **3a. Insufficient balance:** System blocks the submission and returns the available balance to the Employee.
- **3b. Leave type does not require a balance (e.g. Unpaid Leave):** Validation is skipped; submission proceeds.

## Postconditions
- If sufficient: pending_days on the balance record are incremented by the requested total_days.
- If insufficient: submission is blocked; balance record is unchanged.

## Business Rules
- BR-001: An employee cannot submit a request exceeding their available balance unless HR Admin overrides.

## Traceability
FR-002, FR-003, BR-001
