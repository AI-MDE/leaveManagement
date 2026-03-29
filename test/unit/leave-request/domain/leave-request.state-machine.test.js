"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leave_request_state_machine_1 = require("../../../../src/leave-request/domain/leave-request.state-machine");
describe('LeaveRequestStateMachine', () => {
    describe('assertApprovable()', () => {
        it('passes when status is PENDING', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertApprovable('PENDING')).not.toThrow();
        });
        it('throws InvalidStateError when status is APPROVED', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertApprovable('APPROVED')).toThrow(leave_request_state_machine_1.InvalidStateError);
        });
        it('throws InvalidStateError when status is REJECTED', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertApprovable('REJECTED')).toThrow(leave_request_state_machine_1.InvalidStateError);
        });
        it('throws InvalidStateError when status is CANCELLED', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertApprovable('CANCELLED')).toThrow(leave_request_state_machine_1.InvalidStateError);
        });
    });
    describe('assertRejectable()', () => {
        it('passes when status is PENDING', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertRejectable('PENDING')).not.toThrow();
        });
        it('throws InvalidStateError when status is APPROVED', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertRejectable('APPROVED')).toThrow(leave_request_state_machine_1.InvalidStateError);
        });
        it('throws InvalidStateError when status is CANCELLED', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertRejectable('CANCELLED')).toThrow(leave_request_state_machine_1.InvalidStateError);
        });
    });
    describe('assertCancellable()', () => {
        it('passes when status is PENDING', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertCancellable('PENDING')).not.toThrow();
        });
        it('passes when status is APPROVED', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertCancellable('APPROVED')).not.toThrow();
        });
        it('throws InvalidStateError when status is CANCELLED', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertCancellable('CANCELLED')).toThrow(leave_request_state_machine_1.InvalidStateError);
        });
        it('throws InvalidStateError when status is REJECTED', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertCancellable('REJECTED')).toThrow(leave_request_state_machine_1.InvalidStateError);
        });
    });
    describe('assertModifiable()', () => {
        it('passes when status is PENDING', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertModifiable('PENDING')).not.toThrow();
        });
        it('passes when status is APPROVED', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertModifiable('APPROVED')).not.toThrow();
        });
        it('throws InvalidStateError when status is CANCELLED', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertModifiable('CANCELLED')).toThrow(leave_request_state_machine_1.InvalidStateError);
        });
        it('throws InvalidStateError when status is REJECTED', () => {
            expect(() => leave_request_state_machine_1.LeaveRequestStateMachine.assertModifiable('REJECTED')).toThrow(leave_request_state_machine_1.InvalidStateError);
        });
    });
    describe('wasApproved()', () => {
        it('returns true when status is APPROVED', () => {
            expect(leave_request_state_machine_1.LeaveRequestStateMachine.wasApproved('APPROVED')).toBe(true);
        });
        it('returns false when status is PENDING', () => {
            expect(leave_request_state_machine_1.LeaveRequestStateMachine.wasApproved('PENDING')).toBe(false);
        });
        it('returns false when status is CANCELLED', () => {
            expect(leave_request_state_machine_1.LeaveRequestStateMachine.wasApproved('CANCELLED')).toBe(false);
        });
    });
});
