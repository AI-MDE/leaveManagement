"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveBalanceRepository = void 0;
const leave_balance_mapper_1 = require("./leave-balance.mapper");
class LeaveBalanceRepository {
    constructor(db) {
        this.db = db;
    }
    async findByEmployeeAndType(employeeId, leaveTypeId, year) {
        const rows = await this.db.query('SELECT * FROM leave_balances WHERE employee_id = $1 AND leave_type_id = $2 AND period_year = $3', [employeeId, leaveTypeId, year]);
        return rows[0] ? leave_balance_mapper_1.LeaveBalanceMapper.toDomain(rows[0]) : null;
    }
    async findByEmployee(employeeId, year) {
        const rows = await this.db.query('SELECT * FROM leave_balances WHERE employee_id = $1 AND period_year = $2', [employeeId, year]);
        return rows.map(leave_balance_mapper_1.LeaveBalanceMapper.toDomain);
    }
    async save(record) {
        await this.db.execute('INSERT INTO leave_balances (id, employee_id, leave_type_id, total_days, used_days, pending_days, period_year, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, now())', [record.id, record.employeeId, record.leaveTypeId, record.totalDays, record.usedDays, record.pendingDays, record.periodYear]);
    }
    async update(record) {
        await this.db.execute('UPDATE leave_balances SET total_days = $1, used_days = $2, pending_days = $3, updated_at = now() WHERE id = $4', [record.totalDays, record.usedDays, record.pendingDays, record.id]);
    }
}
exports.LeaveBalanceRepository = LeaveBalanceRepository;
