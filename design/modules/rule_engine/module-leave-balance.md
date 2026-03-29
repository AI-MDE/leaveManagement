# Module: LeaveBalance (rule_engine)

**ID:** MOD-004 | **Table:** `leave_balances` | **Entity:** ENT-003
**Optimistic Locking:** no | **Audit Required:** yes

---

## Responsibilities
- Track leave entitlement per employee, leave type, and year
- Validate balance sufficiency before submission (BR-001)
- Reserve pending days at submission; deduct on approval; restore on cancellation (BR-004)
- Allow HR Admin to set or adjust entitlements

## Exclusions
| Concern | Delegated To |
|---|---|
| Leave request lifecycle | MOD-001 leave-request |
| Advance notice rules | MOD-003 leave-type |
| Balance accrual / auto top-up | Out of scope |

---

## Dependencies
| Module | Reason |
|---|---|
| MOD-002 employee | Validate employee exists |
| MOD-003 leave-type | Check requires_balance flag |

---

## Business Rules

| ID | Rule | Layer | Artifact |
|---|---|---|---|
| RULE-LB-01 | Balance sufficiency check | domain | LeaveBalanceRules |
| RULE-LB-02 | Skip all balance ops when requires_balance=false | service | LeaveBalanceService |

---

## Service Interface

| Method | Command | Description |
|---|---|---|
| `validateAndReserve` | ValidateAndReserveBalanceCommand | Validate sufficiency and reserve pending days |
| `deduct` | DeductBalanceCommand | Move pending to used on approval |
| `restore` | RestoreBalanceCommand | Restore balance on cancellation |
| `setEntitlement` | SetEntitlementCommand | HR Admin sets total_days for employee/type/year |

---

## Query Service

| Method | Returns | Description |
|---|---|---|
| `getByEmployee` | LeaveBalanceReadDto[] | All balances for employee in a year |
| `getByEmployeeAndType` | LeaveBalanceReadDto | Single balance for employee/type/year |

---

## API

| Method | Path | Description |
|---|---|---|
| GET | /api/employees/:id/balances | All balances for employee |
| GET | /api/employees/:id/balances/:leaveTypeId | Balance for specific type |
| PUT | /api/employees/:id/balances/:leaveTypeId | Set entitlement (HR Admin) |

---

## Events Published

| Event | Trigger |
|---|---|
| LeaveBalanceDeductedEvent | deduct |
| LeaveBalanceRestoredEvent | restore |
