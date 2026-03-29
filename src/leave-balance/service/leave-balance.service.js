"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveBalanceService = exports.BalanceNotFoundError = void 0;
const crypto_1 = require("crypto");
const leave_balance_rules_1 = require("../domain/leave-balance.rules");
class BalanceNotFoundError extends Error {
    constructor() { super('Leave balance record not found'); this.name = 'BalanceNotFoundError'; }
}
exports.BalanceNotFoundError = BalanceNotFoundError;
class LeaveBalanceService {
    constructor(repo) {
        this.repo = repo;
    }
    async validateAndReserve(cmd, _actor) {
        const year = new Date().getFullYear();
        const balance = await this.repo.findByEmployeeAndType(cmd.employeeId, cmd.leaveTypeId, year);
        if (!balance)
            throw new BalanceNotFoundError();
        leave_balance_rules_1.LeaveBalanceRules.assertSufficient(balance.totalDays, balance.usedDays, balance.pendingDays, cmd.totalDays);
        balance.pendingDays += cmd.totalDays;
        balance.updatedAt = new Date();
        await this.repo.update(balance);
    }
    async deduct(cmd, _actor) {
        const year = new Date().getFullYear();
        const balance = await this.repo.findByEmployeeAndType(cmd.employeeId, cmd.leaveTypeId, year);
        if (!balance)
            throw new BalanceNotFoundError();
        balance.pendingDays -= cmd.totalDays;
        balance.usedDays += cmd.totalDays;
        balance.updatedAt = new Date();
        await this.repo.update(balance);
    }
    async restore(cmd, _actor) {
        const year = new Date().getFullYear();
        const balance = await this.repo.findByEmployeeAndType(cmd.employeeId, cmd.leaveTypeId, year);
        if (!balance)
            throw new BalanceNotFoundError();
        if (cmd.fromStatus === 'APPROVED') {
            balance.usedDays -= cmd.totalDays;
        }
        else {
            balance.pendingDays -= cmd.totalDays;
        }
        balance.updatedAt = new Date();
        await this.repo.update(balance);
    }
    async setEntitlement(cmd, actor) {
        if (actor.role !== 'HR_ADMIN')
            throw new Error('ForbiddenError');
        const existing = await this.repo.findByEmployeeAndType(cmd.employeeId, cmd.leaveTypeId, cmd.periodYear);
        if (existing) {
            existing.totalDays = cmd.totalDays;
            existing.updatedAt = new Date();
            await this.repo.update(existing);
        }
        else {
            await this.repo.save({
                id: (0, crypto_1.randomUUID)(),
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
exports.LeaveBalanceService = LeaveBalanceService;
