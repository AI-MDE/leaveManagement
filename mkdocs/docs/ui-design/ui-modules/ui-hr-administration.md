# HR Administration

| | |
|---|---|
| **ID** | UI-M03 |
| **Route** | `/hr-administration` |
| **Entry** | `/hr-administration/leave-types` |
| **Users** | HR Admin |
| **Backend Modules** | MOD-002, MOD-003, MOD-004, MOD-005, MOD-006, MOD-001 |

Enables HR Admin to manage leave types, set employee balances, oversee all requests system-wide, and review the audit trail.

## Sub-Navigation

- **Leave Types** `/hr-administration/leave-types`
- **Balances** `/hr-administration/balances`
- **Requests** `/hr-administration/requests`
- **Audit Trail** `/hr-administration/audit`

## Pages

### Leave Types

| | |
|---|---|
| **Route** | `/hr-administration/leave-types` |
| **Pattern** | list |
| **Menu** | menu |
| **Roles** | HR Admin |
| **Business Function** | BF-008 |
| **Requirements** | FR-004, LT-001, LT-002, LT-003, LT-004 |

Shows HR Admin the full catalogue of leave types with their rules, and allows creation or navigation to edit&#x2F;deactivate.

**Actions:**
- New Leave Type (`navigate`) → `/hr-administration/leave-types/new`
- Edit (`navigate`) → `/hr-administration/leave-types/:id/edit`
- Deactivate (`confirm`)

**Filters:**
- isActive (boolean)

> **Empty state:** No leave types configured. Click &#39;New Leave Type&#39; to add one.

---
### New Leave Type

| | |
|---|---|
| **Route** | `/hr-administration/leave-types/new` |
| **Pattern** | form |
| **Menu** | menu |
| **Roles** | HR Admin |
| **Business Function** | BF-008 |
| **Requirements** | FR-004, BR-002 |

Allows HR Admin to create a new leave type with its code, name, advance notice requirement, and balance flag.

**Actions:**
- Save (`submit`) → `/hr-administration/leave-types`
- Cancel (`navigate`) → `/hr-administration/leave-types`

**Validation:**
- `name` — required: _Leave type name is required._
- `code` — required: _Leave type code is required._
- `code` — unique: _This leave type code already exists. Please choose a unique code._
- `advanceNoticeDays` — required: _Advance notice days is required. Enter 0 if no advance notice is needed._
- `requiresBalance` — required: _Please indicate whether this leave type requires a balance._

---
### Edit Leave Type

| | |
|---|---|
| **Route** | `/hr-administration/leave-types/:id/edit` |
| **Pattern** | form |
| **Menu** | menu |
| **Roles** | HR Admin |
| **Business Function** | BF-008 |
| **Requirements** | FR-004, BR-002 |

Allows HR Admin to update the details or deactivate an existing leave type.

**Actions:**
- Save Changes (`submit`) → `/hr-administration/leave-types`
- Cancel (`navigate`) → `/hr-administration/leave-types`

**Validation:**
- `name` — required: _Leave type name is required._
- `code` — required: _Leave type code is required._
- `code` — unique: _This leave type code already exists. Please choose a unique code._
- `advanceNoticeDays` — required: _Advance notice days is required. Enter 0 if no advance notice is needed._
- `requiresBalance` — required: _Please indicate whether this leave type requires a balance._

---
### Employee Balances

| | |
|---|---|
| **Route** | `/hr-administration/balances` |
| **Pattern** | list |
| **Menu** | menu |
| **Roles** | HR Admin |
| **Business Function** | BF-007 |
| **Requirements** | FR-002, FR-003, BR-001 |

Shows HR Admin the current leave balance entitlements across all employees and leave types, with the ability to drill into a single employee or set&#x2F;adjust balances.

**Actions:**
- Set &#x2F; Adjust Balance (`navigate`) → `/hr-administration/balances/edit`
- View Employee Detail (`navigate`) → `/hr-administration/balances/:employeeId`

**Filters:**
- employee (text)
- leaveType (select)
- year (select)

> **Empty state:** No balances found. Use &#39;Set &#x2F; Adjust Balance&#39; to configure entitlements for employees.

---
### Set Employee Balance

| | |
|---|---|
| **Route** | `/hr-administration/balances/edit` |
| **Pattern** | form |
| **Menu** | menu |
| **Roles** | HR Admin |
| **Business Function** | BF-007 |
| **Requirements** | FR-002, BR-001 |

Allows HR Admin to create or update the leave balance entitlement for a specific employee, leave type, and year.

**Actions:**
- Save Balance (`submit`) → `/hr-administration/balances`
- Cancel (`navigate`) → `/hr-administration/balances`

**Validation:**
- `employee` — required: _Please select an employee._
- `leaveType` — required: _Please select a leave type._
- `year` — required: _Please specify the leave year._
- `totalDays` — required: _Total entitlement days is required._
- `totalDays` — pattern: _Total entitlement days must be a non-negative number._

---
### Employee Balance Detail

| | |
|---|---|
| **Route** | `/hr-administration/balances/:employeeId` |
| **Pattern** | detail |
| **Menu** | menu |
| **Roles** | HR Admin |
| **Business Function** | BF-007 |
| **Requirements** | FR-002, FR-003, BR-001 |

Shows HR Admin the complete balance breakdown for a single employee across all leave types and years.

**Actions:**
- Set &#x2F; Adjust Balance (`navigate`) → `/hr-administration/balances/edit`
- Back to Balances (`navigate`) → `/hr-administration/balances`

> **Empty state:** No balances configured for this employee.

---
### All Leave Requests

| | |
|---|---|
| **Route** | `/hr-administration/requests` |
| **Pattern** | list |
| **Menu** | menu |
| **Roles** | HR Admin |
| **Business Function** | BF-010 |
| **Requirements** | FR-015, FR-009 |

Shows HR Admin all leave requests system-wide, filterable by employee, status, type, and date range, with drill-through to details and override actions.

**Actions:**
- View Detail (`navigate`) → `/hr-administration/requests/:id`
- Export (`export`)

**Filters:**
- employee (text)
- status (select)
- leaveType (select)
- dateRange (date-range)

> **Empty state:** No leave requests found matching the selected filters.

---
### Request Detail (HR View)

| | |
|---|---|
| **Route** | `/hr-administration/requests/:id` |
| **Pattern** | detail |
| **Menu** | menu |
| **Roles** | HR Admin |
| **Business Function** | BF-011 |
| **Requirements** | FR-009, FR-015, FR-016, FR-012 |

Shows HR Admin all details and the full audit trail of a single leave request, with override cancel action available.

**Actions:**
- Override Cancel (`confirm`) → `/hr-administration/requests`
- Back to All Requests (`navigate`) → `/hr-administration/requests`

---
### Audit Trail

| | |
|---|---|
| **Route** | `/hr-administration/audit` |
| **Pattern** | list |
| **Menu** | menu |
| **Roles** | HR Admin |
| **Business Function** | BF-011 |
| **Requirements** | FR-016, NFR-002 |

Provides HR Admin with a searchable, read-only view of the complete system-wide audit log across all leave requests.

**Actions:**
- View Request (`navigate`) → `/hr-administration/requests/:id`

**Filters:**
- employee (text)
- action (select)
- dateRange (date-range)

> **Empty state:** No audit entries found matching the selected filters.

---

## Navigation Flows

- `/hr-administration/leave-types` → `/hr-administration/leave-types/new` via _New Leave Type_
- `/hr-administration/leave-types` → `/hr-administration/leave-types/:id/edit` via _Edit_
- `/hr-administration/leave-types/new` → `/hr-administration/leave-types` via _Save_
- `/hr-administration/leave-types/new` → `/hr-administration/leave-types` via _Cancel_
- `/hr-administration/leave-types/:id/edit` → `/hr-administration/leave-types` via _Save Changes_
- `/hr-administration/leave-types/:id/edit` → `/hr-administration/leave-types` via _Cancel_
- `/hr-administration/balances` → `/hr-administration/balances/edit` via _Set &#x2F; Adjust Balance_
- `/hr-administration/balances` → `/hr-administration/balances/:employeeId` via _View Employee Detail_
- `/hr-administration/balances/edit` → `/hr-administration/balances` via _Save Balance_
- `/hr-administration/balances/edit` → `/hr-administration/balances` via _Cancel_
- `/hr-administration/balances/:employeeId` → `/hr-administration/balances/edit` via _Set &#x2F; Adjust Balance_
- `/hr-administration/balances/:employeeId` → `/hr-administration/balances` via _Back to Balances_
- `/hr-administration/requests` → `/hr-administration/requests/:id` via _View Detail_
- `/hr-administration/requests/:id` → `/hr-administration/requests` via _Override Cancel_
- `/hr-administration/requests/:id` → `/hr-administration/requests` via _Back to All Requests_
- `/hr-administration/audit` → `/hr-administration/requests/:id` via _View Request_
