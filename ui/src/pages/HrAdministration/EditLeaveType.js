import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { leaveTypeApi } from '@api/leave-type';
export const EditLeaveType = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: leaveType, isLoading } = useQuery({
        queryKey: ['leaveType', id],
        queryFn: () => leaveTypeApi.getById(id),
    });
    const [formData, setFormData] = useState(leaveType || {
        code: '',
        name: '',
        advanceNoticeDays: 0,
        requiresBalance: true,
        isActive: true,
    });
    const [errors, setErrors] = useState({});
    React.useEffect(() => {
        if (leaveType) {
            setFormData(leaveType);
        }
    }, [leaveType]);
    const mutation = useMutation({
        mutationFn: (data) => leaveTypeApi.update(id, data),
        onSuccess: () => {
            navigate('/hr-administration/leave-types');
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.code)
            newErrors.code = 'Leave type code is required.';
        if (!formData.name)
            newErrors.name = 'Leave type name is required.';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        mutation.mutate(formData);
    };
    if (isLoading) {
        return _jsx(LoadingSpinner, {});
    }
    return (_jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-6", children: "Edit Leave Type" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white rounded-lg shadow p-6 space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Leave Type Code *" }), _jsx("input", { type: "text", value: formData.code, onChange: (e) => {
                                    setFormData({ ...formData, code: e.target.value });
                                    setErrors({ ...errors, code: '' });
                                }, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" }), errors.code && _jsx("p", { className: "text-red-600 text-sm mt-1", children: errors.code })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Leave Type Name *" }), _jsx("input", { type: "text", value: formData.name, onChange: (e) => {
                                    setFormData({ ...formData, name: e.target.value });
                                    setErrors({ ...errors, name: '' });
                                }, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" }), errors.name && _jsx("p", { className: "text-red-600 text-sm mt-1", children: errors.name })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Advance Notice Days" }), _jsx("input", { type: "number", value: formData.advanceNoticeDays, onChange: (e) => setFormData({ ...formData, advanceNoticeDays: parseInt(e.target.value) }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600", min: "0" })] }), _jsx("div", { children: _jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: formData.requiresBalance, onChange: (e) => setFormData({ ...formData, requiresBalance: e.target.checked }), className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium text-gray-700", children: "Requires Balance Deduction" })] }) }), _jsx("div", { children: _jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: formData.isActive, onChange: (e) => setFormData({ ...formData, isActive: e.target.checked }), className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium text-gray-700", children: "Active" })] }) }), _jsxs("div", { className: "flex gap-4 justify-end pt-6 border-t", children: [_jsx("button", { type: "button", onClick: () => navigate('/hr-administration/leave-types'), className: "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition", children: "Cancel" }), _jsx("button", { type: "submit", disabled: mutation.isPending, className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition", children: mutation.isPending ? 'Saving...' : 'Save Changes' })] }), mutation.isError && (_jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded", children: mutation.error?.response?.data?.error ?? mutation.error?.message ?? 'Error updating leave type. Please try again.' }))] })] }));
};
const LoadingSpinner = () => (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }));
