import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';
export const AllRequests = () => {
    const [statusFilter, setStatusFilter] = useState('');
    const [employeeFilter, setEmployeeFilter] = useState('');
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['allLeaveRequests'],
        queryFn: () => leaveRequestApi.getAllForHrAdmin(),
    });
    const filtered = requests.filter(r => {
        if (statusFilter && r.status !== statusFilter)
            return false;
        if (employeeFilter && !r.employeeName?.toLowerCase().includes(employeeFilter.toLowerCase()))
            return false;
        return true;
    });
    if (isLoading)
        return _jsx(LoadingSpinner, {});
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "All Leave Requests" }), _jsxs("div", { className: "flex gap-4 flex-wrap", children: [_jsx("input", { type: "text", placeholder: "Filter by employee...", value: employeeFilter, onChange: e => setEmployeeFilter(e.target.value), className: "px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm" }), _jsxs("select", { value: statusFilter, onChange: e => setStatusFilter(e.target.value), className: "px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm", children: [_jsx("option", { value: "", children: "All Statuses" }), _jsx("option", { value: "PENDING", children: "Pending" }), _jsx("option", { value: "APPROVED", children: "Approved" }), _jsx("option", { value: "REJECTED", children: "Rejected" }), _jsx("option", { value: "CANCELLED", children: "Cancelled" })] }), (statusFilter || employeeFilter) && (_jsx("button", { onClick: () => { setStatusFilter(''); setEmployeeFilter(''); }, className: "text-sm text-gray-500 hover:text-gray-700", children: "Clear filters" }))] }), filtered.length === 0 ? (_jsx("div", { className: "bg-gray-50 rounded-lg p-6 text-center text-gray-600", children: "No leave requests found matching the selected filters." })) : (_jsx("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50 border-b", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Employee" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Leave Type" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Start" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "End" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Days" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Status" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Submitted" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Reviewed By" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y", children: filtered.map(r => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-3 text-sm text-gray-900", children: r.employeeName ?? r.employeeId }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: r.leaveTypeName ?? r.leaveTypeId }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: r.startDate }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: r.endDate }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-900 font-semibold", children: r.totalDays }), _jsx("td", { className: "px-6 py-3 text-sm", children: _jsx(StatusBadge, { status: r.status }) }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-500", children: new Date(r.submittedAt).toLocaleDateString() }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-500", children: r.reviewedByName ?? '—' }), _jsx("td", { className: "px-6 py-3 text-sm", children: _jsx(Link, { to: `/hr-administration/requests/${r.id}`, className: "text-blue-600 hover:text-blue-800", children: "View Detail" }) })] }, r.id))) })] }) }))] }));
};
const StatusBadge = ({ status }) => {
    const colors = {
        PENDING: 'bg-yellow-100 text-yellow-800', APPROVED: 'bg-green-100 text-green-800',
        REJECTED: 'bg-red-100 text-red-800', CANCELLED: 'bg-gray-100 text-gray-800',
    };
    return _jsx("span", { className: `px-3 py-1 rounded-full text-xs font-semibold ${colors[status] ?? 'bg-gray-100 text-gray-800'}`, children: status });
};
const LoadingSpinner = () => (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }));
