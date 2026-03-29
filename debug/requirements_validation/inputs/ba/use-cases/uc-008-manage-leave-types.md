# UC-008 — Manage Leave Types

**Business Function:** BF-008
**Phase:** Business Analysis
**Last updated:** 2026-03-27

---

## Description
An HR Admin creates, updates, or deactivates a leave type in the system catalogue, including its advance notice requirements and balance flag.

## Actors
- **Primary:** HR Admin

## Preconditions
- HR Admin is authenticated.

## Main Flow
1. HR Admin navigates to the leave type catalogue.
2. HR Admin creates a new leave type or selects an existing one to edit.
3. HR Admin specifies: name, code, advance notice days, and whether the type requires a balance.
4. System saves the leave type.

## Alternative Flows
- **3a. Deactivate:** HR Admin sets the leave type to inactive. Existing requests referencing the type are unaffected; new submissions for this type are blocked.
- **3b. Duplicate code:** System rejects the save and returns a uniqueness error.

## Postconditions
- Leave type catalogue is updated.
- New submissions will apply the updated rules immediately.

## Business Rules
- BR-002: Advance notice days defined here are enforced at submission time for all requests of this type.

## Traceability
LT-001, LT-002, LT-003, LT-004, BR-002, FR-004
