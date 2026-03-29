# Module: Employee (master_data)

**ID:** MOD-002 | **Table:** `employees` | **Entity:** ENT-001
**Optimistic Locking:** yes | **Audit Required:** no

---

## Responsibilities
- Own employee identity: name, email, role
- Own the manager hierarchy (manager_id self-reference)
- Enforce email uniqueness
- Provide employee lookup for all other modules

## Exclusions
| Concern | Delegated To |
|---|---|
| Leave requests | MOD-001 leave-request |
| Leave balances | MOD-004 leave-balance |
| Auth/session | Out of scope |

---

## Dependencies
None.

---

## Business Rules

| ID | Rule | Layer | Artifact |
|---|---|---|---|
| RULE-EMP-01 | Email uniqueness | service | EmployeeService |
| RULE-EMP-02 | HR Admin only for create/update | service | EmployeeService |

---

## Service Interface

| Method | Command | Description |
|---|---|---|
| `create` | CreateEmployeeCommand | Create a new employee (HR Admin only) |
| `update` | UpdateEmployeeCommand | Update name, email, role, or manager |

---

## Query Service

| Method | Returns | Description |
|---|---|---|
| `getById` | EmployeeReadDto | Single employee by ID |
| `getDirectReports` | EmployeeReadDto[] | All direct reports of a manager |
| `getAll` | EmployeeReadDto[] | All employees, optionally filtered by role |

---

## API

| Method | Path | Description |
|---|---|---|
| GET | /api/employees | List all employees |
| GET | /api/employees/:id | Get by ID |
| POST | /api/employees | Create employee |
| PUT | /api/employees/:id | Update employee |
| GET | /api/employees/:id/direct-reports | Get direct reports |
