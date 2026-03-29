/**
 * Integration test — exercises LeaveRequestController against real service implementations
 * backed by a real PostgreSQL database.
 * Requires env vars: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
 */
import { Client } from 'pg';
import { LeaveRequestController } from '../../../../src/leave-request/controller/leave-request.controller';
import { LeaveRequestRepository } from '../../../../src/leave-request/data_access/leave-request.repository';
import { LeaveRequestQueryService } from '../../../../src/leave-request/queries/leave-request.query-service';
import { SubmitLeaveRequestService } from '../../../../src/leave-request/service/submit-leave-request.service';
import { ApproveLeaveRequestService } from '../../../../src/leave-request/service/approve-leave-request.service';
import { CancelLeaveRequestService } from '../../../../src/leave-request/service/cancel-leave-request.service';
import { LeaveTypeRepository } from '../../../../src/leave-type/data_access/leave-type.repository';
import { EmployeeRepository } from '../../../../src/employee/data_access/employee.repository';
import { LeaveBalanceRepository } from '../../../../src/leave-balance/data_access/leave-balance.repository';
import { LeaveBalanceService } from '../../../../src/leave-balance/service/leave-balance.service';
import { AuditService } from '../../../../src/audit/service/audit.service';
import { AuditRepository } from '../../../../src/audit/data_access/audit.repository';
import { DatabaseClient } from '../../../../src/shared/db/database-client';
import { ActorContext } from '../../../../src/shared/actor-context';
import { ILeaveRequestService } from '../../../../src/leave-request/service/leave-request.service.interface';

const EMP_ID = 'd0000000-0000-0000-0000-000000000001';
const MGR_ID = 'd0000000-0000-0000-0000-000000000002';
const LT_ID  = 'd0000000-0000-0000-0000-000000000003';

let pgClient: Client;
let db: DatabaseClient;
let controller: LeaveRequestController;

const actorEmployee: ActorContext = { id: EMP_ID, role: 'EMPLOYEE' };
const actorManager: ActorContext  = { id: MGR_ID, role: 'MANAGER' };

beforeAll(async () => {
  pgClient = new Client({
    host    : process.env.DB_HOST     ?? 'localhost',
    port    : parseInt(process.env.DB_PORT ?? '5432', 10),
    user    : process.env.DB_USER     ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME     ?? 'leave_management_test',
  });
  await pgClient.connect();

  db = {
    query: async (sql, params) => {
      const res = await pgClient.query(sql, params ?? []);
      return res.rows;
    },
    execute: async (sql, params) => {
      const res = await pgClient.query(sql, params ?? []);
      return { affectedRows: res.rowCount ?? 0 };
    },
  };

  // Seed: manager, employee, leave type, leave balance
  await pgClient.query(
    `INSERT INTO employees (id, name, email, manager_id, role, created_at, updated_at)
     VALUES ($1, 'Ctrl Manager', 'ctrl.mgr@example.com', NULL, 'MANAGER', now(), now())
     ON CONFLICT DO NOTHING`,
    [MGR_ID],
  );
  await pgClient.query(
    `INSERT INTO employees (id, name, email, manager_id, role, created_at, updated_at)
     VALUES ($1, 'Ctrl Employee', 'ctrl.emp@example.com', $2, 'EMPLOYEE', now(), now())
     ON CONFLICT DO NOTHING`,
    [EMP_ID, MGR_ID],
  );
  await pgClient.query(
    `INSERT INTO leave_types (id, code, name, advance_notice_days, requires_balance, is_active, created_at, updated_at)
     VALUES ($1, 'CTRL_TEST', 'Controller Test Leave', 0, TRUE, TRUE, now(), now())
     ON CONFLICT DO NOTHING`,
    [LT_ID],
  );
  await pgClient.query(
    `INSERT INTO leave_balances (id, employee_id, leave_type_id, total_days, used_days, pending_days, period_year, updated_at)
     VALUES (gen_random_uuid(), $1, $2, 20, 0, 0, 2026, now())
     ON CONFLICT DO NOTHING`,
    [EMP_ID, LT_ID],
  );

  // Wire up real implementations
  const leaveRequestRepo = new LeaveRequestRepository(db);
  const leaveTypeRepo    = new LeaveTypeRepository(db);
  const employeeRepo     = new EmployeeRepository(db);
  const leaveBalanceRepo = new LeaveBalanceRepository(db);
  const auditRepo        = new AuditRepository(db);
  const noopPublisher    = { publish: async () => {} };

  const balanceService = new LeaveBalanceService(leaveBalanceRepo);
  const auditService   = new AuditService(auditRepo);

  const submitService  = new SubmitLeaveRequestService(leaveRequestRepo, leaveTypeRepo, employeeRepo, balanceService, auditService, noopPublisher);
  const approveService = new ApproveLeaveRequestService(leaveRequestRepo, employeeRepo, balanceService, auditService, noopPublisher);
  const cancelService  = new CancelLeaveRequestService(leaveRequestRepo, balanceService, auditService, noopPublisher);
  const queryService   = new LeaveRequestQueryService(db);

  const serviceAdapter: ILeaveRequestService = {
    submit : (cmd, actor) => submitService.execute(cmd, actor),
    approve: (cmd, actor) => approveService.execute(cmd, actor),
    cancel : (cmd, actor) => cancelService.execute(cmd, actor),
    modify : async () => { throw new Error('not wired in this test'); },
    reject : async () => { throw new Error('not wired in this test'); },
  };

  controller = new LeaveRequestController(serviceAdapter, queryService);
});

afterAll(async () => {
  await pgClient.query('DELETE FROM leave_audit_entries WHERE actor_id = ANY($1)', [[EMP_ID, MGR_ID]]);
  await pgClient.query('DELETE FROM leave_requests  WHERE employee_id = $1', [EMP_ID]);
  await pgClient.query('DELETE FROM leave_balances  WHERE employee_id = $1', [EMP_ID]);
  await pgClient.query('DELETE FROM leave_types     WHERE id = $1', [LT_ID]);
  await pgClient.query('DELETE FROM employees       WHERE id = ANY($1)', [[EMP_ID, MGR_ID]]);
  await pgClient.end();
});

describe('LeaveRequestController (integration)', () => {
  it('submits, approves, and cancels a leave request end-to-end', async () => {
    const futureStart = new Date();
    futureStart.setDate(futureStart.getDate() + 10);
    const futureEnd = new Date();
    futureEnd.setDate(futureEnd.getDate() + 12);

    const submitted = await controller.submit({
      leaveTypeId: LT_ID,
      startDate: futureStart.toISOString().split('T')[0],
      endDate: futureEnd.toISOString().split('T')[0],
      reason: 'Integration test leave',
    }, actorEmployee);

    expect(submitted.status).toBe('PENDING');
    expect(submitted.employeeId).toBe(EMP_ID);

    const approved = await controller.approve(submitted.id, { managerComment: 'OK' }, actorManager);
    expect(approved.status).toBe('APPROVED');

    const cancelled = await controller.cancel(submitted.id, actorEmployee);
    expect(cancelled.status).toBe('CANCELLED');
  });

  it('getById returns the submitted request', async () => {
    const futureStart = new Date();
    futureStart.setDate(futureStart.getDate() + 20);
    const futureEnd = new Date();
    futureEnd.setDate(futureEnd.getDate() + 22);

    const submitted = await controller.submit({
      leaveTypeId: LT_ID,
      startDate: futureStart.toISOString().split('T')[0],
      endDate: futureEnd.toISOString().split('T')[0],
    }, actorEmployee);

    const found = await controller.getById(submitted.id);
    expect(found).not.toBeNull();
    expect(found!.id).toBe(submitted.id);
  });
});
