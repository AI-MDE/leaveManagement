export class InsufficientBalanceError extends Error {
  constructor(available: number, requested: number) {
    super(`Insufficient balance: available ${available}, requested ${requested}`);
    this.name = 'InsufficientBalanceError';
  }
}

export class LeaveBalanceRules {
  static assertSufficient(totalDays: number, usedDays: number, pendingDays: number, requested: number): void {
    const available = totalDays - usedDays - pendingDays;
    if (available < requested) throw new InsufficientBalanceError(available, requested);
  }
}
