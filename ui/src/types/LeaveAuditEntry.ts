export type AuditAction = 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'MODIFIED' | 'BALANCE_RESTORED';

export interface LeaveAuditEntry {
  id: string;
  leaveRequestId: string;
  actorId: string;
  action: AuditAction;
  fromStatus?: string;
  toStatus?: string;
  comment?: string;
  snapshot?: Record<string, any>;
  occurredAt: string;
}

export interface LeaveAuditEntryDetail extends LeaveAuditEntry {
  actorName: string;
  actorEmail: string;
}
