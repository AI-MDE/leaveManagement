import { apiClient } from './client';
export const leaveRequestApi = {
    // Create new leave request
    submit: async (command) => {
        const response = await apiClient.post('/leave-requests', command);
        return response.data;
    },
    // Get all leave requests for the current user
    getByEmployee: async () => {
        const response = await apiClient.get('/leave-requests/by-employee');
        return response.data;
    },
    // Get pending requests for the current user (Manager role)
    getPendingForManager: async () => {
        const response = await apiClient.get('/leave-requests/pending-for-manager');
        return response.data;
    },
    // Get all leave requests (HR Admin role)
    getAllForHrAdmin: async () => {
        const response = await apiClient.get('/leave-requests/all');
        return response.data;
    },
    // Get a single leave request by ID
    getById: async (id) => {
        const response = await apiClient.get(`/leave-requests/${id}`);
        return response.data;
    },
    // Modify an existing leave request
    modify: async (id, command) => {
        const response = await apiClient.put(`/leave-requests/${id}`, command);
        return response.data;
    },
    // Cancel a leave request
    cancel: async (id) => {
        await apiClient.post(`/leave-requests/${id}/cancel`);
    },
    // Approve a leave request (Manager only)
    approve: async (id, command) => {
        const response = await apiClient.post(`/leave-requests/${id}/approve`, command);
        return response.data;
    },
    // Reject a leave request (Manager only)
    reject: async (id, command) => {
        const response = await apiClient.post(`/leave-requests/${id}/reject`, command);
        return response.data;
    },
};
