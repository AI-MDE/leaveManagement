import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
export const AuthGuard = ({ children, requiredRoles = [] }) => {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
        return (_jsx("div", { className: "flex items-center justify-center h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Access Denied" }), _jsx("p", { className: "text-gray-600", children: "You do not have permission to access this page." })] }) }));
    }
    return _jsx(_Fragment, { children: children });
};
