import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';
import { auditApi } from '@api/audit';
export const HrRequestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const { data: request, isLoading } = useQuery({
        queryKey: ['leaveRequest', id],
        queryFn: () => leaveRequestApi.getById(id),
    });
    const { data: auditEntries = [] } = useQuery({
        queryKey: ['auditTrail', id],
        queryFn: () => auditApi.getByRequestId(id),
        enabled: !!id,
    });
    const cancelMutation = useMutation({
        mutationFn: () => leaveRequestApi.cancel(id),
        onSuccess: () => navigate('/hr-administration/requests'),
    });
    if (isLoading)
        return _jsx(LoadingSpinner, {});
    if (!request)
        return _jsx("div", { className: "text-center text-gray-600 py-12", children: "Request not found." });
    const canCancel = request.status === 'PENDING' || request.status === 'APPROVED';
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Leave Request Detail" }), _jsx("button", { onClick: () => navigate('/hr-administration/requests'), className: "text-blue-600 hover:text-blue-800", children: "\u2190 Back to All Requests" })] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsx(Field, { label: "Employee", value: `${request.employeeName} (${request.employeeEmail ?? ''})` }), _jsx(Field, { label: "Leave Type", value: request.leaveTypeName }), _jsx(Field, { label: "Start Date", value: request.startDate }), _jsx(Field, { label: "End Date", value: request.endDate }), _jsx(Field, { label: "Total Days", value: String(request.totalDays) }), _jsx(Field, { label: "Status", value: _jsx(StatusBadge, { status: request.status }) }), _jsx(Field, { label: "Version", value: String(request.version) }), _jsx(Field, { label: "Submitted At", value: new Date(request.submittedAt).toLocaleString() }), request.reason && _jsx(Field, { label: "Reason", value: request.reason, className: "col-span-2" }), request.managerComment && _jsx(Field, { label: "Manager Comment", value: request.managerComment, className: "col-span-2" })] }), canCancel && (_jsx("div", { className: "mt-6 pt-6 border-t", children: _jsx("button", { onClick: () => setShowCancelConfirm(true), className: "px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold text-sm", children: "Override Cancel" }) }))] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Audit Trail" }), auditEntries.length === 0 ? (_jsx("p", { className: "text-gray-500 text-sm", children: "No audit entries found." })) : (_jsx("ol", { className: "space-y-4", children: auditEntries.map(entry => (_jsxs("li", { className: "flex gap-4", children: [_jsx("div", { className: "w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-gray-900", children: entry.action }), _jsxs("p", { className: "text-xs text-gray-500", children: [entry.actorName, " \u00B7 ", new Date(entry.occurredAt).toLocaleString()] }), (entry.fromStatus || entry.toStatus) && (_jsxs("p", { className: "text-xs text-gray-500", children: [entry.fromStatus, " \u2192 ", entry.toStatus] })), entry.comment && _jsxs("p", { className: "text-sm text-gray-700 mt-1 italic", children: ["\"", entry.comment, "\""] })] })] }, entry.id))) }))] }), showCancelConfirm && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Confirm Override Cancel" }), _jsx("p", { className: "text-gray-600 text-sm mb-6", children: "Are you sure you want to cancel this leave request? This action cannot be undone." }), _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { onClick: () => cancelMutation.mutate(), disabled: cancelMutation.isPending, className: "flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 font-semibold text-sm transition", children: cancelMutation.isPending ? 'Cancelling...' : 'Yes, Cancel' }), _jsx("button", { onClick: () => setShowCancelConfirm(false), className: "flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold text-sm transition", children: "No, Keep" })] })] }) }))] }));
};
const Field = ({ label, value, className = '' }) => (_jsxs("div", { className: className, children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: label }), _jsx("div", { className: "mt-1 text-gray-900", children: value })] }));
const StatusBadge = ({ status }) => {
    const colors = { PENDING: 'bg-yellow-100 text-yellow-800', APPROVED: 'bg-green-100 text-green-800', REJECTED: 'bg-red-100 text-red-800', CANCELLED: 'bg-gray-100 text-gray-800' };
    return _jsx("span", { className: `px-3 py-1 rounded-full text-xs font-semibold ${colors[status] ?? 'bg-gray-100 text-gray-800'}`, children: status });
};
const LoadingSpinner = () => (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }));
