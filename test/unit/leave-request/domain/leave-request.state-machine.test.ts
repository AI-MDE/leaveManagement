import {
  LeaveRequestStateMachine,
  InvalidStateError,
} from '../../../../src/leave-request/domain/leave-request.state-machine';

describe('LeaveRequestStateMachine', () => {
  describe('assertApprovable()', () => {
    it('passes when status is PENDING', () => {
      expect(() => LeaveRequestStateMachine.assertApprovable('PENDING')).not.toThrow();
    });

    it('throws InvalidStateError when status is APPROVED', () => {
      expect(() => LeaveRequestStateMachine.assertApprovable('APPROVED')).toThrow(InvalidStateError);
    });

    it('throws InvalidStateError when status is REJECTED', () => {
      expect(() => LeaveRequestStateMachine.assertApprovable('REJECTED')).toThrow(InvalidStateError);
    });

    it('throws InvalidStateError when status is CANCELLED', () => {
      expect(() => LeaveRequestStateMachine.assertApprovable('CANCELLED')).toThrow(InvalidStateError);
    });
  });

  describe('assertRejectable()', () => {
    it('passes when status is PENDING', () => {
      expect(() => LeaveRequestStateMachine.assertRejectable('PENDING')).not.toThrow();
    });

    it('throws InvalidStateError when status is APPROVED', () => {
      expect(() => LeaveRequestStateMachine.assertRejectable('APPROVED')).toThrow(InvalidStateError);
    });

    it('throws InvalidStateError when status is CANCELLED', () => {
      expect(() => LeaveRequestStateMachine.assertRejectable('CANCELLED')).toThrow(InvalidStateError);
    });
  });

  describe('assertCancellable()', () => {
    it('passes when status is PENDING', () => {
      expect(() => LeaveRequestStateMachine.assertCancellable('PENDING')).not.toThrow();
    });

    it('passes when status is APPROVED', () => {
      expect(() => LeaveRequestStateMachine.assertCancellable('APPROVED')).not.toThrow();
    });

    it('throws InvalidStateError when status is CANCELLED', () => {
      expect(() => LeaveRequestStateMachine.assertCancellable('CANCELLED')).toThrow(InvalidStateError);
    });

    it('throws InvalidStateError when status is REJECTED', () => {
      expect(() => LeaveRequestStateMachine.assertCancellable('REJECTED')).toThrow(InvalidStateError);
    });
  });

  describe('assertModifiable()', () => {
    it('passes when status is PENDING', () => {
      expect(() => LeaveRequestStateMachine.assertModifiable('PENDING')).not.toThrow();
    });

    it('passes when status is APPROVED', () => {
      expect(() => LeaveRequestStateMachine.assertModifiable('APPROVED')).not.toThrow();
    });

    it('throws InvalidStateError when status is CANCELLED', () => {
      expect(() => LeaveRequestStateMachine.assertModifiable('CANCELLED')).toThrow(InvalidStateError);
    });

    it('throws InvalidStateError when status is REJECTED', () => {
      expect(() => LeaveRequestStateMachine.assertModifiable('REJECTED')).toThrow(InvalidStateError);
    });
  });

  describe('wasApproved()', () => {
    it('returns true when status is APPROVED', () => {
      expect(LeaveRequestStateMachine.wasApproved('APPROVED')).toBe(true);
    });

    it('returns false when status is PENDING', () => {
      expect(LeaveRequestStateMachine.wasApproved('PENDING')).toBe(false);
    });

    it('returns false when status is CANCELLED', () => {
      expect(LeaveRequestStateMachine.wasApproved('CANCELLED')).toBe(false);
    });
  });
});
