export interface LeaveRequestReadDto {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveTypeId: string;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  submittedAt: string;
  reviewedAt: string | null;
  reviewedByName: string | null;
  managerComment: string | null;
  version: number;
}
