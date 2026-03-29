import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { AuthGuard } from '@layout/AuthGuard';
import { AppShell } from '@layout/AppShell';
import { LoginPage } from '@pages/LoginPage';

// Lazy load page components
const MyLeaveDashboard = lazy(() => import('@pages/MyLeave/Dashboard').then(m => ({ default: m.Dashboard })));
const MyLeaveNew = lazy(() => import('@pages/MyLeave/New').then(m => ({ default: m.SubmitLeaveRequest })));
const MyLeaveRequests = lazy(() => import('@pages/MyLeave/Requests').then(m => ({ default: m.MyLeaveRequests })));
const MyLeaveRequestDetail = lazy(() => import('@pages/MyLeave/RequestDetail').then(m => ({ default: m.RequestDetail })));

const TeamApprovingPending = lazy(() => import('@pages/TeamApprovals/Pending').then(m => ({ default: m.PendingRequests })));
const TeamApprovalsReview = lazy(() => import('@pages/TeamApprovals/Review').then(m => ({ default: m.ReviewRequest })));
const TeamApprovalsHistory = lazy(() => import('@pages/TeamApprovals/History').then(m => ({ default: m.TeamLeaveHistory })));

const HrAdminLeaveTypes = lazy(() => import('@pages/HrAdministration/LeaveTypes').then(m => ({ default: m.LeaveTypes })));
const HrAdminNewLeaveType = lazy(() => import('@pages/HrAdministration/NewLeaveType').then(m => ({ default: m.NewLeaveType })));
const HrAdminEditLeaveType = lazy(() => import('@pages/HrAdministration/EditLeaveType').then(m => ({ default: m.EditLeaveType })));
const HrAdminBalances = lazy(() => import('@pages/HrAdministration/Balances').then(m => ({ default: m.EmployeeBalances })));

// Layout wrapper for authenticated routes
const AuthenticatedLayout: React.FC = () => (
  <AuthGuard>
    <AppShell>
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </AppShell>
  </AuthGuard>
);

// Loading spinner component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Not found page component
const NotFoundPage: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="text-gray-600 mt-2">Page not found</p>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AuthenticatedLayout />,
    children: [
      // My Leave Module
      {
        path: 'my-leave',
        children: [
          { path: 'dashboard', element: <MyLeaveDashboard /> },
          { path: 'new', element: <MyLeaveNew /> },
          { path: 'requests', element: <MyLeaveRequests /> },
          { path: 'requests/:id', element: <MyLeaveRequestDetail /> },
        ],
      },

      // Team Approvals Module
      {
        path: 'team-approvals',
        children: [
          { path: 'pending', element: <TeamApprovingPending /> },
          { path: 'pending/:id', element: <TeamApprovalsReview /> },
          { path: 'history', element: <TeamApprovalsHistory /> },
        ],
      },

      // HR Administration Module
      {
        path: 'hr-administration',
        children: [
          { path: 'leave-types', element: <HrAdminLeaveTypes /> },
          { path: 'leave-types/new', element: <HrAdminNewLeaveType /> },
          { path: 'leave-types/:id/edit', element: <HrAdminEditLeaveType /> },
          { path: 'balances', element: <HrAdminBalances /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const Router: React.FC = () => <RouterProvider router={router} />;
