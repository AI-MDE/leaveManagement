import { DatabaseClient } from '../../shared/db/database-client';
import { LeaveRequestEntity } from '../domain/leave-request.entity';
import { ILeaveRequestRepository } from './leave-request.repository.interface';
import { LeaveRequestMapper } from './leave-request.mapper';

export class LeaveRequestRepository implements ILeaveRequestRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findById(id: string): Promise<LeaveRequestEntity | null> {
    const rows = await this.db.query<any>(
      'SELECT * FROM leave_requests WHERE id = $1',
      [id],
    );
    return rows[0] ? LeaveRequestMapper.toDomain(rows[0]) : null;
  }

  async findActiveByEmployee(
    employeeId: string,
    excludeId?: string,
  ): Promise<Array<{ id: string; startDate: string; endDate: string }>> {
    const sql = excludeId
      ? `SELECT id, start_date, end_date FROM leave_requests
         WHERE employee_id = $1 AND status IN ('PENDING','APPROVED') AND id != $2`
      : `SELECT id, start_date, end_date FROM leave_requests
         WHERE employee_id = $1 AND status IN ('PENDING','APPROVED')`;
    const params = excludeId ? [employeeId, excludeId] : [employeeId];
    const rows = await this.db.query<any>(sql, params);
    return rows.map((r: any) => ({ id: r.id, startDate: r.start_date, endDate: r.end_date }));
  }

  async save(entity: LeaveRequestEntity): Promise<void> {
    await this.db.execute(
      `INSERT INTO leave_requests
       (id, employee_id, leave_type_id, start_date, end_date, total_days, reason,
        status, submitted_at, reviewed_at, reviewed_by, manager_comment, version, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
      [
        entity.id, entity.employeeId, entity.leaveTypeId,
        entity.startDate, entity.endDate, entity.totalDays, entity.reason,
        entity.status, entity.submittedAt, entity.reviewedAt, entity.reviewedBy,
        entity.managerComment, entity.version, entity.createdAt, entity.updatedAt,
      ],
    );
  }

  async update(entity: LeaveRequestEntity): Promise<void> {
    await this.db.execute(
      `UPDATE leave_requests SET
       start_date = $1, end_date = $2, total_days = $3, reason = $4, status = $5,
       reviewed_at = $6, reviewed_by = $7, manager_comment = $8, version = $9, updated_at = $10
       WHERE id = $11`,
      [
        entity.startDate, entity.endDate, entity.totalDays, entity.reason, entity.status,
        entity.reviewedAt, entity.reviewedBy, entity.managerComment, entity.version,
        entity.updatedAt, entity.id,
      ],
    );
  }
}
