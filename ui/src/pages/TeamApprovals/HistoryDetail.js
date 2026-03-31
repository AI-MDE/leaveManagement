import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';
import { auditApi } from '@api/audit';
export const HistoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: request, isLoading } = useQuery({
        queryKey: ['leaveRequest', id],
        queryFn: () => leaveRequestApi.getById(id),
    });
    const { data: auditEntries = [] } = useQuery({
        queryKey: ['auditTrail', id],
        queryFn: () => auditApi.getByRequestId(id),
        enabled: !!id,
    });
    if (isLoading)
        return _jsx(LoadingSpinner, {});
    if (!request)
        return _jsx("div", { className: "text-center text-gray-600 py-12", children: "Request not found." });
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Request History Detail" }), _jsx("button", { onClick: () => navigate('/team-approvals/history'), className: "text-blue-600 hover:text-blue-800", children: "\u2190 Back to Team History" })] }), _jsx("div", { className: "bg-white rounded-lg shadow p-6", children: _jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsx(Field, { label: "Employee", value: request.employeeName }), _jsx(Field, { label: "Leave Type", value: request.leaveTypeName }), _jsx(Field, { label: "Start Date", value: request.startDate }), _jsx(Field, { label: "End Date", value: request.endDate }), _jsx(Field, { label: "Total Days", value: String(request.totalDays) }), _jsx(Field, { label: "Status", value: _jsx(StatusBadge, { status: request.status }) }), request.reason && _jsx(Field, { label: "Reason", value: request.reason, className: "col-span-2" }), request.managerComment && _jsx(Field, { label: "Manager Comment", value: request.managerComment, className: "col-span-2" })] }) }), _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Audit Trail" }), auditEntries.length === 0 ? (_jsx("p", { className: "text-gray-500 text-sm", children: "No audit entries found." })) : (_jsx("ol", { className: "space-y-4", children: auditEntries.map((entry) => (_jsxs("li", { className: "flex gap-4", children: [_jsx("div", { className: "w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-gray-900", children: entry.action }), _jsxs("p", { className: "text-xs text-gray-500", children: [entry.actorName, " \u00B7 ", new Date(entry.occurredAt).toLocaleString()] }), (entry.fromStatus || entry.toStatus) && (_jsxs("p", { className: "text-xs text-gray-500", children: [entry.fromStatus, " \u2192 ", entry.toStatus] })), entry.comment && _jsxs("p", { className: "text-sm text-gray-700 mt-1 italic", children: ["\"", entry.comment, "\""] })] })] }, entry.id))) }))] })] }));
};
const Field = ({ label, value, className = '' }) => (_jsxs("div", { className: className, children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: label }), _jsx("div", { className: "mt-1 text-gray-900", children: value })] }));
const StatusBadge = ({ status }) => {
    const colors = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        APPROVED: 'bg-green-100 text-green-800',
        REJECTED: 'bg-red-100 text-red-800',
        CANCELLED: 'bg-gray-100 text-gray-800',
    };
    return _jsx("span", { className: `px-3 py-1 rounded-full text-xs font-semibold ${colors[status] ?? 'bg-gray-100 text-gray-800'}`, children: status });
};
const LoadingSpinner = () => (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }));
