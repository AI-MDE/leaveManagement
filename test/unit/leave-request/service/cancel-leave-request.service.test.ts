import { CancelLeaveRequestService } from '../../../../src/leave-request/service/cancel-leave-request.service';
import { ForbiddenError, RequestNotFoundError } from '../../../../src/leave-request/service/submit-leave-request.service';
import { InvalidStateError } from '../../../../src/leave-request/domain/leave-request.state-machine';
import { LeaveRequestEntity, LeaveRequestProps } from '../../../../src/leave-request/domain/leave-request.entity';
import { ILeaveRequestRepository } from '../../../../src/leave-request/data_access/leave-request.repository.interface';
import { ILeaveBalanceService } from '../../../../src/leave-balance/service/leave-balance.service.interface';
import { IAuditService } from '../../../../src/audit/service/audit.service.interface';
import { DomainEventPublisher } from '../../../../src/shared/events/domain-event-publisher';
import { ActorContext } from '../../../../src/shared/actor-context';

const makeProps = (status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED' = 'PENDING'): LeaveRequestProps => ({
  id: 'req-001',
  employeeId: 'emp-001',
  leaveTypeId: 'lt-001',
  startDate: '2026-05-01',
  endDate: '2026-05-05',
  totalDays: 5,
  reason: null,
  status,
  submittedAt: new Date(),
  reviewedAt: null,
  reviewedBy: null,
  managerComment: null,
  version: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const actorOwner: ActorContext = { id: 'emp-001', role: 'EMPLOYEE' };
const actorHrAdmin: ActorContext = { id: 'hr-001', role: 'HR_ADMIN' };
const actorOther: ActorContext = { id: 'emp-999', role: 'EMPLOYEE' };

describe('CancelLeaveRequestService', () => {
  let repo: jest.Mocked<ILeaveRequestRepository>;
  let balanceService: jest.Mocked<ILeaveBalanceService>;
  let auditService: jest.Mocked<IAuditService>;
  let publisher: jest.Mocked<DomainEventPublisher>;
  let service: CancelLeaveRequestService;

  beforeEach(() => {
    repo = {
      findById: jest.fn(),
      findActiveByEmployee: jest.fn(),
      save: jest.fn(),
      update: jest.fn().mockResolvedValue(undefined),
    } as any;
    balanceService = { validateAndReserve: jest.fn(), deduct: jest.fn(), restore: jest.fn().mockResolvedValue(undefined), setEntitlement: jest.fn() } as any;
    auditService = { append: jest.fn().mockResolvedValue(undefined) } as any;
    publisher = { publish: jest.fn().mockResolvedValue(undefined) } as any;
    service = new CancelLeaveRequestService(repo, balanceService, auditService, publisher);
  });

  it('cancels a PENDING request on the happy path', async () => {
    repo.findById.mockResolvedValue(LeaveRequestEntity.rehydrate(makeProps('PENDING')));

    const result = await service.execute({ leaveRequestId: 'req-001' }, actorOwner);

    expect(repo.update).toHaveBeenCalledTimes(1);
    expect(balanceService.restore).not.toHaveBeenCalled();
    expect(auditService.append).toHaveBeenCalledWith(expect.objectContaining({ action: 'CANCELLED' }));
    expect(result.status).toBe('CANCELLED');
  });

  it('restores balance when cancelling an APPROVED request (BR-004)', async () => {
    repo.findById.mockResolvedValue(LeaveRequestEntity.rehydrate(makeProps('APPROVED')));

    await service.execute({ leaveRequestId: 'req-001' }, actorOwner);

    expect(balanceService.restore).toHaveBeenCalledTimes(1);
  });

  it('allows HR Admin to cancel any request', async () => {
    repo.findById.mockResolvedValue(LeaveRequestEntity.rehydrate(makeProps('PENDING')));

    await expect(service.execute({ leaveRequestId: 'req-001' }, actorHrAdmin)).resolves.not.toThrow();
  });

  it('throws RequestNotFoundError when leave request does not exist', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(service.execute({ leaveRequestId: 'req-999' }, actorOwner)).rejects.toThrow(RequestNotFoundError);
  });

  it('throws ForbiddenError when actor is not the owner or HR Admin', async () => {
    repo.findById.mockResolvedValue(LeaveRequestEntity.rehydrate(makeProps('PENDING')));
    await expect(service.execute({ leaveRequestId: 'req-001' }, actorOther)).rejects.toThrow(ForbiddenError);
  });

  it('throws InvalidStateError when request is CANCELLED', async () => {
    repo.findById.mockResolvedValue(LeaveRequestEntity.rehydrate(makeProps('CANCELLED')));
    await expect(service.execute({ leaveRequestId: 'req-001' }, actorOwner)).rejects.toThrow(InvalidStateError);
  });

  it('throws InvalidStateError when request is REJECTED', async () => {
    repo.findById.mockResolvedValue(LeaveRequestEntity.rehydrate(makeProps('REJECTED')));
    await expect(service.execute({ leaveRequestId: 'req-001' }, actorOwner)).rejects.toThrow(InvalidStateError);
  });
});
