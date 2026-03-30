import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { AuthGuard } from '@layout/AuthGuard';
import { AppShell } from '@layout/AppShell';
import { LoginPage } from '@pages/LoginPage';

// Lazy load page components
const MyLeaveDashboard = lazy(() => import('@pages/MyLeave/Dashboard').then(m => ({ default: m.Dashboard })));
const MyLeaveNew = lazy(() => import('@pages/MyLeave/New').then(m => ({ default: m.SubmitLeaveRequest })));
const MyLeaveRequests = lazy(() => import('@pages/MyLeave/Requests').then(m => ({ default: m.MyLeaveRequests })));
const MyLeaveRequestDetail = lazy(() => import('@pages/MyLeave/RequestDetail').then(m => ({ default: m.RequestDetail })));
const MyLeaveModifyRequest = lazy(() => import('@pages/MyLeave/ModifyRequest').then(m => ({ default: m.ModifyLeaveRequest })));

const TeamApprovingPending = lazy(() => import('@pages/TeamApprovals/Pending').then(m => ({ default: m.PendingRequests })));
const TeamApprovalsReview = lazy(() => import('@pages/TeamApprovals/Review').then(m => ({ default: m.ReviewRequest })));
const TeamApprovalsHistory = lazy(() => import('@pages/TeamApprovals/History').then(m => ({ default: m.TeamLeaveHistory })));
const TeamApprovalsHistoryDetail = lazy(() => import('@pages/TeamApprovals/HistoryDetail').then(m => ({ default: m.HistoryDetail })));

const HrAdminLeaveTypes = lazy(() => import('@pages/HrAdministration/LeaveTypes').then(m => ({ default: m.LeaveTypes })));
const HrAdminNewLeaveType = lazy(() => import('@pages/HrAdministration/NewLeaveType').then(m => ({ default: m.NewLeaveType })));
const HrAdminEditLeaveType = lazy(() => import('@pages/HrAdministration/EditLeaveType').then(m => ({ default: m.EditLeaveType })));
const HrAdminBalances = lazy(() => import('@pages/HrAdministration/Balances').then(m => ({ default: m.EmployeeBalances })));
const HrAdminSetBalance = lazy(() => import('@pages/HrAdministration/SetBalance').then(m => ({ default: m.SetBalance })));
const HrAdminRequests = lazy(() => import('@pages/HrAdministration/Requests').then(m => ({ default: m.AllRequests })));
const HrAdminRequestDetail = lazy(() => import('@pages/HrAdministration/RequestDetail').then(m => ({ default: m.HrRequestDetail })));
const HrAdminAuditTrail = lazy(() => import('@pages/HrAdministration/AuditTrail').then(m => ({ default: m.AuditTrail })));

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
      // Default redirect
      { index: true, element: <Navigate to="/my-leave/dashboard" replace /> },

      // My Leave Module
      {
        path: 'my-leave',
        children: [
          { path: 'dashboard', element: <MyLeaveDashboard /> },
          { path: 'new', element: <MyLeaveNew /> },
          { path: 'requests', element: <MyLeaveRequests /> },
          { path: 'requests/:id', element: <MyLeaveRequestDetail /> },
          { path: 'requests/:id/modify', element: <MyLeaveModifyRequest /> },
        ],
      },

      // Team Approvals Module
      {
        path: 'team-approvals',
        children: [
          { path: 'pending', element: <TeamApprovingPending /> },
          { path: 'pending/:id', element: <TeamApprovalsReview /> },
          { path: 'history', element: <TeamApprovalsHistory /> },
          { path: 'history/:id', element: <TeamApprovalsHistoryDetail /> },
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
          { path: 'balances/set', element: <HrAdminSetBalance /> },
          { path: 'requests', element: <HrAdminRequests /> },
          { path: 'requests/:id', element: <HrAdminRequestDetail /> },
          { path: 'audit', element: <HrAdminAuditTrail /> },
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
