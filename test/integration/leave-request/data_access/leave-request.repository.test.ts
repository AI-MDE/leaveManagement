/**
 * Integration test — runs against a real PostgreSQL database.
 * Requires env vars: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
 * Run: jest --testPathPattern=test/integration
 */
import { Client } from 'pg';
import { LeaveRequestRepository } from '../../../../src/leave-request/data_access/leave-request.repository';
import { LeaveRequestEntity } from '../../../../src/leave-request/domain/leave-request.entity';
import { DatabaseClient } from '../../../../src/shared/db/database-client';

let client: Client;
let db: DatabaseClient;
let repo: LeaveRequestRepository;

const TEST_EMP_ID = 'a0000000-0000-0000-0000-000000000001';
const TEST_LT_ID  = 'b0000000-0000-0000-0000-000000000001';
const TEST_REQ_ID = 'c0000000-0000-0000-0000-000000000001';

beforeAll(async () => {
  client = new Client({
    host    : process.env.DB_HOST     ?? 'localhost',
    port    : parseInt(process.env.DB_PORT ?? '5432', 10),
    user    : process.env.DB_USER     ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME     ?? 'leave_management_test',
  });
  await client.connect();

  db = {
    query: async (sql, params) => {
      const res = await client.query(sql, params ?? []);
      return res.rows;
    },
    execute: async (sql, params) => {
      const res = await client.query(sql, params ?? []);
      return { affectedRows: res.rowCount ?? 0 };
    },
  };

  repo = new LeaveRequestRepository(db);

  // Seed prerequisite rows (ON CONFLICT DO NOTHING for idempotency)
  await client.query(
    `INSERT INTO employees (id, name, email, manager_id, role, created_at, updated_at)
     VALUES ($1, 'Test Employee', 'test-repo@example.com', NULL, 'EMPLOYEE', now(), now())
     ON CONFLICT DO NOTHING`,
    [TEST_EMP_ID],
  );
  await client.query(
    `INSERT INTO leave_types (id, code, name, advance_notice_days, requires_balance, is_active, created_at, updated_at)
     VALUES ($1, 'TEST_REPO', 'Repo Test Leave', 0, TRUE, TRUE, now(), now())
     ON CONFLICT DO NOTHING`,
    [TEST_LT_ID],
  );
});

afterAll(async () => {
  await client.query('DELETE FROM leave_requests WHERE id = $1', [TEST_REQ_ID]);
  await client.query('DELETE FROM leave_types   WHERE id = $1', [TEST_LT_ID]);
  await client.query('DELETE FROM employees     WHERE id = $1', [TEST_EMP_ID]);
  await client.end();
});

afterEach(async () => {
  await client.query('DELETE FROM leave_requests WHERE id = $1', [TEST_REQ_ID]);
});

describe('LeaveRequestRepository (integration)', () => {
  it('saves and retrieves a leave request by id', async () => {
    const entity = LeaveRequestEntity.create({
      id: TEST_REQ_ID,
      employeeId: TEST_EMP_ID,
      leaveTypeId: TEST_LT_ID,
      startDate: '2026-06-01',
      endDate: '2026-06-05',
      totalDays: 5,
    });

    await repo.save(entity);

    const found = await repo.findById(TEST_REQ_ID);
    expect(found).not.toBeNull();
    expect(found!.id).toBe(TEST_REQ_ID);
    expect(found!.status).toBe('PENDING');
    expect(found!.totalDays).toBe(5);
  });

  it('returns null for a non-existent id', async () => {
    const found = await repo.findById('00000000-0000-0000-0000-000000000000');
    expect(found).toBeNull();
  });

  it('updates a leave request status', async () => {
    const entity = LeaveRequestEntity.create({
      id: TEST_REQ_ID,
      employeeId: TEST_EMP_ID,
      leaveTypeId: TEST_LT_ID,
      startDate: '2026-06-01',
      endDate: '2026-06-05',
      totalDays: 5,
    });
    await repo.save(entity);

    entity.approve('mgr-001', 'Looks good');
    await repo.update(entity);

    const updated = await repo.findById(TEST_REQ_ID);
    expect(updated!.status).toBe('APPROVED');
    expect(updated!.reviewedBy).toBe('mgr-001');
    expect(updated!.managerComment).toBe('Looks good');
  });

  it('findActiveByEmployee returns PENDING and APPROVED requests only', async () => {
    const entity = LeaveRequestEntity.create({
      id: TEST_REQ_ID,
      employeeId: TEST_EMP_ID,
      leaveTypeId: TEST_LT_ID,
      startDate: '2026-07-01',
      endDate: '2026-07-03',
      totalDays: 3,
    });
    await repo.save(entity);

    const active = await repo.findActiveByEmployee(TEST_EMP_ID);
    expect(active.length).toBeGreaterThanOrEqual(1);
    expect(active.find(r => r.id === TEST_REQ_ID)).toBeDefined();
  });

  it('findActiveByEmployee excludes a specified id', async () => {
    const entity = LeaveRequestEntity.create({
      id: TEST_REQ_ID,
      employeeId: TEST_EMP_ID,
      leaveTypeId: TEST_LT_ID,
      startDate: '2026-07-01',
      endDate: '2026-07-03',
      totalDays: 3,
    });
    await repo.save(entity);

    const active = await repo.findActiveByEmployee(TEST_EMP_ID, TEST_REQ_ID);
    expect(active.find(r => r.id === TEST_REQ_ID)).toBeUndefined();
  });
});
