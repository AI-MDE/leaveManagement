"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitLeaveRequestService = exports.RequestNotFoundError = exports.LeaveTypeNotFoundError = exports.ManagerNotAssignedError = exports.ForbiddenError = void 0;
const crypto_1 = require("crypto");
const domain_event_1 = require("../../shared/events/domain-event");
const leave_request_entity_1 = require("../domain/leave-request.entity");
const leave_request_validator_1 = require("../domain/leave-request.validator");
class ForbiddenError extends Error {
    constructor(msg = 'Forbidden') { super(msg); this.name = 'ForbiddenError'; }
}
exports.ForbiddenError = ForbiddenError;
class ManagerNotAssignedError extends Error {
    constructor() { super('Employee has no manager assigned'); this.name = 'ManagerNotAssignedError'; }
}
exports.ManagerNotAssignedError = ManagerNotAssignedError;
class LeaveTypeNotFoundError extends Error {
    constructor() { super('Leave type not found or inactive'); this.name = 'LeaveTypeNotFoundError'; }
}
exports.LeaveTypeNotFoundError = LeaveTypeNotFoundError;
class RequestNotFoundError extends Error {
    constructor() { super('Leave request not found'); this.name = 'RequestNotFoundError'; }
}
exports.RequestNotFoundError = RequestNotFoundError;
class SubmitLeaveRequestService {
    constructor(repo, leaveTypeRepo, employeeRepo, balanceService, auditService, eventPublisher) {
        this.repo = repo;
        this.leaveTypeRepo = leaveTypeRepo;
        this.employeeRepo = employeeRepo;
        this.balanceService = balanceService;
        this.auditService = auditService;
        this.eventPublisher = eventPublisher;
    }
    async execute(cmd, actor) {
        if (actor.role === 'EMPLOYEE' && actor.id !== cmd.employeeId) {
            throw new ForbiddenError();
        }
        const leaveType = await this.leaveTypeRepo.findById(cmd.leaveTypeId);
        if (!leaveType || !leaveType.isActive)
            throw new LeaveTypeNotFoundError();
        const employee = await this.employeeRepo.findById(cmd.employeeId);
        if (!employee?.managerId)
            throw new ManagerNotAssignedError();
        leave_request_validator_1.LeaveRequestValidator.checkAdvanceNotice(cmd.startDate, leaveType.advanceNoticeDays);
        const totalDays = this.calculateDays(cmd.startDate, cmd.endDate);
        if (leaveType.requiresBalance) {
            await this.balanceService.validateAndReserve({
                employeeId: cmd.employeeId,
                leaveTypeId: cmd.leaveTypeId,
                totalDays,
            }, actor);
        }
        const active = await this.repo.findActiveByEmployee(cmd.employeeId);
        leave_request_validator_1.LeaveRequestValidator.checkOverlap(cmd.startDate, cmd.endDate, active);
        const entity = leave_request_entity_1.LeaveRequestEntity.create({
            id: (0, crypto_1.randomUUID)(),
            employeeId: cmd.employeeId,
            leaveTypeId: cmd.leaveTypeId,
            startDate: cmd.startDate,
            endDate: cmd.endDate,
            totalDays,
            reason: cmd.reason,
        });
        await this.repo.save(entity);
        await this.auditService.append({
            leaveRequestId: entity.id,
            actorId: actor.id,
            action: 'SUBMITTED',
            fromStatus: null,
            toStatus: 'PENDING',
        });
        await this.eventPublisher.publish((0, domain_event_1.createEvent)('LeaveRequestSubmittedEvent', {
            leaveRequestId: entity.id,
            employeeId: entity.employeeId,
            managerId: employee.managerId,
            leaveTypeId: entity.leaveTypeId,
            startDate: entity.startDate,
            endDate: entity.endDate,
            totalDays: entity.totalDays,
        }));
        return this.toDto(entity);
    }
    calculateDays(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const ms = end.getTime() - start.getTime();
        return Math.round(ms / (1000 * 60 * 60 * 24)) + 1;
    }
    toDto(e) {
        return {
            id: e.id, employeeId: e.employeeId, leaveTypeId: e.leaveTypeId,
            startDate: e.startDate, endDate: e.endDate, totalDays: e.totalDays,
            reason: e.reason, status: e.status, submittedAt: e.submittedAt.toISOString(),
            reviewedAt: e.reviewedAt?.toISOString() ?? null, reviewedBy: e.reviewedBy,
            managerComment: e.managerComment, version: e.version,
        };
    }
}
exports.SubmitLeaveRequestService = SubmitLeaveRequestService;
