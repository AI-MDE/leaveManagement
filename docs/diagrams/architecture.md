# Architecture Diagram

> Derived from `design/application_architecture.json` v1.0

## System Overview

The Leave Management System is a **modular monolith** following a **layered, workflow-driven** architecture with **event-driven notifications**.

```mermaid
graph TB
    subgraph Client["Client Layer"]
        HTTP["HTTP Requests"]
    end

    subgraph App["Application — Modular Monolith (Node.js / TypeScript)"]
        subgraph LR["leave-request (workflow)"]
            LRC["Controller"] --> LRS["Services\n(Submit/Approve/Reject/Cancel/Modify)"]
            LRS --> LRD["Domain\n(Entity · Validator · StateMachine)"]
            LRS --> LRDA["Data Access\n(Repository · Mapper)"]
            LRS --> LRQS["Query Service"]
        end

        subgraph LB["leave-balance (rule_engine)"]
            LBC["Controller"] --> LBSvc["Service\n(validateAndReserve · deduct · restore)"]
            LBSvc --> LBD["Domain\n(Entity · Rules)"]
            LBSvc --> LBDA["Data Access"]
            LBC --> LBQS["Query Service"]
        end

        subgraph EMP["employee (master_data)"]
            EC["Controller"] --> ES["Service"]
            ES --> ED["Domain\n(Entity · Validator)"]
            ES --> EDA["Data Access"]
            EC --> EQS["Query Service"]
        end

        subgraph LT["leave-type (master_data)"]
            LTC["Controller"] --> LTSvc["Service"]
            LTSvc --> LTD["Domain\n(Entity · Validator)"]
            LTSvc --> LTDA["Data Access"]
            LTC --> LTQS["Query Service"]
        end

        subgraph NOTIF["notification (integration)"]
            NS["NotificationService"] --> NA["SMTP Email Adapter"]
            NS --> NDA["Data Access"]
        end

        subgraph AUDIT["audit (reporting)"]
            AS["AuditService (append-only)"] --> ADA["Data Access"]
            AC["Controller"] --> AQS["Query Service"]
        end

        subgraph SHARED["shared"]
            DE["DomainEvent&lt;T&gt;"]
            DEP["DomainEventPublisher (port)"]
        end
    end

    subgraph Infra["Infrastructure"]
        DB[("PostgreSQL\n(raw SQL)")]
        SMTP["SMTP Server"]
    end

    HTTP --> LRC & LBC & EC & LTC & AC

    LRS -->|"emits events"| DEP
    DEP -->|"LeaveRequestSubmittedEvent\nLeaveRequestApprovedEvent\n…"| NS

    LRS -->|"calls"| LBSvc
    LRS -->|"calls"| AS

    LRDA & LBDA & EDA & LTDA & NDA & ADA --> DB
    NA --> SMTP
```

## Layer Responsibilities

| Layer | Responsibility |
|---|---|
| **controller** | HTTP entry point — validate request shape, delegate to service (writes) or query_service (reads) |
| **service** | Write use-case orchestration — authorize, load entity, apply domain behaviour, save, emit event |
| **query_service** | Read-only projections — stateless, bypasses domain layer, returns ReadDto from data_access |
| **domain** | Business invariants and state machine — Entity, Validator, StateMachine, Rules |
| **data_access** | Persistence — Repository interface (port), Repository impl (raw SQL), Mapper (row ↔ entity) |
| **dto** | Typed contracts — Commands (write inputs), ResponseDto, ReadDto, Events |

## Tech Stack

| Concern | Choice |
|---|---|
| Language | TypeScript |
| Runtime | Node.js |
| Database | PostgreSQL |
| Data Access | Raw SQL (no ORM) |
| Package Manager | npm |
