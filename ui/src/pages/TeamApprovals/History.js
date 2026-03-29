import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';
export const TeamLeaveHistory = () => {
    const [filters, setFilters] = useState({
        employee: '',
        status: '',
        leaveType: '',
        dateRange: '',
    });
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['teamHistory'],
        queryFn: () => leaveRequestApi.getAllForHrAdmin(),
    });
    const filteredRequests = requests.filter((request) => {
        if (filters.status && request.status !== filters.status)
            return false;
        return true;
    });
    if (isLoading) {
        return _jsx(LoadingSpinner, {});
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Team Leave History" }), _jsx("div", { className: "bg-white rounded-lg shadow p-4 grid grid-cols-4 gap-4", children: _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Status" }), _jsxs("select", { value: filters.status, onChange: (e) => setFilters({ ...filters, status: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm", children: [_jsx("option", { value: "", children: "All Statuses" }), _jsx("option", { value: "PENDING", children: "Pending" }), _jsx("option", { value: "APPROVED", children: "Approved" }), _jsx("option", { value: "REJECTED", children: "Rejected" }), _jsx("option", { value: "CANCELLED", children: "Cancelled" })] })] }) }), filteredRequests.length === 0 ? (_jsx("div", { className: "bg-gray-50 rounded-lg p-6 text-center text-gray-600", children: _jsx("p", { children: "No leave history found for your team with the selected filters." }) })) : (_jsx("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50 border-b", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Employee" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Type" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Start Date" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "End Date" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Days" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Status" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Submitted" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y", children: filteredRequests.map((request) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-3 text-sm text-gray-900", children: request.employeeId }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: request.leaveTypeId }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: request.startDate }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: request.endDate }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-900 font-semibold", children: request.totalDays }), _jsx("td", { className: "px-6 py-3 text-sm", children: _jsx(StatusBadge, { status: request.status }) }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: new Date(request.submittedAt).toLocaleDateString() }), _jsx("td", { className: "px-6 py-3 text-sm", children: _jsx(Link, { to: `/team-approvals/history/${request.id}`, className: "text-blue-600 hover:text-blue-800 font-semibold", children: "View Detail" }) })] }, request.id))) })] }) }))] }));
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
