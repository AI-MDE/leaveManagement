import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';
export const ModifyLeaveRequest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: request, isLoading } = useQuery({
        queryKey: ['leaveRequest', id],
        queryFn: () => leaveRequestApi.getById(id),
    });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [errors, setErrors] = useState({});
    React.useEffect(() => {
        if (request) {
            setStartDate(request.startDate);
            setEndDate(request.endDate);
            setReason(request.reason ?? '');
        }
    }, [request]);
    const modifyMutation = useMutation({
        mutationFn: () => leaveRequestApi.modify(id, { startDate, endDate, reason: reason || undefined }),
        onSuccess: () => navigate(`/my-leave/requests/${id}`),
    });
    const validate = () => {
        const errs = {};
        if (!startDate)
            errs.startDate = 'Please select a start date.';
        if (!endDate)
            errs.endDate = 'Please select an end date.';
        if (startDate && endDate && endDate < startDate)
            errs.endDate = 'End date must be on or after the start date.';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };
    const totalDays = startDate && endDate
        ? Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000) + 1
        : 0;
    if (isLoading)
        return _jsx(LoadingSpinner, {});
    if (!request)
        return _jsx("div", { className: "text-center text-gray-600 py-12", children: "Request not found." });
    return (_jsxs("div", { className: "space-y-6 max-w-2xl", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Modify Leave Request" }), _jsx("button", { onClick: () => navigate(`/my-leave/requests/${id}`), className: "text-blue-600 hover:text-blue-800", children: "\u2190 Back" })] }), request.status === 'APPROVED' && (_jsx("div", { className: "bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-yellow-800 text-sm font-medium", children: "This request is currently APPROVED. Modifying it will reset it to PENDING and require manager re-approval." })), modifyMutation.error && (_jsx("div", { className: "bg-red-50 border border-red-300 rounded-lg p-4 text-red-800 text-sm", children: modifyMutation.error?.response?.data?.message ?? 'Failed to modify request.' })), _jsxs("div", { className: "bg-white rounded-lg shadow p-6 space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Leave Type" }), _jsx("p", { className: "px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700", children: request.leaveTypeName ?? request.leaveTypeId })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Start Date" }), _jsx("input", { type: "date", value: startDate, onChange: e => setStartDate(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" }), errors.startDate && _jsx("p", { className: "text-red-600 text-xs mt-1", children: errors.startDate })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "End Date" }), _jsx("input", { type: "date", value: endDate, onChange: e => setEndDate(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" }), errors.endDate && _jsx("p", { className: "text-red-600 text-xs mt-1", children: errors.endDate })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Total Days (calculated)" }), _jsx("p", { className: "px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-semibold", children: totalDays > 0 ? totalDays : '—' })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Reason (optional)" }), _jsx("textarea", { value: reason, onChange: e => setReason(e.target.value), rows: 3, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600", placeholder: "Optional reason..." })] }), _jsxs("div", { className: "flex gap-4 pt-2", children: [_jsx("button", { onClick: () => { if (validate())
                                    modifyMutation.mutate(); }, disabled: modifyMutation.isPending, className: "flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition font-semibold", children: modifyMutation.isPending ? 'Saving...' : 'Save Changes' }), _jsx("button", { onClick: () => navigate(`/my-leave/requests/${id}`), className: "flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold", children: "Cancel" })] })] })] }));
};
const LoadingSpinner = () => (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }));
