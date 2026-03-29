"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveBalanceRules = exports.InsufficientBalanceError = void 0;
class InsufficientBalanceError extends Error {
    constructor(available, requested) {
        super(`Insufficient balance: available ${available}, requested ${requested}`);
        this.name = 'InsufficientBalanceError';
    }
}
exports.InsufficientBalanceError = InsufficientBalanceError;
class LeaveBalanceRules {
    static assertSufficient(totalDays, usedDays, pendingDays, requested) {
        const available = totalDays - usedDays - pendingDays;
        if (available < requested)
            throw new InsufficientBalanceError(available, requested);
    }
}
exports.LeaveBalanceRules = LeaveBalanceRules;
