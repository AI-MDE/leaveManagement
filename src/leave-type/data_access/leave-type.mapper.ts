import { LeaveTypeRecord } from './leave-type.repository.interface';

export class LeaveTypeMapper {
  static toDomain(row: any): LeaveTypeRecord {
    return {
      id: row.id,
      code: row.code,
      name: row.name,
      advanceNoticeDays: row.advance_notice_days,
      requiresBalance: Boolean(row.requires_balance),
      isActive: Boolean(row.is_active),
    };
  }
}
