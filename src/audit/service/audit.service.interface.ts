export interface AppendAuditEntryCommand {
  leaveRequestId: string;
  actorId: string;
  action: 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'MODIFIED' | 'BALANCE_RESTORED';
  fromStatus: string | null;
  toStatus: string | null;
  comment?: string;
  snapshot?: unknown;
}

export interface IAuditService {
  append(cmd: AppendAuditEntryCommand): Promise<void>;
}
