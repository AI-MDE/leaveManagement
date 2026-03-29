# UC-011 — Maintain Audit Trail

**Business Function:** BF-011
**Phase:** Business Analysis
**Last updated:** 2026-03-27

---

## Description
The system appends an immutable audit entry for every state change on a leave request. Authorized actors can view the full audit trail for a given request.

## Actors
- **Primary:** System (write); Manager, HR Admin (read)

## Preconditions
- A state-changing event has occurred on a leave request (submit, approve, reject, cancel, modify, balance restore).

## Main Flow
1. System detects a state change event.
2. System appends a new audit entry recording: actor, action, from_status, to_status, timestamp, and optional comment/snapshot.
3. Manager or HR Admin may request the audit trail for a specific leave request.
4. System returns the full ordered list of audit entries for that request.

## Alternative Flows
- None. Audit entries are never updated or deleted.

## Postconditions
- A new immutable audit entry exists for the event.
- The audit trail is complete and ordered by occurrence time.

## Business Rules
- NFR-002: Full audit trail is mandatory for all data changes.
- Audit records are append-only — no updates or deletes permitted.

## Traceability
FR-015, FR-016, NFR-002
