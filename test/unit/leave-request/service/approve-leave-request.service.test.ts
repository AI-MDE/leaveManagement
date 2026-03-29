import { ApproveLeaveRequestService } from '../../../../src/leave-request/service/approve-leave-request.service';
import { ForbiddenError, RequestNotFoundError } from '../../../../src/leave-request/service/submit-leave-request.service';
import { InvalidStateError } from '../../../../src/leave-request/domain/leave-request.state-machine';
import { LeaveRequestEntity, LeaveRequestProps } from '../../../../src/leave-request/domain/leave-request.entity';
import { ILeaveRequestRepository } from '../../../../src/leave-request/data_access/leave-request.repository.interface';
import { IEmployeeRepository } from '../../../../src/employee/data_access/employee.repository.interface';
import { ILeaveBalanceService } from '../../../../src/leave-balance/service/leave-balance.service.interface';
import { IAuditService } from '../../../../src/audit/service/audit.service.interface';
import { DomainEventPublisher } from '../../../../src/shared/events/domain-event-publisher';
import { ActorContext } from '../../../../src/shared/actor-context';

const pendingProps = (): LeaveRequestProps => ({
  id: 'req-001',
  employeeId: 'emp-001',
  leaveTypeId: 'lt-001',
  startDate: '2026-05-01',
  endDate: '2026-05-05',
  totalDays: 5,
  reason: null,
  status: 'PENDING',
  submittedAt: new Date(),
  reviewedAt: null,
  reviewedBy: null,
  managerComment: null,
  version: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const actorManager: ActorContext = { id: 'mgr-001', role: 'MANAGER' };

describe('ApproveLeaveRequestService', () => {
  let repo: jest.Mocked<ILeaveRequestRepository>;
  let employeeRepo: jest.Mocked<IEmployeeRepository>;
  let balanceService: jest.Mocked<ILeaveBalanceService>;
  let auditService: jest.Mocked<IAuditService>;
  let publisher: jest.Mocked<DomainEventPublisher>;
  let service: ApproveLeaveRequestService;

  beforeEach(() => {
    repo = {
      findById: jest.fn(),
      findActiveByEmployee: jest.fn(),
      save: jest.fn(),
      update: jest.fn().mockResolvedValue(undefined),
    } as any;
    employeeRepo = { findById: jest.fn(), findDirectReports: jest.fn(), findAll: jest.fn() } as any;
    balanceService = { validateAndReserve: jest.fn(), deduct: jest.fn().mockResolvedValue(undefined), restore: jest.fn(), setEntitlement: jest.fn() } as any;
    auditService = { append: jest.fn().mockResolvedValue(undefined) } as any;
    publisher = { publish: jest.fn().mockResolvedValue(undefined) } as any;
    service = new ApproveLeaveRequestService(repo, employeeRepo, balanceService, auditService, publisher);
  });

  it('approves a PENDING request on the happy path', async () => {
    repo.findById.mockResolvedValue(LeaveRequestEntity.rehydrate(pendingProps()));
    employeeRepo.findById.mockResolvedValue({ id: 'emp-001', managerId: 'mgr-001' } as any);

    const result = await service.execute({ leaveRequestId: 'req-001', managerComment: 'Approved' }, actorManager);

    expect(repo.update).toHaveBeenCalledTimes(1);
    expect(balanceService.deduct).toHaveBeenCalledTimes(1);
    expect(auditService.append).toHaveBeenCalledWith(expect.objectContaining({ action: 'APPROVED' }));
    expect(publisher.publish).toHaveBeenCalledTimes(1);
    expect(result.status).toBe('APPROVED');
  });

  it('throws RequestNotFoundError when leave request does not exist', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(service.execute({ leaveRequestId: 'req-999' }, actorManager)).rejects.toThrow(RequestNotFoundError);
  });

  it('throws ForbiddenError when actor is not the direct manager', async () => {
    repo.findById.mockResolvedValue(LeaveRequestEntity.rehydrate(pendingProps()));
    employeeRepo.findById.mockResolvedValue({ id: 'emp-001', managerId: 'mgr-OTHER' } as any);
    await expect(service.execute({ leaveRequestId: 'req-001' }, actorManager)).rejects.toThrow(ForbiddenError);
  });

  it('throws InvalidStateError when request is not PENDING', async () => {
    const approvedProps = { ...pendingProps(), status: 'APPROVED' as const };
    repo.findById.mockResolvedValue(LeaveRequestEntity.rehydrate(approvedProps));
    employeeRepo.findById.mockResolvedValue({ id: 'emp-001', managerId: 'mgr-001' } as any);
    await expect(service.execute({ leaveRequestId: 'req-001' }, actorManager)).rejects.toThrow(InvalidStateError);
  });
});
