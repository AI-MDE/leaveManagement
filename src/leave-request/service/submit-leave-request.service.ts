import { randomUUID } from 'crypto';
import { ActorContext } from '../../shared/actor-context';
import { DomainEventPublisher } from '../../shared/events/domain-event-publisher';
import { createEvent } from '../../shared/events/domain-event';
import { ILeaveRequestRepository } from '../data_access/leave-request.repository.interface';
import { LeaveRequestEntity } from '../domain/leave-request.entity';
import { LeaveRequestValidator } from '../domain/leave-request.validator';
import { LeaveRequestResponseDto } from '../dto/leave-request.response.dto';
import { SubmitLeaveRequestCommand } from '../dto/submit-leave-request.command';
import { ILeaveBalanceService } from '../../leave-balance/service/leave-balance.service.interface';
import { IAuditService } from '../../audit/service/audit.service.interface';
import { ILeaveTypeRepository } from '../../leave-type/data_access/leave-type.repository.interface';
import { IEmployeeRepository } from '../../employee/data_access/employee.repository.interface';

export class ForbiddenError extends Error {
  constructor(msg = 'Forbidden') { super(msg); this.name = 'ForbiddenError'; }
}
export class ManagerNotAssignedError extends Error {
  constructor() { super('Employee has no manager assigned'); this.name = 'ManagerNotAssignedError'; }
}
export class LeaveTypeNotFoundError extends Error {
  constructor() { super('Leave type not found or inactive'); this.name = 'LeaveTypeNotFoundError'; }
}
export class RequestNotFoundError extends Error {
  constructor() { super('Leave request not found'); this.name = 'RequestNotFoundError'; }
}

export class SubmitLeaveRequestService {
  constructor(
    private readonly repo: ILeaveRequestRepository,
    private readonly leaveTypeRepo: ILeaveTypeRepository,
    private readonly employeeRepo: IEmployeeRepository,
    private readonly balanceService: ILeaveBalanceService,
    private readonly auditService: IAuditService,
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(cmd: SubmitLeaveRequestCommand, actor: ActorContext): Promise<LeaveRequestResponseDto> {
    if (actor.role === 'EMPLOYEE' && actor.id !== cmd.employeeId) {
      throw new ForbiddenError();
    }

    const leaveType = await this.leaveTypeRepo.findById(cmd.leaveTypeId);
    if (!leaveType || !leaveType.isActive) throw new LeaveTypeNotFoundError();

    const employee = await this.employeeRepo.findById(cmd.employeeId);
    if (!employee?.managerId) throw new ManagerNotAssignedError();

    LeaveRequestValidator.checkAdvanceNotice(cmd.startDate, leaveType.advanceNoticeDays);

    const totalDays = this.calculateDays(cmd.startDate, cmd.endDate);

    if (leaveType.requiresBalance) {
      await this.balanceService.validateAndReserve({
        employeeId: cmd.employeeId,
        leaveTypeId: cmd.leaveTypeId,
        totalDays,
      }, actor);
    }

    const active = await this.repo.findActiveByEmployee(cmd.employeeId);
    LeaveRequestValidator.checkOverlap(cmd.startDate, cmd.endDate, active);

    const entity = LeaveRequestEntity.create({
      id: randomUUID(),
      employeeId: cmd.employeeId,
      leaveTypeId: cmd.leaveTypeId,
      startDate: cmd.startDate,
      endDate: cmd.endDate,
      totalDays,
      reason: cmd.reason,
    });

    await this.repo.save(entity);

    await this.auditService.append({
      leaveRequestId: entity.id,
      actorId: actor.id,
      action: 'SUBMITTED',
      fromStatus: null,
      toStatus: 'PENDING',
    });

    await this.eventPublisher.publish(createEvent('LeaveRequestSubmittedEvent', {
      leaveRequestId: entity.id,
      employeeId: entity.employeeId,
      managerId: employee.managerId,
      leaveTypeId: entity.leaveTypeId,
      startDate: entity.startDate,
      endDate: entity.endDate,
      totalDays: entity.totalDays,
    }));

    return this.toDto(entity);
  }

  private calculateDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const ms = end.getTime() - start.getTime();
    return Math.round(ms / (1000 * 60 * 60 * 24)) + 1;
  }

  private toDto(e: LeaveRequestEntity): LeaveRequestResponseDto {
    return {
      id: e.id, employeeId: e.employeeId, leaveTypeId: e.leaveTypeId,
      startDate: e.startDate, endDate: e.endDate, totalDays: e.totalDays,
      reason: e.reason, status: e.status, submittedAt: e.submittedAt.toISOString(),
      reviewedAt: e.reviewedAt?.toISOString() ?? null, reviewedBy: e.reviewedBy,
      managerComment: e.managerComment, version: e.version,
    };
  }
}
