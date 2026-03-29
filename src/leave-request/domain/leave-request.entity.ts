export type LeaveRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface LeaveRequestProps {
  id: string;
  employeeId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string | null;
  status: LeaveRequestStatus;
  submittedAt: Date;
  reviewedAt: Date | null;
  reviewedBy: string | null;
  managerComment: string | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export class LeaveRequestEntity {
  private constructor(private readonly props: LeaveRequestProps) {}

  static create(params: {
    id: string;
    employeeId: string;
    leaveTypeId: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    reason?: string;
  }): LeaveRequestEntity {
    return new LeaveRequestEntity({
      id: params.id,
      employeeId: params.employeeId,
      leaveTypeId: params.leaveTypeId,
      startDate: params.startDate,
      endDate: params.endDate,
      totalDays: params.totalDays,
      reason: params.reason ?? null,
      status: 'PENDING',
      submittedAt: new Date(),
      reviewedAt: null,
      reviewedBy: null,
      managerComment: null,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static rehydrate(props: LeaveRequestProps): LeaveRequestEntity {
    return new LeaveRequestEntity(props);
  }

  approve(reviewedBy: string, managerComment?: string): void {
    this.props.status = 'APPROVED';
    this.props.reviewedBy = reviewedBy;
    this.props.reviewedAt = new Date();
    this.props.managerComment = managerComment ?? null;
    this.props.updatedAt = new Date();
  }

  reject(reviewedBy: string, managerComment?: string): void {
    this.props.status = 'REJECTED';
    this.props.reviewedBy = reviewedBy;
    this.props.reviewedAt = new Date();
    this.props.managerComment = managerComment ?? null;
    this.props.updatedAt = new Date();
  }

  cancel(): void {
    this.props.status = 'CANCELLED';
    this.props.updatedAt = new Date();
  }

  modify(startDate: string, endDate: string, totalDays: number, reason?: string): void {
    if (this.props.status === 'APPROVED') {
      this.props.status = 'PENDING';
    }
    this.props.startDate = startDate;
    this.props.endDate = endDate;
    this.props.totalDays = totalDays;
    this.props.reason = reason ?? this.props.reason;
    this.props.version += 1;
    this.props.updatedAt = new Date();
  }

  get id(): string { return this.props.id; }
  get employeeId(): string { return this.props.employeeId; }
  get leaveTypeId(): string { return this.props.leaveTypeId; }
  get startDate(): string { return this.props.startDate; }
  get endDate(): string { return this.props.endDate; }
  get totalDays(): number { return this.props.totalDays; }
  get reason(): string | null { return this.props.reason; }
  get status(): LeaveRequestStatus { return this.props.status; }
  get submittedAt(): Date { return this.props.submittedAt; }
  get reviewedAt(): Date | null { return this.props.reviewedAt; }
  get reviewedBy(): string | null { return this.props.reviewedBy; }
  get managerComment(): string | null { return this.props.managerComment; }
  get version(): number { return this.props.version; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  toProps(): LeaveRequestProps { return { ...this.props }; }
}
