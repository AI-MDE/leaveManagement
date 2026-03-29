import { ActorContext } from '../../shared/actor-context';
import { LeaveRequestResponseDto } from '../dto/leave-request.response.dto';
import { SubmitLeaveRequestCommand } from '../dto/submit-leave-request.command';
import { ModifyLeaveRequestCommand } from '../dto/modify-leave-request.command';
import { CancelLeaveRequestCommand } from '../dto/cancel-leave-request.command';
import { ApproveLeaveRequestCommand } from '../dto/approve-leave-request.command';
import { RejectLeaveRequestCommand } from '../dto/reject-leave-request.command';

export interface ILeaveRequestService {
  submit(cmd: SubmitLeaveRequestCommand, actor: ActorContext): Promise<LeaveRequestResponseDto>;
  modify(cmd: ModifyLeaveRequestCommand, actor: ActorContext): Promise<LeaveRequestResponseDto>;
  cancel(cmd: CancelLeaveRequestCommand, actor: ActorContext): Promise<LeaveRequestResponseDto>;
  approve(cmd: ApproveLeaveRequestCommand, actor: ActorContext): Promise<LeaveRequestResponseDto>;
  reject(cmd: RejectLeaveRequestCommand, actor: ActorContext): Promise<LeaveRequestResponseDto>;
}
