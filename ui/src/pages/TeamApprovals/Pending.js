import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';
export const PendingRequests = () => {
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['pendingRequests'],
        queryFn: () => leaveRequestApi.getPendingForManager(),
    });
    const filteredRequests = requests.filter((request) => request.status === 'PENDING');
    if (isLoading) {
        return _jsx(LoadingSpinner, {});
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Pending Requests" }), filteredRequests.length === 0 ? (_jsx("div", { className: "bg-gray-50 rounded-lg p-6 text-center text-gray-600", children: _jsx("p", { children: "No pending requests. All leave requests from your team have been reviewed." }) })) : (_jsx("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50 border-b", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Employee" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Type" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Start Date" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "End Date" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Days" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Submitted" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y", children: filteredRequests.map((request) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-3 text-sm text-gray-900", children: request.employeeId }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: request.leaveTypeId }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: request.startDate }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: request.endDate }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-900 font-semibold", children: request.totalDays }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: new Date(request.submittedAt).toLocaleDateString() }), _jsx("td", { className: "px-6 py-3 text-sm", children: _jsx(Link, { to: `/team-approvals/pending/${request.id}`, className: "text-blue-600 hover:text-blue-800 font-semibold", children: "Review" }) })] }, request.id))) })] }) }))] }));
};
const LoadingSpinner = () => (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }));
