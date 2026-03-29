import { ActorContext } from '../../shared/actor-context';
import { DomainEventPublisher } from '../../shared/events/domain-event-publisher';
import { createEvent } from '../../shared/events/domain-event';
import { ILeaveRequestRepository } from '../data_access/leave-request.repository.interface';
import { LeaveRequestStateMachine } from '../domain/leave-request.state-machine';
import { LeaveRequestResponseDto } from '../dto/leave-request.response.dto';
import { RejectLeaveRequestCommand } from '../dto/reject-leave-request.command';
import { IAuditService } from '../../audit/service/audit.service.interface';
import { IEmployeeRepository } from '../../employee/data_access/employee.repository.interface';
import { RequestNotFoundError, ForbiddenError } from './submit-leave-request.service';

export class RejectLeaveRequestService {
  constructor(
    private readonly repo: ILeaveRequestRepository,
    private readonly employeeRepo: IEmployeeRepository,
    private readonly auditService: IAuditService,
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(cmd: RejectLeaveRequestCommand, actor: ActorContext): Promise<LeaveRequestResponseDto> {
    const entity = await this.repo.findById(cmd.leaveRequestId);
    if (!entity) throw new RequestNotFoundError();

    const employee = await this.employeeRepo.findById(entity.employeeId);
    if (employee?.managerId !== actor.id) throw new ForbiddenError('Only the direct manager can reject');

    LeaveRequestStateMachine.assertRejectable(entity.status);

    entity.reject(actor.id, cmd.managerComment);
    await this.repo.update(entity);

    await this.auditService.append({
      leaveRequestId: entity.id,
      actorId: actor.id,
      action: 'REJECTED',
      fromStatus: 'PENDING',
      toStatus: 'REJECTED',
      comment: cmd.managerComment,
    });

    await this.eventPublisher.publish(createEvent('LeaveRequestRejectedEvent', {
      leaveRequestId: entity.id,
      employeeId: entity.employeeId,
      reviewedBy: actor.id,
      managerComment: cmd.managerComment ?? null,
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
