import { DatabaseClient } from '../../shared/db/database-client';
import { LeaveRequestReadDto } from '../dto/leave-request.read.dto';

export class LeaveRequestQueryService {
  constructor(private readonly db: DatabaseClient) {}

  async getByEmployee(filters: { employeeId: string; status?: string; year?: number }): Promise<LeaveRequestReadDto[]> {
    const params: unknown[] = [filters.employeeId];
    let sql = `
      SELECT lr.*, e.name AS employee_name, lt.name AS leave_type_name,
             m.name AS reviewed_by_name
      FROM leave_requests lr
      JOIN employees e  ON e.id  = lr.employee_id
      JOIN leave_types lt ON lt.id = lr.leave_type_id
      LEFT JOIN employees m ON m.id = lr.reviewed_by
      WHERE lr.employee_id = $1`;
    if (filters.status) { params.push(filters.status);               sql += ` AND lr.status = $${params.length}`; }
    if (filters.year)   { params.push(filters.year);                 sql += ` AND EXTRACT(YEAR FROM lr.start_date) = $${params.length}`; }
    sql += ' ORDER BY lr.submitted_at DESC';
    const rows = await this.db.query<any>(sql, params);
    return rows.map(this.toDto);
  }

  async getPendingForManager(filters: { managerId: string }): Promise<LeaveRequestReadDto[]> {
    const rows = await this.db.query<any>(`
      SELECT lr.*, e.name AS employee_name, lt.name AS leave_type_name, NULL AS reviewed_by_name
      FROM leave_requests lr
      JOIN employees e  ON e.id  = lr.employee_id
      JOIN leave_types lt ON lt.id = lr.leave_type_id
      WHERE lr.status = 'PENDING' AND e.manager_id = $1
      ORDER BY lr.submitted_at ASC`,
      [filters.managerId],
    );
    return rows.map(this.toDto);
  }

  async getAllForHrAdmin(filters: { status?: string; employeeId?: string; year?: number }): Promise<LeaveRequestReadDto[]> {
    const params: unknown[] = [];
    let sql = `
      SELECT lr.*, e.name AS employee_name, lt.name AS leave_type_name,
             m.name AS reviewed_by_name
      FROM leave_requests lr
      JOIN employees e  ON e.id  = lr.employee_id
      JOIN leave_types lt ON lt.id = lr.leave_type_id
      LEFT JOIN employees m ON m.id = lr.reviewed_by
      WHERE 1=1`;
    if (filters.status)     { params.push(filters.status);     sql += ` AND lr.status = $${params.length}`; }
    if (filters.employeeId) { params.push(filters.employeeId); sql += ` AND lr.employee_id = $${params.length}`; }
    if (filters.year)       { params.push(filters.year);       sql += ` AND EXTRACT(YEAR FROM lr.start_date) = $${params.length}`; }
    sql += ' ORDER BY lr.submitted_at DESC';
    const rows = await this.db.query<any>(sql, params);
    return rows.map(this.toDto);
  }

  async getById(filters: { id: string }): Promise<LeaveRequestReadDto | null> {
    const rows = await this.db.query<any>(`
      SELECT lr.*, e.name AS employee_name, lt.name AS leave_type_name,
             m.name AS reviewed_by_name
      FROM leave_requests lr
      JOIN employees e  ON e.id  = lr.employee_id
      JOIN leave_types lt ON lt.id = lr.leave_type_id
      LEFT JOIN employees m ON m.id = lr.reviewed_by
      WHERE lr.id = $1`,
      [filters.id],
    );
    return rows[0] ? this.toDto(rows[0]) : null;
  }

  private toDto(row: any): LeaveRequestReadDto {
    return {
      id: row.id,
      employeeId: row.employee_id,
      employeeName: row.employee_name,
      leaveTypeId: row.leave_type_id,
      leaveTypeName: row.leave_type_name,
      startDate: row.start_date,
      endDate: row.end_date,
      totalDays: parseFloat(row.total_days),
      reason: row.reason,
      status: row.status,
      submittedAt: row.submitted_at?.toISOString?.() ?? row.submitted_at,
      reviewedAt: row.reviewed_at?.toISOString?.() ?? null,
      reviewedByName: row.reviewed_by_name ?? null,
      managerComment: row.manager_comment,
      version: row.version,
    };
  }
}
