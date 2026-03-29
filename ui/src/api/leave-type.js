import { apiClient } from './client';
export const leaveTypeApi = {
    // Get all leave types
    getAll: async () => {
        const response = await apiClient.get('/leave-types');
        return response.data;
    },
    // Get active leave types only
    getActive: async () => {
        const response = await apiClient.get('/leave-types?isActive=true');
        return response.data;
    },
    // Get a single leave type by ID
    getById: async (id) => {
        const response = await apiClient.get(`/leave-types/${id}`);
        return response.data;
    },
    // Create a new leave type (HR Admin only)
    create: async (leaveType) => {
        const response = await apiClient.post('/leave-types', leaveType);
        return response.data;
    },
    // Update a leave type (HR Admin only)
    update: async (id, leaveType) => {
        const response = await apiClient.put(`/leave-types/${id}`, leaveType);
        return response.data;
    },
    // Deactivate a leave type (HR Admin only)
    deactivate: async (id) => {
        await apiClient.patch(`/leave-types/${id}/deactivate`);
    },
};
