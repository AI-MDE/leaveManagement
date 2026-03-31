import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { leaveBalanceApi } from '@api/leave-balance';
import { employeeApi } from '@api/employee';
import { leaveTypeApi } from '@api/leave-type';
export const SetBalance = () => {
    const navigate = useNavigate();
    const [employeeId, setEmployeeId] = useState('');
    const [leaveTypeId, setLeaveTypeId] = useState('');
    const [year, setYear] = useState(String(new Date().getFullYear()));
    const [totalDays, setTotalDays] = useState('');
    const [errors, setErrors] = useState({});
    const { data: employees = [] } = useQuery({ queryKey: ['employees'], queryFn: () => employeeApi.getAll() });
    const { data: leaveTypes = [] } = useQuery({ queryKey: ['leaveTypes'], queryFn: () => leaveTypeApi.getAll() });
    const saveMutation = useMutation({
        mutationFn: () => leaveBalanceApi.update(employeeId, leaveTypeId, Number(totalDays)),
        onSuccess: () => navigate('/hr-administration/balances'),
    });
    const validate = () => {
        const errs = {};
        if (!employeeId)
            errs.employee = 'Please select an employee.';
        if (!leaveTypeId)
            errs.leaveType = 'Please select a leave type.';
        if (!year)
            errs.year = 'Please specify the leave year.';
        if (!totalDays)
            errs.totalDays = 'Total entitlement days is required.';
        if (totalDays && Number(totalDays) < 0)
            errs.totalDays = 'Total entitlement days must be a non-negative number.';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };
    return (_jsxs("div", { className: "space-y-6 max-w-2xl", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Set Employee Balance" }), _jsx("button", { onClick: () => navigate('/hr-administration/balances'), className: "text-blue-600 hover:text-blue-800", children: "\u2190 Back" })] }), saveMutation.error && (_jsx("div", { className: "bg-red-50 border border-red-300 rounded-lg p-4 text-red-800 text-sm", children: saveMutation.error?.response?.data?.message ?? 'Failed to save balance.' })), _jsxs("div", { className: "bg-white rounded-lg shadow p-6 space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Employee" }), _jsxs("select", { value: employeeId, onChange: e => setEmployeeId(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600", children: [_jsx("option", { value: "", children: "Select employee..." }), employees.map(e => _jsx("option", { value: e.id, children: e.name }, e.id))] }), errors.employee && _jsx("p", { className: "text-red-600 text-xs mt-1", children: errors.employee })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Leave Type" }), _jsxs("select", { value: leaveTypeId, onChange: e => setLeaveTypeId(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600", children: [_jsx("option", { value: "", children: "Select leave type..." }), leaveTypes.map(lt => _jsx("option", { value: lt.id, children: lt.name }, lt.id))] }), errors.leaveType && _jsx("p", { className: "text-red-600 text-xs mt-1", children: errors.leaveType })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Year" }), _jsx("input", { type: "number", value: year, onChange: e => setYear(e.target.value), min: "2020", max: "2030", className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" }), errors.year && _jsx("p", { className: "text-red-600 text-xs mt-1", children: errors.year })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Total Entitlement Days" }), _jsx("input", { type: "number", value: totalDays, onChange: e => setTotalDays(e.target.value), min: "0", step: "0.5", className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600", placeholder: "e.g. 20" }), errors.totalDays && _jsx("p", { className: "text-red-600 text-xs mt-1", children: errors.totalDays })] }), _jsxs("div", { className: "flex gap-4 pt-2", children: [_jsx("button", { onClick: () => { if (validate())
                                    saveMutation.mutate(); }, disabled: saveMutation.isPending, className: "flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition font-semibold", children: saveMutation.isPending ? 'Saving...' : 'Save Balance' }), _jsx("button", { onClick: () => navigate('/hr-administration/balances'), className: "flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold", children: "Cancel" })] })] })] }));
};
