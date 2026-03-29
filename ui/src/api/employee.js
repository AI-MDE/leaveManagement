import { apiClient } from './client';
export const employeeApi = {
    // Get current authenticated employee
    getCurrent: async () => {
        const response = await apiClient.get('/employees/current');
        return response.data;
    },
    // Get all employees (HR Admin only)
    getAll: async () => {
        const response = await apiClient.get('/employees');
        return response.data;
    },
    // Get employee by ID
    getById: async (id) => {
        const response = await apiClient.get(`/employees/${id}`);
        return response.data;
    },
    // Get direct reports for a manager
    getDirectReports: async (managerId) => {
        const response = await apiClient.get(`/employees/${managerId}/direct-reports`);
        return response.data;
    },
    // Create a new employee (HR Admin only)
    create: async (employee) => {
        const response = await apiClient.post('/employees', employee);
        return response.data;
    },
    // Update employee (HR Admin only)
    update: async (id, employee) => {
        const response = await apiClient.put(`/employees/${id}`, employee);
        return response.data;
    },
};
