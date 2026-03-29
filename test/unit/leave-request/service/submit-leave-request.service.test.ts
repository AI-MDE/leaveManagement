import { SubmitLeaveRequestService, ForbiddenError, LeaveTypeNotFoundError, ManagerNotAssignedError } from '../../../../src/leave-request/service/submit-leave-request.service';
import { ILeaveRequestRepository } from '../../../../src/leave-request/data_access/leave-request.repository.interface';
import { ILeaveTypeRepository } from '../../../../src/leave-type/data_access/leave-type.repository.interface';
import { IEmployeeRepository } from '../../../../src/employee/data_access/employee.repository.interface';
import { ILeaveBalanceService } from '../../../../src/leave-balance/service/leave-balance.service.interface';
import { IAuditService } from '../../../../src/audit/service/audit.service.interface';
import { DomainEventPublisher } from '../../../../src/shared/events/domain-event-publisher';
import { OverlappingRequestError, AdvanceNoticeViolationError } from '../../../../src/leave-request/domain/leave-request.validator';
import { ActorContext } from '../../../../src/shared/actor-context';

const makeRepo = (): jest.Mocked<ILeaveRequestRepository> => ({
  findById: jest.fn(),
  findActiveByEmployee: jest.fn().mockResolvedValue([]),
  save: jest.fn().mockResolvedValue(undefined),
  update: jest.fn().mockResolvedValue(undefined),
});

const makeLeaveTypeRepo = (): jest.Mocked<ILeaveTypeRepository> => ({
  findById: jest.fn(),
  findAll: jest.fn(),
  findActive: jest.fn(),
  save: jest.fn().mockResolvedValue(undefined),
  update: jest.fn().mockResolvedValue(undefined),
});

const makeEmployeeRepo = (): jest.Mocked<IEmployeeRepository> => ({
  findById: jest.fn(),
  findByEmail: jest.fn(),
  findDirectReports: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn().mockResolvedValue(undefined),
  update: jest.fn().mockResolvedValue(undefined),
});

const makeBalanceService = (): jest.Mocked<ILeaveBalanceService> => ({
  validateAndReserve: jest.fn().mockResolvedValue(undefined),
  deduct: jest.fn().mockResolvedValue(undefined),
  restore: jest.fn().mockResolvedValue(undefined),
  setEntitlement: jest.fn().mockResolvedValue(undefined),
});

const makeAuditService = (): jest.Mocked<IAuditService> => ({
  append: jest.fn().mockResolvedValue(undefined),
});

const makePublisher = (): jest.Mocked<DomainEventPublisher> => ({
  publish: jest.fn().mockResolvedValue(undefined),
});

const farFutureDate = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return d.toISOString().split('T')[0];
};

const endDate = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 65);
  return d.toISOString().split('T')[0];
};

const actorEmployee: ActorContext = { id: 'emp-001', role: 'EMPLOYEE' };

const validCmd = () => ({
  employeeId: 'emp-001',
  leaveTypeId: 'lt-001',
  startDate: farFutureDate(),
  endDate: endDate(),
  reason: 'Holiday',
});

const activeLeaveType = { id: 'lt-001', advanceNoticeDays: 14, requiresBalance: true, isActive: true };
const employeeWithManager = { id: 'emp-001', managerId: 'mgr-001' };

describe('SubmitLeaveRequestService', () => {
  let repo: jest.Mocked<ILeaveRequestRepository>;
  let leaveTypeRepo: jest.Mocked<ILeaveTypeRepository>;
  let employeeRepo: jest.Mocked<IEmployeeRepository>;
  let balanceService: jest.Mocked<ILeaveBalanceService>;
  let auditService: jest.Mocked<IAuditService>;
  let publisher: jest.Mocked<DomainEventPublisher>;
  let service: SubmitLeaveRequestService;

  beforeEach(() => {
    repo = makeRepo();
    leaveTypeRepo = makeLeaveTypeRepo();
    employeeRepo = makeEmployeeRepo();
    balanceService = makeBalanceService();
    auditService = makeAuditService();
    publisher = makePublisher();
    service = new SubmitLeaveRequestService(repo, leaveTypeRepo, employeeRepo, balanceService, auditService, publisher);
  });

  it('creates and saves a leave request on the happy path', async () => {
    leaveTypeRepo.findById.mockResolvedValue(activeLeaveType as any);
    employeeRepo.findById.mockResolvedValue(employeeWithManager as any);

    const result = await service.execute(validCmd(), actorEmployee);

    expect(repo.save).toHaveBeenCalledTimes(1);
    expect(auditService.append).toHaveBeenCalledWith(expect.objectContaining({ action: 'SUBMITTED' }));
    expect(publisher.publish).toHaveBeenCalledTimes(1);
    expect(result.status).toBe('PENDING');
  });

  it('throws ForbiddenError when actor is not the employee submitting', async () => {
    const otherActor: ActorContext = { id: 'emp-999', role: 'EMPLOYEE' };
    await expect(service.execute(validCmd(), otherActor)).rejects.toThrow(ForbiddenError);
  });

  it('throws LeaveTypeNotFoundError when leave type is inactive', async () => {
    leaveTypeRepo.findById.mockResolvedValue({ ...activeLeaveType, isActive: false } as any);
    await expect(service.execute(validCmd(), actorEmployee)).rejects.toThrow(LeaveTypeNotFoundError);
  });

  it('throws LeaveTypeNotFoundError when leave type does not exist', async () => {
    leaveTypeRepo.findById.mockResolvedValue(null);
    await expect(service.execute(validCmd(), actorEmployee)).rejects.toThrow(LeaveTypeNotFoundError);
  });

  it('throws ManagerNotAssignedError when employee has no manager', async () => {
    leaveTypeRepo.findById.mockResolvedValue(activeLeaveType as any);
    employeeRepo.findById.mockResolvedValue({ id: 'emp-001', managerId: null } as any);
    await expect(service.execute(validCmd(), actorEmployee)).rejects.toThrow(ManagerNotAssignedError);
  });

  it('throws AdvanceNoticeViolationError when start date is too soon', async () => {
    leaveTypeRepo.findById.mockResolvedValue(activeLeaveType as any);
    employeeRepo.findById.mockResolvedValue(employeeWithManager as any);
    const cmd = { ...validCmd(), startDate: '2026-03-28', endDate: '2026-03-30' };
    await expect(service.execute(cmd, actorEmployee)).rejects.toThrow(AdvanceNoticeViolationError);
  });

  it('throws OverlappingRequestError when dates overlap existing request', async () => {
    leaveTypeRepo.findById.mockResolvedValue({ ...activeLeaveType, advanceNoticeDays: 0 } as any);
    employeeRepo.findById.mockResolvedValue(employeeWithManager as any);
    const start = farFutureDate();
    repo.findActiveByEmployee.mockResolvedValue([{ id: 'req-existing', startDate: start, endDate: endDate() }]);
    await expect(service.execute({ ...validCmd(), startDate: start }, actorEmployee)).rejects.toThrow(OverlappingRequestError);
  });

  it('skips balance validation for leave types that do not require balance', async () => {
    leaveTypeRepo.findById.mockResolvedValue({ ...activeLeaveType, requiresBalance: false } as any);
    employeeRepo.findById.mockResolvedValue(employeeWithManager as any);

    await service.execute(validCmd(), actorEmployee);

    expect(balanceService.validateAndReserve).not.toHaveBeenCalled();
  });
});
