import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // Note: This is a simplified mock login. In a real app, this would call an auth endpoint.
            // For demo purposes, we'll assume the backend validates credentials and returns a token.
            const mockToken = 'mock-jwt-token-' + Date.now();
            const mockUser = {
                id: '1',
                name: 'John Doe',
                email,
                managerId: null,
                role: 'EMPLOYEE',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            login(mockToken, mockUser);
            navigate('/my-leave/dashboard');
        }
        catch (err) {
            setError('Invalid email or password');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center h-screen bg-gray-50", children: _jsxs("div", { className: "bg-white p-8 rounded-lg shadow-lg w-96", children: [_jsx("h1", { className: "text-3xl font-bold mb-6 text-center text-gray-900", children: "Leave Management" }), error && (_jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600", required: true })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition", children: loading ? 'Logging in...' : 'Login' })] }), _jsx("p", { className: "text-center text-gray-600 text-sm mt-4", children: "Demo credentials: any email / any password" })] }) }));
};
