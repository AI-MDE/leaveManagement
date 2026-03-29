export class OverlappingRequestError extends Error {
  constructor(conflictingId: string) {
    super(`Leave request overlaps with existing request ${conflictingId}`);
    this.name = 'OverlappingRequestError';
  }
}

export class AdvanceNoticeViolationError extends Error {
  constructor(requiredDays: number) {
    super(`Leave type requires ${requiredDays} days advance notice`);
    this.name = 'AdvanceNoticeViolationError';
  }
}

export class LeaveRequestValidator {
  static checkAdvanceNotice(startDate: string, advanceNoticeDays: number): void {
    if (advanceNoticeDays === 0) return;
    const start = new Date(startDate);
    const earliest = new Date();
    earliest.setDate(earliest.getDate() + advanceNoticeDays);
    earliest.setHours(0, 0, 0, 0);
    if (start < earliest) {
      throw new AdvanceNoticeViolationError(advanceNoticeDays);
    }
  }

  static checkOverlap(
    startDate: string,
    endDate: string,
    existing: Array<{ id: string; startDate: string; endDate: string }>,
  ): void {
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
