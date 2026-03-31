import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { auditApi } from '@api/audit';
export const AuditTrail = () => {
    const [employeeFilter, setEmployeeFilter] = useState('');
    const [actionFilter, setActionFilter] = useState('');
    const { data: entries = [], isLoading } = useQuery({
        queryKey: ['allAuditEntries'],
        queryFn: () => auditApi.getAll(),
    });
    const filtered = entries.filter(e => {
        if (actionFilter && e.action !== actionFilter)
            return false;
        if (employeeFilter && !e.employeeName?.toLowerCase().includes(employeeFilter.toLowerCase()))
            return false;
        return true;
    });
    if (isLoading)
        return _jsx(LoadingSpinner, {});
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Audit Trail" }), _jsxs("div", { className: "flex gap-4 flex-wrap", children: [_jsx("input", { type: "text", placeholder: "Filter by employee...", value: employeeFilter, onChange: e => setEmployeeFilter(e.target.value), className: "px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm" }), _jsxs("select", { value: actionFilter, onChange: e => setActionFilter(e.target.value), className: "px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm", children: [_jsx("option", { value: "", children: "All Actions" }), ['SUBMITTED', 'APPROVED', 'REJECTED', 'CANCELLED', 'MODIFIED', 'BALANCE_RESTORED'].map(a => _jsx("option", { value: a, children: a }, a))] }), (employeeFilter || actionFilter) && (_jsx("button", { onClick: () => { setEmployeeFilter(''); setActionFilter(''); }, className: "text-sm text-gray-500 hover:text-gray-700", children: "Clear filters" }))] }), filtered.length === 0 ? (_jsx("div", { className: "bg-gray-50 rounded-lg p-6 text-center text-gray-600", children: "No audit entries found matching the selected filters." })) : (_jsx("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50 border-b", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Occurred At" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Actor" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Action" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "From \u2192 To" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Comment" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Request" })] }) }), _jsx("tbody", { className: "divide-y", children: filtered.map(e => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-3 text-xs text-gray-500", children: new Date(e.occurredAt).toLocaleString() }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-900", children: e.actorName }), _jsx("td", { className: "px-6 py-3 text-sm", children: _jsx("span", { className: "px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold", children: e.action }) }), _jsxs("td", { className: "px-6 py-3 text-xs text-gray-500", children: [e.fromStatus ?? '—', " \u2192 ", e.toStatus ?? '—'] }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600 italic", children: e.comment ?? '—' }), _jsx("td", { className: "px-6 py-3 text-sm", children: _jsx(Link, { to: `/hr-administration/requests/${e.leaveRequestId}`, className: "text-blue-600 hover:text-blue-800 text-xs", children: "View Request" }) })] }, e.id))) })] }) }))] }));
};
const LoadingSpinner = () => (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }));
