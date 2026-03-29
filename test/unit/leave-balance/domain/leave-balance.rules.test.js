"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leave_balance_rules_1 = require("../../../../src/leave-balance/domain/leave-balance.rules");
describe('LeaveBalanceRules', () => {
    describe('assertSufficient()', () => {
        it('passes when available balance covers the request', () => {
            // total=20, used=5, pending=3 => available=12; requesting 5
            expect(() => leave_balance_rules_1.LeaveBalanceRules.assertSufficient(20, 5, 3, 5)).not.toThrow();
        });
        it('passes when request exactly equals available balance', () => {
            // total=10, used=3, pending=2 => available=5; requesting 5
            expect(() => leave_balance_rules_1.LeaveBalanceRules.assertSufficient(10, 3, 2, 5)).not.toThrow();
        });
        it('throws InsufficientBalanceError when request exceeds available balance', () => {
            // total=10, used=7, pending=2 => available=1; requesting 5
            expect(() => leave_balance_rules_1.LeaveBalanceRules.assertSufficient(10, 7, 2, 5)).toThrow(leave_balance_rules_1.InsufficientBalanceError);
        });
        it('throws when available is zero', () => {
            expect(() => leave_balance_rules_1.LeaveBalanceRules.assertSufficient(10, 10, 0, 1)).toThrow(leave_balance_rules_1.InsufficientBalanceError);
        });
        it('throws with correct available and requested amounts in message', () => {
            expect(() => leave_balance_rules_1.LeaveBalanceRules.assertSufficient(10, 8, 1, 5))
                .toThrow('available 1, requested 5');
        });
    });
});
