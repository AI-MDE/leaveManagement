import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../src/pages/LoginPage';
import { render } from './test-utils';
describe('LoginPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('renders login form with email and password inputs', () => {
        render(_jsx(LoginPage, {}));
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in|login/i })).toBeInTheDocument();
    });
    it('displays error message on empty form submission', async () => {
        const user = userEvent.setup();
        render(_jsx(LoginPage, {}));
        const submitButton = screen.getByRole('button', { name: /sign in|login/i });
        await user.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(/email.*required|password.*required/i)).toBeInTheDocument();
        });
    });
    it('validates email format', async () => {
        const user = userEvent.setup();
        render(_jsx(LoginPage, {}));
        const emailInput = screen.getByLabelText(/email/i);
        const submitButton = screen.getByRole('button', { name: /sign in|login/i });
        await user.type(emailInput, 'invalid-email');
        await user.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(/invalid email|valid email/i)).toBeInTheDocument();
        });
    });
    it('calls login function with email and password', async () => {
        const user = userEvent.setup();
        const mockLogin = vi.fn().mockResolvedValue({ success: true });
        render(_jsx(LoginPage, {}), {
            authValue: {
                login: mockLogin,
                user: null,
                loading: false,
                error: null,
                logout: vi.fn(),
            }
        });
        await user.type(screen.getByLabelText(/email/i), 'test@example.com');
        await user.type(screen.getByLabelText(/password/i), 'password123');
        await user.click(screen.getByRole('button', { name: /sign in|login/i }));
        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
        });
    });
    it('displays loading state during authentication', () => {
        render(_jsx(LoginPage, {}), {
            authValue: {
                user: null,
                loading: true,
                error: null,
                login: vi.fn(),
                logout: vi.fn(),
            }
        });
        expect(screen.getByRole('button', { name: /sign in|login/i })).toBeDisabled();
    });
    it('displays error message on authentication failure', () => {
        const errorMessage = 'Invalid credentials';
        render(_jsx(LoginPage, {}), {
            authValue: {
                user: null,
                loading: false,
                error: errorMessage,
                login: vi.fn(),
                logout: vi.fn(),
            }
        });
        expect(screen.getByText(new RegExp(errorMessage))).toBeInTheDocument();
    });
    it('shows remember me checkbox', () => {
        render(_jsx(LoginPage, {}));
        expect(screen.getByRole('checkbox', { name: /remember/i })).toBeInTheDocument();
    });
    it('provides link to forgot password', () => {
        render(_jsx(LoginPage, {}));
        expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument();
    });
});
