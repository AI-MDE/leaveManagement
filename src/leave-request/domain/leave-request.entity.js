"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequestEntity = void 0;
class LeaveRequestEntity {
    constructor(props) {
        this.props = props;
    }
    static create(params) {
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
    static rehydrate(props) {
        return new LeaveRequestEntity(props);
    }
    approve(reviewedBy, managerComment) {
        this.props.status = 'APPROVED';
        this.props.reviewedBy = reviewedBy;
        this.props.reviewedAt = new Date();
        this.props.managerComment = managerComment ?? null;
        this.props.updatedAt = new Date();
    }
    reject(reviewedBy, managerComment) {
        this.props.status = 'REJECTED';
        this.props.reviewedBy = reviewedBy;
        this.props.reviewedAt = new Date();
        this.props.managerComment = managerComment ?? null;
        this.props.updatedAt = new Date();
    }
    cancel() {
        this.props.status = 'CANCELLED';
        this.props.updatedAt = new Date();
    }
    modify(startDate, endDate, totalDays, reason) {
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
    get id() { return this.props.id; }
    get employeeId() { return this.props.employeeId; }
    get leaveTypeId() { return this.props.leaveTypeId; }
    get startDate() { return this.props.startDate; }
    get endDate() { return this.props.endDate; }
    get totalDays() { return this.props.totalDays; }
    get reason() { return this.props.reason; }
    get status() { return this.props.status; }
    get submittedAt() { return this.props.submittedAt; }
    get reviewedAt() { return this.props.reviewedAt; }
    get reviewedBy() { return this.props.reviewedBy; }
    get managerComment() { return this.props.managerComment; }
    get version() { return this.props.version; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }
    toProps() { return { ...this.props }; }
}
exports.LeaveRequestEntity = LeaveRequestEntity;
