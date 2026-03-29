"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRepository = void 0;
const employee_mapper_1 = require("./employee.mapper");
class EmployeeRepository {
    constructor(db) {
        this.db = db;
    }
    async findById(id) {
        const rows = await this.db.query('SELECT * FROM employees WHERE id = $1', [id]);
        return rows[0] ? employee_mapper_1.EmployeeMapper.toDomain(rows[0]) : null;
    }
    async findByEmail(email) {
        const rows = await this.db.query('SELECT * FROM employees WHERE email = $1', [email]);
        return rows[0] ? employee_mapper_1.EmployeeMapper.toDomain(rows[0]) : null;
    }
    async findDirectReports(managerId) {
        const rows = await this.db.query('SELECT * FROM employees WHERE manager_id = $1', [managerId]);
        return rows.map(employee_mapper_1.EmployeeMapper.toDomain);
    }
    async findAll(role) {
        const sql = role ? 'SELECT * FROM employees WHERE role = $1' : 'SELECT * FROM employees';
        const rows = await this.db.query(sql, role ? [role] : []);
        return rows.map(employee_mapper_1.EmployeeMapper.toDomain);
    }
    async save(record) {
        await this.db.execute('INSERT INTO employees (id, name, email, manager_id, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, now(), now())', [record.id, record.name, record.email, record.managerId, record.role]);
    }
    async update(record) {
        await this.db.execute('UPDATE employees SET name = $1, email = $2, manager_id = $3, role = $4, updated_at = now() WHERE id = $5', [record.name, record.email, record.managerId, record.role, record.id]);
    }
}
exports.EmployeeRepository = EmployeeRepository;
