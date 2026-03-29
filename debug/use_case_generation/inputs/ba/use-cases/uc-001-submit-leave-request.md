# UC-001 — Submit Leave Request

**Business Function:** BF-001
**Phase:** Business Analysis
**Last updated:** 2026-03-27

---

## Description
An Employee submits a new leave request by selecting a leave type, specifying a date range, and optionally providing a reason. The system validates balance, advance notice, and overlap before routing the request to the Employee's Manager for approval.

## Actors
- **Primary:** Employee
- **Secondary:** Manager (notified on submission)

## Preconditions
- Employee is authenticated.
- At least one active leave type exists.
- Employee has a direct Manager assigned.

## Main Flow
1. Employee selects a leave type, start date, end date, and optional reason.
2. System calculates the number of requested days.
3. System checks that the start date meets the advance notice requirement for the selected leave type.
4. System checks that the Employee has sufficient balance (if the leave type requires a balance).
5. System checks that the requested dates do not overlap with any existing PENDING or APPROVED request for the Employee.
6. System creates the leave request in PENDING status.
7. System sends an email notification to the Manager.

## Alternative Flows
- **3a. Advance notice not met:** System blocks submission and returns the minimum notice period required.
- **4a. Insufficient balance:** System blocks submission and returns the current available balance.
- **5a. Overlap detected:** System blocks submission and identifies the conflicting request.

## Postconditions
- Leave request exists in PENDING status.
- Manager has received an email notification.
- Pending days are reserved against the Employee's balance.

## Business Rules
- BR-001: Balance must cover the requested days (unless HR Admin override).
- BR-002: Advance notice per leave type must be satisfied.
- BR-003: No overlapping PENDING or APPROVED requests for the same Employee.

## Traceability
FR-001, FR-002, FR-003, FR-004, FR-005, FR-013a
