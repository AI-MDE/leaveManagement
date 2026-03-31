import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthContext from '../context/AuthContext';
// Create a test query client
const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
    },
});
export function TestWrapper({ children, authValue }) {
    const queryClient = createTestQueryClient();
    const defaultAuthValue = {
        user: { id: '1', name: 'Test User', role: 'EMPLOYEE', email: 'test@example.com' },
        loading: false,
        error: null,
        login: vi.fn(),
        logout: vi.fn(),
    };
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: _jsx(AuthContext.Provider, { value: authValue || defaultAuthValue, children: children }) }) }));
}
// Custom render function
export function renderWithProviders(ui, { authValue, ...renderOptions } = {}) {
    return render(ui, {
        wrapper: (props) => _jsx(TestWrapper, { ...props, authValue: authValue }),
        ...renderOptions,
    });
}
// Re-export everything
export * from '@testing-library/react';
export { renderWithProviders as render };
