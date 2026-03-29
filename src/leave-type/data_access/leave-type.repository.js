"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypeRepository = void 0;
const leave_type_mapper_1 = require("./leave-type.mapper");
class LeaveTypeRepository {
    constructor(db) {
        this.db = db;
    }
    async findById(id) {
        const rows = await this.db.query('SELECT * FROM leave_types WHERE id = $1', [id]);
        return rows[0] ? leave_type_mapper_1.LeaveTypeMapper.toDomain(rows[0]) : null;
    }
    async findAll() {
        const rows = await this.db.query('SELECT * FROM leave_types ORDER BY name');
        return rows.map(leave_type_mapper_1.LeaveTypeMapper.toDomain);
    }
    async findActive() {
        const rows = await this.db.query('SELECT * FROM leave_types WHERE is_active = TRUE ORDER BY name');
        return rows.map(leave_type_mapper_1.LeaveTypeMapper.toDomain);
    }
    async save(record) {
        await this.db.execute('INSERT INTO leave_types (id, code, name, advance_notice_days, requires_balance, is_active, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, now(), now())', [record.id, record.code, record.name, record.advanceNoticeDays, record.requiresBalance, record.isActive]);
    }
    async update(record) {
        await this.db.execute('UPDATE leave_types SET code = $1, name = $2, advance_notice_days = $3, requires_balance = $4, is_active = $5, updated_at = now() WHERE id = $6', [record.code, record.name, record.advanceNoticeDays, record.requiresBalance, record.isActive, record.id]);
    }
}
exports.LeaveTypeRepository = LeaveTypeRepository;
