import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { leaveTypeApi } from '@api/leave-type';
export const LeaveTypes = () => {
    const [filterActive, setFilterActive] = useState(true);
    const { data: allLeaveTypes = [], isLoading } = useQuery({
        queryKey: ['allLeaveTypes'],
        queryFn: () => leaveTypeApi.getAll(),
    });
    const filteredLeaveTypes = allLeaveTypes.filter((lt) => {
        if (filterActive)
            return lt.isActive;
        return !lt.isActive;
    });
    if (isLoading) {
        return _jsx(LoadingSpinner, {});
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Leave Types" }), _jsx(Link, { to: "/hr-administration/leave-types/new", className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition", children: "+ New Leave Type" })] }), _jsx("div", { className: "bg-white rounded-lg shadow p-4", children: _jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: filterActive, onChange: (e) => setFilterActive(e.target.checked), className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium text-gray-700", children: "Active Only" })] }) }), filteredLeaveTypes.length === 0 ? (_jsx("div", { className: "bg-gray-50 rounded-lg p-6 text-center text-gray-600", children: _jsx("p", { children: "No leave types configured. Click 'New Leave Type' to add one." }) })) : (_jsx("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50 border-b", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Code" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Name" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Advance Notice Days" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Requires Balance" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Status" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y", children: filteredLeaveTypes.map((leaveType) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-3 text-sm font-semibold text-gray-900", children: leaveType.code }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: leaveType.name }), _jsxs("td", { className: "px-6 py-3 text-sm text-gray-600", children: [leaveType.advanceNoticeDays, " day(s)"] }), _jsx("td", { className: "px-6 py-3 text-sm text-gray-600", children: leaveType.requiresBalance ? 'Yes' : 'No' }), _jsx("td", { className: "px-6 py-3 text-sm", children: _jsx("span", { className: `px-3 py-1 rounded-full text-xs font-semibold ${leaveType.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'}`, children: leaveType.isActive ? 'Active' : 'Inactive' }) }), _jsx("td", { className: "px-6 py-3 text-sm space-x-2", children: _jsx(Link, { to: `/hr-administration/leave-types/${leaveType.id}/edit`, className: "text-blue-600 hover:text-blue-800 font-semibold", children: "Edit" }) })] }, leaveType.id))) })] }) }))] }));
};
const LoadingSpinner = () => (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }));
