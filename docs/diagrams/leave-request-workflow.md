# Leave Request Workflow & Data Flow Diagram

> Derived from `design/modules/module-catalog.json` — MOD-004 state machine and `design/application_architecture.json` business rule classification

## State Machine

```mermaid
stateDiagram-v2
    [*] --> PENDING : Employee submits\n(BR-001 balance check\nBR-002 advance notice\nBR-003 overlap check)

    PENDING --> APPROVED  : Manager approves\n(balance deducted)
    PENDING --> REJECTED  : Manager rejects
    PENDING --> PENDING   : Employee modifies\n(re-routes to manager)
    PENDING --> CANCELLED : Employee cancels

    APPROVED --> PENDING   : Employee modifies\n(BR-005 re-approval required\nbalance restored)
    APPROVED --> CANCELLED : Employee cancels\n(BR-004 balance restored)
    APPROVED --> CANCELLED : HR Admin override cancel\n(BR-004 balance restored)

    REJECTED --> CANCELLED : HR Admin override

    CANCELLED --> [*]
    REJECTED  --> [*]
```

## Submit Leave Request — Data Flow

```mermaid
sequenceDiagram
    participant E as Employee
    participant C as LeaveRequestController
    participant S as SubmitLeaveRequestService
    participant LT as LeaveTypeRepository
    participant LB as LeaveBalanceService
    participant LRD as LeaveRequestValidator
    participant LRR as LeaveRequestRepository
    participant AUD as AuditService
    participant PUB as DomainEventPublisher
    participant NOT as NotificationService

    E->>C: POST /leave-requests
    C->>S: SubmitLeaveRequestCommand
    S->>LT: load LeaveType (advance notice rules)
    S->>S: BR-002 advance notice check
    S->>LB: validateAndReserve(employee, leaveType, days)
    LB-->>S: OK / InsufficientBalanceError
    S->>LRD: validate (BR-003 overlap check, total_days)
    LRD-->>S: OK / ValidationError
    S->>LRR: save(LeaveRequest{status: PENDING})
    S->>AUD: append(SUBMITTED, actor=employee)
    S->>PUB: publish(LeaveRequestSubmittedEvent)
    PUB->>NOT: handle(LeaveRequestSubmittedEvent)
    NOT->>NOT: resolve recipients (Manager)
    NOT->>NOT: dispatch EMAIL, persist Notification{SENT}
    C-->>E: 201 LeaveRequestResponseDto
```

## Approve Leave Request — Data Flow

```mermaid
sequenceDiagram
    participant M as Manager
    participant C as LeaveRequestController
    participant S as ApproveLeaveRequestService
    participant SM as LeaveRequestStateMachine
    participant LRR as LeaveRequestRepository
    participant LB as LeaveBalanceService
    participant AUD as AuditService
    participant PUB as DomainEventPublisher
    participant NOT as NotificationService

    M->>C: POST /leave-requests/{id}/approve
    C->>S: ApproveLeaveRequestCommand
    S->>LRR: load LeaveRequest
    S->>SM: transition(PENDING → APPROVED)
    SM-->>S: OK / InvalidTransitionError
    S->>LB: deduct(employee, leaveType, days)
    S->>LRR: save(LeaveRequest{status: APPROVED})
    S->>AUD: append(APPROVED, actor=manager)
    S->>PUB: publish(LeaveRequestApprovedEvent)
    PUB->>NOT: handle(LeaveRequestApprovedEvent)
    NOT->>NOT: resolve recipients (Employee)
    NOT->>NOT: dispatch EMAIL
    C-->>M: 200 LeaveRequestResponseDto
```

## Cancel Approved Leave — Data Flow (BR-004)

```mermaid
sequenceDiagram
    participant E as Employee
    participant C as LeaveRequestController
    participant S as CancelLeaveRequestService
    participant SM as LeaveRequestStateMachine
    participant LRR as LeaveRequestRepository
    participant LB as LeaveBalanceService
    participant AUD as AuditService
    participant PUB as DomainEventPublisher
    participant NOT as NotificationService

    E->>C: POST /leave-requests/{id}/cancel
    C->>S: CancelLeaveRequestCommand
    S->>LRR: load LeaveRequest
    S->>SM: transition(APPROVED → CANCELLED)
    SM-->>S: OK
    S->>LB: restore(employee, leaveType, days)
    S->>LRR: save(LeaveRequest{status: CANCELLED})
    S->>AUD: append(CANCELLED + BALANCE_RESTORED, actor=employee)
    S->>PUB: publish(LeaveRequestCancelledEvent)
    PUB->>NOT: handle(LeaveRequestCancelledEvent)
    NOT->>NOT: resolve recipients (Manager)
    NOT->>NOT: dispatch EMAIL
    C-->>E: 200 LeaveRequestResponseDto
```

## Business Rules Summary

| Rule | Layer | Artifact | Module |
|---|---|---|---|
| BR-001 Balance must cover requested days | domain | `LeaveBalanceRules` | leave-balance |
| BR-002 Advance notice per leave type | service | `SubmitLeaveRequestService` | leave-request |
| BR-003 No overlapping PENDING/APPROVED requests | domain | `LeaveRequestValidator` | leave-request |
| BR-004 Cancellation of APPROVED restores balance | service | `CancelLeaveRequestService` | leave-request |
| BR-005 Modification of APPROVED requires re-approval | domain | `LeaveRequestStateMachine` | leave-request |
