# Module: LeaveType (master_data)

**ID:** MOD-003 | **Table:** `leave_types` | **Entity:** ENT-002
**Optimistic Locking:** yes | **Audit Required:** no

---

## Responsibilities
- Own the leave type catalogue: code, name, advance notice days, requires_balance flag
- Enforce code uniqueness
- Provide advance notice and balance requirement data to leave-request at submission
- Allow HR Admin to activate/deactivate leave types

## Exclusions
| Concern | Delegated To |
|---|---|
| Leave request validation | MOD-001 leave-request |
| Balance tracking | MOD-004 leave-balance |

---

## Dependencies
None.

---

## Business Rules

| ID | Rule | Layer | Artifact |
|---|---|---|---|
| RULE-LT-01 | Code uniqueness | service | LeaveTypeService |
| RULE-LT-02 | advance_notice_days >= 0 | domain | LeaveTypeEntity |

---

## Seed Data

| Code | Name | Advance Notice | Requires Balance |
|---|---|---|---|
| ANNUAL | Annual Leave | 14 days | yes |
| SICK | Sick Leave | 0 days | yes |
| UNPAID | Unpaid Leave | 30 days | no |
| MATERNITY_PATERNITY | Maternity/Paternity Leave | 30 days | no |

---

## Service Interface

| Method | Command | Description |
|---|---|---|
| `create` | CreateLeaveTypeCommand | Create a new leave type (HR Admin only) |
| `update` | UpdateLeaveTypeCommand | Update name, notice, balance flag, or active status |

---

## Query Service

| Method | Returns | Description |
|---|---|---|
| `getAll` | LeaveTypeReadDto[] | All leave types including inactive |
| `getActive` | LeaveTypeReadDto[] | Active leave types (for submission form) |
| `getById` | LeaveTypeReadDto | Single leave type by ID |

---

## API

| Method | Path | Description |
|---|---|---|
| GET | /api/leave-types | List all |
| GET | /api/leave-types/:id | Get by ID |
| POST | /api/leave-types | Create |
| PUT | /api/leave-types/:id | Update |
