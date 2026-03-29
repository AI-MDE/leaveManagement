import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';
import { auditApi } from '@api/audit';
export const RequestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const { data: request, isLoading } = useQuery({
        queryKey: ['leaveRequest', id],
        queryFn: () => leaveRequestApi.getById(id),
    });
    const { data: auditTrail = [] } = useQuery({
        queryKey: ['requestAudit', id],
        queryFn: () => auditApi.getByRequestId(id),
    });
    const cancelMutation = useMutation({
        mutationFn: () => leaveRequestApi.cancel(id),
        onSuccess: () => {
            navigate('/my-leave/requests');
        },
    });
    if (isLoading) {
        return _jsx(LoadingSpinner, {});
    }
    if (!request) {
        return _jsx("div", { className: "text-center text-gray-600", children: "Request not found" });
    }
    const canCancel = request.status === 'PENDING' || request.status === 'APPROVED';
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Leave Request Details" }), _jsx("button", { onClick: () => navigate('/my-leave/requests'), className: "text-blue-600 hover:text-blue-800", children: "\u2190 Back to My Requests" })] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Leave Type" }), _jsx("p", { className: "mt-1 text-lg text-gray-900", children: request.leaveTypeName })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Status" }), _jsx("p", { className: "mt-1", children: _jsx(StatusBadge, { status: request.status }) })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Start Date" }), _jsx("p", { className: "mt-1 text-lg text-gray-900", children: request.startDate })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "End Date" }), _jsx("p", { className: "mt-1 text-lg text-gray-900", children: request.endDate })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Total Days" }), _jsx("p", { className: "mt-1 text-lg text-gray-900 font-semibold", children: request.totalDays })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Submitted Date" }), _jsx("p", { className: "mt-1 text-lg text-gray-900", children: new Date(request.submittedAt).toLocaleDateString() })] })] }), request.reason && (_jsxs("div", { className: "mt-6 pt-6 border-t", children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Reason" }), _jsx("p", { className: "mt-2 text-gray-900", children: request.reason })] })), request.managerComment && (_jsxs("div", { className: "mt-6 pt-6 border-t", children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Manager Comment" }), _jsx("p", { className: "mt-2 text-gray-900", children: request.managerComment })] })), canCancel && (_jsx("div", { className: "mt-6 pt-6 border-t flex gap-4", children: _jsx("button", { onClick: () => setShowCancelConfirm(true), className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition", children: "Cancel Request" }) }))] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Audit Trail" }), auditTrail.length === 0 ? (_jsx("p", { className: "text-gray-600", children: "No audit history available" })) : (_jsx("div", { className: "space-y-4", children: auditTrail.map((entry) => (_jsxs("div", { className: "border-l-4 border-blue-600 pl-4 py-2", children: [_jsx("p", { className: "font-semibold text-gray-900", children: entry.action }), _jsxs("p", { className: "text-sm text-gray-600", children: ["By: ", entry.actorName, " (", entry.actorEmail, ")"] }), _jsx("p", { className: "text-sm text-gray-600", children: new Date(entry.occurredAt).toLocaleString() }), entry.comment && _jsx("p", { className: "text-sm text-gray-700 mt-1", children: entry.comment })] }, entry.id))) }))] }), showCancelConfirm && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 max-w-sm", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Cancel Leave Request?" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Are you sure you want to cancel this leave request? This action cannot be undone." }), _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { onClick: () => setShowCancelConfirm(false), className: "flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50", children: "Keep Request" }), _jsx("button", { onClick: () => cancelMutation.mutate(), disabled: cancelMutation.isPending, className: "flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400", children: cancelMutation.isPending ? 'Cancelling...' : 'Cancel Request' })] })] }) }))] }));
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
