"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequestStateMachine = exports.InvalidStateError = void 0;
class InvalidStateError extends Error {
    constructor(current, attempted) {
        super(`Cannot ${attempted} a leave request in status ${current}`);
        this.name = 'InvalidStateError';
    }
}
exports.InvalidStateError = InvalidStateError;
class LeaveRequestStateMachine {
    static assertApprovable(status) {
        if (status !== 'PENDING')
            throw new InvalidStateError(status, 'approve');
    }
    static assertRejectable(status) {
        if (status !== 'PENDING')
            throw new InvalidStateError(status, 'reject');
    }
    static assertCancellable(status) {
        if (status === 'CANCELLED' || status === 'REJECTED') {
            throw new InvalidStateError(status, 'cancel');
        }
    }
    static assertModifiable(status) {
        if (status === 'CANCELLED' || status === 'REJECTED') {
            throw new InvalidStateError(status, 'modify');
        }
    }
    static wasApproved(status) {
        return status === 'APPROVED';
    }
}
exports.LeaveRequestStateMachine = LeaveRequestStateMachine;
