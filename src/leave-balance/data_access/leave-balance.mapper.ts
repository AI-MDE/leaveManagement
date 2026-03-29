import { LeaveBalanceRecord } from './leave-balance.repository.interface';

export class LeaveBalanceMapper {
  static toDomain(row: any): LeaveBalanceRecord {
    return {
      id: row.id,
      employeeId: row.employee_id,
      leaveTypeId: row.leave_type_id,
      totalDays: parseFloat(row.total_days),
      usedDays: parseFloat(row.used_days),
      pendingDays: parseFloat(row.pending_days),
      periodYear: row.period_year,
      updatedAt: row.updated_at,
    };
  }
}
