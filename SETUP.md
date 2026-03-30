# Leave Management System — Setup Guide

This guide walks through setting up and running the Leave Management System locally.

## Quick Navigation

- **Backend** (Node.js/Express API): `leaveManagement/` folder — port 3000
- **Frontend** (React UI): `leaveManagement/ui/` folder — port 5173
- **Database**: PostgreSQL on localhost:5432

**⚠️ Important:** Always note which folder each command should run from!

## Prerequisites

- **PostgreSQL 14+** running on `localhost:5432`
- **Node.js 18+** and npm
- **Environment variables** configured in `.env` file

## Environment Configuration

1. **Root `.env`** (for backend):
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=omni
   DB_NAME=leave_management
   PORT=3000
   ```

2. **UI `.env`** (`ui/.env`, for frontend API calls):
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

Both `.env.example` files are provided as templates.

## Database Setup

### Quick Start (Recommended)

**Run from:** `leaveManagement/` (root folder)
```bash
npm run db:init
```

This runs:
1. `reset-database` — Drops all existing tables
2. `create-tables` — Creates tables from `design/sql/schema.sql`
3. `seed` — Loads sample data from `output/sample-data/`

### Step-by-Step

**Run from:** `leaveManagement/` (root folder)

```bash
npm run create-tables     # Create schema only
npm run seed              # Load seed data only
npm run reset-database    # Drop all tables
```

## Running the Application

### Step 1 — Install dependencies (first time only)

**Backend:**
```bash
cd leaveManagement
npm install
```

**Frontend:**
```bash
cd leaveManagement/ui
npm install
```

### Step 2 — Start the backend

**Run from:** `leaveManagement/` (root folder)

**Development (no build required):**
```bash
npm run dev
```

**Production (requires build first):**
```bash
npm run build
npm run start
```

Expected output:
```
✓ Leave Management API listening on http://localhost:3000
✓ Health check: http://localhost:3000/health
✓ Database: leave_management on localhost:5432
```

### Step 3 — Start the frontend

**Run from:** `leaveManagement/ui/` (UI folder) — in a **separate terminal**:
```bash
npm run dev
```

Opens on `http://localhost:5173`

### Step 4 — Log in

Visit `http://localhost:5173` — you will be redirected to the login page.

**Demo credentials:** any email / any password (mock auth, no real validation).

The mock login uses `HR_ADMIN` role, giving access to all three modules.

## UI Modules

### My Leave (`/my-leave/`)
Personal leave management for all employees.

| Page | Route | Description |
|---|---|---|
| Dashboard | `/my-leave/dashboard` | Leave balance summary cards |
| My Requests | `/my-leave/requests` | List of own leave requests |
| Request Detail | `/my-leave/requests/:id` | View a single request, cancel |
| Modify Request | `/my-leave/requests/:id/modify` | Edit a pending/approved request |
| New Request | `/my-leave/new` | Submit a new leave request |

### Team Approvals (`/team-approvals/`) — Manager / HR Admin
Manager dashboard for approving team leave requests.

| Page | Route | Description |
|---|---|---|
| Pending | `/team-approvals/pending` | Requests awaiting approval |
| Review | `/team-approvals/pending/:id` | Approve or reject a request |
| History | `/team-approvals/history` | All reviewed requests |
| History Detail | `/team-approvals/history/:id` | Detail + audit trail |

### HR Administration (`/hr-administration/`) — HR Admin only
System-wide management for HR administrators.

| Page | Route | Description |
|---|---|---|
| Leave Types | `/hr-administration/leave-types` | List leave types |
| New Leave Type | `/hr-administration/leave-types/new` | Create a leave type |
| Edit Leave Type | `/hr-administration/leave-types/:id/edit` | Edit a leave type |
| Balances | `/hr-administration/balances` | All employee balances |
| Set Balance | `/hr-administration/balances/set` | Set employee entitlement |
| All Requests | `/hr-administration/requests` | All leave requests system-wide |
| Request Detail | `/hr-administration/requests/:id` | Detail + override cancel |
| Audit Trail | `/hr-administration/audit` | Full system audit log |

## API Endpoints

All endpoints are prefixed with `/api`.

### Employees
| Method | Path | Description |
|---|---|---|
| GET | `/api/employees/current` | Current authenticated user |
| GET | `/api/employees` | All employees |
| GET | `/api/employees/:id` | Employee by ID |
| GET | `/api/employees/:id/direct-reports` | Direct reports |
| GET | `/api/employees/:id/balances` | Employee leave balances |
| PUT | `/api/employees/:id/balances/:leaveTypeId` | Set leave balance (HR Admin) |

### Leave Types
| Method | Path | Description |
|---|---|---|
| GET | `/api/leave-types` | All leave types |
| GET | `/api/leave-types/:id` | Leave type by ID |
| POST | `/api/leave-types` | Create leave type (HR Admin) |
| PUT | `/api/leave-types/:id` | Update leave type (HR Admin) |
| PATCH | `/api/leave-types/:id/deactivate` | Deactivate leave type (HR Admin) |

### Leave Balances
| Method | Path | Description |
|---|---|---|
| GET | `/api/leave-balances` | All balances |
| GET | `/api/leave-balances/by-employee` | Current user's balances |
| GET | `/api/leave-balances/summary` | Current year balance summary |

### Leave Requests
| Method | Path | Description |
|---|---|---|
| GET | `/api/leave-requests/by-employee` | Current user's requests |
| GET | `/api/leave-requests/pending-for-manager` | Pending requests for manager |
| GET | `/api/leave-requests/all` | All requests (HR Admin) |
| GET | `/api/leave-requests/:id` | Request by ID |
| POST | `/api/leave-requests` | Submit new request |
| PUT | `/api/leave-requests/:id` | Modify request |
| POST | `/api/leave-requests/:id/cancel` | Cancel request |
| POST | `/api/leave-requests/:id/approve` | Approve request (Manager) |
| POST | `/api/leave-requests/:id/reject` | Reject request (Manager) |

### Audit
| Method | Path | Description |
|---|---|---|
| GET | `/api/audit` | All audit entries (HR Admin) |
| GET | `/api/leave-requests/:id/audit` | Audit trail for a request |

### Health
| Method | Path | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/api/version` | API version |

## Database Schema

6 tables:

- **employees** — User accounts with roles: `EMPLOYEE`, `MANAGER`, `HR_ADMIN`
- **leave_types** — Types of leave (Annual, Sick, Unpaid, Maternity/Paternity)
- **leave_balances** — Leave entitlement per employee per year
- **leave_requests** — Submissions with status: `PENDING`, `APPROVED`, `REJECTED`, `CANCELLED`
- **leave_audit_entries** — Immutable audit trail for all state changes
- **notifications** — Email notification records

See `design/sql/schema.sql` for full schema.

## Seed Data

Located in `output/sample-data/`:

- **employees.json** — 5 employees (1 HR Admin, 1 Manager, 3 Employees)
- **leave_types.json** — 4 leave types
- **leave_balances.json** — 8 balance records
- **leave_requests.json** — 7 sample requests in various states
- **leave_audit_entries.json** — 12 audit entries
- **notifications.json** — 12 notification records

## Technology Stack

### Backend
- **Node.js 18+** with TypeScript 5.4
- **Express 4.18** — REST API
- **PostgreSQL** via `pg` (node-postgres)
- **ts-node** for development, compiled to `dist/` for production
- **Jest + ts-jest** for testing

### Frontend
- **React 18.2** with TypeScript 5.3
- **Vite 5** — build tool, dev server
- **React Router v6** — client-side routing
- **TanStack Query 5** — server state and cache management
- **Axios 1.6** — HTTP client
- **Tailwind CSS 3.3** — styling
- **Vitest + @testing-library/react** for testing

## Build & Production

### Backend

**Run from:** `leaveManagement/`
```bash
npm run build       # compiles src/ → dist/
npm run start       # runs dist/index.js
```

### Frontend

**Run from:** `leaveManagement/ui/`
```bash
npm run build       # tsc + vite build → ui/dist/
npm run preview     # preview production bundle locally
```

## All Commands

### Backend — run from `leaveManagement/`

```bash
npm run dev                  # Start dev server (ts-node, no build needed)
npm run build                # Compile TypeScript to dist/
npm run start                # Run compiled dist/index.js

npm run db:init              # Full DB reset + schema + seed
npm run reset-database       # Drop all tables
npm run create-tables        # Create schema
npm run seed                 # Load seed data

npm run test                 # Run all tests
npm run test:unit            # Unit tests only
npm run test:integration     # Integration tests only
```

### Frontend — run from `leaveManagement/ui/`

```bash
npm run dev                  # Start dev server (port 5173)
npm run build                # Build for production
npm run preview              # Preview production build
npm run test                 # Run Vitest tests
```

## Troubleshooting

### Blank page or only My Leave visible in sidebar
The browser has a cached session with the wrong role. Open the browser console (F12) and run:
```javascript
localStorage.clear()
```
Then go to `/login` and log in again.

### Changes to backend not taking effect (404 on new endpoints)
You are running `npm run start` which serves the compiled `dist/`. Either rebuild:
```bash
npm run build && npm run start
```
Or switch to dev mode (no build step):
```bash
npm run dev
```

### Port 3000 already in use
```bash
netstat -ano | findstr :3000   # find the PID
taskkill /PID <PID> /F         # kill it
```
Then restart: `npm run dev`

### Port 5173 already in use
Vite will automatically try the next available port (5174, 5175, …). Check the terminal output for the actual URL.

### PostgreSQL connection error (`ECONNREFUSED`)
Ensure PostgreSQL is running:
```bash
# Windows service
net start postgresql-14

# Docker
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=omni -e POSTGRES_DB=leave_management postgres:14
```

### Foreign key constraint error on seed
```bash
npm run db:init     # full reset fixes UUID mismatches
```

### Module not found
```bash
npm install              # from leaveManagement/
cd ui && npm install     # from leaveManagement/ui/
```

## Project Structure

```
leaveManagement/
├── src/                          # Backend TypeScript source
│   ├── index.ts                  # Express entry point — all API routes
│   ├── shared/                   # DB client, events, actor context
│   ├── employee/                 # Employee module
│   ├── leave-request/            # Leave request (domain, service, controller)
│   ├── leave-balance/            # Leave balance module
│   ├── leave-type/               # Leave type module
│   ├── audit/                    # Audit module
│   └── notification/             # Notification module
├── ui/                           # React frontend
│   ├── src/
│   │   ├── api/                  # Axios clients (one per module)
│   │   ├── context/              # AuthContext (mock JWT auth)
│   │   ├── layout/               # AppShell, Sidebar, TopBar, AuthGuard
│   │   ├── pages/
│   │   │   ├── MyLeave/          # Dashboard, Requests, RequestDetail, ModifyRequest, New
│   │   │   ├── TeamApprovals/    # Pending, Review, History, HistoryDetail
│   │   │   └── HrAdministration/ # LeaveTypes, Balances, Requests, AuditTrail, SetBalance
│   │   ├── router/               # React Router v6 (all routes, lazy-loaded)
│   │   └── types/                # TypeScript entity types
│   ├── vite.config.ts            # Vite + /api proxy → localhost:3000
│   └── package.json
├── design/
│   └── sql/schema.sql
├── output/
│   └── sample-data/              # Seed data JSON files
├── scripts/                      # DB utility scripts
├── test/
│   ├── unit/                     # Domain + service unit tests
│   └── integration/              # Repository + controller integration tests
├── .env
├── .env.example
└── package.json
```
