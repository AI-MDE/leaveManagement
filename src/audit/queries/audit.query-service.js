"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditQueryService = void 0;
class AuditQueryService {
    constructor(db) {
        this.db = db;
    }
    async getByLeaveRequest(filters) {
        const rows = await this.db.query(`SELECT a.*, e.name AS actor_name
       FROM leave_audit_entries a
       JOIN employees e ON e.id = a.actor_id
       WHERE a.leave_request_id = $1
       ORDER BY a.occurred_at ASC`, [filters.leaveRequestId]);
        return rows.map(this.toDto);
    }
    async getByEmployee(filters) {
        const params = [filters.employeeId];
        let sql = `
      SELECT a.*, e.name AS actor_name
      FROM leave_audit_entries a
      JOIN employees e  ON e.id  = a.actor_id
      JOIN leave_requests lr ON lr.id = a.leave_request_id
      WHERE lr.employee_id = $1`;
        if (filters.year) {
            params.push(filters.year);
            sql += ` AND EXTRACT(YEAR FROM a.occurred_at) = $${params.length}`;
        }
        sql += ' ORDER BY a.occurred_at DESC';
        const rows = await this.db.query(sql, params);
        return rows.map(this.toDto);
    }
    toDto(row) {
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
exports.AuditQueryService = AuditQueryService;
