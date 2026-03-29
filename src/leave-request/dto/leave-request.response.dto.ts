export interface LeaveRequestResponseDto {
  id: string;
  employeeId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  submittedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
  managerComment: string | null;
  version: number;
}
