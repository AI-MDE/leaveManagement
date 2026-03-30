import { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthContext from '../context/AuthContext';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

// Test wrapper component
interface TestWrapperProps {
  children: ReactNode;
  authValue?: any;
}

export function TestWrapper({ children, authValue }: TestWrapperProps) {
  const queryClient = createTestQueryClient();
  const defaultAuthValue = {
    user: { id: '1', name: 'Test User', role: 'EMPLOYEE', email: 'test@example.com' },
    loading: false,
    error: null,
    login: vi.fn(),
    logout: vi.fn(),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContext.Provider value={authValue || defaultAuthValue}>
          {children}
        </AuthContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

// Custom render function
export function renderWithProviders(
  ui: React.ReactElement,
  { authValue, ...renderOptions }: Omit<RenderOptions, 'wrapper'> & { authValue?: any } = {}
) {
  return render(ui, {
    wrapper: (props) => <TestWrapper {...props} authValue={authValue} />,
    ...renderOptions,
  });
}

// Re-export everything
export * from '@testing-library/react';
export { renderWithProviders as render };
