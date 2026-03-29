export interface LeaveTypeRecord {
  id: string;
  code: string;
  name: string;
  advanceNoticeDays: number;
  requiresBalance: boolean;
  isActive: boolean;
}

export interface ILeaveTypeRepository {
  findById(id: string): Promise<LeaveTypeRecord | null>;
  findAll(): Promise<LeaveTypeRecord[]>;
  findActive(): Promise<LeaveTypeRecord[]>;
  save(record: LeaveTypeRecord): Promise<void>;
  update(record: LeaveTypeRecord): Promise<void>;
}
