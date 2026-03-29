import { apiClient } from './client';
export const leaveBalanceApi = {
    // Get all balances for the current employee
    getByEmployee: async () => {
        const response = await apiClient.get('/leave-balances/by-employee');
        return response.data;
    },
    // Get balance summary for the current employee
    getSummary: async () => {
        const response = await apiClient.get('/leave-balances/summary');
        return response.data;
    },
    // Get balance for a specific leave type
    getByLeaveType: async (leaveTypeId) => {
        const response = await apiClient.get(`/leave-balances/by-leave-type/${leaveTypeId}`);
        return response.data;
    },
    // Get all employee balances (HR Admin only)
    getAll: async () => {
        const response = await apiClient.get('/leave-balances');
        return response.data;
    },
    // Get balances for a specific employee (HR Admin only)
    getByEmployeeId: async (employeeId) => {
        const response = await apiClient.get(`/employees/${employeeId}/balances`);
        return response.data;
    },
    // Update balance (HR Admin only)
    update: async (employeeId, leaveTypeId, totalDays) => {
        const response = await apiClient.put(`/employees/${employeeId}/balances/${leaveTypeId}`, { totalDays });
        return response.data;
    },
};
