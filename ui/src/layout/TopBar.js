import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
export const TopBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (_jsxs("header", { className: "bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Leave Management System" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: user?.email }), _jsx("p", { className: "text-xs text-gray-500", children: user?.role })] }), _jsx("button", { onClick: handleLogout, className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition", children: "Logout" })] })] }));
};
