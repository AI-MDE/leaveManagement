import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';
import { leaveBalanceApi } from '@api/leave-balance';
export const ReviewRequest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const { data: request, isLoading } = useQuery({
        queryKey: ['leaveRequest', id],
        queryFn: () => leaveRequestApi.getById(id),
    });
    const { data: employeeBalance } = useQuery({
        queryKey: ['leaveBalance'],
        queryFn: () => leaveBalanceApi.getByLeaveType(request?.leaveTypeId),
        enabled: !!request?.leaveTypeId,
    });
    const approveMutation = useMutation({
        mutationFn: () => leaveRequestApi.approve(id, { managerComment: comment }),
        onSuccess: () => navigate('/team-approvals/pending'),
    });
    const rejectMutation = useMutation({
        mutationFn: () => leaveRequestApi.reject(id, { managerComment: comment }),
        onSuccess: () => navigate('/team-approvals/pending'),
    });
    if (isLoading) {
        return _jsx(LoadingSpinner, {});
    }
    if (!request) {
        return _jsx("div", { className: "text-center text-gray-600", children: "Request not found" });
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Review Leave Request" }), _jsx("button", { onClick: () => navigate('/team-approvals/pending'), className: "text-blue-600 hover:text-blue-800", children: "\u2190 Back to Pending" })] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-6 mb-6", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Employee" }), _jsx("p", { className: "mt-1 text-lg text-gray-900", children: request.employeeName }), _jsx("p", { className: "text-sm text-gray-600", children: request.employeeEmail })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Leave Type" }), _jsx("p", { className: "mt-1 text-lg text-gray-900", children: request.leaveTypeName })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Start Date" }), _jsx("p", { className: "mt-1 text-lg text-gray-900", children: request.startDate })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "End Date" }), _jsx("p", { className: "mt-1 text-lg text-gray-900", children: request.endDate })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Total Days" }), _jsx("p", { className: "mt-1 text-lg text-gray-900 font-semibold", children: request.totalDays })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Available Balance" }), _jsxs("p", { className: "mt-1 text-lg text-green-600 font-semibold", children: [employeeBalance?.totalDays || 'N/A', " days"] })] })] }), request.reason && (_jsxs("div", { className: "pt-6 border-t", children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Employee's Reason" }), _jsx("p", { className: "mt-2 text-gray-900", children: request.reason })] }))] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Decision" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-700 mb-2 block", children: "Comment (Optional)" }), _jsx("textarea", { value: comment, onChange: (e) => setComment(e.target.value), rows: 4, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600", placeholder: "Add any comments for the employee..." })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { onClick: () => approveMutation.mutate(), disabled: approveMutation.isPending || rejectMutation.isPending, className: "flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition font-semibold", children: approveMutation.isPending ? 'Approving...' : 'Approve' }), _jsx("button", { onClick: () => rejectMutation.mutate(), disabled: approveMutation.isPending || rejectMutation.isPending, className: "flex-1 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition font-semibold", children: rejectMutation.isPending ? 'Rejecting...' : 'Reject' })] })] })] })] }));
};
const LoadingSpinner = () => (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }));
