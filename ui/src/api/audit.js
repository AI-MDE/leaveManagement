import { apiClient } from './client';
export const auditApi = {
    // Get audit trail for a leave request
    getByRequestId: async (requestId) => {
        const response = await apiClient.get(`/leave-requests/${requestId}/audit`);
        return response.data;
    },
    // Get audit trail for an employee (HR Admin & Manager)
    getByEmployeeId: async (employeeId) => {
        const response = await apiClient.get(`/employees/${employeeId}/audit`);
        return response.data;
    },
    // Get all audit entries (HR Admin only)
    getAll: async () => {
        const response = await apiClient.get('/audit');
        return response.data;
    },
};
