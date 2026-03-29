# UC-007 — Manage Leave Balances

**Business Function:** BF-007
**Phase:** Business Analysis
**Last updated:** 2026-03-27

---

## Description
An HR Admin sets or adjusts leave balance entitlements for an Employee for a specific leave type and year.

## Actors
- **Primary:** HR Admin

## Preconditions
- HR Admin is authenticated.
- The target Employee and leave type exist.

## Main Flow
1. HR Admin selects an Employee and a leave type.
2. HR Admin specifies the total_days entitlement for the year.
3. System creates or updates the leave balance record for that Employee, leave type, and year.
4. System preserves any existing used_days and pending_days values.

## Alternative Flows
- **2a. Balance record already exists:** System updates total_days only; used_days and pending_days are not reset.

## Postconditions
- Leave balance record exists with the correct total_days for the Employee, leave type, and year.

## Business Rules
- BR-001: Balance entitlement must be set before employees can submit requests for that leave type.

## Traceability
FR-002, BR-001
