# UC-010 — View Leave History

**Business Function:** BF-010
**Phase:** Business Analysis
**Last updated:** 2026-03-27

---

## Description
An Employee views their own leave request history. A Manager views history for their direct reports. An HR Admin views history for all employees.

## Actors
- **Primary:** Employee, Manager, HR Admin

## Preconditions
- Actor is authenticated.

## Main Flow
1. Actor navigates to the leave history view.
2. System returns leave requests scoped to the actor's role:
   - Employee: own requests only.
   - Manager: requests from direct reports.
   - HR Admin: all requests system-wide.
3. Actor optionally filters by date range, leave type, or status.
4. System returns the filtered list.

## Alternative Flows
- None.

## Postconditions
- Actor has viewed the relevant leave history. No data is modified.

## Business Rules
- None beyond role-based scoping.

## Traceability
FR-015
