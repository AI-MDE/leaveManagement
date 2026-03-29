import { ActorContext } from '../../shared/actor-context';
import { DomainEventPublisher } from '../../shared/events/domain-event-publisher';
import { createEvent } from '../../shared/events/domain-event';
import { ILeaveRequestRepository } from '../data_access/leave-request.repository.interface';
import { LeaveRequestStateMachine } from '../domain/leave-request.state-machine';
import { LeaveRequestValidator } from '../domain/leave-request.validator';
import { LeaveRequestResponseDto } from '../dto/leave-request.response.dto';
import { ModifyLeaveRequestCommand } from '../dto/modify-leave-request.command';
import { ILeaveBalanceService } from '../../leave-balance/service/leave-balance.service.interface';
import { IAuditService } from '../../audit/service/audit.service.interface';
import { ILeaveTypeRepository } from '../../leave-type/data_access/leave-type.repository.interface';
import { RequestNotFoundError, ForbiddenError } from './submit-leave-request.service';

export class ModifyLeaveRequestService {
  constructor(
    private readonly repo: ILeaveRequestRepository,
    private readonly leaveTypeRepo: ILeaveTypeRepository,
    private readonly balanceService: ILeaveBalanceService,
    private readonly auditService: IAuditService,
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(cmd: ModifyLeaveRequestCommand, actor: ActorContext): Promise<LeaveRequestResponseDto> {
    const entity = await this.repo.findById(cmd.leaveRequestId);
    if (!entity) throw new RequestNotFoundError();
    if (actor.id !== entity.employeeId) throw new ForbiddenError();

    LeaveRequestStateMachine.assertModifiable(entity.status);

    const leaveType = await this.leaveTypeRepo.findById(entity.leaveTypeId);
    LeaveRequestValidator.checkAdvanceNotice(cmd.startDate, leaveType!.advanceNoticeDays);

    const totalDays = this.calculateDays(cmd.startDate, cmd.endDate);
    const previousStatus = entity.status;
    const wasApproved = LeaveRequestStateMachine.wasApproved(entity.status);

    if (wasApproved && leaveType!.requiresBalance) {
      await this.balanceService.restore({
        employeeId: entity.employeeId,
        leaveTypeId: entity.leaveTypeId,
        totalDays: entity.totalDays,
        fromStatus: 'APPROVED',
      }, actor);
      await this.balanceService.validateAndReserve({
        employeeId: entity.employeeId,
        leaveTypeId: entity.leaveTypeId,
        totalDays,
      }, actor);
    }

    const active = await this.repo.findActiveByEmployee(entity.employeeId, entity.id);
    LeaveRequestValidator.checkOverlap(cmd.startDate, cmd.endDate, active);

    entity.modify(cmd.startDate, cmd.endDate, totalDays, cmd.reason);
    await this.repo.update(entity);

    await this.auditService.append({
      leaveRequestId: entity.id,
      actorId: actor.id,
      action: 'MODIFIED',
      fromStatus: previousStatus,
      toStatus: entity.status,
    });

    await this.eventPublisher.publish(createEvent('LeaveRequestModifiedEvent', {
      leaveRequestId: entity.id,
      employeeId: entity.employeeId,
      previousStatus,
      newStartDate: entity.startDate,
      newEndDate: entity.endDate,
    }));

    return this.toDto(entity);
  }

  private calculateDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
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
