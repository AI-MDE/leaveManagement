"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leave_request_validator_1 = require("../../../../src/leave-request/domain/leave-request.validator");
describe('LeaveRequestValidator', () => {
    describe('checkAdvanceNotice()', () => {
        it('passes when advance notice requirement is 0 (Sick Leave)', () => {
            expect(() => leave_request_validator_1.LeaveRequestValidator.checkAdvanceNotice('2026-03-28', 0)).not.toThrow();
        });
        it('passes when start date is sufficiently far in the future', () => {
            const farFuture = new Date();
            farFuture.setDate(farFuture.getDate() + 30);
            const startDate = farFuture.toISOString().split('T')[0];
            expect(() => leave_request_validator_1.LeaveRequestValidator.checkAdvanceNotice(startDate, 14)).not.toThrow();
        });
        it('throws AdvanceNoticeViolationError when start date is too soon', () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const startDate = tomorrow.toISOString().split('T')[0];
            expect(() => leave_request_validator_1.LeaveRequestValidator.checkAdvanceNotice(startDate, 14))
                .toThrow(leave_request_validator_1.AdvanceNoticeViolationError);
        });
        it('throws with correct required days in message', () => {
            expect(() => leave_request_validator_1.LeaveRequestValidator.checkAdvanceNotice('2026-03-28', 30))
                .toThrow('30 days advance notice');
        });
    });
    describe('checkOverlap()', () => {
        const existing = [
            { id: 'req-existing', startDate: '2026-05-10', endDate: '2026-05-15' },
        ];
        it('passes when there are no existing requests', () => {
            expect(() => leave_request_validator_1.LeaveRequestValidator.checkOverlap('2026-05-10', '2026-05-15', [])).not.toThrow();
        });
        it('passes when new request is entirely before existing request', () => {
            expect(() => leave_request_validator_1.LeaveRequestValidator.checkOverlap('2026-05-01', '2026-05-09', existing)).not.toThrow();
        });
        it('passes when new request is entirely after existing request', () => {
            expect(() => leave_request_validator_1.LeaveRequestValidator.checkOverlap('2026-05-16', '2026-05-20', existing)).not.toThrow();
        });
        it('throws OverlappingRequestError when new request overlaps start of existing', () => {
            expect(() => leave_request_validator_1.LeaveRequestValidator.checkOverlap('2026-05-08', '2026-05-12', existing))
                .toThrow(leave_request_validator_1.OverlappingRequestError);
        });
        it('throws OverlappingRequestError when new request overlaps end of existing', () => {
            expect(() => leave_request_validator_1.LeaveRequestValidator.checkOverlap('2026-05-13', '2026-05-18', existing))
                .toThrow(leave_request_validator_1.OverlappingRequestError);
        });
        it('throws OverlappingRequestError when new request is fully inside existing', () => {
            expect(() => leave_request_validator_1.LeaveRequestValidator.checkOverlap('2026-05-11', '2026-05-14', existing))
                .toThrow(leave_request_validator_1.OverlappingRequestError);
        });
        it('throws OverlappingRequestError when new request fully contains existing', () => {
            expect(() => leave_request_validator_1.LeaveRequestValidator.checkOverlap('2026-05-09', '2026-05-16', existing))
                .toThrow(leave_request_validator_1.OverlappingRequestError);
        });
        it('throws with conflicting request id in message', () => {
            expect(() => leave_request_validator_1.LeaveRequestValidator.checkOverlap('2026-05-11', '2026-05-14', existing))
                .toThrow('req-existing');
        });
    });
});
