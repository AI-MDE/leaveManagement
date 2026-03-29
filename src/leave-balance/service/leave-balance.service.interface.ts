import { ActorContext } from '../../shared/actor-context';

export interface ValidateAndReserveCmd { employeeId: string; leaveTypeId: string; totalDays: number; }
export interface DeductCmd            { employeeId: string; leaveTypeId: string; totalDays: number; }
export interface RestoreCmd           { employeeId: string; leaveTypeId: string; totalDays: number; fromStatus: string; }
export interface SetEntitlementCmd    { employeeId: string; leaveTypeId: string; periodYear: number; totalDays: number; }

export interface ILeaveBalanceService {
  validateAndReserve(cmd: ValidateAndReserveCmd, actor: ActorContext): Promise<void>;
  deduct(cmd: DeductCmd, actor: ActorContext): Promise<void>;
  restore(cmd: RestoreCmd, actor: ActorContext): Promise<void>;
  setEntitlement(cmd: SetEntitlementCmd, actor: ActorContext): Promise<void>;
}
