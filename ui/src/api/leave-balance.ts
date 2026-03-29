import { apiClient } from './client';
import type { LeaveBalance, LeaveBalanceSummary } from '../types/LeaveBalance';

export const leaveBalanceApi = {
  // Get all balances for the current employee
  getByEmployee: async (): Promise<LeaveBalance[]> => {
    const response = await apiClient.get('/leave-balances/by-employee');
    return response.data;
  },

  // Get balance summary for the current employee
  getSummary: async (): Promise<LeaveBalanceSummary[]> => {
    const response = await apiClient.get('/leave-balances/summary');
    return response.data;
  },

  // Get balance for a specific leave type
  getByLeaveType: async (leaveTypeId: string): Promise<LeaveBalance> => {
    const response = await apiClient.get(`/leave-balances/by-leave-type/${leaveTypeId}`);
    return response.data;
  },

  // Get all employee balances (HR Admin only)
  getAll: async (): Promise<LeaveBalance[]> => {
    const response = await apiClient.get('/leave-balances');
    return response.data;
  },

  // Get balances for a specific employee (HR Admin only)
  getByEmployeeId: async (employeeId: string): Promise<LeaveBalance[]> => {
    const response = await apiClient.get(`/employees/${employeeId}/balances`);
    return response.data;
  },

  // Update balance (HR Admin only)
  update: async (employeeId: string, leaveTypeId: string, totalDays: number): Promise<LeaveBalance> => {
    const response = await apiClient.put(
      `/employees/${employeeId}/balances/${leaveTypeId}`,
      { totalDays }
    );
    return response.data;
  },
};
