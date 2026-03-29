export interface LeaveBalance {
  id: string;
  employeeId: string;
  leaveTypeId: string;
  totalDays: number;
  usedDays: number;
  pendingDays: number;
  periodYear: number;
  updatedAt: string;
}

export interface LeaveBalanceSummary {
  leaveTypeId: string;
  leaveTypeName: string;
  totalDays: number;
  usedDays: number;
  pendingDays: number;
  availableDays: number;
}
