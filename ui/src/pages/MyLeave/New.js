import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { leaveTypeApi } from '@api/leave-type';
import { leaveBalanceApi } from '@api/leave-balance';
import { leaveRequestApi } from '@api/leave-request';
export const SubmitLeaveRequest = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        leaveTypeId: '',
        startDate: '',
        endDate: '',
        reason: '',
    });
    const [errors, setErrors] = useState({});
    const { data: leaveTypes = [] } = useQuery({
        queryKey: ['activeLeaveTypes'],
        queryFn: () => leaveTypeApi.getActive(),
    });
    const { data: balances = [] } = useQuery({
        queryKey: ['leaveBalanceSummary'],
        queryFn: () => leaveBalanceApi.getSummary(),
    });
    const mutation = useMutation({
        mutationFn: (command) => leaveRequestApi.submit(command),
        onSuccess: () => {
            navigate('/my-leave/dashboard');
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.leaveTypeId)
            newErrors.leaveTypeId = 'Please select a leave type.';
        if (!formData.startDate)
            newErrors.startDate = 'Please select a start date.';
        if (!formData.endDate)
            newErrors.endDate = 'Please select an end date.';
        if (new Date(formData.endDate) < new Date(formData.startDate)) {
            newErrors.endDate = 'End date must be on or after the start date.';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        mutation.mutate({
            leaveTypeId: formData.leaveTypeId,
            startDate: formData.startDate,
            endDate: formData.endDate,
            reason: formData.reason || undefined,
        });
    };
    const selectedBalance = balances.find(b => b.leaveTypeId === formData.leaveTypeId);
    const selectedLeaveType = leaveTypes.find(lt => lt.id === formData.leaveTypeId);
    return (_jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-6", children: "Submit Leave Request" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white rounded-lg shadow p-6 space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Leave Type *" }), _jsxs("select", { value: formData.leaveTypeId, onChange: (e) => {
                                    setFormData({ ...formData, leaveTypeId: e.target.value });
                                    setErrors({ ...errors, leaveTypeId: '' });
                                }, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600", children: [_jsx("option", { value: "", children: "Select a leave type" }), leaveTypes.map((lt) => (_jsx("option", { value: lt.id, children: lt.name }, lt.id)))] }), errors.leaveTypeId && (_jsx("p", { className: "text-red-600 text-sm mt-1", children: errors.leaveTypeId }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Start Date *" }), _jsx("input", { type: "date", value: formData.startDate, onChange: (e) => {
                                    setFormData({ ...formData, startDate: e.target.value });
                                    setErrors({ ...errors, startDate: '' });
                                }, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" }), errors.startDate && (_jsx("p", { className: "text-red-600 text-sm mt-1", children: errors.startDate }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "End Date *" }), _jsx("input", { type: "date", value: formData.endDate, onChange: (e) => {
                                    setFormData({ ...formData, endDate: e.target.value });
                                    setErrors({ ...errors, endDate: '' });
                                }, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" }), errors.endDate && (_jsx("p", { className: "text-red-600 text-sm mt-1", children: errors.endDate }))] }), selectedLeaveType && (_jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: _jsxs("p", { className: "text-sm text-blue-900", children: [_jsx("strong", { children: "Advance Notice Required:" }), " ", selectedLeaveType.advanceNoticeDays, " day(s)"] }) })), selectedBalance && (_jsx("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4", children: _jsxs("p", { className: "text-sm text-green-900", children: [_jsx("strong", { children: "Available Balance:" }), " ", selectedBalance.availableDays, " days"] }) })), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Reason (Optional)" }), _jsx("textarea", { value: formData.reason, onChange: (e) => setFormData({ ...formData, reason: e.target.value }), rows: 4, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" })] }), _jsxs("div", { className: "flex gap-4 justify-end", children: [_jsx("button", { type: "button", onClick: () => navigate('/my-leave/dashboard'), className: "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition", children: "Cancel" }), _jsx("button", { type: "submit", disabled: mutation.isPending, className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition", children: mutation.isPending ? 'Submitting...' : 'Submit Request' })] }), mutation.isError && (_jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded", children: "Error submitting request. Please try again." }))] })] }));
};
