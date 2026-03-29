# Leave Management System - UI

A React-based frontend for the Leave Management System built with TypeScript, Tailwind CSS, and TanStack Query.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest

## Project Structure

```
ui/
├── src/
│   ├── api/               # API client modules
│   ├── components/        # Reusable components
│   ├── context/           # React context (Auth, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── layout/            # Layout components (AppShell, Sidebar, etc.)
│   ├── pages/             # Page components organized by module
│   │   ├── MyLeave/
│   │   ├── TeamApprovals/
│   │   └── HrAdministration/
│   ├── router/            # Router configuration
│   ├── services/          # Business logic services
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

## Modules

### My Leave (Employee View)
- Dashboard with leave balance summary
- Submit new leave request
- View all personal leave requests
- View request details and audit trail
- Cancel leave requests

### Team Approvals (Manager View)
- View pending leave requests from direct reports
- Review and approve/reject requests
- View team leave history
- View request details and audit trail

### HR Administration (HR Admin View)
- Manage leave types
- View and update employee leave balances
- Oversee all leave requests system-wide
- Access audit trail

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The app will run at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
npm test
```

## Environment Variables

Create a `.env` file in the UI root:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

## API Integration

All API calls are centralized in `src/api/` with typed requests and responses:

- `leave-request.ts` - Leave request operations
- `leave-balance.ts` - Balance queries and updates
- `leave-type.ts` - Leave type management
- `employee.ts` - Employee data
- `audit.ts` - Audit trail access
- `client.ts` - Shared axios client with auth interceptor

## Authentication

Authentication is handled via JWT tokens stored in localStorage. The `AuthGuard` component ensures pages are only accessible to authenticated users with the required role.

## Type Safety

All entities are typed in `src/types/` matching the backend domain models:

- `Employee.ts`
- `LeaveRequest.ts`
- `LeaveBalance.ts`
- `LeaveType.ts`
- `LeaveAuditEntry.ts`
- `Notification.ts`

## Styling

The application uses Tailwind CSS for styling. Customization available in `tailwind.config.ts`.

## License

Proprietary - Leave Management System
