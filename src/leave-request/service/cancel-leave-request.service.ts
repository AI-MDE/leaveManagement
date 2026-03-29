import { ActorContext } from '../../shared/actor-context';
import { DomainEventPublisher } from '../../shared/events/domain-event-publisher';
import { createEvent } from '../../shared/events/domain-event';
import { ILeaveRequestRepository } from '../data_access/leave-request.repository.interface';
import { LeaveRequestStateMachine } from '../domain/leave-request.state-machine';
import { LeaveRequestResponseDto } from '../dto/leave-request.response.dto';
import { CancelLeaveRequestCommand } from '../dto/cancel-leave-request.command';
import { ILeaveBalanceService } from '../../leave-balance/service/leave-balance.service.interface';
import { IAuditService } from '../../audit/service/audit.service.interface';
import { RequestNotFoundError, ForbiddenError } from './submit-leave-request.service';

export class CancelLeaveRequestService {
  constructor(
    private readonly repo: ILeaveRequestRepository,
    private readonly balanceService: ILeaveBalanceService,
    private readonly auditService: IAuditService,
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(cmd: CancelLeaveRequestCommand, actor: ActorContext): Promise<LeaveRequestResponseDto> {
    const entity = await this.repo.findById(cmd.leaveRequestId);
    if (!entity) throw new RequestNotFoundError();

    if (actor.id !== entity.employeeId && actor.role !== 'HR_ADMIN') {
      throw new ForbiddenError();
    }

    LeaveRequestStateMachine.assertCancellable(entity.status);

    const wasApproved = LeaveRequestStateMachine.wasApproved(entity.status);
    const previousStatus = entity.status;

    if (wasApproved) {
      await this.balanceService.restore({
        employeeId: entity.employeeId,
        leaveTypeId: entity.leaveTypeId,
        totalDays: entity.totalDays,
        fromStatus: 'APPROVED',
      }, actor);
    }

    entity.cancel();
    await this.repo.update(entity);

    await this.auditService.append({
      leaveRequestId: entity.id,
      actorId: actor.id,
      action: 'CANCELLED',
      fromStatus: previousStatus,
      toStatus: 'CANCELLED',
    });

    await this.eventPublisher.publish(createEvent('LeaveRequestCancelledEvent', {
      leaveRequestId: entity.id,
      employeeId: entity.employeeId,
      previousStatus,
      balanceRestored: wasApproved,
    }));

    return this.toDto(entity);
  }

  private toDto(e: any): LeaveRequestResponseDto {
    return {
      id: e.id, employeeId: e.employeeId, leaveTypeId: e.leaveTypeId,
      startDate: e.startDate, endDate: e.endDate, totalDays: e.totalDays,
      reason: e.reason, status: e.status, submittedAt: e.submittedAt.toISOString(),
      reviewedAt: e.reviewedAt?.toISOString() ?? null, reviewedBy: e.reviewedBy,
      managerComment: e.managerComment, version: e.version,
    };
  }
}
