import { randomUUID } from 'crypto';
import { ActorContext } from '../../shared/actor-context';
import { ILeaveBalanceRepository } from '../data_access/leave-balance.repository.interface';
import { LeaveBalanceRules } from '../domain/leave-balance.rules';
import {
  ILeaveBalanceService,
  ValidateAndReserveCmd, DeductCmd, RestoreCmd, SetEntitlementCmd,
} from './leave-balance.service.interface';

export class BalanceNotFoundError extends Error {
  constructor() { super('Leave balance record not found'); this.name = 'BalanceNotFoundError'; }
}

export class LeaveBalanceService implements ILeaveBalanceService {
  constructor(private readonly repo: ILeaveBalanceRepository) {}

  async validateAndReserve(cmd: ValidateAndReserveCmd, _actor: ActorContext): Promise<void> {
    const year = new Date().getFullYear();
    const balance = await this.repo.findByEmployeeAndType(cmd.employeeId, cmd.leaveTypeId, year);
    if (!balance) throw new BalanceNotFoundError();
    LeaveBalanceRules.assertSufficient(balance.totalDays, balance.usedDays, balance.pendingDays, cmd.totalDays);
    balance.pendingDays += cmd.totalDays;
    balance.updatedAt = new Date();
    await this.repo.update(balance);
  }

  async deduct(cmd: DeductCmd, _actor: ActorContext): Promise<void> {
    const year = new Date().getFullYear();
    const balance = await this.repo.findByEmployeeAndType(cmd.employeeId, cmd.leaveTypeId, year);
    if (!balance) throw new BalanceNotFoundError();
    balance.pendingDays -= cmd.totalDays;
    balance.usedDays += cmd.totalDays;
    balance.updatedAt = new Date();
    await this.repo.update(balance);
  }

  async restore(cmd: RestoreCmd, _actor: ActorContext): Promise<void> {
    const year = new Date().getFullYear();
    const balance = await this.repo.findByEmployeeAndType(cmd.employeeId, cmd.leaveTypeId, year);
    if (!balance) throw new BalanceNotFoundError();
    if (cmd.fromStatus === 'APPROVED') {
      balance.usedDays -= cmd.totalDays;
    } else {
      balance.pendingDays -= cmd.totalDays;
    }
    balance.updatedAt = new Date();
    await this.repo.update(balance);
  }

  async setEntitlement(cmd: SetEntitlementCmd, actor: ActorContext): Promise<void> {
    if (actor.role !== 'HR_ADMIN') throw new Error('ForbiddenError');
    const existing = await this.repo.findByEmployeeAndType(cmd.employeeId, cmd.leaveTypeId, cmd.periodYear);
    if (existing) {
      existing.totalDays = cmd.totalDays;
      existing.updatedAt = new Date();
      await this.repo.update(existing);
    } else {
      await this.repo.save({
        id: randomUUID(),
        employeeId: cmd.employeeId,
        leaveTypeId: cmd.leaveTypeId,
        totalDays: cmd.totalDays,
        usedDays: 0,
        pendingDays: 0,
        periodYear: cmd.periodYear,
        updatedAt: new Date(),
      });
    }
  }
}
