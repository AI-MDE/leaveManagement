import { LeaveRequestStatus } from './leave-request.entity';

export class InvalidStateError extends Error {
  constructor(current: string, attempted: string) {
    super(`Cannot ${attempted} a leave request in status ${current}`);
    this.name = 'InvalidStateError';
  }
}

export class LeaveRequestStateMachine {
  static assertApprovable(status: LeaveRequestStatus): void {
    if (status !== 'PENDING') throw new InvalidStateError(status, 'approve');
  }

  static assertRejectable(status: LeaveRequestStatus): void {
    if (status !== 'PENDING') throw new InvalidStateError(status, 'reject');
  }

  static assertCancellable(status: LeaveRequestStatus): void {
    if (status === 'CANCELLED' || status === 'REJECTED') {
      throw new InvalidStateError(status, 'cancel');
    }
  }

  static assertModifiable(status: LeaveRequestStatus): void {
    if (status === 'CANCELLED' || status === 'REJECTED') {
      throw new InvalidStateError(status, 'modify');
    }
  }

  static wasApproved(status: LeaveRequestStatus): boolean {
    return status === 'APPROVED';
  }
}
