import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { leaveBalanceApi } from '@api/leave-balance';
import { leaveRequestApi } from '@api/leave-request';
export const Dashboard = () => {
    const { data: balances = [], isLoading: loadingBalances } = useQuery({
        queryKey: ['leaveBalanceSummary'],
        queryFn: () => leaveBalanceApi.getSummary(),
    });
    const { data: activeRequests = [], isLoading: loadingRequests } = useQuery({
        queryKey: ['myLeaveRequests'],
        queryFn: async () => {
            const allRequests = await leaveRequestApi.getByEmployee();
            return allRequests.filter(r => r.status === 'PENDING' || r.status === 'APPROVED');
        },
    });
    if (loadingBalances || loadingRequests) {
        return _jsx(LoadingSpinner, {});
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "My Leave" }), _jsx(Link, { to: "/my-leave/new", className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition", children: "+ New Request" })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Leave Balances" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: balances.map((balance) => (_jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: balance.leaveTypeName }), _jsxs("div", { className: "mt-4 space-y-2 text-sm", children: [_jsxs("p", { className: "text-gray-600", children: ["Total: ", _jsx("span", { className: "font-semibold", children: balance.totalDays })] }), _jsxs("p", { className: "text-gray-600", children: ["Used: ", _jsx("span", { className: "font-semibold text-orange-600", children: balance.usedDays })] }), _jsxs("p", { className: "text-gray-600", children: ["Pending: ", _jsx("span", { className: "font-semibold text-yellow-600", children: balance.pendingDays })] }), _jsxs("p", { className: "text-gray-900 border-t pt-2", children: ["Available: ", _jsx("span", { className: "font-bold text-green-600", children: balance.availableDays })] })] })] }, balance.leaveTypeId))) })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Active Requests" }), activeRequests.length === 0 ? (_jsx("div", { className: "bg-gray-50 rounded-lg p-6 text-center text-gray-600", children: _jsx("p", { children: "You have no active leave requests. Click 'New Request' to submit one." }) })) : (_jsx("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50 border-b", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Type" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Start Date" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "End Date" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Days" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Status" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y", children: activeRequests.map((request) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-3 text-sm text-gray-900", children: request.leaveTypeId }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: request.startDate }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: request.endDate }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-900 font-semibold", children: request.totalDays }), _jsx("td", { className: "px-6 py-3 text-sm", children: _jsx(StatusBadge, { status: request.status }) }), _jsx("td", { className: "px-6 py-3 text-sm", children: _jsx(Link, { to: `/my-leave/requests/${request.id}`, className: "text-blue-600 hover:text-blue-800", children: "View" }) })] }, request.id))) })] }) }))] }), _jsx("div", { className: "text-center", children: _jsx(Link, { to: "/my-leave/requests", className: "text-blue-600 hover:text-blue-800 font-semibold", children: "View All Requests \u2192" }) })] }));
};
const StatusBadge = ({ status }) => {
    const colors = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        APPROVED: 'bg-green-100 text-green-800',
        REJECTED: 'bg-red-100 text-red-800',
        CANCELLED: 'bg-gray-100 text-gray-800',
    };
    return (_jsx("span", { className: `px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`, children: status }));
};
const LoadingSpinner = () => (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }));
