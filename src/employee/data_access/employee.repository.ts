import { DatabaseClient } from '../../shared/db/database-client';
import { EmployeeRecord, IEmployeeRepository } from './employee.repository.interface';
import { EmployeeMapper } from './employee.mapper';

export class EmployeeRepository implements IEmployeeRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findById(id: string): Promise<EmployeeRecord | null> {
    const rows = await this.db.query<any>('SELECT * FROM employees WHERE id = $1', [id]);
    return rows[0] ? EmployeeMapper.toDomain(rows[0]) : null;
  }

  async findByEmail(email: string): Promise<EmployeeRecord | null> {
    const rows = await this.db.query<any>('SELECT * FROM employees WHERE email = $1', [email]);
    return rows[0] ? EmployeeMapper.toDomain(rows[0]) : null;
  }

  async findDirectReports(managerId: string): Promise<EmployeeRecord[]> {
    const rows = await this.db.query<any>('SELECT * FROM employees WHERE manager_id = $1', [managerId]);
    return rows.map(EmployeeMapper.toDomain);
  }

  async findAll(role?: string): Promise<EmployeeRecord[]> {
    const sql = role ? 'SELECT * FROM employees WHERE role = $1' : 'SELECT * FROM employees';
    const rows = await this.db.query<any>(sql, role ? [role] : []);
    return rows.map(EmployeeMapper.toDomain);
  }

  async save(record: EmployeeRecord): Promise<void> {
    await this.db.execute(
      'INSERT INTO employees (id, name, email, manager_id, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, now(), now())',
      [record.id, record.name, record.email, record.managerId, record.role],
    );
  }

  async update(record: EmployeeRecord): Promise<void> {
    await this.db.execute(
      'UPDATE employees SET name = $1, email = $2, manager_id = $3, role = $4, updated_at = now() WHERE id = $5',
      [record.name, record.email, record.managerId, record.role, record.id],
    );
  }
}
