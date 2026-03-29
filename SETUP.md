# Leave Management System — Setup Guide

This guide walks through setting up and running the Leave Management System locally.

## Quick Navigation

- **Backend** (Node.js API): `leaveManagement/` folder
- **Frontend** (React UI): `leaveManagement/ui/` folder
- **Database**: PostgreSQL on localhost:5432

**⚠️ Important:** Always note which folder each command should run from!

## Prerequisites

- **PostgreSQL 14+** running on `localhost:5432`
- **Node.js 18+** and npm
- **Environment variables** configured in `.env` file

## Environment Configuration

1. **Root `.env`** (for backend and database):
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
Initialize the database with all tables and seed data in one command:

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

- **Create tables only:**
  ```bash
  npm run create-tables
  ```
  
- **Load seed data only:**
  ```bash
  npm run seed
  ```
  
- **Reset database (drop all tables):**
  ```bash
  npm run reset-database
  ```

## Running the Application

### Backend Development Server

**Run from:** `leaveManagement/` (root folder)
```bash
npm run dev
```

Starts the Node.js backend on `http://localhost:3000`

Expected output:
```
✓ Leave Management API listening on http://localhost:3000
✓ Health check: http://localhost:3000/health
✓ Database: leave_management on localhost:5432
```

### Frontend Development Server

**Run from:** `leaveManagement/ui/` (UI folder)
```bash
npm run dev
```

Starts the React frontend on `http://localhost:5173`

Opens automatically in your browser, or visit: `http://localhost:5173`

### Running Both Simultaneously

**Terminal 1** — Backend (from `leaveManagement/`):
```bash
npm run dev
```

**Terminal 2** — Frontend (from `leaveManagement/ui/`):
```bash
cd ui
npm run dev
```

Or in one Terminal 2 command:
```bash
cd leaveManagement/ui && npm run dev
```

## Database Schema

The database includes 6 tables:

- **employees** — User accounts with role-based access (EMPLOYEE, MANAGER, HR_ADMIN)
- **leave_types** — Types of leave (Annual, Sick, Unpaid, Maternity/Paternity)
- **leave_balances** — Leave allowance per employee per year
- **leave_requests** — Leave request submissions and approvals
- **leave_audit_entries** — Audit trail for all leave request actions
- **notifications** — Email notifications for leave events

See `design/sql/schema.sql` for full schema details.

## Seed Data

Located in `output/sample-data/`:

- **employees.json** — 5 employees (1 HR Admin, 1 Manager, 3 Employees)
- **leave_types.json** — 4 leave types (Annual, Sick, Unpaid, Maternity/Paternity)
- **leave_balances.json** — 8 leave balance records
- **leave_requests.json** — 7 sample leave requests in various states
- **leave_audit_entries.json** — 12 audit entries tracking request changes
- **notifications.json** — 12 notification records

All IDs use RFC 4122 UUID format for database compatibility.

## UI Features

### Installed Modules

1. **MyLeave** — Personal leave balance and request management
2. **TeamApprovals** — Manager dashboard for approving team leave requests
3. **HrAdministration** — HR admin dashboard for system-wide management

### Technology Stack

- **React 18.2.0** with TypeScript 5.3.0
- **Vite 5.0.0** build tool
- **React Router v6** for navigation
- **TanStack Query 5.25.0** for server state management
- **Tailwind CSS 3.3.0** for styling
- **Axios 1.6.0** for HTTP requests

## Build & Production

### Build for Production

**Backend** — Run from `leaveManagement/` (root folder):
```bash
npm run build
```
Output: `dist/` folder contains compiled JavaScript

**Frontend** — Run from `leaveManagement/ui/`:
```bash
cd ui
npm run build
```
Output: `ui/dist/` folder contains optimized bundle (155 modules, ~45KB gzipped)

### Start Production Server

**Run from:** `leaveManagement/` (root folder)
```bash
npm run start
```

## Troubleshooting

### PostgreSQL Connection Error

**Error:** `ERROR: connect ECONNREFUSED`

**Solution:** Ensure PostgreSQL is running:
```bash
# macOS (if installed via Homebrew)
brew services start postgresql

# Windows (if running as service)
# Use Services app or: net start postgresql-14

# Docker
docker run -d -p 5432:5432 \
  -e POSTGRES_PASSWORD=omni \
  -e POSTGRES_DB=leave_management \
  postgres:14
```

### Foreign Key Constraint Error

**Error:** `insert or update on table "..." violates foreign key constraint`

**Solution:** This typically means seed data UUID format doesn't match. Run:
```bash
npm run db:init
```

This resets and reinitializes the database with correct UUIDs.

### Port Already in Use

**Backend (port 3000):**
```bash
# Find process using port 3000
lsof -i :3000
# Kill it
kill -9 <PID>
```

**Frontend (port 5173):**
```bash
# Vite will automatically try next available port
```

### Module Not Found

**Solution:** Verify dependencies are installed:
```bash
npm install
cd ui && npm install
```

## Project Structure

```
leaveManagement/
├── src/              # Backend source TypeScript files
├── ui/               # React frontend (Vite + React Router)
├── design/           # Application design and schema
│   └── sql/
│       └── schema.sql
├── output/           # Generated artifacts
│   ├── docs/         # Generated documentation
│   └── sample-data/  # Seed data JSON files
├── scripts/          # Utility scripts
│   ├── createTables.js
│   ├── loadSeedData.js
│   ├── resetDatabase.js
│   └── regenerateSeedData.js
├── .env              # Environment variables (DO NOT COMMIT)
├── .env.example      # Environment template
└── package.json      # Root dependencies and scripts
```

## Next Steps

1. ✅ **Database initialized** with 48 sample records across 6 tables
2. ✅ **Frontend complete** with 45 React components across 3 modules
3. **Build backend APIs** — Implement REST endpoints for leave management
4. **Test integration** — Verify frontend ↔ backend communication
5. **Deploy** — Configure for staging/production environments

## Useful Commands

### Backend Commands
**Run from:** `leaveManagement/` (root folder)

```bash
# Database operations
npm run db:init              # Full database initialization
npm run reset-database       # Drop all tables
npm run create-tables        # Create schema
npm run seed                 # Load seed data
npm run verify-database      # Verify all tables and row counts

# Development
npm run dev                  # Start backend dev server (port 3000)
npm run build                # Build backend for production
npm run start                # Run backend from dist/

# Testing
npm run test                 # Run all tests
npm run test:unit            # Run unit tests
npm run test:integration     # Run integration tests
```

### Frontend Commands
**Run from:** `leaveManagement/ui/` (UI folder)

```bash
npm run dev                  # Start frontend dev server (port 5173)
npm run build                # Build frontend for production
npm run preview              # Preview production build locally
```

## Support

For issues or questions:
1. Check `.env` configuration first
2. Verify PostgreSQL is running and accessible
3. Run `npm run db:init` to reset the database
4. Check logs in the terminal where services are running
