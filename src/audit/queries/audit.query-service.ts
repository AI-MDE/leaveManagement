import { DatabaseClient } from '../../shared/db/database-client';

export interface AuditEntryReadDto {
  id: string;
  leaveRequestId: string;
  actorId: string;
  actorName: string;
  action: string;
  fromStatus: string | null;
  toStatus: string | null;
  comment: string | null;
  occurredAt: string;
}

export class AuditQueryService {
  constructor(private readonly db: DatabaseClient) {}

  async getByLeaveRequest(filters: { leaveRequestId: string }): Promise<AuditEntryReadDto[]> {
    const rows = await this.db.query<any>(
      `SELECT a.*, e.name AS actor_name
       FROM leave_audit_entries a
       JOIN employees e ON e.id = a.actor_id
       WHERE a.leave_request_id = $1
       ORDER BY a.occurred_at ASC`,
      [filters.leaveRequestId],
    );
    return rows.map(this.toDto);
  }

  async getByEmployee(filters: { employeeId: string; year?: number }): Promise<AuditEntryReadDto[]> {
    const params: unknown[] = [filters.employeeId];
    let sql = `
      SELECT a.*, e.name AS actor_name
      FROM leave_audit_entries a
      JOIN employees e  ON e.id  = a.actor_id
      JOIN leave_requests lr ON lr.id = a.leave_request_id
      WHERE lr.employee_id = $1`;
    if (filters.year) { params.push(filters.year); sql += ` AND EXTRACT(YEAR FROM a.occurred_at) = $${params.length}`; }
    sql += ' ORDER BY a.occurred_at DESC';
    const rows = await this.db.query<any>(sql, params);
    return rows.map(this.toDto);
  }

  private toDto(row: any): AuditEntryReadDto {
    return {
      id: row.id,
      leaveRequestId: row.leave_request_id,
      actorId: row.actor_id,
      actorName: row.actor_name,
      action: row.action,
      fromStatus: row.from_status,
      toStatus: row.to_status,
      comment: row.comment,
      occurredAt: row.occurred_at?.toISOString?.() ?? row.occurred_at,
    };
  }
}
