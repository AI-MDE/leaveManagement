import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from 'react';
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
const AuthenticatedLayout = () => (_jsx(AuthGuard, { children: _jsx(AppShell, { children: _jsx(Suspense, { fallback: _jsx(LoadingSpinner, {}), children: _jsx(Outlet, {}) }) }) }));
// Loading spinner component
const LoadingSpinner = () => (_jsx("div", { className: "flex items-center justify-center h-screen", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }));
// Not found page component
const NotFoundPage = () => (_jsx("div", { className: "flex items-center justify-center h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900", children: "404" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Page not found" })] }) }));
const router = createBrowserRouter([
    {
        path: '/login',
        element: _jsx(LoginPage, {}),
    },
    {
        path: '/',
        element: _jsx(AuthenticatedLayout, {}),
        children: [
            // Default redirect
            { index: true, element: _jsx(Navigate, { to: "/my-leave/dashboard", replace: true }) },
            // My Leave Module
            {
                path: 'my-leave',
                children: [
                    { path: 'dashboard', element: _jsx(MyLeaveDashboard, {}) },
                    { path: 'new', element: _jsx(MyLeaveNew, {}) },
                    { path: 'requests', element: _jsx(MyLeaveRequests, {}) },
                    { path: 'requests/:id', element: _jsx(MyLeaveRequestDetail, {}) },
                    { path: 'requests/:id/modify', element: _jsx(MyLeaveModifyRequest, {}) },
                ],
            },
            // Team Approvals Module
            {
                path: 'team-approvals',
                children: [
                    { path: 'pending', element: _jsx(TeamApprovingPending, {}) },
                    { path: 'pending/:id', element: _jsx(TeamApprovalsReview, {}) },
                    { path: 'history', element: _jsx(TeamApprovalsHistory, {}) },
                    { path: 'history/:id', element: _jsx(TeamApprovalsHistoryDetail, {}) },
                ],
            },
            // HR Administration Module
            {
                path: 'hr-administration',
                children: [
                    { path: 'leave-types', element: _jsx(HrAdminLeaveTypes, {}) },
                    { path: 'leave-types/new', element: _jsx(HrAdminNewLeaveType, {}) },
                    { path: 'leave-types/:id/edit', element: _jsx(HrAdminEditLeaveType, {}) },
                    { path: 'balances', element: _jsx(HrAdminBalances, {}) },
                    { path: 'balances/edit', element: _jsx(HrAdminSetBalance, {}) },
                    { path: 'requests', element: _jsx(HrAdminRequests, {}) },
                    { path: 'requests/:id', element: _jsx(HrAdminRequestDetail, {}) },
                    { path: 'audit', element: _jsx(HrAdminAuditTrail, {}) },
                ],
            },
        ],
    },
    {
        path: '*',
        element: _jsx(NotFoundPage, {}),
    },
]);
export const Router = () => _jsx(RouterProvider, { router: router });
