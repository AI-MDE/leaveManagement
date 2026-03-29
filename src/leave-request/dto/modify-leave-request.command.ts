export interface ModifyLeaveRequestCommand {
  leaveRequestId: string;
  startDate: string;
  endDate: string;
  reason?: string;
}
