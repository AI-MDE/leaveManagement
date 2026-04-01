# BA Analysis Status — Leave Management System

> **Last updated:** 2026-03-27
> **Phase:** Business Analysis — Baselined (ready for design)

---

## Source Inventory

| File | Status | Notes |
|------|--------|-------|
| ba/discovery/leave_management.md | Analyzed | Primary source — actors, functional requirements, business rules, NFRs |

---

## Coverage Summary

| Area | Status | Notes |
|------|--------|-------|
| Business problem & goals | Partial | Implicit from domain; no explicit problem statement in source |
| Scope & out of scope | Covered | In-scope functions listed; out-of-scope confirmed |
| Stakeholders & roles | Covered | Employee, Manager, HR Admin identified |
| Business capabilities & functions | Covered | Core workflow, leave types, balance management, notifications |
| Use cases & user stories | Not started | Next phase |
| Current state / as-is process | Missing | No information on existing process — accepted gap |
| Pain points & gaps | Missing | Not mentioned in source — accepted gap |
| Target capabilities | Covered | Derived from baselined functional requirements |
| Business rules & decision logic | Covered | 5 rules baselined, advance notice per leave type resolved |
| Functional requirements | Covered | All FR baselined, modify/cancel rules resolved |
| Non-functional requirements | Covered | Performance (2s) and audit trail explicit |
| Data & business entities | Partial | Entities implied — to be formally defined in design phase |
| Inputs, outputs & artifacts | Minimal | Not described in source — accepted gap |
| External integrations | Covered | None in scope |
| Risks, assumptions, dependencies | Covered | All assumptions resolved via Q&A |
| Open questions | **None** | All 5 questions resolved and accepted |

---

## Resolved Assumptions

All prior assumptions confirmed via Q&A:

| ID    | Assumption | Resolution |
|-------|------------|------------|
| ASM-001 | Approval is single-level (employee → manager) | Confirmed — Q-003 |
| ASM-002 | Notifications are delivered via email | Confirmed — Q-005 |
| ASM-003 | Approved leave can be cancelled (balance restored) and modified (re-approval required) | Resolved — Q-004 |
| ASM-004 | Leave types: Annual, Sick, Unpaid, Maternity/Paternity | Confirmed — Q-001 |
| ASM-005 | No payroll or calendar integration required for this release | Confirmed — no change |

---

## Readiness Assessment

| Dimension | Readiness | Notes |
|-----------|-----------|-------|
| Business problem | Low | No explicit problem statement — accepted gap |
| Actor clarity | High | Three actors well defined |
| Workflow | High | Full lifecycle covered including cancel/modify of approved leave |
| Business rules | High | All rules baselined with per-type advance notice |
| Data entities | Medium | Entities implied — formal definition in design phase |
| NFR | High | Performance and audit explicit |
| Design readiness | **Ready** | All blocking questions resolved |

---

## History

| Date | Event |
|------|-------|
| 2026-03-27 | Initial analysis from leave_management.md |
| 2026-03-27 | All 5 clarification questions answered and accepted; requirements baselined |
