"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequestValidator = exports.AdvanceNoticeViolationError = exports.OverlappingRequestError = void 0;
class OverlappingRequestError extends Error {
    constructor(conflictingId) {
        super(`Leave request overlaps with existing request ${conflictingId}`);
        this.name = 'OverlappingRequestError';
    }
}
exports.OverlappingRequestError = OverlappingRequestError;
class AdvanceNoticeViolationError extends Error {
    constructor(requiredDays) {
        super(`Leave type requires ${requiredDays} days advance notice`);
        this.name = 'AdvanceNoticeViolationError';
    }
}
exports.AdvanceNoticeViolationError = AdvanceNoticeViolationError;
class LeaveRequestValidator {
    static checkAdvanceNotice(startDate, advanceNoticeDays) {
        if (advanceNoticeDays === 0)
            return;
        const start = new Date(startDate);
        const earliest = new Date();
        earliest.setDate(earliest.getDate() + advanceNoticeDays);
        earliest.setHours(0, 0, 0, 0);
        if (start < earliest) {
            throw new AdvanceNoticeViolationError(advanceNoticeDays);
        }
    }
    static checkOverlap(startDate, endDate, existing) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        for (const req of existing) {
            const eStart = new Date(req.startDate);
            const eEnd = new Date(req.endDate);
            if (start <= eEnd && end >= eStart) {
                throw new OverlappingRequestError(req.id);
            }
        }
    }
}
exports.LeaveRequestValidator = LeaveRequestValidator;
