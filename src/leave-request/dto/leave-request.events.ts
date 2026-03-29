import { DomainEvent } from '../../shared/events/domain-event';

export type LeaveRequestSubmittedEvent = DomainEvent<{
  leaveRequestId: string;
  employeeId: string;
  managerId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
}>;

export type LeaveRequestApprovedEvent = DomainEvent<{
  leaveRequestId: string;
  employeeId: string;
  reviewedBy: string;
  managerComment: string | null;
}>;

export type LeaveRequestRejectedEvent = DomainEvent<{
  leaveRequestId: string;
  employeeId: string;
  reviewedBy: string;
  managerComment: string | null;
}>;

export type LeaveRequestCancelledEvent = DomainEvent<{
  leaveRequestId: string;
  employeeId: string;
  previousStatus: string;
  balanceRestored: boolean;
}>;

export type LeaveRequestModifiedEvent = DomainEvent<{
  leaveRequestId: string;
  employeeId: string;
  previousStatus: string;
  newStartDate: string;
  newEndDate: string;
}>;
