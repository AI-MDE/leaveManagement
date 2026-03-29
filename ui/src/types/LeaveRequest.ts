export type LeaveRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason?: string;
  status: LeaveRequestStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  managerComment?: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveRequestDetail extends LeaveRequest {
  employeeName: string;
  employeeEmail: string;
  leaveTypeName: string;
  reviewerName?: string;
}

export interface SubmitLeaveRequestCommand {
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  reason?: string;
}

export interface ModifyLeaveRequestCommand {
  startDate: string;
  endDate: string;
  reason?: string;
}

export interface ApproveLeaveRequestCommand {
  managerComment?: string;
}

export interface RejectLeaveRequestCommand {
  managerComment: string;
}
