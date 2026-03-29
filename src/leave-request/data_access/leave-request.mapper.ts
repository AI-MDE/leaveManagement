import { LeaveRequestEntity, LeaveRequestProps, LeaveRequestStatus } from '../domain/leave-request.entity';

interface LeaveRequestRow {
  id: string;
  employee_id: string;
  leave_type_id: string;
  start_date: string;
  end_date: string;
  total_days: string;
  reason: string | null;
  status: string;
  submitted_at: Date;
  reviewed_at: Date | null;
  reviewed_by: string | null;
  manager_comment: string | null;
  version: number;
  created_at: Date;
  updated_at: Date;
}

export class LeaveRequestMapper {
  static toDomain(row: LeaveRequestRow): LeaveRequestEntity {
    const props: LeaveRequestProps = {
      id: row.id,
      employeeId: row.employee_id,
      leaveTypeId: row.leave_type_id,
      startDate: row.start_date,
      endDate: row.end_date,
      totalDays: parseFloat(row.total_days),
      reason: row.reason,
      status: row.status as LeaveRequestStatus,
      submittedAt: row.submitted_at,
      reviewedAt: row.reviewed_at,
      reviewedBy: row.reviewed_by,
      managerComment: row.manager_comment,
      version: row.version,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
    return LeaveRequestEntity.rehydrate(props);
  }

  static toRow(entity: LeaveRequestEntity): Record<string, unknown> {
    return {
      id: entity.id,
      employee_id: entity.employeeId,
      leave_type_id: entity.leaveTypeId,
      start_date: entity.startDate,
      end_date: entity.endDate,
      total_days: entity.totalDays,
      reason: entity.reason,
      status: entity.status,
      submitted_at: entity.submittedAt,
      reviewed_at: entity.reviewedAt,
      reviewed_by: entity.reviewedBy,
      manager_comment: entity.managerComment,
      version: entity.version,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    };
  }
}
