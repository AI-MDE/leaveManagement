export interface LeaveRequestRequestDto {
  leaveTypeId: string;
  startDate: string; // ISO date yyyy-MM-dd
  endDate: string;
  reason?: string;
}
