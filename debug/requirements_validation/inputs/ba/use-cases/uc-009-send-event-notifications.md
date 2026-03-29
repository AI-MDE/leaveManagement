# UC-009 — Send Event Notifications

**Business Function:** BF-009
**Phase:** Business Analysis
**Last updated:** 2026-03-27

---

## Description
The system automatically dispatches email notifications to the correct stakeholders when a leave request lifecycle event occurs. This is a system-initiated use case triggered by other use cases.

## Actors
- **Primary:** System
- **Secondary:** Manager, Employee, HR Admin (as notification recipients)

## Preconditions
- A leave lifecycle event has occurred (submission, approval, rejection, cancellation, or modification).
- Recipient email addresses are available.

## Main Flow
1. System receives a notification trigger with the event type and leave request ID.
2. System determines recipients based on the event type (see notification matrix below).
3. System composes the email message for the event.
4. System dispatches the email to each recipient.
5. System records the notification with status SENT.

**Notification Matrix:**

| Event | Recipients |
|---|---|
| SUBMITTED | Manager |
| APPROVED | Employee |
| REJECTED | Employee |
| CANCELLED | Manager |
| MODIFIED_PENDING | Manager |
| MODIFIED_APPROVED | Manager, HR Admin |

## Alternative Flows
- **4a. Dispatch fails:** System records the notification with status FAILED. No retry in scope for this release.

## Postconditions
- Notification record exists with status SENT or FAILED.
- Recipients have received the email (on success).

## Business Rules
- Channel is email only (Q-005).

## Traceability
FR-013, FR-013a, FR-013b, FR-013c, FR-013d, FR-013e
