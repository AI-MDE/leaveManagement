export interface LeaveBalanceRecord {
  id: string;
  employeeId: string;
  leaveTypeId: string;
  totalDays: number;
  usedDays: number;
  pendingDays: number;
  periodYear: number;
  updatedAt: Date;
}

export interface ILeaveBalanceRepository {
  findByEmployeeAndType(employeeId: string, leaveTypeId: string, year: number): Promise<LeaveBalanceRecord | null>;
  findByEmployee(employeeId: string, year: number): Promise<LeaveBalanceRecord[]>;
  save(record: LeaveBalanceRecord): Promise<void>;
  update(record: LeaveBalanceRecord): Promise<void>;
}
