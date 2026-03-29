import { DatabaseClient } from '../../shared/db/database-client';
import { LeaveTypeRecord, ILeaveTypeRepository } from './leave-type.repository.interface';
import { LeaveTypeMapper } from './leave-type.mapper';

export class LeaveTypeRepository implements ILeaveTypeRepository {
  constructor(private readonly db: DatabaseClient) {}

  async findById(id: string): Promise<LeaveTypeRecord | null> {
    const rows = await this.db.query<any>('SELECT * FROM leave_types WHERE id = $1', [id]);
    return rows[0] ? LeaveTypeMapper.toDomain(rows[0]) : null;
  }

  async findAll(): Promise<LeaveTypeRecord[]> {
    const rows = await this.db.query<any>('SELECT * FROM leave_types ORDER BY name');
    return rows.map(LeaveTypeMapper.toDomain);
  }

  async findActive(): Promise<LeaveTypeRecord[]> {
    const rows = await this.db.query<any>('SELECT * FROM leave_types WHERE is_active = TRUE ORDER BY name');
    return rows.map(LeaveTypeMapper.toDomain);
  }

  async save(record: LeaveTypeRecord): Promise<void> {
    await this.db.execute(
      'INSERT INTO leave_types (id, code, name, advance_notice_days, requires_balance, is_active, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, now(), now())',
      [record.id, record.code, record.name, record.advanceNoticeDays, record.requiresBalance, record.isActive],
    );
  }

  async update(record: LeaveTypeRecord): Promise<void> {
    await this.db.execute(
      'UPDATE leave_types SET code = $1, name = $2, advance_notice_days = $3, requires_balance = $4, is_active = $5, updated_at = now() WHERE id = $6',
      [record.code, record.name, record.advanceNoticeDays, record.requiresBalance, record.isActive, record.id],
    );
  }
}
