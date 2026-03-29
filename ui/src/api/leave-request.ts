import { apiClient } from './client';
import type { LeaveRequest, LeaveRequestDetail, SubmitLeaveRequestCommand, ModifyLeaveRequestCommand, ApproveLeaveRequestCommand, RejectLeaveRequestCommand } from '../types/LeaveRequest';

export const leaveRequestApi = {
  // Create new leave request
  submit: async (command: SubmitLeaveRequestCommand): Promise<LeaveRequest> => {
    const response = await apiClient.post('/leave-requests', command);
    return response.data;
  },

  // Get all leave requests for the current user
  getByEmployee: async (): Promise<LeaveRequest[]> => {
    const response = await apiClient.get('/leave-requests/by-employee');
    return response.data;
  },

  // Get pending requests for the current user (Manager role)
  getPendingForManager: async (): Promise<LeaveRequest[]> => {
    const response = await apiClient.get('/leave-requests/pending-for-manager');
    return response.data;
  },

  // Get all leave requests (HR Admin role)
  getAllForHrAdmin: async (): Promise<LeaveRequest[]> => {
    const response = await apiClient.get('/leave-requests/all');
    return response.data;
  },

  // Get a single leave request by ID
  getById: async (id: string): Promise<LeaveRequestDetail> => {
    const response = await apiClient.get(`/leave-requests/${id}`);
    return response.data;
  },

  // Modify an existing leave request
  modify: async (id: string, command: ModifyLeaveRequestCommand): Promise<LeaveRequest> => {
    const response = await apiClient.put(`/leave-requests/${id}`, command);
    return response.data;
  },

  // Cancel a leave request
  cancel: async (id: string): Promise<void> => {
    await apiClient.post(`/leave-requests/${id}/cancel`);
  },

  // Approve a leave request (Manager only)
  approve: async (id: string, command: ApproveLeaveRequestCommand): Promise<LeaveRequest> => {
    const response = await apiClient.post(`/leave-requests/${id}/approve`, command);
    return response.data;
  },

  // Reject a leave request (Manager only)
  reject: async (id: string, command: RejectLeaveRequestCommand): Promise<LeaveRequest> => {
    const response = await apiClient.post(`/leave-requests/${id}/reject`, command);
    return response.data;
  },
};
