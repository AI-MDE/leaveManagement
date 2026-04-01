# My Leave

| | |
|---|---|
| **ID** | UI-M01 |
| **Route** | `/my-leave` |
| **Entry** | `/my-leave/dashboard` |
| **Users** | Employee |
| **Backend Modules** | MOD-004, MOD-003, MOD-002 |

Enables an Employee to view their leave balances and history, submit new leave requests, and modify or cancel existing ones.

## Pages

### My Leave Dashboard

| | |
|---|---|
| **Route** | `/my-leave/dashboard` |
| **Pattern** | dashboard |
| **Menu** | menu |
| **Roles** | Employee |
| **Business Function** | BF-001 |
| **Requirements** | FR-001, FR-002, FR-015 |

Gives the Employee an at-a-glance summary of their current leave balances, any active requests, and quick access to submit a new request or browse all requests.

**Actions:**
- New Request (`navigate`) → `/my-leave/new`
- View All Requests (`navigate`) → `/my-leave/requests`

> **Empty state:** You have no active leave requests. Click &#39;New Request&#39; to submit one.

---
### Submit Leave Request

| | |
|---|---|
| **Route** | `/my-leave/new` |
| **Pattern** | form |
| **Menu** | menu |
| **Roles** | Employee |
| **Business Function** | BF-001 |
| **Requirements** | FR-001, FR-002, FR-003, FR-004, FR-005 |

Allows the Employee to select a leave type, specify dates and an optional reason, and submit a new leave request for manager approval.

**Actions:**
- Submit Request (`submit`) → `/my-leave/dashboard`
- Cancel (`navigate`) → `/my-leave/dashboard`

**Validation:**
- `leaveType` — required: _Please select a leave type._
- `startDate` — required: _Please select a start date._
- `endDate` — required: _Please select an end date._
- `endDate` — pattern: _End date must be on or after the start date._
- `startDate` — pattern: _Start date does not meet the advance notice requirement for the selected leave type._
- `startDate` — pattern: _The requested dates overlap with an existing pending or approved request._
- `leaveType` — pattern: _Insufficient balance for the selected leave type. Available: {availableDays} days._

---
### My Requests

| | |
|---|---|
| **Route** | `/my-leave/requests` |
| **Pattern** | list |
| **Menu** | menu |
| **Roles** | Employee |
| **Business Function** | BF-010 |
| **Requirements** | FR-015, FR-010, FR-011, FR-012 |

Shows the Employee the full list of their leave requests with filtering and drill-through to request details.

**Actions:**
- New Request (`navigate`) → `/my-leave/new`
- View (`navigate`) → `/my-leave/requests/:id`

**Filters:**
- status (select)
- leaveType (select)
- dateRange (date-range)

> **Empty state:** You have no leave requests. Click &#39;New Request&#39; to submit one.

---
### Request Detail

| | |
|---|---|
| **Route** | `/my-leave/requests/:id` |
| **Pattern** | detail |
| **Menu** | menu |
| **Roles** | Employee |
| **Business Function** | BF-002 |
| **Requirements** | FR-010, FR-011, FR-012, FR-015 |

Displays all details of a single leave request and allows the Employee to modify or cancel it if eligible.

**Actions:**
- Modify Request (`navigate`) → `/my-leave/requests/:id/edit`
- Cancel Request (`confirm`) → `/my-leave/requests`
- Back to My Requests (`navigate`) → `/my-leave/requests`

---
### Modify Leave Request

| | |
|---|---|
| **Route** | `/my-leave/requests/:id/edit` |
| **Pattern** | form |
| **Menu** | menu |
| **Roles** | Employee |
| **Business Function** | BF-002 |
| **Requirements** | FR-010, BR-005, FR-013d, FR-013e |

Allows the Employee to update the dates or reason of a PENDING or APPROVED leave request, with re-validation applied.

**Actions:**
- Save Changes (`submit`) → `/my-leave/requests/:id`
- Cancel (`navigate`) → `/my-leave/requests/:id`

**Validation:**
- `startDate` — required: _Please select a start date._
- `endDate` — required: _Please select an end date._
- `endDate` — pattern: _End date must be on or after the start date._
- `startDate` — pattern: _Updated start date does not meet the advance notice requirement for the selected leave type._
- `startDate` — pattern: _Updated dates overlap with another pending or approved request._
- `startDate` — pattern: _Insufficient balance for the updated date range._

---

## Navigation Flows

- `/my-leave/dashboard` → `/my-leave/new` via _New Request_
- `/my-leave/dashboard` → `/my-leave/requests` via _View All Requests_
- `/my-leave/new` → `/my-leave/dashboard` via _Submit Request_
- `/my-leave/new` → `/my-leave/dashboard` via _Cancel_
- `/my-leave/requests` → `/my-leave/new` via _New Request_
- `/my-leave/requests` → `/my-leave/requests/:id` via _View_
- `/my-leave/requests/:id` → `/my-leave/requests/:id/edit` via _Modify Request_
- `/my-leave/requests/:id` → `/my-leave/requests` via _Cancel Request_
- `/my-leave/requests/:id` → `/my-leave/requests` via _Back to My Requests_
- `/my-leave/requests/:id/edit` → `/my-leave/requests/:id` via _Save Changes_
- `/my-leave/requests/:id/edit` → `/my-leave/requests/:id` via _Cancel_
