import { ActorContext } from '../../shared/actor-context';
import { ILeaveRequestService } from '../service/leave-request.service.interface';
import { LeaveRequestQueryService } from '../queries/leave-request.query-service';
import { LeaveRequestRequestDto } from '../dto/leave-request.request.dto';

export class LeaveRequestController {
  constructor(
    private readonly service: ILeaveRequestService,
    private readonly queryService: LeaveRequestQueryService,
  ) {}

  async submit(body: LeaveRequestRequestDto, actor: ActorContext) {
    return this.service.submit({
      employeeId: actor.id,
      leaveTypeId: body.leaveTypeId,
      startDate: body.startDate,
      endDate: body.endDate,
      reason: body.reason,
    }, actor);
  }

  async modify(id: string, body: LeaveRequestRequestDto, actor: ActorContext) {
    return this.service.modify({
      leaveRequestId: id,
      startDate: body.startDate,
      endDate: body.endDate,
      reason: body.reason,
    }, actor);
  }

  async approve(id: string, body: { managerComment?: string }, actor: ActorContext) {
    return this.service.approve({ leaveRequestId: id, managerComment: body.managerComment }, actor);
  }

  async reject(id: string, body: { managerComment?: string }, actor: ActorContext) {
    return this.service.reject({ leaveRequestId: id, managerComment: body.managerComment }, actor);
  }

  async cancel(id: string, actor: ActorContext) {
    return this.service.cancel({ leaveRequestId: id }, actor);
  }

  async list(query: { status?: string; year?: number }, actor: ActorContext) {
    if (actor.role === 'HR_ADMIN') return this.queryService.getAllForHrAdmin(query);
    if (actor.role === 'MANAGER') return this.queryService.getPendingForManager({ managerId: actor.id });
    return this.queryService.getByEmployee({ employeeId: actor.id, ...query });
  }

  async getById(id: string) {
    return this.queryService.getById({ id });
  }
}
